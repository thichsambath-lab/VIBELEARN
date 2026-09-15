import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { db, schema } from './connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths to data files
const docsDir = path.resolve(__dirname, '../../../');
const seedNdjsonPath = path.join(docsDir, 'seed.ndjson');
const videosJsonPath = path.join(docsDir, 'videos.json');
const outputPath = path.join(__dirname, 'seededData.json');

function parseNotesToMarkdown(notesBlocks) {
  if (!Array.isArray(notesBlocks)) return '';
  return notesBlocks
    .map((block) => {
      const text = (block.children || []).map((c) => c.text || '').join('');
      if (block.style === 'h2') return `## ${text}`;
      if (block.listItem === 'bullet') return `- ${text}`;
      return text;
    })
    .filter(Boolean)
    .join('\n\n');
}

export async function parseSeedData() {
  const seedRaw = fs.readFileSync(seedNdjsonPath, 'utf8');
  const videosRaw = fs.readFileSync(videosJsonPath, 'utf8');
  const videosData = JSON.parse(videosRaw);

  const lines = seedRaw.trim().split('\n');
  const parsedRecords = lines.map((line) => JSON.parse(line));

  // Index lessons by _id
  const lessonRecordsMap = new Map();
  parsedRecords
    .filter((r) => r._type === 'lesson')
    .forEach((r) => {
      lessonRecordsMap.set(r._id, r);
    });

  // Process courses
  const courseRecords = parsedRecords.filter((r) => r._type === 'course');
  const structuredCourses = courseRecords.map((c) => {
    const courseSlug = c.slug?.current || c.slug || c._id.replace('course.', '');
    const coverImageUrl =
      c.coverImage?._sanityAsset?.replace('image@', '') ||
      'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=800&q=80';

    const modules = (c.modules || []).map((mod, modIndex) => {
      const moduleTitle = mod.title || `Module ${modIndex + 1}`;
      const moduleSummary = mod.summary || '';

      const lessons = (mod.lessons || []).map((lesRef, lesIndex) => {
        const lessonDoc = lessonRecordsMap.get(lesRef._ref) || {};
        const lessonSlug =
          lessonDoc.slug?.current ||
          lessonDoc.slug ||
          (lesRef._ref ? lesRef._ref.replace('lesson.', '') : `lesson-${lesIndex + 1}`);

        // Video lookup from videos.json
        const videoInfo = videosData[lessonSlug] || {};
        const youtubeVideoId =
          videoInfo.id ||
          (lessonDoc.videoUrl ? lessonDoc.videoUrl.split('v=')[1] : 'VBlF3WVQ62Q');
        const duration = videoInfo.duration || lessonDoc.duration || 300;

        return {
          id: lessonDoc._id || `lesson.${lessonSlug}`,
          title: lessonDoc.title || videoInfo.title || `Lesson ${lesIndex + 1}`,
          slug: lessonSlug,
          youtubeVideoId,
          duration,
          notes: parseNotesToMarkdown(lessonDoc.notes),
          position: lesIndex + 1,
        };
      });

      return {
        id: `module.${courseSlug}-${modIndex + 1}`,
        title: moduleTitle,
        summary: moduleSummary,
        position: modIndex + 1,
        lessons,
      };
    });

    return {
      id: c._id || `course.${courseSlug}`,
      title: c.title,
      slug: courseSlug,
      summary: c.summary,
      coverImageUrl,
      level: c.level || 'intermediate',
      modules,
    };
  });

  return structuredCourses;
}

export async function runSeed() {
  console.log('🌱 Starting Vibelearn database seeding...');

  const structuredCourses = await parseSeedData();
  console.log(`📦 Parsed ${structuredCourses.length} courses from seed.ndjson & videos.json`);

  // Save compiled data locally for repository fallback
  fs.writeFileSync(outputPath, JSON.stringify(structuredCourses, null, 2));
  console.log(`💾 Saved compiled seed data to ${outputPath}`);

  if (db) {
    try {
      console.log('📡 Inserting seed records into PostgreSQL...');
      for (const c of structuredCourses) {
        // Upsert course
        const [insertedCourse] = await db
          .insert(schema.courses)
          .values({
            title: c.title,
            slug: c.slug,
            summary: c.summary,
            coverImageUrl: c.coverImageUrl,
          })
          .onConflictDoUpdate({
            target: schema.courses.slug,
            set: {
              title: c.title,
              summary: c.summary,
              coverImageUrl: c.coverImageUrl,
            },
          })
          .returning();

        for (const mod of c.modules) {
          const [insertedMod] = await db
            .insert(schema.modules)
            .values({
              courseId: insertedCourse.id,
              title: mod.title,
              position: mod.position,
            })
            .returning();

          for (const les of mod.lessons) {
            await db
              .insert(schema.lessons)
              .values({
                moduleId: insertedMod.id,
                title: les.title,
                slug: les.slug,
                youtubeVideoId: les.youtubeVideoId,
                notes: les.notes,
                position: les.position,
              })
              .onConflictDoUpdate({
                target: schema.lessons.slug,
                set: {
                  title: les.title,
                  youtubeVideoId: les.youtubeVideoId,
                  notes: les.notes,
                },
              });
          }
        }
      }
      console.log('✅ PostgreSQL seeding completed successfully!');
    } catch (err) {
      console.warn('⚠️ Database connection warning during seeding:', err.message);
      console.log('ℹ️ SeededData.json generated successfully for repository fallback.');
    }
  } else {
    console.log('ℹ️ Local seed data generated. Live database connection not active.');
  }
}

// Run seed when executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runSeed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('❌ Seeding failed:', err);
      process.exit(1);
    });
}

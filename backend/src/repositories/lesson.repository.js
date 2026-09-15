import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { eq } from 'drizzle-orm';
import { db, schema } from '../db/connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const seededDataPath = path.resolve(__dirname, '../db/seededData.json');

function getSeededCourses() {
  try {
    if (fs.existsSync(seededDataPath)) {
      const data = fs.readFileSync(seededDataPath, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading seededData.json:', err);
  }
  return [];
}

export const lessonRepository = {
  async findBySlug(slug) {
    if (!slug) return null;

    if (db) {
      try {
        const lesson = await db.query.lessons.findFirst({
          where: eq(schema.lessons.slug, slug),
          with: {
            module: {
              with: {
                course: true,
              },
            },
          },
        });
        if (lesson) return lesson;
      } catch (err) {
        console.warn('PostgreSQL query failed, falling back to cached seed data:', err.message);
      }
    }

    // Fallback to seededData.json
    const courses = getSeededCourses();
    for (const course of courses) {
      const allCourseLessons = [];
      for (const mod of course.modules || []) {
        for (const les of mod.lessons || []) {
          allCourseLessons.push({
            ...les,
            moduleTitle: mod.title,
            courseSlug: course.slug,
            courseTitle: course.title,
          });
        }
      }

      const lessonIndex = allCourseLessons.findIndex((l) => l.slug === slug);
      if (lessonIndex !== -1) {
        const currentLesson = allCourseLessons[lessonIndex];
        const prevLesson = lessonIndex > 0 ? allCourseLessons[lessonIndex - 1] : null;
        const nextLesson =
          lessonIndex < allCourseLessons.length - 1 ? allCourseLessons[lessonIndex + 1] : null;

        return {
          ...currentLesson,
          course: {
            id: course.id,
            slug: course.slug,
            title: course.title,
            modules: course.modules,
          },
          prevLessonSlug: prevLesson ? prevLesson.slug : null,
          nextLessonSlug: nextLesson ? nextLesson.slug : null,
        };
      }
    }

    return null;
  },
};

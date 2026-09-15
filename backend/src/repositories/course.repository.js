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

export const courseRepository = {
  async findAll() {
    if (db) {
      try {
        const rows = await db.query.courses.findMany({
          with: {
            modules: {
              with: {
                lessons: true,
              },
            },
          },
        });
        if (rows && rows.length > 0) {
          return rows.map((course) => {
            const allLessons = (course.modules || []).flatMap((m) => m.lessons || []);
            return {
              id: course.id,
              title: course.title,
              slug: course.slug,
              summary: course.summary,
              coverImageUrl: course.coverImageUrl,
              lessonCount: allLessons.length,
            };
          });
        }
      } catch (err) {
        console.warn('PostgreSQL query failed, falling back to cached seed data:', err.message);
      }
    }

    // Fallback to seededData.json
    const courses = getSeededCourses();
    return courses.map((c) => {
      const allLessons = (c.modules || []).flatMap((m) => m.lessons || []);
      const totalDuration = allLessons.reduce((acc, curr) => acc + (curr.duration || 0), 0);
      return {
        id: c.id,
        title: c.title,
        slug: c.slug,
        summary: c.summary,
        coverImageUrl: c.coverImageUrl,
        level: c.level || 'intermediate',
        lessonCount: allLessons.length,
        totalDuration,
      };
    });
  },

  async findBySlug(slug) {
    if (!slug) return null;

    if (db) {
      try {
        const course = await db.query.courses.findFirst({
          where: eq(schema.courses.slug, slug),
          with: {
            modules: {
              orderBy: (modules, { asc }) => [asc(modules.position)],
              with: {
                lessons: {
                  orderBy: (lessons, { asc }) => [asc(lessons.position)],
                },
              },
            },
          },
        });
        if (course) return course;
      } catch (err) {
        console.warn('PostgreSQL query failed, falling back to cached seed data:', err.message);
      }
    }

    // Fallback to seededData.json
    const courses = getSeededCourses();
    const found = courses.find((c) => c.slug === slug);
    return found || null;
  },
};

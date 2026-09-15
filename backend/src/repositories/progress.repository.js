import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { eq, and } from 'drizzle-orm';
import { db, schema } from '../db/connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const progressStorePath = path.resolve(__dirname, '../db/progressStore.json');

function getLocalProgressStore() {
  try {
    if (fs.existsSync(progressStorePath)) {
      const data = fs.readFileSync(progressStorePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading progressStore.json:', err);
  }
  return [];
}

function saveLocalProgressStore(store) {
  try {
    fs.writeFileSync(progressStorePath, JSON.stringify(store, null, 2));
  } catch (err) {
    console.error('Error saving progressStore.json:', err);
  }
}

export const progressRepository = {
  async findByUserId(userId) {
    if (!userId) return [];

    if (db) {
      try {
        const records = await db.query.progress.findMany({
          where: eq(schema.progress.userId, userId),
          with: {
            lesson: true,
          },
        });
        if (records && records.length > 0) {
          return records;
        }
      } catch (err) {
        console.warn('PostgreSQL progress query failed, falling back to local store:', err.message);
      }
    }

    // Fallback store
    const store = getLocalProgressStore();
    return store.filter((p) => p.userId === userId);
  },

  async upsert({ userId, lessonId, isCompleted = false, resumeTimestamp = 0 }) {
    if (!userId || !lessonId) {
      throw new Error('userId and lessonId are required for progress tracking');
    }

    const now = new Date();

    if (db) {
      try {
        const existing = await db.query.progress.findFirst({
          where: and(
            eq(schema.progress.userId, userId),
            eq(schema.progress.lessonId, lessonId)
          ),
        });

        if (existing) {
          const [updated] = await db
            .update(schema.progress)
            .set({
              isCompleted: typeof isCompleted === 'boolean' ? isCompleted : existing.isCompleted,
              resumeTimestamp: typeof resumeTimestamp === 'number' ? resumeTimestamp : existing.resumeTimestamp,
              updatedAt: now,
            })
            .where(eq(schema.progress.id, existing.id))
            .returning();
          return updated;
        } else {
          const [created] = await db
            .insert(schema.progress)
            .values({
              userId,
              lessonId,
              isCompleted,
              resumeTimestamp,
              updatedAt: now,
            })
            .returning();
          return created;
        }
      } catch (err) {
        console.warn('PostgreSQL progress upsert failed, falling back to local store:', err.message);
      }
    }

    // Fallback store
    const store = getLocalProgressStore();
    const existingIndex = store.findIndex((p) => p.userId === userId && p.lessonId === lessonId);

    const record = {
      id: existingIndex !== -1 ? store[existingIndex].id : `prog_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      userId,
      lessonId,
      isCompleted: typeof isCompleted === 'boolean' ? isCompleted : false,
      resumeTimestamp: typeof resumeTimestamp === 'number' ? resumeTimestamp : 0,
      updatedAt: now.toISOString(),
    };

    if (existingIndex !== -1) {
      store[existingIndex] = {
        ...store[existingIndex],
        ...record,
      };
    } else {
      store.push(record);
    }

    saveLocalProgressStore(store);
    return record;
  },
};

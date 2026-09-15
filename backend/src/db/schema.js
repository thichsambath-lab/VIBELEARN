import { pgTable, text, uuid, integer, boolean, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// 1. Users Table (Synced with Clerk)
export const users = pgTable('users', {
  id: text('id').primaryKey(), // Clerk User ID (e.g., user_2b...)
  email: text('email'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 2. Courses Table
export const courses = pgTable('courses', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  summary: text('summary'),
  coverImageUrl: text('cover_image_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 3. Modules Table
export const modules = pgTable('modules', {
  id: uuid('id').defaultRandom().primaryKey(),
  courseId: uuid('course_id')
    .notNull()
    .references(() => courses.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  position: integer('position').default(1).notNull(),
});

// 4. Lessons Table
export const lessons = pgTable('lessons', {
  id: uuid('id').defaultRandom().primaryKey(),
  moduleId: uuid('module_id')
    .notNull()
    .references(() => modules.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  youtubeVideoId: text('youtube_video_id'),
  notes: text('notes'),
  position: integer('position').default(1).notNull(),
});

// 5. Progress Table
export const progress = pgTable('progress', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  lessonId: uuid('lesson_id')
    .notNull()
    .references(() => lessons.id, { onDelete: 'cascade' }),
  isCompleted: boolean('is_completed').default(false).notNull(),
  resumeTimestamp: integer('resume_timestamp').default(0).notNull(), // In seconds
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ================= Relations =================

export const coursesRelations = relations(courses, ({ many }) => ({
  modules: many(modules),
}));

export const modulesRelations = relations(modules, ({ one, many }) => ({
  course: one(courses, {
    fields: [modules.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  module: one(modules, {
    fields: [lessons.moduleId],
    references: [modules.id],
  }),
  progressRecords: many(progress),
}));

export const usersRelations = relations(users, ({ many }) => ({
  progressRecords: many(progress),
}));

export const progressRelations = relations(progress, ({ one }) => ({
  user: one(users, {
    fields: [progress.userId],
    references: [users.id],
  }),
  lesson: one(lessons, {
    fields: [progress.lessonId],
    references: [lessons.id],
  }),
}));

import { lessonRepository } from '../repositories/lesson.repository.js';

export const lessonService = {
  async getLessonBySlug(slug) {
    if (!slug) {
      const error = new Error('Lesson slug is required');
      error.statusCode = 400;
      throw error;
    }

    const lesson = await lessonRepository.findBySlug(slug);
    if (!lesson) {
      const error = new Error(`Lesson with slug "${slug}" not found`);
      error.statusCode = 404;
      throw error;
    }

    return lesson;
  },
};

import { progressRepository } from '../repositories/progress.repository.js';

export const progressService = {
  async getUserProgress(userId) {
    if (!userId) {
      const error = new Error('User ID is required to retrieve progress');
      error.statusCode = 400;
      throw error;
    }

    return await progressRepository.findByUserId(userId);
  },

  async saveProgress({ userId, lessonId, isCompleted, resumeTimestamp }) {
    if (!userId) {
      const error = new Error('User ID is required');
      error.statusCode = 400;
      throw error;
    }

    if (!lessonId) {
      const error = new Error('Lesson ID is required');
      error.statusCode = 400;
      throw error;
    }

    return await progressRepository.upsert({
      userId,
      lessonId,
      isCompleted,
      resumeTimestamp,
    });
  },
};

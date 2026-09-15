import { lessonService } from '../services/lesson.service.js';

export const lessonController = {
  async getLessonBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const lesson = await lessonService.getLessonBySlug(slug);
      res.status(200).json({
        data: lesson,
      });
    } catch (err) {
      next(err);
    }
  },
};

import { progressService } from '../services/progress.service.js';

export const progressController = {
  async getProgress(req, res, next) {
    try {
      const userId = req.auth?.userId || req.query.userId;
      if (!userId) {
        return res.status(401).json({
          error: 'Unauthorized: User authentication or userId parameter is required',
        });
      }

      const records = await progressService.getUserProgress(userId);
      res.status(200).json({
        data: records,
      });
    } catch (err) {
      next(err);
    }
  },

  async saveProgress(req, res, next) {
    try {
      const userId = req.auth?.userId || req.body.userId;
      if (!userId) {
        return res.status(401).json({
          error: 'Unauthorized: User authentication or userId parameter is required',
        });
      }

      const { lessonId, isCompleted, resumeTimestamp } = req.body;
      if (!lessonId) {
        return res.status(400).json({
          error: 'Missing required field: lessonId',
        });
      }

      const record = await progressService.saveProgress({
        userId,
        lessonId,
        isCompleted,
        resumeTimestamp,
      });

      res.status(200).json({
        data: record,
      });
    } catch (err) {
      next(err);
    }
  },
};

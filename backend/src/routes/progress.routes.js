import { Router } from 'express';
import { progressController } from '../controllers/progress.controller.js';
import { requireAuth } from '../middlewares/auth.js';

const router = Router();

router.get('/', requireAuth, progressController.getProgress);
router.post('/', requireAuth, progressController.saveProgress);

export default router;

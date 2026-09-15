import { Router } from 'express';
import { progressController } from '../controllers/progress.controller.js';

const router = Router();

router.get('/', progressController.getProgress);
router.post('/', progressController.saveProgress);

export default router;

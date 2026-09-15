import { Router } from 'express';
import { courseController } from '../controllers/course.controller.js';

const router = Router();

router.get('/', courseController.getAllCourses);
router.get('/:slug', courseController.getCourseBySlug);

export default router;

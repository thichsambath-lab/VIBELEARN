import { courseRepository } from '../repositories/course.repository.js';

export const courseService = {
  async getAllCourses() {
    return await courseRepository.findAll();
  },

  async getCourseBySlug(slug) {
    if (!slug) {
      const error = new Error('Course slug is required');
      error.statusCode = 400;
      throw error;
    }

    const course = await courseRepository.findBySlug(slug);
    if (!course) {
      const error = new Error(`Course with slug "${slug}" not found`);
      error.statusCode = 404;
      throw error;
    }

    return course;
  },
};

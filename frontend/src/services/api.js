import { MOCK_COURSES } from './mockData';

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.VITE_API_BASE_URL
    ? `${import.meta.env.VITE_API_BASE_URL}/api`
    : 'http://localhost:5000/api');

/**
 * Fetch all courses for catalog
 */
export async function fetchCourses() {
  try {
    const res = await fetch(`${API_BASE_URL}/courses`);
    if (!res.ok) {
      throw new Error(`Failed to fetch courses: ${res.statusText}`);
    }
    const json = await res.json();
    return json.data || json;
  } catch (err) {
    console.warn('Backend API unreachable, using local fallback courses:', err.message);
    return MOCK_COURSES;
  }
}

/**
 * Fetch a single course by its slug
 */
export async function fetchCourseBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}/courses/${slug}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch course "${slug}": ${res.statusText}`);
    }
    const json = await res.json();
    return json.data || json;
  } catch (err) {
    console.warn(`Backend API unreachable, looking up course "${slug}" in fallback data:`, err.message);
    const found = MOCK_COURSES.find((c) => c.slug === slug);
    if (!found) throw err;
    return found;
  }
}

/**
 * Fetch a single lesson by its slug
 */
export async function fetchLessonBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}/lessons/${slug}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch lesson "${slug}": ${res.statusText}`);
    }
    const json = await res.json();
    return json.data || json;
  } catch (err) {
    console.warn(`Backend API unreachable, looking up lesson "${slug}" in fallback data:`, err.message);
    for (const course of MOCK_COURSES) {
      for (const mod of course.modules || []) {
        const found = (mod.lessons || []).find((l) => l.slug === slug);
        if (found) {
          return {
            ...found,
            course: {
              id: course.id,
              slug: course.slug,
              title: course.title,
              modules: course.modules,
            },
          };
        }
      }
    }
    throw err;
  }
}

/**
 * Fetch user progress records
 */
export async function fetchUserProgress(token, userId) {
  try {
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const url = userId
      ? `${API_BASE_URL}/progress?userId=${encodeURIComponent(userId)}`
      : `${API_BASE_URL}/progress`;

    const res = await fetch(url, { headers });
    if (!res.ok) {
      throw new Error(`Failed to fetch progress: ${res.statusText}`);
    }
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.warn('Could not fetch remote progress:', err.message);
    // Return cached progress from localStorage if available
    try {
      const cached = localStorage.getItem(`vibelearn_progress_${userId || 'guest'}`);
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  }
}

/**
 * Save user progress for a lesson
 */
export async function saveUserProgress(token, { userId, lessonId, isCompleted, resumeTimestamp }) {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const payload = {
      userId,
      lessonId,
      isCompleted,
      resumeTimestamp,
    };

    const res = await fetch(`${API_BASE_URL}/progress`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Failed to save progress: ${res.statusText}`);
    }
    const json = await res.json();

    // Cache locally for instant UI updates
    try {
      const storageKey = `vibelearn_progress_${userId || 'guest'}`;
      const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const filtered = existing.filter((p) => p.lessonId !== lessonId);
      filtered.push(json.data || payload);
      localStorage.setItem(storageKey, JSON.stringify(filtered));
    } catch {
      // ignore localStorage errors
    }

    return json.data || payload;
  } catch (err) {
    console.warn('Could not save progress to backend, storing in localStorage:', err.message);
    try {
      const storageKey = `vibelearn_progress_${userId || 'guest'}`;
      const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const filtered = existing.filter((p) => p.lessonId !== lessonId);
      const record = {
        lessonId,
        userId,
        isCompleted,
        resumeTimestamp,
        updatedAt: new Date().toISOString(),
      };
      filtered.push(record);
      localStorage.setItem(storageKey, JSON.stringify(filtered));
      return record;
    } catch {
      return null;
    }
  }
}

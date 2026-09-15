import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { fetchUserProgress, saveUserProgress } from '../services/api';

export function useProgress() {
  const { userId, isSignedIn, getToken } = useAuth();
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load progress when user changes or signs in
  useEffect(() => {
    let isMounted = true;

    async function loadProgress() {
      setLoading(true);
      try {
        const token = isSignedIn ? await getToken() : null;
        const records = await fetchUserProgress(token, userId);
        if (isMounted) {
          setProgress(records || []);
        }
      } catch (err) {
        console.warn('Error loading progress:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProgress();

    return () => {
      isMounted = false;
    };
  }, [userId, isSignedIn, getToken]);

  // Helper to retrieve progress for a specific lesson
  const getLessonProgress = useCallback(
    (lessonId) => {
      if (!lessonId) return { isCompleted: false, resumeTimestamp: 0 };
      const record = progress.find((p) => p.lessonId === lessonId || p.lessonId === `lesson.${lessonId}`);
      return record || { isCompleted: false, resumeTimestamp: 0 };
    },
    [progress]
  );

  // Save progress for a lesson (completion or timestamp)
  const saveProgressRecord = useCallback(
    async (lessonId, { isCompleted, resumeTimestamp }) => {
      if (!lessonId) return null;

      const effectiveUserId = userId || 'guest_user';

      // Optimistically update local state
      setProgress((prev) => {
        const existingIndex = prev.findIndex(
          (p) => p.lessonId === lessonId || p.lessonId === `lesson.${lessonId}`
        );
        const updated = {
          userId: effectiveUserId,
          lessonId,
          isCompleted: typeof isCompleted === 'boolean' ? isCompleted : prev[existingIndex]?.isCompleted || false,
          resumeTimestamp:
            typeof resumeTimestamp === 'number'
              ? resumeTimestamp
              : prev[existingIndex]?.resumeTimestamp || 0,
          updatedAt: new Date().toISOString(),
        };

        if (existingIndex !== -1) {
          const next = [...prev];
          next[existingIndex] = { ...next[existingIndex], ...updated };
          return next;
        }
        return [...prev, updated];
      });

      try {
        const token = isSignedIn ? await getToken() : null;
        const result = await saveUserProgress(token, {
          userId: effectiveUserId,
          lessonId,
          isCompleted,
          resumeTimestamp,
        });
        return result;
      } catch (err) {
        console.warn('Failed to persist progress to server:', err);
        return null;
      }
    },
    [userId, isSignedIn, getToken]
  );

  // Convenience helper to toggle completion
  const markAsCompleted = useCallback(
    async (lessonId, completed = true) => {
      const current = getLessonProgress(lessonId);
      return await saveProgressRecord(lessonId, {
        isCompleted: completed,
        resumeTimestamp: current.resumeTimestamp || 0,
      });
    },
    [getLessonProgress, saveProgressRecord]
  );

  // Calculate course completion stats
  const getCourseStats = useCallback(
    (course) => {
      if (!course || !course.modules) {
        return { completedCount: 0, totalCount: 0, percentage: 0 };
      }

      const allLessons = (course.modules || []).flatMap((m) => m.lessons || []);
      const totalCount = allLessons.length;
      if (totalCount === 0) {
        return { completedCount: 0, totalCount: 0, percentage: 0 };
      }

      const completedCount = allLessons.filter((les) => {
        const prog = getLessonProgress(les.id || les.slug);
        return prog.isCompleted;
      }).length;

      const percentage = Math.round((completedCount / totalCount) * 100);

      return {
        completedCount,
        totalCount,
        percentage,
      };
    },
    [getLessonProgress]
  );

  return {
    progress,
    loading,
    getLessonProgress,
    saveProgress: saveProgressRecord,
    markAsCompleted,
    getCourseStats,
  };
}

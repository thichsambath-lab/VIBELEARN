import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  Clock,
  BarChart2,
  BookOpen,
  Users,
  Play,
  Bookmark,
  Layers,
  Database,
  Gauge,
  Cloud,
  ChevronDown,
  Lightbulb,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { MOCK_COURSES } from '../services/mockData';
import { fetchCourseBySlug } from '../services/api';
import { useProgress } from '../hooks/useProgress';
import ProgressBar from '../components/common/ProgressBar';

export default function CourseDetail() {
  const { slug } = useParams();
  const [course, setCourse] = useState(
    () => MOCK_COURSES.find((c) => c.slug === slug) || MOCK_COURSES[0]
  );
  const [showAllModules, setShowAllModules] = useState(false);
  const [expandedModuleId, setExpandedModuleId] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  const { getCourseStats, getLessonProgress } = useProgress();

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const liveCourse = await fetchCourseBySlug(slug);
        if (isMounted && liveCourse) {
          setCourse(liveCourse);
          if (liveCourse.modules && liveCourse.modules.length > 0) {
            setExpandedModuleId(liveCourse.modules[0].id);
          }
        }
      } catch (err) {
        console.warn('Using fallback for CourseDetail:', err);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const stats = getCourseStats(course);

  const visibleModules = showAllModules
    ? course.modules
    : course.modules.slice(0, 6);

  const getWylIcon = (icon) => {
    switch (icon) {
      case 'layers':
        return <Layers className="w-5 h-5 text-emerald-600" />;
      case 'database':
        return <Database className="w-5 h-5 text-emerald-600" />;
      case 'gauge':
        return <Gauge className="w-5 h-5 text-emerald-600" />;
      case 'cloud':
        return <Cloud className="w-5 h-5 text-emerald-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-emerald-600" />;
    }
  };

  // Find active lesson or default to first lesson of module 5 (or first module)
  const activeLessonSlug =
    course.modules.find((m) => m.isActive)?.lessons[0]?.slug ||
    course.modules[0]?.lessons[0]?.slug ||
    'data-fetching-caching';

  return (
    <div className="min-h-screen bg-[#FAFAFC] pb-28 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* 1. Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-8">
          <Link to="/" className="hover:text-slate-900 flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/" className="hover:text-slate-900">
            All Courses
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">{course.title}</span>
        </nav>

        {/* 2. Course Header Hero */}
        <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Graphic Cover */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm aspect-square rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 p-8 flex flex-col items-center justify-center text-white shadow-xl relative overflow-hidden border border-emerald-800/40">
                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-emerald-500/20 blur-3xl" />
                <div className="w-24 h-24 rounded-2xl bg-black/80 border border-slate-700 flex items-center justify-center font-mono font-bold text-5xl mb-4 shadow-2xl">
                  {course.iconType === 'nextjs' ? 'N' : course.title.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-xl font-bold tracking-wider font-mono">
                  {course.title.toUpperCase()}
                </span>
                <span className="text-xs text-emerald-400/80 font-mono mt-1">
                  PRODUCTION READY
                </span>
              </div>
            </div>

            {/* Right: Course Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 uppercase tracking-wide">
                <span className="text-emerald-500">🔥</span>
                {course.badge || 'POPULAR'}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 font-serif leading-tight">
                {course.title.split(' ')[0]}{' '}
                <span className="text-emerald-500">
                  {course.title.split(' ').slice(1).join(' ')}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {course.summary}
              </p>

              {/* Metadata Row */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 pt-2 font-medium">
                <span className="flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-emerald-600" />
                  {course.level}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  {course.modulesCount || course.modules.length} modules
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-600" />
                  {course.students} students
                </span>
              </div>

              {/* Course Progress */}
              <ProgressBar value={stats.percentage} showLabel className="pt-2 max-w-md" />

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to={`/courses/${course.slug}/lessons/${activeLessonSlug}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-all shadow-md shadow-emerald-500/25"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Continue Learning
                  <ChevronRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold border transition-colors ${
                    bookmarked
                      ? 'border-emerald-500 text-emerald-600 bg-emerald-50/50'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                  {bookmarked ? 'Bookmarked' : 'Bookmark'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 3. "What you'll learn" Section */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-700 flex items-center justify-center">
                <Lightbulb className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                What you&apos;ll learn
              </h2>
            </div>
            <div className="hidden sm:flex flex-col items-end transform -rotate-3 select-none">
              <span className="font-hand text-2xl font-bold text-emerald-600 tracking-wide">
                Build for real world
              </span>
              <div className="flex gap-1 pr-1">
                <span className="w-2 h-0.5 bg-emerald-400 rounded-full rotate-45 inline-block" />
                <span className="w-3 h-0.5 bg-emerald-500 rounded-full inline-block" />
                <span className="w-2 h-0.5 bg-emerald-400 rounded-full -rotate-45 inline-block" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.whatYoullLearn?.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex items-start gap-4 hover:border-emerald-200 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  {getWylIcon(item.icon)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Course Content Curriculum Accordion */}
        <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm mb-16">
          <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 font-serif">
                Course Content
              </h2>
            </div>
            <span className="text-xs sm:text-sm text-slate-500 font-medium">
              {course.modulesCount || course.modules.length} modules • {course.duration}
            </span>
          </div>

          {/* Module List */}
          <div className="space-y-3">
            {visibleModules.map((mod) => {
              const isExpanded = expandedModuleId === mod.id;
              return (
                <div
                  key={mod.id}
                  className="rounded-2xl border border-slate-200/70 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedModuleId(isExpanded ? null : mod.id)}
                    className="w-full px-5 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
                          mod.isCompleted
                            ? 'bg-emerald-500 text-white'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {mod.position}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">
                          {mod.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-1">
                          {mod.summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                      <span>{mod.duration}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-emerald-600' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {/* Expanded Lessons */}
                  {isExpanded && (
                    <div className="px-5 py-3 bg-white border-t border-slate-100 space-y-2">
                      {mod.lessons && mod.lessons.length > 0 ? (
                        mod.lessons.map((lesson) => {
                          const isLessonDone =
                            lesson.isCompleted ||
                            getLessonProgress(lesson.id || lesson.slug).isCompleted;
                          return (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-slate-50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                {isLessonDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                ) : (
                                  <Play className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                )}
                                <span className="text-xs font-medium text-slate-700">
                                  {lesson.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-[11px] text-slate-400 font-mono">
                                  {lesson.duration}
                                </span>
                                <Link
                                  to={`/courses/${course.slug}/lessons/${lesson.slug}`}
                                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                                >
                                  View
                                </Link>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-xs text-slate-400 italic py-1">
                          Additional lessons for this module will unlock as you advance.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Show All Modules Button */}
          {course.modules.length > 6 && (
            <div className="pt-6 text-center">
              <button
                type="button"
                onClick={() => setShowAllModules(!showAllModules)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
              >
                {showAllModules
                  ? 'Show fewer modules ∧'
                  : `Show all ${course.modules.length} modules ∨`}
              </button>
            </div>
          )}
        </section>
      </div>

      {/* 5. Sticky Bottom Progress & Resume Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur border-t border-slate-200/80 py-3 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-9 h-9 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div className="w-full sm:w-64">
              <ProgressBar value={course.progress || 35} showLabel={true} />
            </div>
          </div>

          <Link
            to={`/courses/${course.slug}/lessons/${activeLessonSlug}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors shadow-sm shadow-emerald-500/20"
          >
            Continue Learning
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

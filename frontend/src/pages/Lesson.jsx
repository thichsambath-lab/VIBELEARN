import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Clock,
  BarChart2,
  Users,
  Bookmark,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Code2,
  Lightbulb,
  ExternalLink,
  FileText,
  BookOpen,
  Check,
  Menu,
  X,
  HelpCircle,
} from 'lucide-react';
import { MOCK_COURSES } from '../services/mockData';
import ProgressBar from '../components/common/ProgressBar';

export default function Lesson() {
  const { slug, lessonSlug } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('content');
  const [bookmarked, setBookmarked] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Find course
  const course =
    MOCK_COURSES.find((c) => c.slug === slug) || MOCK_COURSES[0];

  // Find current lesson and module
  let currentModule = course.modules.find((m) =>
    m.lessons?.some((l) => l.slug === lessonSlug)
  );
  if (!currentModule) {
    currentModule = course.modules.find((m) => m.isActive) || course.modules[0];
  }

  const currentLesson =
    currentModule?.lessons?.find((l) => l.slug === lessonSlug) ||
    currentModule?.lessons?.[0] || {
      id: 'default-lesson',
      title: 'Data Fetching & Caching',
      slug: 'data-fetching-caching',
      duration: '1h 28m',
      youtubeVideoId: 'VBlF3WVQ62Q',
      badge: 'LESSON 5.1',
      subtitle:
        'Learn how Next.js handles data fetching and caching in both Server and Client Components.',
      overview:
        "In this lesson, you'll learn how Next.js handles data fetching and caching in both Server and Client Components. We'll explore different caching strategies and revalidation techniques to build fast and scalable applications.",
      takeaways: [
        'Understand the different data fetching methods in Next.js',
        'Learn how caching works in Server Components',
        'Implement revalidation and cache control',
        'Optimize performance with advanced caching strategies',
      ],
      proTip:
        'Use caching and revalidation wisely to ensure your app stays fast and data remains fresh without unnecessary requests.',
      resources: [
        {
          id: 'res-1',
          title: 'Next.js Data Fetching Documentation',
          subtitle: 'Official Next.js docs on data fetching methods.',
          link: 'https://nextjs.org/docs/app/building-your-application/data-fetching',
        },
        {
          id: 'res-2',
          title: 'Caching and Revalidation Guide',
          subtitle: 'Deep dive into Next.js caching strategies.',
          link: 'https://nextjs.org/docs/app/building-your-application/caching',
        },
      ],
    };

  // Find all lessons sequentially for Next/Prev navigation
  const allLessons = course.modules.flatMap((m) =>
    (m.lessons || []).map((l) => ({ ...l, moduleTitle: m.title }))
  );
  const currentLessonIndex = allLessons.findIndex(
    (l) => l.slug === currentLesson.slug
  );
  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex < allLessons.length - 1
      ? allLessons[currentLessonIndex + 1]
      : null;

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-left flex flex-col">
      {/* Mobile Top Bar with Sidebar Trigger */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl"
        >
          <Menu className="w-4 h-4" />
          Course Curriculum
        </button>
        <span className="text-xs font-medium text-slate-500 truncate max-w-[200px]">
          {course.title}
        </span>
      </div>

      <div className="flex-1 flex max-w-[1600px] w-full mx-auto relative">
        {/* ======================= LEFT CURRICULUM SIDEBAR ======================= */}
        {/* Mobile Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed lg:sticky top-0 lg:top-18 z-50 lg:z-10 h-screen lg:h-[calc(100vh-4.5rem)] w-80 sm:w-88 bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Back to Course Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <Link
              to={`/courses/${course.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to course
            </Link>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Course Status Card */}
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                {course.iconType === 'nextjs' ? 'N' : course.title.slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-900 truncate">
                  {course.title}
                </h4>
                <p className="text-xs text-slate-500">
                  {course.progress || 35}% complete
                </p>
              </div>
            </div>
            <ProgressBar value={course.progress || 35} />
          </div>

          {/* Module Selector Header */}
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>Module {currentModule?.position || 5} of {course.modules.length}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* Scrollable Curriculum List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {course.modules.map((mod) => {
              const isModActive = mod.id === currentModule?.id;
              return (
                <div
                  key={mod.id}
                  className={`rounded-xl border transition-all ${
                    isModActive
                      ? 'border-emerald-500/30 bg-emerald-50/20'
                      : 'border-slate-100 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                          mod.isCompleted
                            ? 'bg-emerald-500 text-white'
                            : isModActive
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {mod.isCompleted ? (
                          <Check className="w-3 h-3 stroke-[3]" />
                        ) : (
                          mod.position
                        )}
                      </span>
                      <div>
                        <p className="text-xs font-bold text-slate-900 leading-tight">
                          {mod.title}
                        </p>
                        <span className="text-[11px] text-slate-400">
                          {mod.duration}
                          {isModActive && (
                            <span className="ml-2 text-emerald-600 font-medium">
                              Now playing
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Lessons under Active Module */}
                  {isModActive && mod.lessons && mod.lessons.length > 0 && (
                    <div className="px-3 pb-3 pt-1 space-y-1 border-t border-emerald-100/40">
                      {mod.lessons.map((les) => {
                        const isCurrent = les.slug === currentLesson.slug;
                        return (
                          <button
                            key={les.id}
                            type="button"
                            onClick={() => {
                              navigate(`/courses/${course.slug}/lessons/${les.slug}`);
                              setSidebarOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                              isCurrent
                                ? 'bg-emerald-500 text-white font-semibold shadow-sm'
                                : 'text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  isCurrent ? 'bg-white' : 'bg-slate-300'
                                }`}
                              />
                              <span className="truncate">{les.title}</span>
                            </div>
                            <span
                              className={`text-[10px] font-mono ${
                                isCurrent ? 'text-emerald-100' : 'text-slate-400'
                              }`}
                            >
                              {les.duration}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Sidebar Help Widgets */}
          <div className="p-3 border-t border-slate-100 bg-slate-50/60 space-y-2">
            <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between cursor-pointer hover:border-emerald-300 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Session Code Lab</p>
                  <p className="text-[10px] text-slate-400">Practice with real code</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between cursor-pointer hover:border-emerald-300 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Need help?</p>
                  <p className="text-[10px] text-slate-400">Ask your instructor</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </aside>

        {/* ======================= MAIN CONTENT AREA ======================= */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-8 pb-32">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Link to="/" className="hover:text-slate-900 flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link to="/" className="hover:text-slate-900">
              All Courses
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link to={`/courses/${course.slug}`} className="hover:text-slate-900 truncate max-w-[150px]">
              {course.title}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-semibold truncate max-w-[200px]">
              {currentLesson.title}
            </span>
          </nav>

          {/* Lesson Header Title & Meta */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                {currentLesson.badge || 'LESSON 5.1'}
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsCompleted(!isCompleted)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                    isCompleted
                      ? 'bg-emerald-500 text-white border-emerald-500'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  {isCompleted ? 'Completed' : 'Mark as Complete'}
                </button>

                <button
                  type="button"
                  onClick={() => setBookmarked(!bookmarked)}
                  aria-label="Bookmark lesson"
                  className={`p-2 rounded-xl border transition-colors ${
                    bookmarked
                      ? 'border-emerald-500 text-emerald-600 bg-emerald-50'
                      : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif leading-tight">
              {currentLesson.title.split('&')[0]}{' '}
              {currentLesson.title.includes('&') && (
                <span className="text-emerald-500">
                  &amp; {currentLesson.title.split('&')[1]}
                </span>
              )}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
              {currentLesson.subtitle || currentLesson.overview}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium pt-1">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                {currentLesson.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <BarChart2 className="w-3.5 h-3.5 text-emerald-600" />
                {course.level}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                {course.students} students
              </span>
            </div>
          </div>

          {/* ======================= VIDEO PLAYER (YOUTUBE EMBED) ======================= */}
          <div className="w-full bg-black rounded-3xl overflow-hidden shadow-xl border border-slate-800 relative aspect-video">
            <iframe
              title={currentLesson.title}
              src={`https://www.youtube-nocookie.com/embed/${currentLesson.youtubeVideoId}?rel=0&autoplay=0&enablejsapi=1`}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* ======================= TABS & CONTENT ======================= */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            {/* Tabs */}
            <div className="flex items-center gap-8 border-b border-slate-100 pb-4 mb-6 text-sm font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('content')}
                className={`relative pb-4 transition-colors ${
                  activeTab === 'content'
                    ? 'text-slate-900 font-bold'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                Lesson Content
                {activeTab === 'content' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('notes')}
                className={`relative pb-4 transition-colors ${
                  activeTab === 'notes'
                    ? 'text-slate-900 font-bold'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                Notes
                {activeTab === 'notes' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
                )}
              </button>
            </div>

            {/* Tab Content: Lesson Overview & Details */}
            {activeTab === 'content' ? (
              <div className="space-y-8">
                {/* Overview */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900 font-serif">
                    Overview
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {currentLesson.overview}
                  </p>
                </div>

                {/* Session Code Lab Callout */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50/50 rounded-2xl border border-emerald-100 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">
                          Session Code Lab
                        </h4>
                        <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          Interactive
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Open the code lab below to practice what you&apos;ve learned with instant feedback.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert('Code lab sandbox initialized!')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors shadow-sm"
                  >
                    Open Lab
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* In this lesson you will */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900 font-serif">
                    In this lesson you will:
                  </h3>
                  <div className="space-y-2">
                    {currentLesson.takeaways?.map((point, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-600">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pro Tip */}
                {currentLesson.proTip && (
                  <div className="bg-emerald-50/50 rounded-2xl border border-emerald-200/70 p-5 flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                        Pro Tip
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {currentLesson.proTip}
                      </p>
                    </div>
                  </div>
                )}

                {/* Resources */}
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900 font-serif">
                    Resources
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentLesson.resources?.map((res) => (
                      <a
                        key={res.id}
                        href={res.link}
                        target="_blank"
                        rel="noreferrer"
                        className="p-4 rounded-2xl border border-slate-200/80 hover:border-emerald-300 hover:shadow-sm transition-all flex flex-col justify-between group"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                            {res.title}
                          </h5>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                            {res.subtitle}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Tab Content: Presentational Notes */
              <div className="prose prose-sm max-w-none text-slate-600">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-4">
                  <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    Lesson Reference Notes
                  </div>
                  <p className="text-xs leading-relaxed text-slate-600">
                    {currentLesson.notes ||
                      'Use this tab to review technical takeaways and formulas from this session. Notes are preserved locally for quick revision.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ======================= BOTTOM STICKY NAVIGATION BAR ======================= */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur border-t border-slate-200/80 py-3 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Previous Lesson */}
          {prevLesson ? (
            <Link
              to={`/courses/${course.slug}/lessons/${prevLesson.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous Lesson</span>
            </Link>
          ) : (
            <div className="w-24" />
          )}

          {/* Center Info */}
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Interactive Learning Mode</span>
          </div>

          {/* Next Lesson */}
          {nextLesson ? (
            <Link
              to={`/courses/${course.slug}/lessons/${nextLesson.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors shadow-sm shadow-emerald-500/20"
            >
              <span>Next Lesson</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              to={`/courses/${course.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
            >
              Finish Course
              <CheckCircle2 className="w-4 h-4" />
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
}

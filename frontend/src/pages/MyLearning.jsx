import { Link } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  Play,
  ArrowRight,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import {
  SignedIn,
  SignedOut,
  SignInButton,
} from '@clerk/clerk-react';
import { MOCK_COURSES } from '../services/mockData';
import ProgressBar from '../components/common/ProgressBar';

export default function MyLearning() {
  const inProgressCourses = MOCK_COURSES.filter((c) => (c.progress || 0) > 0);

  return (
    <div className="min-h-screen bg-[#FAFAFC] py-10 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Signed In View */}
        <SignedIn>
          <div className="space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-600 uppercase mb-2">
                <span className="w-4 h-0.5 bg-emerald-500 rounded-full" />
                LEARNER DASHBOARD
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-serif">
                My Learning
              </h1>
              <p className="text-sm text-slate-500 mt-2">
                Pick up right where you left off. Track your course progress and resume any session.
              </p>
            </div>

            {/* In Progress Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgressCourses.map((course) => {
                const activeLesson =
                  course.modules.find((m) => m.isActive)?.lessons[0]?.slug ||
                  course.modules[0]?.lessons[0]?.slug ||
                  'data-fetching-caching';

                return (
                  <div
                    key={course.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-lg">
                          {course.iconType === 'nextjs'
                            ? 'N'
                            : course.title.slice(0, 2)}
                        </div>
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                          {course.progress}% Completed
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-slate-900 hover:text-emerald-700 transition-colors">
                          <Link to={`/courses/${course.slug}`}>{course.title}</Link>
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                          {course.summary}
                        </p>
                      </div>

                      <div className="space-y-1.5 pt-2">
                        <ProgressBar value={course.progress} />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" />
                          {course.modulesCount || course.modules.length} modules
                        </span>
                      </div>

                      <Link
                        to={`/courses/${course.slug}/lessons/${activeLesson}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-emerald-500 hover:bg-emerald-600 px-3.5 py-2 rounded-xl transition-colors shadow-sm"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        Resume
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {inProgressCourses.length === 0 && (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  No courses started yet
                </h3>
                <p className="text-xs text-slate-500">
                  Browse our catalog and start your first free video course today!
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
                >
                  Explore Catalog
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </SignedIn>

        {/* Signed Out Fallback View */}
        <SignedOut>
          <div className="max-w-md mx-auto my-16 bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-sm text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <Lock className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 font-serif">
                Sign in to track progress
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Your learning dashboard stores lesson completion, resume positions, and personalized courses. Please authenticate with Clerk to view.
              </p>
            </div>

            <SignInButton mode="modal">
              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-all shadow-md shadow-emerald-500/25"
              >
                Sign In with Clerk
                <ArrowRight className="w-4 h-4" />
              </button>
            </SignInButton>

            <div className="pt-2 text-xs text-slate-400 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Free access • No credit card required
            </div>
          </div>
        </SignedOut>
      </div>
    </div>
  );
}

import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  Brain,
  Zap,
  GitBranch,
  Users,
  Play,
  CheckCircle2,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { MOCK_COURSES, MOCK_SEARCH_RESULTS } from '../services/mockData';
import { fetchCourses } from '../services/api';
import CourseCard from '../components/course/CourseCard';
import Badge from '../components/common/Badge';

export default function Catalog() {
  const [courses, setCourses] = useState(MOCK_COURSES);
  const [, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Most Relevant');

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setIsLoading(true);
      try {
        const data = await fetchCourses();
        if (isMounted && data && data.length > 0) {
          setCourses(data);
        }
      } catch (err) {
        console.warn('Using fallback courses in Catalog:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return courses;
    return courses.filter(
      (c) =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, courses]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return MOCK_SEARCH_RESULTS.filter(
      (r) =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.courseTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const scrollToCourses = () => {
    document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC]">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-emerald-50/50 via-white to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/80 text-emerald-800 tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                INTELLIGENT LEARNING
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950 font-serif leading-[1.15]">
                Learn in a <span className="text-emerald-500 underline decoration-emerald-300 decoration-wavy decoration-1 underline-offset-4">smarter</span>, <span className="text-emerald-500">faster</span> way.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Vibe Learn helps you build real skills with structured courses, hands-on practice and personalized learning paths.
              </p>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={scrollToCourses}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-all shadow-md shadow-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/30"
                >
                  Explore Courses
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Hero Illustration */}
            <div className="lg:col-span-6 flex justify-center relative">
              <div className="w-full max-w-lg aspect-[4/3] rounded-3xl bg-gradient-to-tr from-emerald-200/40 via-teal-100/30 to-emerald-50/60 p-6 flex items-center justify-center relative shadow-xl shadow-emerald-500/5 border border-emerald-100/60">
                {/* Decorative glowing backdrops */}
                <div className="absolute top-4 right-8 w-24 h-24 rounded-full bg-emerald-400/20 blur-2xl" />
                <div className="absolute bottom-4 left-6 w-32 h-32 rounded-full bg-teal-300/20 blur-3xl" />

                {/* Illustrated Laptop Visual */}
                <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden transform hover:-translate-y-1 transition-transform">
                  <div className="h-7 bg-slate-100 border-b border-slate-200 px-3 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="p-6 bg-slate-950 text-white space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-emerald-400">~/vibelearn/app.js</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    <div className="space-y-1.5 font-mono text-xs text-slate-300">
                      <p><span className="text-purple-400">const</span> course = <span className="text-yellow-300">&quot;Next.js for Production&quot;</span>;</p>
                      <p><span className="text-purple-400">await</span> learner.<span className="text-blue-400">watchVideo</span>(&#123; <span className="text-emerald-400">progress</span>: <span className="text-emerald-400">100%</span> &#125;);</p>
                      <p><span className="text-emerald-400">{'// Master real skills effortlessly'}</span></p>
                    </div>
                    <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                          <Play className="w-3 h-3 fill-current" />
                        </div>
                        <span className="text-xs text-slate-400">Interactive Curriculum</span>
                      </div>
                      <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Badges */}
                <div className="absolute -top-3 right-6 bg-white rounded-xl shadow-lg border border-slate-100 p-3 flex items-center gap-2.5 animate-bounce">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
                    <Play className="w-4 h-4 fill-current" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-800">YouTube Embed</p>
                    <p className="text-[10px] text-slate-500">Instant resume</p>
                  </div>
                </div>

                <div className="absolute -bottom-4 left-4 bg-white rounded-xl shadow-lg border border-slate-100 px-4 py-2.5 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="text-xs font-semibold text-slate-800">100% Free Video Courses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Search & Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses, topics, or lessons (e.g. data fetching)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 placeholder-slate-400"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none pl-4 pr-9 py-2.5 text-sm font-medium rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              >
                <option value="Most Relevant">Most Relevant</option>
                <option value="Newest">Newest</option>
                <option value="Duration">Duration</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-medium text-slate-500 hover:text-slate-800 px-2 py-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. Search Results Mode (if searching) */}
      {searchQuery.trim() ? (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-left">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold tracking-wider text-emerald-600 uppercase">
                Search Results
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Results for &ldquo;{searchQuery}&rdquo;
              </h2>
              <p className="text-sm text-slate-500">
                Found {searchResults.length || filteredCourses.length} results
              </p>
            </div>
          </div>

          {/* Results List */}
          <div className="space-y-4 mb-10">
            {searchResults.length > 0 ? (
              searchResults.map((res) => (
                <div
                  key={res.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    {res.thumbnail ? (
                      <div className="relative w-28 h-18 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0">
                        <img
                          src={res.thumbnail}
                          alt={res.title}
                          className="w-full h-full object-cover opacity-80"
                        />
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white">
                          {res.duration}
                        </span>
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 font-bold">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-slate-500">
                          {res.courseTitle}
                        </span>
                        <Badge variant={res.type === 'video' ? 'video' : 'lesson'}>
                          {res.type.toUpperCase()}
                        </Badge>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mb-1">
                        {res.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-1 max-w-xl">
                        {res.description}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/courses/${res.courseSlug}/lessons/${res.lessonSlug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors whitespace-nowrap"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    {res.actionText}
                  </Link>
                </div>
              ))
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </div>
        </section>
      ) : (
        /* 4. Popular Learning Paths Section (Default) */
        <section id="courses-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-600 uppercase mb-2">
                <span className="w-4 h-0.5 bg-emerald-500 rounded-full" />
                OUR COURSES
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-serif">
                Popular Learning Paths
              </h2>
              <p className="text-sm text-slate-500 mt-2 max-w-lg">
                Choose from our curated courses and start your journey towards new skills and better opportunities.
              </p>
            </div>

            {/* Hand-drawn accent label */}
            <div className="hidden md:flex flex-col items-end transform -rotate-3 select-none">
              <span className="font-hand text-3xl font-bold text-emerald-600 tracking-wide">
                Learn Grow Achieve
              </span>
              <div className="flex gap-1 pr-1">
                <span className="w-2 h-0.5 bg-emerald-400 rounded-full rotate-45 inline-block" />
                <span className="w-3 h-0.5 bg-emerald-500 rounded-full inline-block" />
                <span className="w-2 h-0.5 bg-emerald-400 rounded-full -rotate-45 inline-block" />
              </div>
            </div>
          </div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_COURSES.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      )}

      {/* 5. "Why Vibe Learn?" Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-left">
        <div className="bg-emerald-50/40 rounded-3xl border border-emerald-100/80 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-semibold tracking-wider text-emerald-600 uppercase">
                WHY VIBE LEARN?
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif leading-snug">
                Build the skills that matter.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                More than just courses — Vibe Learn gives you the tools, support, and structure to grow your career and achieve your goals.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center">
                  <Brain className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Expert-Led Content</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Learn from industry professionals with real-world production experience.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Hands-On Practice</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Build real projects and apply what you learn immediately.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center">
                  <GitBranch className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Structured Learning Paths</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Follow clear step-by-step paths from beginner to advanced.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Lifetime Access</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Learn at your own pace, anytime, anywhere with free access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

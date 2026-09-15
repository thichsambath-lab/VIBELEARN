import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, Clock, BookOpen } from 'lucide-react';
import Badge from '../common/Badge';

export default function CourseCard({ course }) {
  const renderIcon = () => {
    if (course.iconType === 'nextjs') {
      return (
        <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center font-bold text-xl shadow-sm">
          N
        </div>
      );
    }
    if (course.iconType === 'docker') {
      return (
        <div className="w-12 h-12 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold text-xl shadow-sm">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.119a.186.186 0 00.186-.186V9.006a.186.186 0 00-.186-.186h-2.119a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.929 0h2.12a.185.185 0 00.184-.186V9.006a.185.185 0 00-.184-.186H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.186.186 0 00.185-.186V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 00.185-.186V9.006a.185.185 0 00-.185-.186H2.208a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185M23.77 12.01c-.347-.394-.962-.516-1.57-.406-.312.056-.62.176-.902.355-.26-.798-.824-1.378-1.528-1.58-.934-.268-1.956.096-2.583.844-.457-.145-.944-.22-1.448-.22H1.93a1.93 1.93 0 00-1.93 1.93c0 3.327 1.488 6.438 4.084 8.535 2.502 2.022 5.795 3.097 9.27 3.097 5.794 0 10.59-4.223 10.646-9.65.006-.52-.06-1.034-.23-1.536" />
          </svg>
        </div>
      );
    }
    if (course.iconType === 'typescript') {
      return (
        <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
          TS
        </div>
      );
    }
    return (
      <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
        {course.title.slice(0, 2).toUpperCase()}
      </div>
    );
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Top row: Icon and Arrow Button */}
      <div className="flex items-center justify-between mb-4">
        {renderIcon()}
        <Link
          to={`/courses/${course.slug}`}
          aria-label={`View ${course.title}`}
          className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Badge */}
      <div className="mb-2">
        <Badge variant={course.tagType || 'popular'}>
          {course.badge || 'Popular'}
        </Badge>
      </div>

      {/* Course Title & Summary */}
      <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2">
        <Link to={`/courses/${course.slug}`}>{course.title}</Link>
      </h3>
      <p className="text-sm text-slate-500 line-clamp-2 mb-6 flex-1">
        {course.summary}
      </p>

      {/* Bottom Metadata */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
        <span className="flex items-center gap-1.5">
          <BarChart2 className="w-3.5 h-3.5 text-slate-400" />
          {course.level}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          {course.duration}
        </span>
        <span className="flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-slate-400" />
          {course.modulesCount || course.modules?.length || 0} modules
        </span>
      </div>

      {/* Accent Bottom Line */}
      <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

import { Play } from 'lucide-react';

export default function Badge({ variant = 'default', children, className = '' }) {
  if (variant === 'video') {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500 text-white tracking-wide uppercase ${className}`}
      >
        <Play className="w-3 h-3 fill-current" />
        {children || 'VIDEO'}
      </span>
    );
  }

  if (variant === 'lesson') {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 tracking-wide uppercase ${className}`}
      >
        {children || 'LESSON'}
      </span>
    );
  }

  if (variant === 'popular') {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 ${className}`}
      >
        Popular
      </span>
    );
  }

  if (variant === 'trending') {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 ${className}`}
      >
        Trending
      </span>
    );
  }

  if (variant === 'beginner') {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 ${className}`}
      >
        Beginner
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 ${className}`}
    >
      {children}
    </span>
  );
}

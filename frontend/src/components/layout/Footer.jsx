export default function Footer() {
  return (
    <footer className="w-full mt-auto border-t border-slate-100 bg-gradient-to-b from-white to-emerald-50/40 py-12 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center shadow-sm">
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Vibe <span className="text-emerald-600">Learn</span>
          </span>
        </div>
        <p className="text-xs text-slate-500 font-medium">
          Better Skills. A Brighter Future.
        </p>
      </div>
    </footer>
  );
}

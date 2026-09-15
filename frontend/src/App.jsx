export default function App() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950 text-slate-100">
      <div className="max-w-md w-full rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl backdrop-blur">
        <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
          Vibelearn
        </h1>
        <p className="text-sm text-slate-400 mb-4">
          Foundation initialized successfully with Vite, React, and Tailwind CSS.
        </p>
        <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
          Phase 1 Ready
        </span>
      </div>
    </main>
  );
}

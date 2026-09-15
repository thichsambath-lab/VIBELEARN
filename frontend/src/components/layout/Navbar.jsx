import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Menu, X } from 'lucide-react';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isCoursesActive =
    location.pathname === '/' ||
    location.pathname.startsWith('/courses');
  const isMyLearningActive = location.pathname === '/my-learning';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur border-b border-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Vibe <span className="text-emerald-600">Learn</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            to="/"
            className={`relative py-5 transition-colors ${
              isCoursesActive
                ? 'text-slate-900 font-semibold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Courses
            {isCoursesActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
            )}
          </Link>
          <Link
            to="/my-learning"
            className={`relative py-5 transition-colors ${
              isMyLearningActive
                ? 'text-slate-900 font-semibold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            My Learning
            {isMyLearningActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
            )}
          </Link>
        </nav>

        {/* Right Actions: Notifications & Clerk Auth */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Notifications"
            className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-5 h-5" />
          </button>

          {/* Clerk Auth Components with Fallback */}
          <div className="flex items-center">
            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: 'w-9 h-9 ring-2 ring-emerald-500/30',
                  },
                }}
              />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl text-white bg-emerald-500 hover:bg-emerald-600 transition-colors shadow-sm shadow-emerald-500/20"
                >
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-2 pb-4 space-y-2">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-lg text-base font-medium ${
              isCoursesActive
                ? 'bg-emerald-50 text-emerald-700'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Courses
          </Link>
          <Link
            to="/my-learning"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-lg text-base font-medium ${
              isMyLearningActive
                ? 'bg-emerald-50 text-emerald-700'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            My Learning
          </Link>
        </div>
      )}
    </header>
  );
}

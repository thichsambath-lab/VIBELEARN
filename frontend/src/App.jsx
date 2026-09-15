import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Catalog from './pages/Catalog';
import CourseDetail from './pages/CourseDetail';
import Lesson from './pages/Lesson';
import MyLearning from './pages/MyLearning';

// Fallback dummy key to prevent Clerk crash if user hasn't configured .env yet
const clerkPublishableKey =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY?.startsWith('pk_') &&
  !import.meta.env.VITE_CLERK_PUBLISHABLE_KEY.includes('example')
    ? import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
    : 'pk_test_ZXhhbXBsZS5jbGVyay5hY2NvdW50cy5kZXYk';

function AppLayout() {
  const location = useLocation();
  const isLessonPage = location.pathname.includes('/lessons/');

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFC] text-slate-900 font-sans">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/courses" element={<Catalog />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/courses/:slug/lessons/:lessonSlug" element={<Lesson />} />
          <Route path="/my-learning" element={<MyLearning />} />
        </Routes>
      </main>
      {/* Do not render standard footer on Lesson page to keep view clean for sticky bottom bar */}
      {!isLessonPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <Router>
        <AppLayout />
      </Router>
    </ClerkProvider>
  );
}

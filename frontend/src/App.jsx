import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { InstallBanner } from '@/components/notifications/InstallBanner';
import { Spinner } from '@/components/ui';
import { useThemeInitializer } from '@/store/useThemeStore';
import { useAuthStore } from '@/store/useAuthStore';

const DashboardPage   = lazy(() => import('@/pages/DashboardPage'));
const AssignmentsPage = lazy(() => import('@/pages/AssignmentsPage'));
const CameraPage      = lazy(() => import('@/pages/CameraPage'));
const ProfilePage     = lazy(() => import('@/pages/ProfilePage'));
const SigninPage      = lazy(() => import('@/pages/SigninPage'));
const SignupPage      = lazy(() => import('@/pages/SignupPage'));
const NotFoundPage    = lazy(() => import('@/pages/NotFoundPage'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60dvh]">
      <Spinner size="lg" />
    </div>
  );
}

export default function App() {
  // Initialize theme from localStorage on app start
  useThemeInitializer();

  // Initialize demo user on first load
  useEffect(() => {
    const users = localStorage.getItem('campus-sync-users');
    if (!users) {
      const demoUser = {
        id: '1',
        email: 'demo@university.edu',
        password: 'demo123',
        name: 'Demo Student',
        regNumber: 'DEM001',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo',
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('campus-sync-users', JSON.stringify([demoUser]));
    }
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Auth Routes */}
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected App Routes */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/"            element={<DashboardPage   />} />
              <Route path="/assignments" element={<AssignmentsPage />} />
              <Route path="/camera"      element={<CameraPage      />} />
              <Route path="/profile"     element={<ProfilePage     />} />
            </Route>

            {/* 404 - Must be last */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <InstallBanner />
        <Toaster
          position="top-center"
          gutter={8}
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: '12px',
              background:   '#0f172a',
              color:        '#f8fafc',
              fontSize:     '14px',
              fontWeight:   '500',
              padding:      '12px 16px',
              maxWidth:     '340px',
            },
            success: { iconTheme: { primary: '#22c55e', secondary: '#fff' } },
            error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
          }}
        />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

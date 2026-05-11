import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthProvider, useAuth } from '../features/auth/AuthContext';
import { WidgetsProvider } from '../features/dashboard/WidgetsContext';
import { LoginPage } from '../features/auth/LoginPage';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { DashboardPage } from '../features/dashboard/DashboardPage';
import { ReportDesignerPage } from '../pages/ReportDesigner';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WidgetsProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/report-designer" element={<ReportDesignerPage />} />
            </Route>
          </Routes>
        </WidgetsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

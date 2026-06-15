import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore, UserRole } from '../../store/authStore';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { session, profile, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    // If profile hasn't loaded yet, show loading
    if (!profile) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      );
    }
    
    if (!allowedRoles.includes(profile.role)) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}

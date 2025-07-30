import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: string[];
}

/**
 * A wrapper component that protects routes requiring authentication
 * Redirects to login page if user is not authenticated
 * Can also check for specific roles if provided
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRoles = [] 
}) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="spinner"></div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are required, check if user has the required role
  if (requiredRoles.length > 0) {
    // This is a simplified example. In a real app, you would check the user's roles
    // against the required roles. Here we're assuming the user object has a 'role' property.
    const userRole = user?.user_metadata?.role || 'user';
    
    if (!requiredRoles.includes(userRole)) {
      // User doesn't have the required role, redirect to unauthorized page or home
      return <Navigate to="/" replace />;
    }
  }

  // User is authenticated and has the required role (if any), render the children
  return <>{children}</>;
};

export default ProtectedRoute;
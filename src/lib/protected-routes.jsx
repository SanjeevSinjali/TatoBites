import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './auth.jsx';
import { paths } from '../config/paths.js';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return (
      <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
    );
  }

  return children;
};


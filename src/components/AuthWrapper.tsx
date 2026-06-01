import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Login } from './Login';
import DashboardLayout from './DashboardLayout';

export function AuthWrapper() {
  const { user } = useAuth();
  
  if (!user) {
    return <Login />;
  }

  return <DashboardLayout />;
}

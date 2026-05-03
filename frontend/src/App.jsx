import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ClientDashboard from './pages/ClientDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AccountantDashboard from './pages/AccountantDashboard';
import GSTSearchPage from './pages/GSTSearchPage';
import ProtectedRoute from './components/ProtectedRoute';

const ThemeManager = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (location.pathname === '/') {
      document.body.classList.add('landing');
    } else {
      document.body.classList.remove('landing');
    }
  }, [location]);
  
  return null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ThemeManager />
        <Toaster 
          position="top-right" 
          toastOptions={{
            style: {
              background: '#FFFFFF',
              color: '#1F2937',
              borderRadius: '12px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            },
            success: {
              iconTheme: { primary: '#16A34A', secondary: '#FFFFFF' },
              duration: 4000,
            },
            error: {
              iconTheme: { primary: '#DC2626', secondary: '#FFFFFF' },
              duration: 5000,
            },
          }} 
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/gst-search" element={<GSTSearchPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={['client']}>
              <ClientDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/accountant" element={
            <ProtectedRoute allowedRoles={['accountant', 'admin']}>
              <AccountantDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AppViewer from './pages/AppViewer';

const PROJECTS = [
  {
    id: 'denoise',
    title: 'Noise Denoiser',
    description: 'AI-powered audio noise classification and denoising pipeline',
    url: 'http://localhost:3001',
    color: '#6366f1',
  },
  {
    id: 'sat',
    title: 'Satellite error correction',
    description: 'AI powered satellite error correction',
    url: 'http://localhost:3002',
    color: '#10b981',
  },
];

function AppContent() {
  const location = useLocation();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    setIsInitialLoad(false);
  }, []);

  // Redirect to dashboard on initial load if not already there
  if (isInitialLoad && location.pathname !== '/dashboard') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard projects={PROJECTS} />} />
      <Route path="/app/:id" element={<AppViewer projects={PROJECTS} />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

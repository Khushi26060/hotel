import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import QRCodesPage from './pages/QRCodesPage';
import FeedbackPage from './pages/FeedbackPage';
import ZonesPage from './pages/ZonesPage';
import TeamPage from './pages/TeamPage';
import SettingsPage from './pages/SettingsPage';
import FeedbackFormPage from './pages/FeedbackFormPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Feedback Form Route */}
        <Route path="/feedback" element={<FeedbackFormPage />} />
        
        {/* Protected Dashboard Routes */}
        <Route path="/" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
        
        <Route path="/qr-codes" element={
          <Layout>
            <QRCodesPage />
          </Layout>
        } />
        
        <Route path="/feedback-dashboard" element={
          <Layout>
            <FeedbackPage />
          </Layout>
        } />
        
        <Route path="/zones" element={
          <Layout>
            <ZonesPage />
          </Layout>
        } />
        
        <Route path="/team" element={
          <Layout>
            <TeamPage />
          </Layout>
        } />
        
        <Route path="/settings" element={
          <Layout>
            <SettingsPage />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
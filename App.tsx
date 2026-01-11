
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Drivers from './components/Drivers';
import Shifts from './components/Shifts';
import AuditLogs from './components/AuditLogs';
import AIAssistant from './components/AIAssistant';
import Login from './components/Login';
import { getAuthToken } from './services/api';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = getAuthToken();
    setIsAuthenticated(!!token);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'shifts':
        return <Shifts />;
      case 'drivers':
        return <Drivers />;
      case 'audit':
        return <AuditLogs />;
      case 'fleet':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-300">
            <span className="text-8xl mb-6">🚛</span>
            <h3 className="text-2xl font-bold text-[#1B254B]">Управление Автопарком</h3>
            <p className="text-slate-400 mt-2">Функционал в разработке</p>
          </div>
        );
      case 'objects':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-300">
            <span className="text-8xl mb-6">🏗️</span>
            <h3 className="text-2xl font-bold text-[#1B254B]">Объекты Работ</h3>
            <p className="text-slate-400 mt-2">Функционал в разработке</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  if (isAuthenticated === null) return null;
  if (!isAuthenticated) return <Login />;

  return (
    <div className="antialiased selection:bg-indigo-100 selection:text-indigo-900">
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderContent()}
      </Layout>
      <AIAssistant />
    </div>
  );
};

export default App;

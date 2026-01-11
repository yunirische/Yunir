
import React from 'react';
import { clearAuthToken } from '../services/api';

interface LayoutProps {
  // Fixed: React.Node is not a valid type in React, changed to React.ReactNode
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'shifts', label: 'Смены', icon: '⏱️' },
    { id: 'drivers', label: 'Водители', icon: '👤' },
    { id: 'fleet', label: 'Автопарк', icon: '🚛' },
    { id: 'objects', label: 'Объекты', icon: '🏗️' },
    { id: 'audit', label: 'Аудит', icon: '📜' },
  ];

  const handleLogout = () => {
    if (confirm('Вы уверены, что хотите выйти?')) {
      clearAuthToken();
      window.location.reload();
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F4F7FE]">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-100 hidden lg:flex flex-col sticky top-0 h-screen shadow-sm z-20">
        <div className="p-8">
          <h1 className="text-2xl font-black text-[#1B254B] flex items-center gap-2">
            <span className="text-indigo-600">LOGI</span>SHIFT
          </h1>
          <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-[0.2em] font-bold">KONTROLSMEN v2.0</p>
        </div>
        
        <nav className="flex-1 px-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                activeTab === item.id
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 font-bold'
                  : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50/50'
              }`}
            >
              <span className={`text-xl transition-transform group-hover:scale-110 ${activeTab === item.id ? 'scale-110' : ''}`}>{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6">
          <div className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl text-white relative overflow-hidden shadow-lg">
            <div className="relative z-10">
              <p className="text-xs font-medium opacity-80">AI Status</p>
              <p className="text-sm font-bold flex items-center gap-2 mt-1">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-sm shadow-emerald-400"></span>
                Gemini Ready
              </p>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-20 text-6xl rotate-12">🤖</div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full mt-6 py-4 px-4 rounded-2xl text-xs font-bold text-red-400 hover:bg-red-50 hover:text-red-600 transition-all flex items-center justify-center gap-2"
          >
            <span>🚪</span> Выйти из системы
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-24 bg-white/70 backdrop-blur-xl border-b border-slate-50 flex items-center justify-between px-10 sticky top-0 z-10">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">LogiShift / Administration</p>
            <h2 className="text-2xl font-black text-[#1B254B] capitalize">{activeTab}</h2>
          </div>
          
          <div className="flex items-center gap-6 bg-white rounded-2xl px-6 py-3 shadow-sm border border-slate-50">
            <div className="relative">
              <button className="text-xl hover:scale-110 transition-transform">🔔</button>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="h-8 w-[1px] bg-slate-100"></div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-[#1B254B]">Диспетчер</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Main Hub</p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-100 transform hover:rotate-6 transition-transform cursor-pointer">
                AD
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;

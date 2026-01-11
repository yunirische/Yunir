
import React, { useState, useEffect } from 'react';
import { Shift, ShiftStatus } from '../types';
import { API_ENDPOINTS } from '../constants';
import { apiRequest } from '../services/api';

const Dashboard: React.FC = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const data = await apiRequest(API_ENDPOINTS.SHIFTS);
        setShifts(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err: any) {
        console.error("Dashboard fetch error:", err);
        setError(err.message || "Ошибка загрузки данных");
      } finally {
        setLoading(false);
      }
    };
    fetchShifts();
  }, []);

  const activeCount = shifts.filter(s => s.status === ShiftStatus.ACTIVE).length;
  const pendingCount = shifts.filter(s => s.status === ShiftStatus.PENDING_INVOICE).length;

  const kpis = [
    { label: 'Активные смены', value: activeCount, icon: '⏱️', color: 'indigo' },
    { label: 'Всего за сегодня', value: shifts.length, icon: '📊', color: 'blue' },
    { label: 'Ожидают накладные', value: pendingCount, icon: '📄', color: 'amber' },
    { label: 'Статус сервера', value: error ? 'Ошибка' : 'Online', icon: '🌐', color: error ? 'red' : 'emerald' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {error && (
        <div className="bg-red-50 border border-red-100 p-4 rounded-2xl text-red-600 text-sm font-medium flex items-center gap-3">
          <span>⚠️</span> {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-[24px] border border-slate-50 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
            <div className={`w-12 h-12 rounded-2xl bg-${kpi.color}-50 flex items-center justify-center text-xl mb-4`}>
              {kpi.icon}
            </div>
            <h4 className="text-2xl font-bold text-[#1B254B]">{kpi.value}</h4>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[30px] border border-slate-50 shadow-sm">
          <h3 className="text-lg font-bold text-[#1B254B] mb-6">Динамика работ</h3>
          <div className="h-64 flex flex-col items-center justify-center text-slate-300">
             <div className="text-4xl mb-4 opacity-20">📈</div>
             <p className="text-sm font-medium italic">Аналитические данные загружаются в реальном времени...</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[30px] border border-slate-50 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#1B254B]">Последние смены</h3>
            <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded-lg font-bold uppercase">Live</span>
          </div>
          <div className="space-y-6">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-12 bg-slate-50 rounded-xl"></div>
                <div className="h-12 bg-slate-50 rounded-xl"></div>
              </div>
            ) : shifts.length === 0 ? (
              <div className="text-center py-10 text-slate-300 text-sm italic">Активных смен пока нет</div>
            ) : (
              shifts.slice(0, 5).map(s => (
                <div key={s.id} className="flex items-center gap-3 group">
                  <div className={`w-2 h-10 rounded-full transition-all group-hover:h-12 ${s.status === ShiftStatus.ACTIVE ? 'bg-indigo-500 shadow-sm shadow-indigo-200' : 'bg-emerald-500 shadow-sm shadow-emerald-200'}`}></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-[#1B254B] truncate">{s.driver_name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase truncate">{s.work_object}</p>
                  </div>
                  <span className="text-[10px] text-slate-300 font-bold whitespace-nowrap">
                    {new Date(s.started_at).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

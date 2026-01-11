
import React, { useState } from 'react';
import { setAuthToken } from '../services/api';

const Login: React.FC = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim().length < 5) {
      setError('Введите корректный API токен');
      return;
    }
    setAuthToken(token.trim());
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#F4F7FE] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-10 border border-slate-50">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-indigo-600 rounded-[24px] flex items-center justify-center text-white text-3xl font-black mx-auto mb-6 shadow-xl shadow-indigo-200">
            LS
          </div>
          <h1 className="text-3xl font-black text-[#1B254B]">LogiShift</h1>
          <p className="text-slate-400 mt-2 font-medium">Введите токен доступа для входа в систему</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-[#1B254B] mb-2 ml-1">Access Token</label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Bearer Token"
              className="w-full bg-[#F4F7FE] border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-indigo-600 transition-all outline-none"
            />
          </div>

          {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all transform active:scale-[0.98]"
          >
            Войти в Dashboard
          </button>
        </form>

        <p className="mt-10 text-center text-xs text-slate-400 font-medium">
          Проблема с доступом? Свяжитесь с администратором KONTROLSMEN.
        </p>
      </div>
    </div>
  );
};

export default Login;

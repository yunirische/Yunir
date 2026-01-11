
import React, { useState, useRef, useEffect } from 'react';
import { getLogisticsInsights } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Привет! Я AI-ассистент KONTROLSMEN. Могу помочь с анализом смен или поиском аномалий в логах. О чем рассказать?', timestamp: new Date() }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Здесь можно добавить контекст из текущего состояния приложения, если нужно
      const insight = await getLogisticsInsights(input);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: insight || 'К сожалению, не удалось получить внятный ответ от модуля аналитики.', 
        timestamp: new Date() 
      }]);
    } catch (error) {
      console.error("Gemini AI Error:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Произошла техническая ошибка при связи с Gemini. Проверьте API ключ и сетевое соединение.', 
        timestamp: new Date() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[380px] h-[550px] bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-6 bg-[#4318FF] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-inner">🤖</div>
              <div>
                <p className="text-sm font-bold">KONTROLSMEN AI</p>
                <p className="text-[10px] text-indigo-100 uppercase tracking-[0.2em] font-black">Intelligence</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F4F7FE]/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-[20px] text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-[#4318FF] text-white rounded-tr-none shadow-lg shadow-indigo-100' 
                    : 'bg-white text-[#1B254B] shadow-sm border border-slate-50 rounded-tl-none font-medium'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-[20px] shadow-sm border border-slate-50 rounded-tl-none flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-50 flex gap-2 items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Спроси об эффективности смен..."
              className="flex-1 bg-[#F4F7FE] border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-[#4318FF] placeholder:text-slate-400 font-medium"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="w-12 h-12 bg-[#4318FF] text-white rounded-2xl hover:bg-[#3311CC] disabled:opacity-30 disabled:grayscale transition-all flex items-center justify-center shadow-lg shadow-indigo-100"
            >
              <span className="text-xl">➔</span>
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-[24px] shadow-2xl flex items-center justify-center text-3xl transition-all duration-500 hover:scale-105 ${
          isOpen ? 'bg-white text-[#1B254B] rotate-90' : 'bg-[#4318FF] text-white'
        }`}
      >
        {isOpen ? '✕' : '🤖'}
      </button>
    </div>
  );
};

export default AIAssistant;

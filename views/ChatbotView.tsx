
import React, { useState, useRef, useEffect } from 'react';
import { generateChatResponse } from '../geminiService';
import { ChatMessage } from '../types';

const ChatbotView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am your AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const history = messages.concat({ role: 'user', text: userMsg }).map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      const response = await generateChatResponse(history);
      setMessages(prev => [...prev, { role: 'model', text: response || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Error: Could not reach the AI service." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-background-dark p-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="size-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-2xl">smart_toy</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-secondary dark:text-white">AI Assistant</h1>
          <p className="text-slate-500 text-sm">Powered by AI</p>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto mb-6 flex flex-col gap-4 p-4 rounded-2xl bg-white dark:bg-surface-dark shadow-soft"
      >
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${
              m.role === 'user' 
                ? 'bg-primary text-white rounded-tr-none' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1">
              <span className="animate-bounce text-primary text-xs">•</span>
              <span className="animate-bounce delay-75 text-primary text-xs">•</span>
              <span className="animate-bounce delay-150 text-primary text-xs">•</span>
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask me anything..."
          className="w-full h-14 pl-6 pr-16 bg-white dark:bg-surface-dark border-none rounded-full shadow-lg focus:ring-2 focus:ring-primary/50 text-slate-700 dark:text-slate-200"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="absolute right-2 top-2 size-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-all disabled:opacity-50"
        >
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </div>
  );
};

export default ChatbotView;

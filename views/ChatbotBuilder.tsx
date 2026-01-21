
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const ChatbotBuilder: React.FC = () => {
  const [config, setConfig] = useState({
    name: 'Customer Bot',
    description: 'A helpful bot for our main website.',
    personality: 'Professional',
    instructions: 'You are a helpful customer service representative. You answer questions about our services and help users find the right project for them.'
  });

  const [previewMessages, setPreviewMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'Hello! How can I help you today?' }
  ]);
  const [previewInput, setPreviewInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [previewMessages]);

  const handlePreviewSend = async () => {
    if (!previewInput.trim() || isTyping) return;

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      setPreviewMessages(prev => [...prev, { role: 'user', text: previewInput.trim() }, { role: 'model', text: "Error: No API Key found in environment. Please configure your key to use live preview." }]);
      setPreviewInput('');
      return;
    }

    const userText = previewInput.trim();
    setPreviewInput('');
    setPreviewMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...previewMessages, { role: 'user', text: userText }].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: `Personality: ${config.personality}. ${config.instructions}`,
        }
      });

      setPreviewMessages(prev => [...prev, { role: 'model', text: response.text || "I'm having trouble responding right now." }]);
    } catch (error) {
      setPreviewMessages(prev => [...prev, { role: 'model', text: "Connection error. Please check your API key settings." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-background-dark overflow-hidden">
      <header className="p-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-secondary dark:text-white tracking-tight">Chatbot Builder</h1>
          <p className="text-slate-500 dark:text-slate-400">Design and deploy custom AI agents for your clients.</p>
        </div>
        <div className="flex gap-4">
          <button className="h-11 px-6 rounded-full border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all">
            Save Draft
          </button>
          <button className="h-11 px-6 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary-dark shadow-lg shadow-primary/30 transition-all">
            Publish Bot
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane: Config */}
        <div className="w-1/2 overflow-y-auto p-8 border-r border-slate-200 dark:border-slate-800 flex flex-col gap-8">
          <section className="flex flex-col gap-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">info</span>
              General Information
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase text-slate-400">Bot Name</label>
                <input 
                  type="text" 
                  value={config.name}
                  onChange={(e) => setConfig({...config, name: e.target.value})}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-slate-700 dark:text-slate-200"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase text-slate-400">Description</label>
                <input 
                  type="text" 
                  value={config.description}
                  onChange={(e) => setConfig({...config, description: e.target.value})}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-slate-700 dark:text-slate-200"
                />
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">psychology</span>
              Personality & Behavior
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {['Friendly', 'Professional', 'Tech-Savvy'].map(p => (
                <button 
                  key={p}
                  onClick={() => setConfig({...config, personality: p})}
                  className={`py-3 px-4 rounded-xl text-sm font-bold border-2 transition-all ${
                    config.personality === p 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-slate-100 dark:border-slate-800 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase text-slate-400">System Instructions</label>
              <textarea 
                rows={6}
                value={config.instructions}
                onChange={(e) => setConfig({...config, instructions: e.target.value})}
                placeholder="How should the bot behave? What knowledge should it have?"
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-slate-700 dark:text-slate-200 resize-none"
              />
            </div>
          </section>
        </div>

        {/* Right Pane: Preview */}
        <div className="w-1/2 bg-slate-100 dark:bg-slate-900/50 p-8 flex flex-col items-center justify-center relative">
          <div className="absolute top-8 left-8">
            <h3 className="text-sm font-bold text-slate-400 flex items-center gap-2 uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Live Preview
            </h3>
          </div>

          {/* Phone Frame */}
          <div className="w-[360px] h-[640px] bg-white dark:bg-surface-dark rounded-[40px] shadow-2xl border-8 border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden relative">
            {/* App Header */}
            <div className="p-6 brand-gradient text-white flex items-center gap-3">
              <div className="size-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                <span className="material-symbols-outlined text-xl">smart_toy</span>
              </div>
              <div>
                <h4 className="font-bold text-sm leading-none">{config.name}</h4>
                <p className="text-[10px] opacity-80 mt-1">{config.personality} Assistant</p>
              </div>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-slate-50 dark:bg-background-dark"
            >
              {previewMessages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs ${
                    m.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-white dark:bg-surface-dark text-slate-700 dark:text-slate-200 shadow-sm border border-slate-100 dark:border-slate-800 rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-surface-dark px-3 py-2 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                    <span className="animate-bounce text-primary text-[10px]">•</span>
                    <span className="animate-bounce delay-75 text-primary text-[10px]">•</span>
                    <span className="animate-bounce delay-150 text-primary text-[10px]">•</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-surface-dark border-t border-slate-100 dark:border-slate-800">
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Type a message..."
                  value={previewInput}
                  onChange={(e) => setPreviewInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePreviewSend()}
                  className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-full px-4 py-2 text-xs focus:ring-1 focus:ring-primary"
                />
                <button 
                  onClick={handlePreviewSend}
                  className="absolute right-1 top-1 size-7 bg-primary rounded-full text-white flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotBuilder;

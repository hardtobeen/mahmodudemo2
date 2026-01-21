
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const ChatbotBuilder: React.FC = () => {
  const [config, setConfig] = useState({
    name: 'Virtual Agent Sam',
    description: 'AI-powered guide for residential properties.',
    personality: 'Welcoming',
    instructions: 'You are an expert real estate virtual guide. You are showing a high-end apartment. You highlight the natural lighting, the hardwood floors, and the smart home features. Be welcoming, knowledgeable, and professional.'
  });

  const [previewMessages, setPreviewMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'Welcome to this beautiful penthouse! Feel free to explore the rooms. Would you like a guided walkthrough or do you have a specific question about the kitchen?' }
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
      setPreviewMessages(prev => [...prev, { role: 'user', text: previewInput.trim() }, { role: 'model', text: "Error: No API Key found for AI guide simulation." }]);
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
          systemInstruction: `You are simulating the behavior of a Virtual Tour Guide. Personality: ${config.personality}. Core Instructions: ${config.instructions}. Keep responses concise as if being read on a mobile device while exploring a property.`,
        }
      });

      setPreviewMessages(prev => [...prev, { role: 'model', text: response.text || "I'm focusing on the scan data... ask me again!" }]);
    } catch (error) {
      setPreviewMessages(prev => [...prev, { role: 'model', text: "AI guide disconnected. Please check configuration." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-background-dark overflow-hidden">
      <header className="p-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-secondary dark:text-white tracking-tight">AI Guide Builder</h1>
          <p className="text-slate-500 dark:text-slate-400">Configure your property-specific virtual concierge.</p>
        </div>
        <div className="flex gap-4">
          <button className="h-11 px-6 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary-dark shadow-lg shadow-primary/30 transition-all">
            Deploy to Tours
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane: Config */}
        <div className="w-1/2 overflow-y-auto p-8 border-r border-slate-200 dark:border-slate-800 flex flex-col gap-8">
          <section className="flex flex-col gap-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined">identity_platform</span>
              Guide Identity
            </h3>
            <div className="flex flex-col gap-4 bg-white dark:bg-surface-dark p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase text-slate-400 tracking-widest">Guide Display Name</label>
                <input 
                  type="text" 
                  value={config.name}
                  onChange={(e) => setConfig({...config, name: e.target.value})}
                  className="bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-4 py-3 text-slate-700 dark:text-slate-200"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase text-slate-400 tracking-widest">Role Description</label>
                <input 
                  type="text" 
                  value={config.description}
                  onChange={(e) => setConfig({...config, description: e.target.value})}
                  className="bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-4 py-3 text-slate-700 dark:text-slate-200"
                />
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined">neurology</span>
              Guide Logic & Persona
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {['Welcoming', 'Direct', 'Storyteller'].map(p => (
                <button 
                  key={p}
                  onClick={() => setConfig({...config, personality: p})}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border-2 transition-all ${
                    config.personality === p 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-slate-100 dark:border-slate-800 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-1.5 bg-white dark:bg-surface-dark p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
              <label className="text-xs font-bold uppercase text-slate-400 tracking-widest">Contextual Knowledge</label>
              <textarea 
                rows={5}
                value={config.instructions}
                onChange={(e) => setConfig({...config, instructions: e.target.value})}
                placeholder="Details about the property, area, amenities..."
                className="bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-4 py-3 text-slate-700 dark:text-slate-200 resize-none text-sm"
              />
            </div>
          </section>
        </div>

        {/* Right Pane: Preview */}
        <div className="w-1/2 bg-slate-100 dark:bg-slate-900/50 p-8 flex flex-col items-center justify-center relative">
          <div className="absolute top-8 left-8">
            <h3 className="text-[10px] font-black text-slate-400 flex items-center gap-2 uppercase tracking-[0.2em]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              In-Tour Simulation
            </h3>
          </div>

          {/* Virtual Phone / Tour HUD */}
          <div className="w-[340px] h-[600px] bg-slate-200 dark:bg-slate-800 rounded-[48px] shadow-2xl border-[10px] border-slate-300 dark:border-slate-700 flex flex-col overflow-hidden relative">
            {/* Background 360 simulation */}
            <div className="absolute inset-0 z-0">
               <img src="https://picsum.photos/600/1200?r=50" className="w-full h-full object-cover blur-sm opacity-60" alt="" />
               <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
            </div>

            {/* Tour Overlay UI */}
            <div className="relative z-10 flex flex-col h-full">
              <div className="p-6 flex justify-between items-center text-white">
                 <button className="size-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center"><span className="material-symbols-outlined">menu</span></button>
                 <div className="text-center">
                    <h4 className="text-xs font-black uppercase tracking-widest">Penthouse Suite</h4>
                    <p className="text-[9px] opacity-70">360° Living Area</p>
                 </div>
                 <button className="size-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center"><span className="material-symbols-outlined">map</span></button>
              </div>

              <div className="flex-1"></div>

              {/* Chat Overlay */}
              <div className="m-4 p-4 bg-white/90 dark:bg-surface-dark/95 backdrop-blur-xl rounded-[32px] shadow-2xl flex flex-col gap-3 border border-white/20">
                <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                   <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center"><span className="material-symbols-outlined text-sm">smart_toy</span></div>
                   <div>
                      <h5 className="text-[10px] font-black text-secondary dark:text-white uppercase tracking-widest leading-none">{config.name}</h5>
                      <p className="text-[9px] text-slate-400 mt-1">{config.personality} Guide</p>
                   </div>
                </div>
                
                <div 
                  ref={scrollRef}
                  className="max-h-48 overflow-y-auto space-y-3 px-1"
                >
                  {previewMessages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`px-3 py-2 rounded-2xl text-[11px] leading-relaxed ${
                        m.role === 'user' 
                          ? 'bg-primary text-white font-medium' 
                          : 'text-slate-600 dark:text-slate-200'
                      }`}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex gap-1">
                        <span className="animate-bounce text-primary text-xs">•</span>
                        <span className="animate-bounce delay-75 text-primary text-xs">•</span>
                        <span className="animate-bounce delay-150 text-primary text-xs">•</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative mt-2">
                  <input 
                    type="text"
                    placeholder="Ask about this room..."
                    value={previewInput}
                    onChange={(e) => setPreviewInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handlePreviewSend()}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-full px-4 py-2 text-[11px] focus:ring-1 focus:ring-primary h-9"
                  />
                  <button 
                    onClick={handlePreviewSend}
                    className="absolute right-1 top-1 size-7 bg-primary rounded-full text-white flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-sm">send</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotBuilder;

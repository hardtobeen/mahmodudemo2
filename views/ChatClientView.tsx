
import React, { useState } from 'react';

const channels = [
  { id: '1', name: 'General', type: 'public', unread: 0 },
  { id: '2', name: 'Design Team', type: 'private', unread: 3 },
  { id: '3', name: 'Client Feedback', type: 'public', unread: 0 },
  { id: '4', name: 'Project Alpha', type: 'private', unread: 12 },
];

const ChatClientView: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState('2');

  return (
    <div className="flex h-full bg-white dark:bg-background-dark overflow-hidden">
      {/* Sidebar Channels */}
      <div className="w-64 border-r border-slate-100 dark:border-slate-800 flex flex-col h-full bg-slate-50 dark:bg-surface-dark">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-bold text-secondary dark:text-white">Messages</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 px-2">Rooms</h3>
            <div className="space-y-1">
              {channels.map(channel => (
                <button 
                  key={channel.id}
                  onClick={() => setActiveChannel(channel.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all flex items-center gap-2 ${
                    activeChannel === channel.id 
                    ? 'bg-primary/10 text-primary font-bold' 
                    : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">
                    {channel.type === 'public' ? 'tag' : 'lock'}
                  </span>
                  <span className="flex-1 truncate">{channel.name}</span>
                  {channel.unread > 0 && (
                    <span className="size-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center">{channel.unread}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative bg-white dark:bg-background-dark">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><span className="material-symbols-outlined">tag</span></div>
             <div>
                <h3 className="font-bold text-secondary dark:text-white">Design Team</h3>
                <p className="text-xs text-slate-400">Collaboration for upcoming release</p>
             </div>
          </div>
          <div className="flex gap-2">
             <button className="size-9 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-400"><span className="material-symbols-outlined text-xl">videocam</span></button>
             <button className="size-9 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-400"><span className="material-symbols-outlined text-xl">info</span></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8">
           <div className="flex flex-col items-center justify-center py-20 text-slate-300 dark:text-slate-700">
              <span className="material-symbols-outlined text-6xl mb-4">forum</span>
              <p className="text-sm font-bold uppercase tracking-widest">Beginning of Conversation</p>
           </div>
           {/* Placeholder messages could go here */}
        </div>

        <div className="p-6">
           <div className="relative">
              <input 
                type="text" 
                placeholder="Message #Design Team..."
                className="w-full h-12 bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-primary"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                 <button className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined text-lg">mood</span></button>
                 <button className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined text-lg">attach_file</span></button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ChatClientView;

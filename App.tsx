
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import ChatbotView from './views/ChatbotView';
import ChatbotBuilder from './views/ChatbotBuilder';
import { NavItem } from './types';

const App: React.FC = () => {
  const [activeNav, setActiveNav] = useState<NavItem>('dashboard');

  const renderContent = () => {
    switch (activeNav) {
      case 'dashboard':
        return <Dashboard />;
      case 'chatbot':
        return <ChatbotView />;
      case 'chatbot_builder':
        return <ChatbotBuilder />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <span className="material-symbols-outlined text-6xl mb-4">construction</span>
            <h2 className="text-2xl font-bold">Work in Progress</h2>
            <p>The {activeNav} section is coming soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark transition-colors duration-300">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <main className="flex-1 h-full overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;

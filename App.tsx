
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import ToursView from './views/ToursView';
import LeadsView from './views/LeadsView';
import AgenciesView from './views/AgenciesView';
import MediaView from './views/MediaView';
import ChatbotView from './views/ChatbotView';
import ChatbotBuilder from './views/ChatbotBuilder';
import ChatClientView from './views/ChatClientView';
import SettingsView from './views/SettingsView';
import { NavItem } from './types';

const App: React.FC = () => {
  const [activeNav, setActiveNav] = useState<NavItem>('dashboard');

  const renderContent = () => {
    switch (activeNav) {
      case 'dashboard': return <Dashboard />;
      case 'tours': return <ToursView />;
      case 'leads': return <LeadsView />;
      case 'clients': return <AgenciesView />;
      case 'assets': return <MediaView />;
      case 'concierge': return <ChatbotView />;
      case 'guide_builder': return <ChatbotBuilder />;
      case 'messages': return <ChatClientView />;
      case 'settings': return <SettingsView />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark transition-colors duration-300">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <main className="flex-1 h-full overflow-hidden">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;

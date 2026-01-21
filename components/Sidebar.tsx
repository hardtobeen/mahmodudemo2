
import React from 'react';
import { NavItem } from '../types';

interface SidebarProps {
  activeNav: NavItem;
  setActiveNav: (nav: NavItem) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeNav, setActiveNav }) => {
  const menuItems: { id: NavItem, label: string, icon: string, badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'tours', label: 'Virtual Tours', icon: '360' },
    { id: 'leads', label: 'Viewing Leads', icon: 'event_available', badge: 4 },
    { id: 'clients', label: 'Agencies', icon: 'business' },
    { id: 'assets', label: '360 Assets', icon: 'view_in_ar' },
    { id: 'concierge', label: 'AI Concierge', icon: 'support_agent' },
    { id: 'guide_builder', label: 'Guide Builder', icon: 'architecture' },
    { id: 'messages', label: 'Live Chat', icon: 'forum' },
  ];

  return (
    <aside className="flex w-72 flex-col justify-between border-r border-slate-200 dark:border-slate-800 bg-surface-light dark:bg-surface-dark h-full shrink-0 transition-colors duration-300">
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="relative flex items-center justify-center size-12 rounded-xl bg-primary text-white shadow-soft">
            <span className="material-symbols-outlined text-3xl">streetview</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-secondary dark:text-white text-lg font-bold leading-tight uppercase tracking-tighter">Vortex</h1>
            <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">Tours & Analytics</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeNav === item.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className={`material-symbols-outlined ${activeNav === item.id ? 'filled' : ''}`}>
                {item.icon}
              </span>
              <p className={`text-sm ${activeNav === item.id ? 'font-bold' : 'font-medium'} group-hover:text-primary`}>
                {item.label}
              </p>
              {item.badge && (
                <span className="ml-auto flex items-center justify-center size-5 rounded-full bg-red-100 text-red-600 text-[10px] font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        <button
          onClick={() => setActiveNav('settings')}
          className={`group w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            activeNav === 'settings'
              ? 'bg-primary/10 text-primary font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <span className="material-symbols-outlined">settings</span>
          <p className="text-sm font-medium">Settings</p>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;


import React from 'react';
import { LeadRequest } from '../types';

const leads: LeadRequest[] = [
  { id: '1', client: 'James Wilson', initials: 'JW', interest: 'Requested private viewing for Skyline Penthouse', status: 'Pending', date: 'Today, 11:45 AM', sourceTour: 'Skyline Penthouse' },
  { id: '2', client: 'Sarah Connor', initials: 'SC', interest: 'Interested in tech hub office pricing', status: 'Contacted', date: 'Yesterday, 4:20 PM', sourceTour: 'Tech Hub Office' },
  { id: '3', client: 'John Hammond', initials: 'JH', interest: 'Bulk scan inquiry for park portfolio', status: 'Pending', date: 'Oct 25, 2023', sourceTour: 'Logistics Park' },
  { id: '4', client: 'Ellen Ripley', initials: 'ER', interest: 'Tour navigation feedback', status: 'Closed', date: 'Oct 24, 2023', sourceTour: 'Downtown Suite' },
];

const LeadsView: React.FC = () => {
  return (
    <div className="p-8 md:p-12 h-full overflow-y-auto max-w-[1200px] mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-secondary dark:text-white">Viewing Leads</h1>
          <p className="text-slate-500 dark:text-slate-400">Potential buyers and tenants from your virtual tours.</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {leads.map(lead => (
          <div key={lead.id} className="bg-white dark:bg-surface-dark p-6 rounded-3xl shadow-soft flex flex-col lg:flex-row items-center gap-6 border border-transparent hover:border-primary/10 transition-all">
            <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">{lead.initials}</div>
            <div className="flex-1 text-center lg:text-left">
              <div className="flex flex-col lg:flex-row lg:items-center gap-2 mb-1">
                <h4 className="font-bold text-secondary dark:text-white text-lg">{lead.client}</h4>
                <span className="hidden lg:block text-slate-300">•</span>
                <span className="text-xs font-bold text-primary uppercase tracking-widest">{lead.sourceTour}</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{lead.interest}</p>
            </div>
            <div className="flex flex-col lg:items-end gap-2 shrink-0">
               <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                 lead.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 
                 lead.status === 'Contacted' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
               }`}>{lead.status}</span>
               <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{lead.date}</span>
            </div>
            <div className="flex gap-2 w-full lg:w-auto">
               <button className="flex-1 lg:flex-none h-12 px-6 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-all">Contact</button>
               <button className="h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-primary transition-all">
                  <span className="material-symbols-outlined">more_horiz</span>
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadsView;

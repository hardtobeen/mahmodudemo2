
import React from 'react';
import { Client } from '../types';

const agencies: Client[] = [
  { id: '1', name: 'Zillow Premium', company: 'Zillow Group', email: 'partner@zillow.com', status: 'Partner', toursCount: 420, avatar: 'ZP' },
  { id: '2', name: 'Elite Realty', company: 'Global Real Estate', email: 'hello@eliterealty.com', status: 'Active', toursCount: 15, avatar: 'ER' },
  { id: '3', name: 'Modern Living', company: 'Boutique Properties', email: 'info@modernliving.io', status: 'Active', toursCount: 8, avatar: 'ML' },
  { id: '4', name: 'Skyline Group', company: 'Highrise Management', email: 'contact@skyline.com', status: 'Lead', toursCount: 0, avatar: 'SG' },
];

const AgenciesView: React.FC = () => {
  return (
    <div className="p-8 md:p-12 h-full overflow-y-auto max-w-[1200px] mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-secondary dark:text-white">Agencies</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your partner agencies and client accounts.</p>
        </div>
        <button className="h-12 px-6 rounded-full bg-primary text-white font-bold text-sm shadow-lg shadow-primary/30">Add New Account</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agencies.map(agency => (
          <div key={agency.id} className="bg-white dark:bg-surface-dark p-6 rounded-3xl shadow-soft flex flex-col items-center text-center border border-transparent hover:border-primary/10 transition-all">
             <div className="size-20 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-2xl font-black text-primary mb-4">{agency.avatar}</div>
             <h4 className="font-bold text-secondary dark:text-white text-lg">{agency.name}</h4>
             <p className="text-xs text-slate-400 mb-6 font-medium">{agency.company}</p>
             
             <div className="w-full grid grid-cols-2 gap-2 mb-6">
                <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl">
                   <div className="text-sm font-black text-secondary dark:text-white">{agency.toursCount}</div>
                   <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Tours</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl">
                   <div className="text-sm font-black text-primary">{agency.status}</div>
                   <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Status</div>
                </div>
             </div>
             
             <button className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold hover:bg-primary/10 hover:text-primary transition-all">View Portfolio</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgenciesView;

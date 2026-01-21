
import React from 'react';
import { ClientRequest } from '../types';

const requests: ClientRequest[] = [
  { id: '1', client: 'Alice Freeman', initials: 'AF', request: 'UI Design for Login screen', status: 'In Progress', priority: 'High', date: 'Oct 24, 2023' },
  { id: '2', client: 'Bob Vance', initials: 'BV', request: 'Database schema update for products', status: 'High Priority', priority: 'High', date: 'Oct 23, 2023' },
  { id: '3', client: 'Charlie Day', initials: 'CD', request: 'Newsletter template adjustment', status: 'Completed', priority: 'Low', date: 'Oct 22, 2023' },
  { id: '4', client: 'Diana Prince', initials: 'DP', request: 'API Integration for Stripe', status: 'In Progress', priority: 'Medium', date: 'Oct 21, 2023' },
];

const RequestsView: React.FC = () => {
  return (
    <div className="p-8 md:p-12 h-full overflow-y-auto max-w-[1200px] mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-secondary dark:text-white">Requests</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage client tasks and support tickets.</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {requests.map(req => (
          <div key={req.id} className="bg-white dark:bg-surface-dark p-6 rounded-2xl shadow-soft flex flex-col md:flex-row items-center gap-6 border border-transparent hover:border-primary/10 transition-all">
            <div className="size-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300">{req.initials}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h4 className="font-bold text-secondary dark:text-white">{req.client}</h4>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                  req.priority === 'High' ? 'bg-red-100 text-red-600' : req.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                }`}>
                  {req.priority} Priority
                </span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{req.request}</p>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
               <span className={`text-xs font-bold ${req.status === 'Completed' ? 'text-green-500' : 'text-primary'}`}>{req.status}</span>
               <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{req.date}</span>
            </div>
            <button className="h-10 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-bold hover:bg-primary/10 hover:text-primary transition-all">Resolve</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestsView;

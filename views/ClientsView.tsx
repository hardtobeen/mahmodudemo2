
import React from 'react';
import { Client } from '../types';

const clients: Client[] = [
  { id: '1', name: 'Sarah Chen', company: 'Nexus Design', email: 'sarah@nexus.com', status: 'Active', value: '$12,400', avatar: 'SC' },
  { id: '2', name: 'Marcus Aurelius', company: 'Rome Tech', email: 'marcus@rome.tech', status: 'Lead', value: '$0', avatar: 'MA' },
  { id: '3', name: 'Elena Rodriguez', company: 'Solaris Systems', email: 'elena@solaris.io', status: 'Active', value: '$45,200', avatar: 'ER' },
  { id: '4', name: 'David Smith', company: 'Starlight Media', email: 'd.smith@starlight.com', status: 'Inactive', value: '$8,100', avatar: 'DS' },
];

const ClientsView: React.FC = () => {
  return (
    <div className="p-8 md:p-12 h-full overflow-y-auto max-w-[1200px] mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-secondary dark:text-white">Clients</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your business relationships and leads.</p>
        </div>
        <button className="h-12 px-6 rounded-full bg-primary text-white font-bold flex items-center gap-2 hover:bg-primary-dark transition-all shadow-lg shadow-primary/30">
          <span className="material-symbols-outlined">person_add</span>
          Add Client
        </button>
      </div>

      <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr className="text-xs font-bold uppercase text-slate-400 tracking-wider">
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Value</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {clients.map(client => (
              <tr key={client.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">{client.avatar}</div>
                    <div>
                      <div className="font-bold text-secondary dark:text-white">{client.name}</div>
                      <div className="text-xs text-slate-500">{client.company}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${
                    client.status === 'Active' ? 'bg-green-100 text-green-700' : 
                    client.status === 'Lead' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {client.status}
                  </span>
                </td>
                <td className="px-6 py-5 font-mono text-sm font-bold text-secondary dark:text-slate-200">{client.value}</td>
                <td className="px-6 py-5 text-right">
                  <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientsView;

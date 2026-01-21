
import React from 'react';
import StatsCard from '../components/StatsCard';
import ProjectCard from '../components/ProjectCard';
import ViewsChart from '../components/ViewsChart';
import { Stat, Project, ClientRequest } from '../types';

const Dashboard: React.FC = () => {
  const stats: Stat[] = [
    { label: 'Active Items', value: '12', trend: '+2 this week', trendType: 'positive', icon: 'view_in_ar', colorClass: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' },
    { label: 'Total Engagement', value: '8,430', trend: '+15% trend', trendType: 'positive', icon: 'visibility', colorClass: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' },
    { label: 'Pending Tasks', value: '3', trend: 'Action Required', trendType: 'neutral', icon: 'pending_actions', colorClass: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' },
  ];

  const projects: Project[] = [
    { id: '1', title: 'Project Alpha', lastModified: '2 hours ago', imageUrl: 'https://picsum.photos/200/200?random=1' },
    { id: '2', title: 'Project Beta', lastModified: 'yesterday', imageUrl: 'https://picsum.photos/200/200?random=2' },
    { id: '3', title: 'Project Gamma', lastModified: '3 days ago', imageUrl: 'https://picsum.photos/200/200?random=3' },
  ];

  const requests: ClientRequest[] = [
    { id: '1', client: 'User 1', initials: 'U1', request: 'Update project details', status: 'In Progress', date: 'Today, 10:30 AM' },
    { id: '2', client: 'User 2', initials: 'U2', request: 'Upload issue', status: 'High Priority', date: 'Yesterday' },
  ];

  return (
    <div className="max-w-[1200px] mx-auto p-8 md:p-12 flex flex-col gap-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-secondary dark:text-white">Good morning.</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Here is your daily overview.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 h-12 px-6 rounded-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-50 transition-all shadow-sm">
            <span className="material-symbols-outlined text-lg">upload</span>
            Upload
          </button>
          <button className="flex items-center gap-2 h-12 px-6 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary-dark transition-all shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined text-lg">add</span>
            New Project
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => <StatsCard key={i} stat={stat} />)}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft p-6 md:p-8 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-secondary dark:text-white">Trend Analysis</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Performance Over Time</p>
            </div>
            <select className="bg-slate-50 dark:bg-slate-800 border-none text-sm font-medium rounded-lg py-2 pl-3 pr-8 text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-primary/50 cursor-pointer">
              <option>Last 30 Days</option>
              <option>This Week</option>
            </select>
          </div>
          <ViewsChart />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-secondary dark:text-white">Recent Items</h3>
            <button className="text-primary hover:text-primary-dark text-sm font-bold">View All</button>
          </div>
          <div className="flex flex-col gap-4">
            {projects.map(p => <ProjectCard key={p.id} project={p} />)}
            <button className="flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-500 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all h-[88px]">
              <span className="material-symbols-outlined">add_circle</span>
              <span className="text-sm font-bold">New Entry</span>
            </button>
          </div>
        </div>
      </section>

      <section className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-secondary dark:text-white">Recent Requests</h3>
          <button className="text-slate-500 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-xs font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                <th className="py-3 px-2">Source</th>
                <th className="py-3 px-2">Detail</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="text-sm text-secondary dark:text-slate-300">
              {requests.map(req => (
                <tr key={req.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-2 flex items-center gap-3">
                    <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-600 font-bold text-xs">{req.initials}</div>
                    <span className="font-medium">{req.client}</span>
                  </td>
                  <td className="py-4 px-2">{req.request}</td>
                  <td className="py-4 px-2">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                      req.status === 'High Priority' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-right text-slate-500">{req.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

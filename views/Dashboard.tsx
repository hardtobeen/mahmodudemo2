
import React from 'react';
import StatsCard from '../components/StatsCard';
import ViewsChart from '../components/ViewsChart';
import { Stat } from '../types';

const Dashboard: React.FC = () => {
  const stats: Stat[] = [
    { label: 'Total Tour Views', value: '42.8k', trend: '+12% month', trendType: 'positive', icon: 'visibility', colorClass: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' },
    { label: 'Active Tours', value: '156', trend: '4 processing', trendType: 'neutral', icon: '360', colorClass: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' },
    { label: 'Viewing Leads', value: '89', trend: '+24 new', trendType: 'positive', icon: 'event_available', colorClass: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' },
  ];

  return (
    <div className="max-w-[1200px] mx-auto p-8 md:p-12 flex flex-col gap-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-secondary dark:text-white">Portfolio Overview.</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Your virtual tour performance across all properties.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 h-12 px-6 rounded-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-50 transition-all shadow-sm">
            <span className="material-symbols-outlined text-lg">file_upload</span>
            Upload Panoramas
          </button>
          <button className="flex items-center gap-2 h-12 px-6 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary-dark transition-all shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined text-lg">add_location_alt</span>
            New Property Scan
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => <StatsCard key={i} stat={stat} />)}
      </section>

      <section className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft p-6 md:p-8 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-secondary dark:text-white">Engagement Trends</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Visitor activity across all published tours</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-primary/10 text-primary">Views</button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:bg-slate-50">Leads</button>
          </div>
        </div>
        <ViewsChart />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl shadow-soft">
           <h3 className="text-lg font-bold mb-4">Top Performing Properties</h3>
           <div className="space-y-4">
              {[
                { name: 'Skyline Penthouse', views: '2.4k', img: 'https://picsum.photos/100/100?r=1' },
                { name: 'Azure Waterfront', views: '1.9k', img: 'https://picsum.photos/100/100?r=2' },
                { name: 'Oakwood Estate', views: '1.1k', img: 'https://picsum.photos/100/100?r=3' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all">
                   <img src={item.img} className="size-12 rounded-lg object-cover" alt="" />
                   <div className="flex-1">
                      <h4 className="font-bold text-sm">{item.name}</h4>
                      <p className="text-xs text-slate-500">Virtual Tour • Public</p>
                   </div>
                   <div className="text-right">
                      <div className="font-bold text-sm">{item.views}</div>
                      <div className="text-[10px] text-green-500 font-black">↑ 8%</div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl shadow-soft">
           <h3 className="text-lg font-bold mb-4">Recent Scans</h3>
           <div className="flex flex-col gap-3">
              {[
                { name: 'Industrial Loft B', status: 'Processing', time: '15m ago' },
                { name: 'Modern Villa A', status: 'Complete', time: '2h ago' },
                { name: 'Downtown Office', status: 'Complete', time: '5h ago' },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                   <div className="flex items-center gap-3">
                      <span className={`size-2 rounded-full ${item.status === 'Processing' ? 'bg-orange-500 animate-pulse' : 'bg-green-500'}`}></span>
                      <span className="text-sm font-bold">{item.name}</span>
                   </div>
                   <span className="text-xs text-slate-400">{item.time}</span>
                </div>
              ))}
           </div>
           <button className="w-full mt-4 p-3 text-xs font-bold text-primary hover:bg-primary/5 rounded-xl border border-primary/10 transition-all">
              Launch Scanner Interface
           </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

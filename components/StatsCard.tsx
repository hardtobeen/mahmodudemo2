
import React from 'react';
import { Stat } from '../types';

interface StatsCardProps {
  stat: Stat;
}

const StatsCard: React.FC<StatsCardProps> = ({ stat }) => {
  return (
    <div className="group relative flex flex-col gap-4 p-6 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft border border-transparent hover:border-primary/20 transition-all duration-300">
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-xl ${stat.colorClass}`}>
          <span className="material-symbols-outlined">{stat.icon}</span>
        </div>
        {stat.trend && (
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
            stat.trendType === 'positive' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
            stat.trendType === 'negative' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
            'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
          }`}>
            {stat.trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
        <h2 className="text-4xl font-bold text-secondary dark:text-white tracking-tight">{stat.value}</h2>
      </div>
    </div>
  );
};

export default StatsCard;

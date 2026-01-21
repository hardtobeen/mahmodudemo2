
import React from 'react';
import { Project } from '../types';

const projects: Project[] = [
  { id: '1', title: 'Brand Refresh', lastModified: '2h ago', imageUrl: 'https://picsum.photos/400/300?r=1', progress: 75, status: 'Active', category: 'Design' },
  { id: '2', title: 'E-commerce Launch', lastModified: '1d ago', imageUrl: 'https://picsum.photos/400/300?r=2', progress: 30, status: 'Active', category: 'Development' },
  { id: '3', title: 'Marketing Campaign', lastModified: '3d ago', imageUrl: 'https://picsum.photos/400/300?r=3', progress: 100, status: 'Completed', category: 'Marketing' },
  { id: '4', title: 'Mobile App Beta', lastModified: '1w ago', imageUrl: 'https://picsum.photos/400/300?r=4', progress: 15, status: 'Paused', category: 'Mobile' },
];

const ProjectsView: React.FC = () => {
  return (
    <div className="p-8 md:p-12 h-full overflow-y-auto max-w-[1200px] mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-secondary dark:text-white">Projects</h1>
          <p className="text-slate-500 dark:text-slate-400">Track and manage your ongoing work.</p>
        </div>
        <div className="flex gap-3">
           <button className="h-12 px-6 rounded-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold">Filter</button>
           <button className="h-12 px-6 rounded-full bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all">New Project</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {projects.map(project => (
          <div key={project.id} className="group bg-white dark:bg-surface-dark rounded-2xl shadow-soft overflow-hidden border border-transparent hover:border-primary/20 transition-all">
            <div className="h-48 overflow-hidden relative">
              <img src={project.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={project.title} />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 dark:bg-black/70 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-secondary dark:text-white">
                  {project.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-secondary dark:text-white">{project.title}</h3>
                <span className={`text-[10px] font-black uppercase ${
                  project.status === 'Completed' ? 'text-green-500' : project.status === 'Paused' ? 'text-orange-500' : 'text-primary'
                }`}>{project.status}</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs font-bold text-slate-400">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${project.progress}%` }}></div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
                <span>Last activity: {project.lastModified}</span>
                <button className="text-primary font-bold hover:underline">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsView;

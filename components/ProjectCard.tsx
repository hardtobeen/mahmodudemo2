
import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group flex items-center gap-4 p-3 bg-surface-light dark:bg-surface-dark rounded-xl shadow-soft hover:shadow-md transition-all cursor-pointer">
      <div className="size-16 rounded-lg bg-slate-200 overflow-hidden relative shrink-0">
        <img
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          src={project.imageUrl}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-secondary dark:text-white truncate">{project.title}</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Modified {project.lastModified}</p>
      </div>
      <button className="size-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-primary transition-colors">
        <span className="material-symbols-outlined text-lg">edit</span>
      </button>
    </div>
  );
};

export default ProjectCard;

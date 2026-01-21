
import React from 'react';
import { Tour } from '../types';

const tours: Tour[] = [
  { id: '1', title: 'Skyline Luxury Penthouse', lastScanned: '2h ago', imageUrl: 'https://picsum.photos/400/300?r=21', panoramas: 12, status: 'Published', propertyType: 'Residential', views: 4200 },
  { id: '2', title: 'Tech Hub Office Space', lastScanned: '1d ago', imageUrl: 'https://picsum.photos/400/300?r=22', panoramas: 24, status: 'Published', propertyType: 'Commercial', views: 1850 },
  { id: '3', title: 'Sunset Valley Estate', lastScanned: '3d ago', imageUrl: 'https://picsum.photos/400/300?r=23', panoramas: 18, status: 'Processing', propertyType: 'Residential', views: 0 },
  { id: '4', title: 'Portside Logistics Park', lastScanned: '1w ago', imageUrl: 'https://picsum.photos/400/300?r=24', panoramas: 45, status: 'Draft', propertyType: 'Industrial', views: 12 },
];

const ToursView: React.FC = () => {
  return (
    <div className="p-8 md:p-12 h-full overflow-y-auto max-w-[1200px] mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-secondary dark:text-white">Virtual Tours</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your 360 property walkthroughs.</p>
        </div>
        <div className="flex gap-3">
           <button className="h-12 px-6 rounded-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 font-bold text-sm">Filter</button>
           <button className="h-12 px-6 rounded-full bg-primary text-white font-bold text-sm shadow-lg shadow-primary/30">Create Tour</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tours.map(tour => (
          <div key={tour.id} className="group bg-white dark:bg-surface-dark rounded-3xl shadow-soft overflow-hidden border border-transparent hover:border-primary/20 transition-all">
            <div className="h-56 overflow-hidden relative">
              <img src={tour.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={tour.title} />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-white">
                  {tour.propertyType}
                </span>
                <span className={`px-3 py-1 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest ${
                  tour.status === 'Published' ? 'bg-green-500/80 text-white' : 
                  tour.status === 'Processing' ? 'bg-orange-500/80 text-white animate-pulse' : 'bg-slate-500/80 text-white'
                }`}>
                  {tour.status}
                </span>
              </div>
              <div className="absolute bottom-4 right-4 flex gap-2">
                 <div className="px-3 py-1 bg-white/90 dark:bg-black/70 backdrop-blur-md rounded-lg text-[10px] font-bold text-secondary dark:text-white flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">360</span>
                    {tour.panoramas} Scans
                 </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-secondary dark:text-white mb-1">{tour.title}</h3>
                  <p className="text-xs text-slate-400 font-medium">Last updated {tour.lastScanned}</p>
                </div>
                <div className="text-right">
                   <div className="text-lg font-black text-secondary dark:text-white">{tour.views.toLocaleString()}</div>
                   <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Views</div>
                </div>
              </div>
              
              <div className="flex gap-2">
                 <button className="flex-1 h-11 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-all">Launch Editor</button>
                 <button className="h-11 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary transition-all">
                    <span className="material-symbols-outlined">share</span>
                 </button>
                 <button className="h-11 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary transition-all">
                    <span className="material-symbols-outlined">analytics</span>
                 </button>
              </div>
            </div>
          </div>
        ))}
        
        <button className="h-[420px] rounded-3xl border-4 border-dashed border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center gap-4 text-slate-400 hover:border-primary/20 hover:text-primary hover:bg-primary/5 transition-all group">
           <div className="size-20 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-4xl">add_circle</span>
           </div>
           <div className="text-center">
              <h4 className="font-bold text-lg">New Virtual Tour</h4>
              <p className="text-sm">Start by uploading 360° panoramas</p>
           </div>
        </button>
      </div>
    </div>
  );
};

export default ToursView;

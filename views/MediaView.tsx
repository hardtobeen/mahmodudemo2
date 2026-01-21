
import React from 'react';
import { MediaAsset } from '../types';

const assets: MediaAsset[] = [
  { id: '1', name: 'Brand_Guidelines.pdf', type: 'pdf', size: '2.4 MB', date: 'Oct 20, 2023' },
  { id: '2', name: 'Hero_Visual_Final.jpg', type: 'image', size: '1.8 MB', date: 'Oct 19, 2023', thumbnail: 'https://picsum.photos/200/200?r=10' },
  { id: '3', name: 'Product_Demo.mp4', type: 'video', size: '45.2 MB', date: 'Oct 15, 2023' },
  { id: '4', name: 'Client_Brief.docx', type: 'doc', size: '156 KB', date: 'Oct 12, 2023' },
  { id: '5', name: 'Social_Banner_01.png', type: 'image', size: '890 KB', date: 'Oct 10, 2023', thumbnail: 'https://picsum.photos/200/200?r=11' },
];

const MediaView: React.FC = () => {
  return (
    <div className="p-8 md:p-12 h-full overflow-y-auto max-w-[1200px] mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-secondary dark:text-white">Media</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage assets, documents, and visual files.</p>
        </div>
        <button className="h-12 px-6 rounded-full bg-primary text-white font-bold flex items-center gap-2 shadow-lg shadow-primary/30">
          <span className="material-symbols-outlined">upload</span>
          Upload Assets
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {assets.map(asset => (
          <div key={asset.id} className="group bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-soft border border-transparent hover:border-primary/20 transition-all cursor-pointer">
            <div className="aspect-square rounded-xl bg-slate-50 dark:bg-slate-800 mb-4 flex items-center justify-center overflow-hidden relative">
              {asset.thumbnail ? (
                <img src={asset.thumbnail} className="w-full h-full object-cover" alt={asset.name} />
              ) : (
                <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600">
                  {asset.type === 'pdf' ? 'description' : asset.type === 'video' ? 'movie' : 'draft'}
                </span>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                 <button className="size-8 bg-white rounded-full flex items-center justify-center text-primary"><span className="material-symbols-outlined text-sm">visibility</span></button>
                 <button className="size-8 bg-white rounded-full flex items-center justify-center text-primary"><span className="material-symbols-outlined text-sm">download</span></button>
              </div>
            </div>
            <h5 className="text-xs font-bold text-secondary dark:text-white truncate mb-1">{asset.name}</h5>
            <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <span>{asset.size}</span>
              <span>{asset.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaView;

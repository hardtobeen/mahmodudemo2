
import React from 'react';

const SettingsView: React.FC = () => {
  return (
    <div className="p-8 md:p-12 h-full overflow-y-auto max-w-[800px] mx-auto">
      <h1 className="text-4xl font-extrabold text-secondary dark:text-white mb-10">Settings</h1>
      
      <div className="space-y-10">
        <section>
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 px-2">Account Profile</h3>
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-soft p-8 border border-slate-100 dark:border-slate-800">
             <div className="flex items-center gap-6 mb-8">
                <div className="size-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-3xl font-bold text-primary">JD</div>
                <div className="flex flex-col gap-2">
                   <button className="h-9 px-4 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-all">Change Photo</button>
                   <button className="text-xs text-red-500 font-bold hover:underline">Remove Photo</button>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                   <label className="text-[10px] font-black uppercase text-slate-400">Full Name</label>
                   <input type="text" defaultValue="John Doe" className="bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-4 py-2.5 text-sm" />
                </div>
                <div className="flex flex-col gap-1.5">
                   <label className="text-[10px] font-black uppercase text-slate-400">Email Address</label>
                   <input type="email" defaultValue="john.doe@example.com" className="bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-4 py-2.5 text-sm" />
                </div>
             </div>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 px-2">Application</h3>
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 divide-y divide-slate-50 dark:divide-slate-800">
             <div className="p-6 flex justify-between items-center">
                <div>
                   <h4 className="font-bold text-secondary dark:text-white">Dark Mode</h4>
                   <p className="text-xs text-slate-400">Toggle dark and light visual theme</p>
                </div>
                <button className="w-12 h-6 bg-primary rounded-full relative"><span className="absolute right-1 top-1 size-4 bg-white rounded-full"></span></button>
             </div>
             <div className="p-6 flex justify-between items-center">
                <div>
                   <h4 className="font-bold text-secondary dark:text-white">Email Notifications</h4>
                   <p className="text-xs text-slate-400">Receive weekly summary reports</p>
                </div>
                <button className="w-12 h-6 bg-slate-200 dark:bg-slate-700 rounded-full relative"><span className="absolute left-1 top-1 size-4 bg-white rounded-full"></span></button>
             </div>
          </div>
        </section>
      </div>
      
      <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
         <button className="h-11 px-6 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-bold text-slate-600 dark:text-slate-300">Discard</button>
         <button className="h-11 px-6 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/30">Save Changes</button>
      </div>
    </div>
  );
};

export default SettingsView;

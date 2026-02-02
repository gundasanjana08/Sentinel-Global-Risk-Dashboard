
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/Dashboard';
import IntelligenceFeed from './components/IntelligenceFeed';
import AdvisoryReports from './components/AdvisoryReports';
import { 
  Bell, 
  Search, 
  UserCircle,
  Command
} from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'threats':
        return <IntelligenceFeed />;
      case 'reports':
        return <AdvisoryReports />;
      case 'analysis':
        return (
          <div className="flex flex-col items-center justify-center py-40 text-center">
            <div className="bg-zinc-900 p-8 rounded-full mb-6 border border-zinc-800">
              <Command className="w-12 h-12 text-zinc-700" />
            </div>
            <h2 className="text-2xl font-bold text-white">Advanced Geopolitical Analytics</h2>
            <p className="text-zinc-500 mt-2 max-w-md">This module provides granular cross-border sentiment analysis and predictive instability mapping. Coming in V2.4.</p>
          </div>
        );
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar - Fixed */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 relative">
        {/* Top Header Bar */}
        <div className="flex justify-end items-center gap-6 mb-12 sticky top-0 z-10 bg-black/80 backdrop-blur-md py-4 -mx-4 px-4 border-b border-zinc-900">
          <div className="relative group flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-white transition-colors" />
            <input 
              type="text" 
              placeholder="Search intelligence archives..." 
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-zinc-800 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-zinc-400" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-black"></span>
            </button>
            <div className="h-6 w-px bg-zinc-800"></div>
            <button className="flex items-center gap-3 pl-2 pr-1 py-1 hover:bg-zinc-800 rounded-full transition-colors group">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-white">Cmdr. Sterling</div>
                <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-tighter">Level 4 Clearance</div>
              </div>
              <UserCircle className="w-8 h-8 text-zinc-400 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="pb-12">
          {renderContent()}
        </div>

        {/* Floating Global Status Indicator */}
        <div className="fixed bottom-6 right-6 flex items-center gap-4 bg-zinc-900 border border-zinc-800 p-3 rounded-2xl shadow-2xl z-30">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            </div>
            <span className="text-xs font-bold text-white uppercase tracking-widest">Global Risk: Elevated</span>
          </div>
          <div className="h-4 w-px bg-zinc-800"></div>
          <div className="text-[10px] text-zinc-500 font-mono">M.E.T. 14:02:11</div>
        </div>
      </main>
    </div>
  );
};

export default App;


import React from 'react';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Globe, 
  FileText, 
  Settings,
  Activity
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Global Overview', icon: LayoutDashboard },
    { id: 'threats', label: 'Threat Intelligence', icon: ShieldAlert },
    { id: 'analysis', label: 'Geopolitical Analysis', icon: Globe },
    { id: 'reports', label: 'Advisory Reports', icon: FileText },
  ];

  return (
    <div className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col h-screen fixed left-0 top-0 z-20">
      <div className="p-6 flex items-center gap-3">
        <div className="p-2 bg-red-600 rounded-lg">
          <ShieldAlert className="w-6 h-6 text-white" />
        </div>
        <h1 className="font-bold text-xl tracking-tight text-white">SENTINEL</h1>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === item.id 
                ? 'bg-zinc-800 text-white shadow-lg' 
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-red-500 uppercase tracking-wider">
            <Activity className="w-3 h-3" />
            Live Status
          </div>
          <p className="text-sm text-zinc-300">System scanning 142 intelligence feeds...</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;


import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  Zap,
  Globe2
} from 'lucide-react';
import RiskMap from './RiskMap';

const data = [
  { name: 'Jan', risks: 4000, alerts: 2400 },
  { name: 'Feb', risks: 3000, alerts: 1398 },
  { name: 'Mar', risks: 2000, alerts: 9800 },
  { name: 'Apr', risks: 2780, alerts: 3908 },
  { name: 'May', risks: 1890, alerts: 4800 },
  { name: 'Jun', risks: 2390, alerts: 3800 },
];

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-xl bg-opacity-10 ${color.replace('text', 'bg')}`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      {trend && (
        <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full flex items-center gap-1">
          <TrendingUp className="w-3 h-3" /> {trend}
        </span>
      )}
    </div>
    <h4 className="text-zinc-400 text-sm font-medium mb-1">{title}</h4>
    <div className="text-2xl font-bold text-white tracking-tight">{value}</div>
  </div>
);

const DashboardView: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Global Command Center</h2>
          <p className="text-zinc-400">Monitoring real-time geopolitical & cybersecurity vectors.</p>
        </div>
        <div className="text-right hidden md:block">
          <div className="text-zinc-500 text-xs font-medium uppercase mb-1">Last Updated</div>
          <div className="text-white text-sm font-mono">2024-05-24 14:02:11 GMT</div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Active Threats" value="1,284" icon={ShieldCheck} color="text-indigo-500" trend="+12%" />
        <StatCard title="Critical Incidents" value="42" icon={AlertTriangle} color="text-red-500" trend="+3" />
        <StatCard title="Regional Stability" value="64%" icon={Globe2} color="text-emerald-500" />
        <StatCard title="Intel Efficiency" value="98.2ms" icon={Zap} color="text-amber-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {mounted && <RiskMap />}
        </div>
        <div className="bg-zinc-900/40 rounded-2xl border border-zinc-800 p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-6">Threat Intensity Index</h3>
          <div className="flex-1 min-h-[300px]">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorRisks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                  <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="risks" stroke="#6366f1" fillOpacity={1} fill="url(#colorRisks)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-zinc-800">
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-400">Projected risk increase</span>
              <span className="text-red-400 font-medium">+18% next month</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Regional Risk Scoring (NIST/CVSS Based)</h3>
        <div className="h-[250px]">
          {mounted && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#27272a' }}
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', color: '#fff' }}
                />
                <Bar dataKey="alerts" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardView;


import React, { useState, useTransition } from 'react';
import { 
  SecurityIncident, 
  RiskLevel, 
  RiskAnalysis 
} from '../types';
import { 
  analyzeRiskIncident 
} from '../services/geminiService';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  ShieldAlert, 
  BrainCircuit, 
  Loader2, 
  ArrowUpRight 
} from 'lucide-react';

const MOCK_INCIDENTS: SecurityIncident[] = [
  {
    id: '1',
    title: 'Disruption in Red Sea Shipping Lanes',
    category: 'Geopolitical',
    location: 'Suez Canal / Red Sea',
    timestamp: '2 hours ago',
    description: 'Continued attacks on commercial vessels reported by local maritime security. Supply chain delays expected.',
    riskLevel: RiskLevel.CRITICAL,
    source: 'Naval Intel'
  },
  {
    id: '2',
    title: 'Zero-Day Vulnerability in Industrial Control Systems',
    category: 'Cyber',
    location: 'Global / Manufacturing Sector',
    timestamp: '4 hours ago',
    description: 'New exploit chain targeting PLC controllers used in automotive manufacturing plants across Europe and NA.',
    riskLevel: RiskLevel.HIGH,
    source: 'Cyber Defense Center'
  },
  {
    id: '3',
    title: 'Civil Unrest in Southeast Asia Tech Hub',
    category: 'Civil Unrest',
    location: 'Bangkok, Thailand',
    timestamp: '6 hours ago',
    description: 'Protests escalating near government buildings; possible internet curfew being discussed.',
    riskLevel: RiskLevel.MEDIUM,
    source: 'OSINT'
  }
];

const IntelligenceFeed: React.FC = () => {
  const [selectedIncident, setSelectedIncident] = useState<SecurityIncident | null>(null);
  const [analysis, setAnalysis] = useState<RiskAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleAnalyze = async (incident: SecurityIncident) => {
    startTransition(() => {
      setSelectedIncident(incident);
      setIsAnalyzing(true);
    });

    try {
      const result = await analyzeRiskIncident(incident);
      startTransition(() => {
        setAnalysis(result);
      });
    } catch (err) {
      console.error(err);
    } finally {
      startTransition(() => {
        setIsAnalyzing(false);
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full animate-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white tracking-tight">Intelligence Feed</h2>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 transition-colors"><Search className="w-5 h-5" /></button>
            <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 transition-colors"><Filter className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-250px)] pr-2">
          {MOCK_INCIDENTS.map((incident) => (
            <div 
              key={incident.id}
              onClick={() => handleAnalyze(incident)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer group ${
                selectedIncident?.id === incident.id 
                ? 'bg-zinc-800/80 border-indigo-500/50 ring-1 ring-indigo-500/50' 
                : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                  incident.riskLevel === RiskLevel.CRITICAL ? 'bg-red-500/10 text-red-500' :
                  incident.riskLevel === RiskLevel.HIGH ? 'bg-amber-500/10 text-amber-500' :
                  'bg-emerald-500/10 text-emerald-500'
                }`}>
                  {incident.riskLevel} Risk
                </span>
                <span className="text-xs text-zinc-500">{incident.timestamp}</span>
              </div>
              <h3 className="text-white font-semibold mb-2 group-hover:text-indigo-400 transition-colors">{incident.title}</h3>
              <p className="text-zinc-400 text-sm line-clamp-2 mb-4">{incident.description}</p>
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2 text-zinc-500">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  {incident.location}
                </div>
                <div className="text-indigo-500 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Analysis <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 flex flex-col h-fit sticky top-6">
        {!selectedIncident ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-20">
            <div className="p-6 bg-zinc-800/50 rounded-full">
              <BrainCircuit className="w-12 h-12 text-zinc-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">Select an Incident</h3>
              <p className="text-zinc-500 max-w-xs mx-auto">
                Click on any intelligence report to generate a deep-dive AI risk assessment.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-500/10 rounded-2xl">
                <BrainCircuit className="w-6 h-6 text-indigo-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Gemini Deep Analysis</h3>
                <p className="text-zinc-400 text-sm">Automated Geopolitical Risk Scoring</p>
              </div>
            </div>

            {(isAnalyzing || isPending) ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
                <p className="text-zinc-400 animate-pulse">Processing multi-vector intelligence...</p>
              </div>
            ) : analysis ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-800/40 p-4 rounded-2xl border border-zinc-700/50">
                    <div className="text-3xl font-bold text-white mb-1">{analysis.overallScore}</div>
                    <div className="text-xs text-zinc-500 uppercase font-semibold">Stability Score</div>
                  </div>
                  <div className="bg-zinc-800/40 p-4 rounded-2xl border border-zinc-700/50">
                    <div className="text-3xl font-bold text-red-500 mb-1">{analysis.geopoliticalFactor}</div>
                    <div className="text-xs text-zinc-500 uppercase font-semibold">Geopolitical Impact</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4 text-emerald-500" /> Executive Summary
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed bg-zinc-800/20 p-4 rounded-xl border border-zinc-800">
                    {analysis.summary}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Mitigation Strategies</h4>
                  <ul className="space-y-2">
                    {analysis.recommendations.map((rec, i) => (
                      <li key={i} className="flex gap-3 text-sm text-zinc-300 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/20">
                  Export Advisory Report (PDF)
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default IntelligenceFeed;

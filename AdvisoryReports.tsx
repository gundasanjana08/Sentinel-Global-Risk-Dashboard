
import React, { useState } from 'react';
import { generateDailyBriefing } from '../services/geminiService';
import { SecurityIncident, RiskLevel } from '../types';
import { 
  FileText, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Loader2,
  CalendarDays
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
  }
];

const AdvisoryReports: React.FC = () => {
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateBrief = async () => {
    setLoading(true);
    try {
      const brief = await generateDailyBriefing(MOCK_INCIDENTS);
      setReport(brief);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Advisory Center</h2>
          <p className="text-zinc-400">Strategic intelligence briefs synthesized by Sentinel AI.</p>
        </div>
        <button 
          onClick={handleGenerateBrief}
          disabled={loading}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-800 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-xl shadow-indigo-600/10"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
          Generate 24h Brief
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <div className="flex items-center gap-2 text-indigo-500 font-semibold text-sm mb-4">
              <CalendarDays className="w-4 h-4" /> Recent Briefs
            </div>
            <div className="space-y-3">
              {[
                "Global Supply Chain Outlook Q3",
                "APAC Cybersecurity Threat Vector",
                "European Energy Infrastructure"
              ].map((title, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-zinc-800 p-2 -mx-2 rounded-lg transition-colors">
                  <span className="text-zinc-300 text-sm truncate">{title}</span>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-indigo-500 transition-colors" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-2xl">
            <h4 className="text-emerald-500 font-bold text-sm mb-2 uppercase tracking-wider">System Integrity</h4>
            <div className="flex items-center gap-2 text-white font-medium">
              <CheckCircle2 className="w-5 h-5" /> 100% Data Confidence
            </div>
            <p className="text-emerald-500/60 text-xs mt-2">All cross-verification loops are healthy.</p>
          </div>
        </div>

        <div className="md:col-span-2">
          {report ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="bg-zinc-800/50 p-6 border-b border-zinc-800 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-indigo-500" />
                  <span className="font-bold text-white">Daily Intelligence Briefing</span>
                </div>
                <span className="text-xs text-zinc-500 font-mono">ID: RPT-2024-521</span>
              </div>
              <div className="p-8 prose prose-invert max-w-none text-zinc-300">
                <div className="whitespace-pre-wrap leading-relaxed text-sm">
                  {report}
                </div>
              </div>
              <div className="p-6 bg-zinc-800/30 border-t border-zinc-800 text-center">
                <p className="text-xs text-zinc-500">
                  CONFIDENTIAL: This briefing is intended for corporate security advisory only.
                </p>
              </div>
            </div>
          ) : (
            <div className="h-[500px] border-2 border-dashed border-zinc-800 rounded-3xl flex flex-col items-center justify-center text-center p-10">
              <div className="p-6 bg-zinc-900 rounded-full mb-6">
                <FileText className="w-12 h-12 text-zinc-700" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Report Loaded</h3>
              <p className="text-zinc-500 max-w-md">
                Generate a fresh briefing based on the latest 24 hours of intelligence gathering and multi-model analysis.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvisoryReports;

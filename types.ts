
export enum RiskLevel {
  CRITICAL = 'Critical',
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
  STABLE = 'Stable'
}

export interface SecurityIncident {
  id: string;
  title: string;
  category: 'Cyber' | 'Geopolitical' | 'Civil Unrest' | 'Natural Disaster';
  location: string;
  timestamp: string;
  description: string;
  riskLevel: RiskLevel;
  source: string;
}

export interface RiskAnalysis {
  overallScore: number;
  geopoliticalFactor: number;
  infrastructureVulnerability: number;
  economicStability: number;
  summary: string;
  recommendations: string[];
}

export interface RegionData {
  id: string;
  name: string;
  score: number;
  trend: 'up' | 'down' | 'neutral';
}

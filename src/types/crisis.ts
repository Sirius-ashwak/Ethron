export interface Crisis {
  id: string;
  title: string;
  type: CrisisType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: {
    country: string;
    region: string;
    coordinates: [number, number];
  };
  aiConfidence: number;
  description: string;
  predictedImpact: string;
  timeframe: string;
  affectedPopulation: number;
  sources: string[];
  lastUpdated: Date;
  trend: 'improving' | 'stable' | 'worsening';
  relatedCrises: string[];
}

export type CrisisType = 
  | 'food-security'
  | 'climate'
  | 'health'
  | 'economic'
  | 'social-unrest'
  | 'education'
  | 'energy'
  | 'migration'
  | 'security'
  | 'infrastructure';

export interface AIAgent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'processing' | 'idle';
  lastAnalysis: Date;
  specialization: string[];
}

export interface GlobalStats {
  totalCrises: number;
  activeCrises: number;
  resolvedToday: number;
  affectedPopulation: number;
  aiAccuracy: number;
  systemUptime: number;
}
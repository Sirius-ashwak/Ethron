import { Crisis, AIAgent, GlobalStats, CrisisType } from '../types/crisis';

export const mockCrises: Crisis[] = [
  {
    id: 'c001',
    title: 'Food Security Crisis in East Africa',
    type: 'food-security',
    severity: 'critical',
    location: {
      country: 'Kenya',
      region: 'East Africa',
      coordinates: [37.9062, -0.0236]
    },
    aiConfidence: 94,
    description: 'Severe drought conditions combined with locust swarms affecting crop yields across multiple districts.',
    predictedImpact: 'Up to 2.1M people may face acute food insecurity within 3 months',
    timeframe: '2-3 months',
    affectedPopulation: 850000,
    sources: ['FAO', 'World Food Programme', 'Local Agricultural Reports'],
    lastUpdated: new Date('2025-01-15T10:30:00Z'),
    trend: 'worsening',
    relatedCrises: ['c002', 'c008']
  },
  {
    id: 'c002',
    title: 'Extreme Weather Pattern Shift',
    type: 'climate',
    severity: 'high',
    location: {
      country: 'India',
      region: 'South Asia',
      coordinates: [77.1025, 28.7041]
    },
    aiConfidence: 89,
    description: 'Unusual monsoon patterns detected, potentially affecting agricultural seasons.',
    predictedImpact: 'Agricultural disruption affecting 15M farmers',
    timeframe: '1-6 months',
    affectedPopulation: 15000000,
    sources: ['NASA Weather Data', 'Indian Meteorological Department'],
    lastUpdated: new Date('2025-01-15T08:15:00Z'),
    trend: 'stable',
    relatedCrises: ['c001']
  },
  {
    id: 'c003',
    title: 'Healthcare System Strain',
    type: 'health',
    severity: 'medium',
    location: {
      country: 'Brazil',
      region: 'South America',
      coordinates: [-47.8825, -15.7942]
    },
    aiConfidence: 76,
    description: 'Rising respiratory illness cases overwhelming regional healthcare capacity.',
    predictedImpact: 'Healthcare system may reach capacity within 4-6 weeks',
    timeframe: '4-6 weeks',
    affectedPopulation: 2300000,
    sources: ['WHO', 'Brazilian Health Ministry', 'Hospital Networks'],
    lastUpdated: new Date('2025-01-15T06:45:00Z'),
    trend: 'improving',
    relatedCrises: []
  },
  {
    id: 'c004',
    title: 'Economic Instability Indicators',
    type: 'economic',
    severity: 'medium',
    location: {
      country: 'Argentina',
      region: 'South America',
      coordinates: [-58.3816, -34.6037]
    },
    aiConfidence: 82,
    description: 'Currency volatility and inflation patterns suggesting economic stress.',
    predictedImpact: 'Potential social unrest due to economic pressures',
    timeframe: '2-4 months',
    affectedPopulation: 5500000,
    sources: ['IMF', 'Central Bank Data', 'Economic Indicators'],
    lastUpdated: new Date('2025-01-15T12:20:00Z'),
    trend: 'worsening',
    relatedCrises: ['c005']
  },
  {
    id: 'c005',
    title: 'Social Unrest Risk Assessment',
    type: 'social-unrest',
    severity: 'high',
    location: {
      country: 'France',
      region: 'Western Europe',
      coordinates: [2.3522, 48.8566]
    },
    aiConfidence: 71,
    description: 'Social media sentiment analysis indicates rising tension over economic policies.',
    predictedImpact: 'Potential large-scale protests and civil disruption',
    timeframe: '2-3 weeks',
    affectedPopulation: 1200000,
    sources: ['Social Media Analytics', 'News Sentiment', 'Police Reports'],
    lastUpdated: new Date('2025-01-15T14:10:00Z'),
    trend: 'stable',
    relatedCrises: ['c004']
  },
  {
    id: 'c006',
    title: 'Education System Disruption',
    type: 'education',
    severity: 'medium',
    location: {
      country: 'Nigeria',
      region: 'West Africa',
      coordinates: [7.3986, 9.0579]
    },
    aiConfidence: 68,
    description: 'Teacher strikes and infrastructure issues affecting educational access.',
    predictedImpact: 'Learning loss for 3.2M students across affected regions',
    timeframe: '3-6 months',
    affectedPopulation: 3200000,
    sources: ['Education Ministry', 'Teacher Unions', 'UNICEF Reports'],
    lastUpdated: new Date('2025-01-15T09:30:00Z'),
    trend: 'improving',
    relatedCrises: []
  }
];

export const mockAIAgents: AIAgent[] = [
  {
    id: 'agent-forecaster',
    name: 'Forecaster Alpha',
    role: 'Predictive Analysis',
    status: 'active',
    lastAnalysis: new Date('2025-01-15T14:30:00Z'),
    specialization: ['Climate Patterns', 'Economic Indicators', 'Food Security']
  },
  {
    id: 'agent-analyst',
    name: 'Analyst Beta',
    role: 'Data Analysis',
    status: 'processing',
    lastAnalysis: new Date('2025-01-15T14:15:00Z'),
    specialization: ['Social Media', 'News Sentiment', 'Health Data']
  },
  {
    id: 'agent-historian',
    name: 'Historian Gamma',
    role: 'Pattern Recognition',
    status: 'active',
    lastAnalysis: new Date('2025-01-15T14:25:00Z'),
    specialization: ['Historical Patterns', 'Crisis Correlations', 'Trend Analysis']
  },
  {
    id: 'agent-safety',
    name: 'SafetyGuard Delta',
    role: 'Ethical Oversight',
    status: 'active',
    lastAnalysis: new Date('2025-01-15T14:28:00Z'),
    specialization: ['Bias Detection', 'Ethical Constraints', 'Human Rights']
  }
];

export const mockGlobalStats: GlobalStats = {
  totalCrises: 847,
  activeCrises: 156,
  resolvedToday: 23,
  affectedPopulation: 89500000,
  aiAccuracy: 87.3,
  systemUptime: 99.7
};

export const crisisTypeColors: Record<CrisisType, string> = {
  'food-security': '#FF6B35',
  'climate': '#00D4FF',
  'health': '#FF0000',
  'economic': '#9333EA',
  'social-unrest': '#F59E0B',
  'education': '#10B981',
  'energy': '#EF4444',
  'migration': '#8B5CF6',
  'security': '#DC2626',
  'infrastructure': '#6B7280'
};

export const crisisTypeIcons: Record<CrisisType, string> = {
  'food-security': '🌾',
  'climate': '🌡️',
  'health': '🏥',
  'economic': '💰',
  'social-unrest': '⚡',
  'education': '📚',
  'energy': '⚡',
  'migration': '🚶',
  'security': '🛡️',
  'infrastructure': '🏗️'
};
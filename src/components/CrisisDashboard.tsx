import React, { useState, useEffect } from 'react';
import { 
  Globe, Filter, Zap, Brain, Users, AlertTriangle, 
  Sword, Droplets, Wheat, Activity, TrendingUp, 
  MapPin, Clock, Target, Shield
} from 'lucide-react';
import { Crisis } from '../types/crisis';
import { mockCrises, crisisTypeColors, crisisTypeIcons } from '../data/mockData';

interface CrisisDashboardProps {
  crises: Crisis[];
  onCrisisSelect: (crisis: Crisis) => void;
  selectedCrisis: Crisis | null;
}

export default function CrisisDashboard({ crises, onCrisisSelect, selectedCrisis }: CrisisDashboardProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'conflict' | 'climate' | 'food' | 'health'>('all');
  const [aiAgents, setAiAgents] = useState([
    { name: 'Mira', role: 'GeoAI Analyst', status: 'analyzing', avatar: '🌍' },
    { name: 'Aasha', role: 'Aid Planner', status: 'active', avatar: '🤝' },
    { name: 'Zara', role: 'Conflict Predictor', status: 'monitoring', avatar: '⚔️' },
    { name: 'Nova', role: 'Climate Oracle', status: 'forecasting', avatar: '🌡️' }
  ]);

  const filters = [
    { id: 'all', label: 'All Crises', icon: Globe, color: 'from-gray-500 to-gray-600' },
    { id: 'conflict', label: 'Conflict', icon: Sword, color: 'from-red-500 to-red-600' },
    { id: 'climate', label: 'Climate', icon: Droplets, color: 'from-blue-500 to-blue-600' },
    { id: 'food', label: 'Food', icon: Wheat, color: 'from-green-500 to-green-600' },
    { id: 'health', label: 'Health', icon: Activity, color: 'from-purple-500 to-purple-600' }
  ];

  const filteredCrises = activeFilter === 'all' 
    ? crises 
    : crises.filter(crisis => {
        switch (activeFilter) {
          case 'conflict': return crisis.type === 'social-unrest' || crisis.type === 'security';
          case 'climate': return crisis.type === 'climate';
          case 'food': return crisis.type === 'food-security';
          case 'health': return crisis.type === 'health';
          default: return true;
        }
      });

  const getSeverityColor = (severity: Crisis['severity']) => {
    switch (severity) {
      case 'low': return 'from-green-400 to-green-500';
      case 'medium': return 'from-yellow-400 to-yellow-500';
      case 'high': return 'from-orange-400 to-orange-500';
      case 'critical': return 'from-red-400 to-red-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Brain className="w-8 h-8 text-cyan-400 animate-pulse-glow" />
                <div className="absolute inset-0 bg-cyan-400 rounded-full blur-sm opacity-20 animate-ping"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Noosphere</h1>
                <p className="text-sm text-gray-400">Crisis Intelligence Dashboard</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-300">Live</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-white">{filteredCrises.length}</div>
                <div className="text-xs text-gray-400">Active Crises</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Left Sidebar - Filters & AI Agents */}
        <div className="w-80 bg-black/20 backdrop-blur-md border-r border-white/10 p-6 overflow-y-auto">
          {/* Crisis Filters */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Filter className="w-5 h-5 text-cyan-400" />
              <span>Crisis Types</span>
            </h3>
            <div className="space-y-2">
              {filters.map(({ id, label, icon: Icon, color }) => (
                <button
                  key={id}
                  onClick={() => setActiveFilter(id as any)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    activeFilter === id
                      ? 'bg-gradient-to-r ' + color + ' text-white shadow-lg'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{label}</span>
                  <span className="ml-auto text-sm">
                    {id === 'all' ? crises.length : 
                     id === 'conflict' ? crises.filter(c => c.type === 'social-unrest' || c.type === 'security').length :
                     id === 'climate' ? crises.filter(c => c.type === 'climate').length :
                     id === 'food' ? crises.filter(c => c.type === 'food-security').length :
                     crises.filter(c => c.type === 'health').length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* AI Agents */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Brain className="w-5 h-5 text-purple-400" />
              <span>AI Agents Online</span>
            </h3>
            <div className="space-y-3">
              {aiAgents.map((agent, index) => (
                <div key={agent.name} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{agent.avatar}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-white">{agent.name}</div>
                      <div className="text-sm text-gray-400">{agent.role}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        agent.status === 'active' ? 'bg-green-400' :
                        agent.status === 'analyzing' ? 'bg-yellow-400 animate-pulse' :
                        'bg-blue-400'
                      }`}></div>
                      <span className="text-xs text-gray-400 capitalize">{agent.status}</span>
                    </div>
                  </div>
                  
                  {/* AI Activity Indicator */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                      <span>Processing</span>
                      <span>{Math.floor(Math.random() * 40 + 60)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1">
                      <div 
                        className="bg-gradient-to-r from-cyan-400 to-purple-500 h-1 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.floor(Math.random() * 40 + 60)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 relative">
          {/* Interactive Globe/Map */}
          <div className="h-2/3 relative bg-gradient-to-br from-blue-900/20 to-purple-900/20">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Simulated 3D Globe */}
              <div className="relative w-96 h-96">
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-2xl animate-float">
                  {/* Crisis Markers */}
                  {filteredCrises.map((crisis, index) => {
                    const angle = (index / filteredCrises.length) * 2 * Math.PI;
                    const radius = 180;
                    const x = Math.cos(angle) * radius + 192;
                    const y = Math.sin(angle) * radius + 192;
                    
                    return (
                      <div
                        key={crisis.id}
                        className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
                        style={{ left: x, top: y }}
                        onClick={() => onCrisisSelect(crisis)}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 border-white shadow-lg animate-ping bg-gradient-to-r ${getSeverityColor(crisis.severity)}`}></div>
                        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                          {crisis.title}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Orbital Data Streams */}
                <div className="absolute inset-0">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute inset-0 border border-cyan-400/30 rounded-full animate-spin"
                      style={{ 
                        animationDuration: `${20 + i * 10}s`,
                        animationDirection: i % 2 ? 'reverse' : 'normal'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Real-time Data Ticker */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-md rounded-lg p-3">
              <div className="flex items-center space-x-4 text-sm text-white">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  <span>Famine risk in Mali ↑ 12%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span>Climate anomaly detected in South Asia</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Crisis resolved in Eastern Europe</span>
                </div>
              </div>
            </div>
          </div>

          {/* Crisis Cards Grid */}
          <div className="h-1/3 p-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCrises.map((crisis) => (
                <div
                  key={crisis.id}
                  className={`bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all cursor-pointer ${
                    selectedCrisis?.id === crisis.id ? 'ring-2 ring-cyan-400' : ''
                  }`}
                  onClick={() => onCrisisSelect(crisis)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{crisisTypeIcons[crisis.type]}</span>
                      <div>
                        <h4 className="font-semibold text-white text-sm">{crisis.title}</h4>
                        <p className="text-xs text-gray-400">{crisis.location.country}</p>
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getSeverityColor(crisis.severity)}`}></div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <p className="text-xs text-gray-400">Affected</p>
                      <p className="text-sm font-semibold text-white">
                        {(crisis.affectedPopulation / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">AI Confidence</p>
                      <p className="text-sm font-semibold text-white">{crisis.aiConfidence}%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getSeverityColor(crisis.severity)}`}>
                      {crisis.severity.toUpperCase()}
                    </span>
                    <div className="flex items-center space-x-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{crisis.timeframe}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
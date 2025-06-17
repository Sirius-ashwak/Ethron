import React from 'react';
import { mockGlobalStats, mockAIAgents } from '../data/mockData';
import { Crisis } from '../types/crisis';
import { 
  Activity, AlertTriangle, CheckCircle, Users, Brain, 
  TrendingUp, Globe, Shield, Zap, Server, Clock, ChevronRight 
} from 'lucide-react';

interface DashboardProps {
  crises: Crisis[];
}

export default function Dashboard({ crises }: DashboardProps) {
  const activeCrises = crises.filter(c => c.severity === 'high' || c.severity === 'critical');
  const totalAffected = crises.reduce((sum, crisis) => sum + crisis.affectedPopulation, 0);

  const StatCard = ({ icon: Icon, title, value, subtitle, trend }: {
    icon: React.ElementType;
    title: string;
    value: string | number;
    subtitle?: string;
    trend?: 'up' | 'down' | 'stable';
  }) => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/50 hover:bg-gray-800/70 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-gray-700/50 rounded-2xl">
          <Icon className="w-6 h-6 text-gray-300" />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            trend === 'up' ? 'bg-green-500/20 text-green-400' :
            trend === 'down' ? 'bg-red-500/20 text-red-400' :
            'bg-gray-500/20 text-gray-400'
          }`}>
            <TrendingUp className={`w-3 h-3 ${trend === 'down' ? 'rotate-180' : ''}`} />
            <span>{trend === 'up' ? '+2.3%' : trend === 'down' ? '-1.2%' : '0%'}</span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-3xl font-semibold text-white mb-1">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </h3>
        <p className="text-sm font-medium text-gray-300 mb-1">{title}</p>
        {subtitle && (
          <p className="text-xs text-gray-500">{subtitle}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="fixed left-0 top-20 bottom-0 w-96 bg-gray-900/80 backdrop-blur-xl border-r border-gray-700/50 overflow-y-auto">
      <div className="p-8 space-y-8">
        {/* Global Overview */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Global Overview</h2>
            <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            <StatCard
              icon={AlertTriangle}
              title="Active Crises"
              value={activeCrises.length}
              subtitle="Requiring immediate attention"
              trend="up"
            />
            
            <StatCard
              icon={Users}
              title="People Affected"
              value={Math.round(totalAffected / 1000000) + 'M'}
              subtitle="Across all regions"
              trend="down"
            />
            
            <StatCard
              icon={Brain}
              title="AI Confidence"
              value={mockGlobalStats.aiAccuracy + '%'}
              subtitle="Prediction accuracy"
              trend="up"
            />
          </div>
        </div>

        {/* System Status */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">System Status</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400 font-medium">Operational</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Uptime</span>
              <span className="text-sm font-semibold text-white">99.7%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Data Sources</span>
              <span className="text-sm font-semibold text-white">127 Active</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Processing</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-white">Real-time</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Agents */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">AI Agents</h3>
            <span className="text-sm text-gray-500">{mockAIAgents.length} active</span>
          </div>
          
          <div className="space-y-3">
            {mockAIAgents.slice(0, 3).map((agent) => (
              <div key={agent.id} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                      <Brain className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white text-sm">{agent.name}</h4>
                      <p className="text-xs text-gray-400">{agent.role}</p>
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    agent.status === 'active' ? 'bg-green-400' :
                    agent.status === 'processing' ? 'bg-yellow-400 animate-pulse' :
                    'bg-gray-500'
                  }`}></div>
                </div>
                
                <div className="text-xs text-gray-500">
                  Last analysis: 2m ago
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full flex items-center justify-center space-x-2 py-3 text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors">
            <span>View All Agents</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h3 className="font-semibold text-white">Recent Activity</h3>
          
          <div className="space-y-3">
            {[
              { type: 'alert', message: 'Food security alert in East Africa', time: '2m ago', severity: 'high' },
              { type: 'resolved', message: 'Crisis resolved in Eastern Europe', time: '1h ago', severity: 'low' },
              { type: 'prediction', message: 'Climate anomaly detected in South Asia', time: '3h ago', severity: 'medium' }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.severity === 'high' ? 'bg-red-400' :
                  activity.severity === 'medium' ? 'bg-yellow-400' :
                  'bg-green-400'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-white font-medium">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mock Map Preview */}
        <div className="space-y-4">
          <h3 className="font-semibold text-white">Crisis Map Preview</h3>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50">
            <div className="relative h-32 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg overflow-hidden">
              {/* Mock crisis markers */}
              {crises.slice(0, 6).map((crisis, index) => (
                <div
                  key={crisis.id}
                  className="absolute w-2 h-2 rounded-full animate-pulse"
                  style={{
                    left: `${20 + (index * 12)}%`,
                    top: `${30 + (index % 2 * 20)}%`,
                    backgroundColor: 
                      crisis.severity === 'critical' ? '#EF4444' :
                      crisis.severity === 'high' ? '#FF6B35' :
                      crisis.severity === 'medium' ? '#F59E0B' : '#10B981'
                  }}
                />
              ))}
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Globe className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <div className="text-xs text-gray-400">Global Crisis Map</div>
                </div>
              </div>
            </div>
            
            <div className="mt-3 text-xs text-gray-500 text-center">
              Click main map for detailed view
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
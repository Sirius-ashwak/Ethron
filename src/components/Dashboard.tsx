import React, { useState, useEffect } from 'react';
import { mockGlobalStats, mockAIAgents } from '../data/mockData';
import { Crisis } from '../types/crisis';
import { 
  Activity, AlertTriangle, Users, Brain, TrendingUp, Globe, 
  Zap, Clock, ChevronRight, Shield, Target, Cpu, Database,
  ChevronDown, Menu, X, Settings, Bell, Layers, BarChart3,
  Eye, Wifi, Server, HardDrive, Network, Gauge, Radar,
  Satellite, Monitor, Pulse, Waves, Hexagon
} from 'lucide-react';

interface DashboardProps {
  crises: Crisis[];
}

export default function Dashboard({ crises }: DashboardProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState<'overview' | 'agents' | 'threats' | 'performance' | 'analytics'>('overview');
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(['system', 'agents']));
  const [animationStates, setAnimationStates] = useState<Record<string, boolean>>({});
  const [realTimeData, setRealTimeData] = useState({
    processingRate: 847,
    networkLatency: 23,
    systemLoad: 67,
    activeConnections: 1247
  });

  const activeCrises = crises.filter(c => c.severity === 'high' || c.severity === 'critical');
  const totalAffected = crises.reduce((sum, crisis) => sum + crisis.affectedPopulation, 0);

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        processingRate: prev.processingRate + Math.floor(Math.random() * 20 - 10),
        networkLatency: Math.max(10, prev.networkLatency + Math.floor(Math.random() * 10 - 5)),
        systemLoad: Math.max(0, Math.min(100, prev.systemLoad + Math.floor(Math.random() * 10 - 5))),
        activeConnections: prev.activeConnections + Math.floor(Math.random() * 50 - 25)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Smooth animation trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStates({ loaded: true });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  // Don't render if not visible
  if (!isVisible) return null;

  const MetricCard = ({ 
    icon: Icon, 
    label, 
    value, 
    unit = '', 
    change, 
    changeType = 'neutral',
    accent = 'cyan',
    size = 'normal',
    delay = 0,
    trend = [],
    isRealTime = false
  }: {
    icon: React.ElementType;
    label: string;
    value: string | number;
    unit?: string;
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
    accent?: 'cyan' | 'purple' | 'green' | 'orange' | 'red' | 'blue' | 'pink';
    size?: 'normal' | 'large';
    delay?: number;
    trend?: number[];
    isRealTime?: boolean;
  }) => {
    const [isCardVisible, setIsCardVisible] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);

    useEffect(() => {
      const timer = setTimeout(() => setIsCardVisible(true), delay);
      return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
      if (isRealTime && typeof value === 'number') {
        const interval = setInterval(() => {
          setCurrentValue(prev => {
            const change = Math.floor(Math.random() * 20 - 10);
            return typeof prev === 'number' ? Math.max(0, prev + change) : value;
          });
        }, 2000);
        return () => clearInterval(interval);
      }
    }, [isRealTime, value]);

    const accentColors = {
      cyan: 'from-cyan-400/10 via-cyan-500/5 to-transparent',
      purple: 'from-purple-400/10 via-purple-500/5 to-transparent',
      green: 'from-emerald-400/10 via-emerald-500/5 to-transparent',
      orange: 'from-orange-400/10 via-orange-500/5 to-transparent',
      red: 'from-red-400/10 via-red-500/5 to-transparent',
      blue: 'from-blue-400/10 via-blue-500/5 to-transparent',
      pink: 'from-pink-400/10 via-pink-500/5 to-transparent'
    };

    const iconColors = {
      cyan: 'text-cyan-400',
      purple: 'text-purple-400',
      green: 'text-emerald-400',
      orange: 'text-orange-400',
      red: 'text-red-400',
      blue: 'text-blue-400',
      pink: 'text-pink-400'
    };

    const borderColors = {
      cyan: 'border-cyan-500/20 hover:border-cyan-400/40',
      purple: 'border-purple-500/20 hover:border-purple-400/40',
      green: 'border-emerald-500/20 hover:border-emerald-400/40',
      orange: 'border-orange-500/20 hover:border-orange-400/40',
      red: 'border-red-500/20 hover:border-red-400/40',
      blue: 'border-blue-500/20 hover:border-blue-400/40',
      pink: 'border-pink-500/20 hover:border-pink-400/40'
    };

    return (
      <div 
        className={`relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border ${borderColors[accent]} transition-all duration-700 ease-out cursor-pointer group hover:scale-[1.02] hover:bg-white/10 ${
          isCardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {/* Liquid Glass Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${accentColors[accent]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
        
        {/* Glass Reflection */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Shimmer Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
        </div>
        
        <div className={`relative p-${size === 'large' ? '6' : '5'} z-10`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300`}>
              <Icon className={`w-${size === 'large' ? '6' : '5'} h-${size === 'large' ? '6' : '5'} ${iconColors[accent]}`} />
              {isRealTime && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              )}
            </div>
            {change && (
              <div className={`px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 ${
                changeType === 'positive' ? 'text-emerald-400' :
                changeType === 'negative' ? 'text-red-400' :
                'text-gray-400'
              }`}>
                <span className="text-xs font-mono font-medium">{change}</span>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-baseline space-x-2">
              <span className={`${size === 'large' ? 'text-3xl' : 'text-2xl'} font-light text-white tracking-tight`}>
                {typeof currentValue === 'number' ? currentValue.toLocaleString() : currentValue}
              </span>
              {unit && <span className="text-sm text-gray-400 font-mono">{unit}</span>}
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">
              {label}
            </div>
          </div>

          {/* Mini Trend Chart */}
          {trend.length > 0 && (
            <div className="mt-4 h-8 flex items-end space-x-1">
              {trend.map((value, index) => (
                <div
                  key={index}
                  className={`w-1 bg-gradient-to-t ${
                    value > 50 ? 'from-emerald-500 to-emerald-400' : 'from-red-500 to-red-400'
                  } rounded-full transition-all duration-300 group-hover:scale-110`}
                  style={{ height: `${Math.max(4, (value / 100) * 32)}px` }}
                ></div>
              ))}
            </div>
          )}
        </div>

        {/* Animated Border */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className={`absolute inset-0 rounded-2xl border-2 ${borderColors[accent]} animate-pulse`}></div>
        </div>
      </div>
    );
  };

  const CollapsibleModule = ({ 
    id,
    title, 
    status, 
    children,
    icon: Icon,
    delay = 0,
    badge
  }: {
    id: string;
    title: string;
    status: 'operational' | 'warning' | 'critical';
    children: React.ReactNode;
    icon: React.ElementType;
    delay?: number;
    badge?: string;
  }) => {
    const [isModuleVisible, setIsModuleVisible] = useState(false);
    const isExpanded = expandedModules.has(id);

    useEffect(() => {
      const timer = setTimeout(() => setIsModuleVisible(true), delay);
      return () => clearTimeout(timer);
    }, [delay]);
    
    const statusColors = {
      operational: 'border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-400/40',
      warning: 'border-yellow-500/20 bg-yellow-500/5 hover:border-yellow-400/40',
      critical: 'border-red-500/20 bg-red-500/5 hover:border-red-400/40'
    };

    const statusDots = {
      operational: 'bg-emerald-400 shadow-emerald-400/50',
      warning: 'bg-yellow-400 shadow-yellow-400/50',
      critical: 'bg-red-400 shadow-red-400/50'
    };

    return (
      <div 
        className={`rounded-2xl border ${statusColors[status]} backdrop-blur-xl overflow-hidden transition-all duration-700 ease-out hover:scale-[1.01] ${
          isModuleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {/* Liquid Glass Reflection */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        
        <button
          onClick={() => toggleModule(id)}
          className="relative w-full p-5 flex items-center justify-between hover:bg-white/5 transition-all duration-300 group"
        >
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-300">
              <Icon className="w-5 h-5 text-gray-300" />
            </div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{title}</h3>
            {badge && (
              <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-mono rounded-full">
                {badge}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${statusDots[status]} animate-pulse shadow-lg`}></div>
              <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">
                {status}
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-all duration-300 ${isExpanded ? 'rotate-180' : ''} group-hover:text-white`} />
          </div>
        </button>
        
        <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="p-5 pt-0 border-t border-white/10">
            {children}
          </div>
        </div>
      </div>
    );
  };

  const NavigationTab = ({ 
    id, 
    label, 
    icon: Icon, 
    isActive, 
    onClick,
    delay = 0,
    badge
  }: {
    id: string;
    label: string;
    icon: React.ElementType;
    isActive: boolean;
    onClick: () => void;
    delay?: number;
    badge?: string;
  }) => {
    const [isTabVisible, setIsTabVisible] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setIsTabVisible(true), delay);
      return () => clearTimeout(timer);
    }, [delay]);

    return (
      <button
        onClick={onClick}
        className={`relative flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 group overflow-hidden ${
          isActive 
            ? 'bg-cyan-500/20 text-cyan-300 shadow-lg border border-cyan-500/30' 
            : 'text-gray-400 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20'
        } ${isTabVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {/* Active Background Glow */}
        {isActive && (
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 rounded-xl"></div>
        )}
        
        <Icon className="w-4 h-4 relative z-10" />
        {!isCollapsed && (
          <div className="flex items-center space-x-2 relative z-10">
            <span>{label}</span>
            {badge && (
              <span className="px-1.5 py-0.5 bg-cyan-500/30 text-cyan-300 text-xs font-mono rounded-full">
                {badge}
              </span>
            )}
          </div>
        )}
        
        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
      </button>
    );
  };

  const SystemMetric = ({ 
    icon: Icon, 
    label, 
    value, 
    unit, 
    status = 'normal',
    trend = 'stable'
  }: {
    icon: React.ElementType;
    label: string;
    value: string | number;
    unit: string;
    status?: 'normal' | 'warning' | 'critical';
    trend?: 'up' | 'down' | 'stable';
  }) => {
    const statusColors = {
      normal: 'text-emerald-400',
      warning: 'text-yellow-400',
      critical: 'text-red-400'
    };

    const trendIcons = {
      up: '↗',
      down: '↘',
      stable: '→'
    };

    return (
      <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group">
        <div className="flex items-center space-x-3">
          <Icon className={`w-4 h-4 ${statusColors[status]}`} />
          <span className="text-sm text-gray-300 font-mono">{label}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-white font-mono">{value}{unit}</span>
          <span className="text-xs text-gray-500">{trendIcons[trend]}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={`fixed left-0 top-20 bottom-0 ${isCollapsed ? 'w-20' : 'w-96'} bg-black/20 backdrop-blur-2xl border-r border-white/10 overflow-y-auto transition-all duration-500 ease-in-out z-40`}>
      {/* Liquid Glass Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-black/30 to-slate-900/50"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent"></div>
      
      <div className="relative z-10 p-6 space-y-6">
        {/* Header with Close Button */}
        <div className={`flex items-center justify-between transition-all duration-300 ${animationStates.loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          {!isCollapsed && (
            <div className="space-y-1">
              <h1 className="text-lg font-semibold text-white tracking-tight">Crisis Intelligence</h1>
              <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">GLOBAL MONITORING</p>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 border border-transparent hover:border-white/20 backdrop-blur-sm"
            >
              {isCollapsed ? <Menu className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
            <button
              onClick={handleClose}
              className="p-3 text-gray-400 hover:text-white hover:bg-red-500/20 rounded-xl transition-all duration-300 border border-transparent hover:border-red-500/30 backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!isCollapsed && (
          <>
            {/* Navigation Tabs */}
            <div className="grid grid-cols-1 gap-2">
              <NavigationTab
                id="overview"
                label="Overview"
                icon={Globe}
                isActive={activeSection === 'overview'}
                onClick={() => setActiveSection('overview')}
                delay={100}
                badge={activeCrises.length.toString()}
              />
              <NavigationTab
                id="agents"
                label="AI Agents"
                icon={Brain}
                isActive={activeSection === 'agents'}
                onClick={() => setActiveSection('agents')}
                delay={150}
                badge="4"
              />
              <NavigationTab
                id="threats"
                label="Threat Matrix"
                icon={AlertTriangle}
                isActive={activeSection === 'threats'}
                onClick={() => setActiveSection('threats')}
                delay={200}
              />
              <NavigationTab
                id="performance"
                label="Performance"
                icon={Activity}
                isActive={activeSection === 'performance'}
                onClick={() => setActiveSection('performance')}
                delay={250}
              />
              <NavigationTab
                id="analytics"
                label="Analytics"
                icon={BarChart3}
                isActive={activeSection === 'analytics'}
                onClick={() => setActiveSection('analytics')}
                delay={300}
              />
            </div>

            {/* Content based on active section */}
            {activeSection === 'overview' && (
              <>
                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <MetricCard
                    icon={AlertTriangle}
                    label="CRITICAL THREATS"
                    value={activeCrises.length}
                    change="+2.3%"
                    changeType="negative"
                    accent="red"
                    delay={300}
                    trend={[45, 67, 89, 76, 92, 85, 78]}
                  />
                  <MetricCard
                    icon={Users}
                    label="AFFECTED POP"
                    value={Math.round(totalAffected / 1000000)}
                    unit="M"
                    change="-1.2%"
                    changeType="positive"
                    accent="orange"
                    delay={350}
                    trend={[78, 65, 72, 68, 59, 62, 55]}
                  />
                  <MetricCard
                    icon={Brain}
                    label="AI CONFIDENCE"
                    value={mockGlobalStats.aiAccuracy}
                    unit="%"
                    change="+0.8%"
                    changeType="positive"
                    accent="cyan"
                    delay={400}
                    trend={[85, 87, 89, 91, 88, 92, 94]}
                  />
                  <MetricCard
                    icon={Radar}
                    label="MONITORING"
                    value="127"
                    unit=" REGIONS"
                    change="ACTIVE"
                    changeType="neutral"
                    accent="purple"
                    delay={450}
                    isRealTime={true}
                  />
                </div>

                {/* System Status */}
                <CollapsibleModule 
                  id="system" 
                  title="SYSTEM STATUS" 
                  status="operational" 
                  icon={Shield} 
                  delay={500}
                  badge="99.7%"
                >
                  <div className="space-y-4">
                    <SystemMetric
                      icon={Cpu}
                      label="PROCESSING RATE"
                      value={realTimeData.processingRate}
                      unit=" TPS"
                      status="normal"
                      trend="up"
                    />
                    <SystemMetric
                      icon={Database}
                      label="DATA SOURCES"
                      value="127"
                      unit=" ACTIVE"
                      status="normal"
                      trend="stable"
                    />
                    <SystemMetric
                      icon={Network}
                      label="NETWORK LATENCY"
                      value={realTimeData.networkLatency}
                      unit="ms"
                      status={realTimeData.networkLatency > 50 ? 'warning' : 'normal'}
                      trend="stable"
                    />
                    <SystemMetric
                      icon={Shield}
                      label="SECURITY STATUS"
                      value="SECURE"
                      unit=""
                      status="normal"
                      trend="stable"
                    />
                  </div>
                </CollapsibleModule>

                {/* Real-time Processing */}
                <CollapsibleModule 
                  id="processing" 
                  title="REAL-TIME PROCESSING" 
                  status="operational" 
                  icon={Pulse} 
                  delay={600}
                  badge="LIVE"
                >
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-white/5 rounded-xl">
                        <div className="text-lg font-mono font-bold text-cyan-400">{realTimeData.processingRate}</div>
                        <div className="text-xs text-gray-400">TPS</div>
                      </div>
                      <div className="text-center p-3 bg-white/5 rounded-xl">
                        <div className="text-lg font-mono font-bold text-purple-400">{realTimeData.activeConnections}</div>
                        <div className="text-xs text-gray-400">CONNECTIONS</div>
                      </div>
                    </div>
                    <div className="h-16 bg-gray-800/50 rounded-xl p-3 flex items-end space-x-1">
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-sm animate-pulse"
                          style={{ 
                            height: `${Math.random() * 40 + 10}px`,
                            animationDelay: `${i * 100}ms`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </CollapsibleModule>
              </>
            )}

            {activeSection === 'agents' && (
              <CollapsibleModule 
                id="agents" 
                title="AI AGENT NETWORK" 
                status="operational" 
                icon={Brain} 
                delay={300}
                badge="4 ACTIVE"
              >
                <div className="space-y-3">
                  {mockAIAgents.map((agent, index) => (
                    <div key={agent.id} className="group p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <span className="text-sm text-cyan-400 font-mono font-bold">
                              {agent.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm text-white font-mono font-semibold">{agent.name.toUpperCase()}</div>
                            <div className="text-xs text-gray-400">{agent.role}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full shadow-lg ${
                            agent.status === 'active' ? 'bg-emerald-400 shadow-emerald-400/50 animate-pulse' :
                            agent.status === 'processing' ? 'bg-yellow-400 shadow-yellow-400/50 animate-pulse' :
                            'bg-gray-500'
                          }`}></div>
                          <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">
                            {agent.status}
                          </span>
                        </div>
                      </div>
                      
                      {/* Agent Performance Metrics */}
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 bg-gray-800/50 rounded-lg">
                          <div className="text-xs text-cyan-400 font-mono">{Math.floor(Math.random() * 100)}%</div>
                          <div className="text-2xs text-gray-500">ACCURACY</div>
                        </div>
                        <div className="p-2 bg-gray-800/50 rounded-lg">
                          <div className="text-xs text-purple-400 font-mono">{Math.floor(Math.random() * 500)}ms</div>
                          <div className="text-2xs text-gray-500">RESPONSE</div>
                        </div>
                        <div className="p-2 bg-gray-800/50 rounded-lg">
                          <div className="text-xs text-green-400 font-mono">{Math.floor(Math.random() * 50)}k</div>
                          <div className="text-2xs text-gray-500">PROCESSED</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleModule>
            )}

            {activeSection === 'threats' && (
              <CollapsibleModule 
                id="threats" 
                title="THREAT MATRIX" 
                status="warning" 
                icon={AlertTriangle} 
                delay={300}
                badge="ACTIVE"
              >
                <div className="space-y-4">
                  {[
                    { level: 'CRITICAL', count: crises.filter(c => c.severity === 'critical').length, color: 'red', width: '85%', risk: 'EXTREME' },
                    { level: 'HIGH', count: crises.filter(c => c.severity === 'high').length, color: 'orange', width: '65%', risk: 'HIGH' },
                    { level: 'MEDIUM', count: crises.filter(c => c.severity === 'medium').length, color: 'yellow', width: '45%', risk: 'MODERATE' },
                    { level: 'LOW', count: crises.filter(c => c.severity === 'low').length, color: 'green', width: '25%', risk: 'LOW' }
                  ].map((threat, index) => (
                    <div key={threat.level} className="p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-xs text-gray-300 font-mono font-semibold">{threat.level}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-mono ${
                            threat.color === 'red' ? 'bg-red-500/20 text-red-300' :
                            threat.color === 'orange' ? 'bg-orange-500/20 text-orange-300' :
                            threat.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-green-500/20 text-green-300'
                          }`}>
                            {threat.risk}
                          </span>
                        </div>
                        <span className={`text-lg font-mono font-bold ${
                          threat.color === 'red' ? 'text-red-400' :
                          threat.color === 'orange' ? 'text-orange-400' :
                          threat.color === 'yellow' ? 'text-yellow-400' :
                          'text-emerald-400'
                        }`}>
                          {threat.count}
                        </span>
                      </div>
                      <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ease-out group-hover:scale-105 ${
                            threat.color === 'red' ? 'bg-gradient-to-r from-red-500 to-red-400' :
                            threat.color === 'orange' ? 'bg-gradient-to-r from-orange-500 to-orange-400' :
                            threat.color === 'yellow' ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
                            'bg-gradient-to-r from-emerald-500 to-emerald-400'
                          }`}
                          style={{ width: threat.width }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleModule>
            )}

            {activeSection === 'performance' && (
              <CollapsibleModule 
                id="performance" 
                title="SYSTEM PERFORMANCE" 
                status="operational" 
                icon={Activity} 
                delay={300}
                badge="OPTIMAL"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'RESPONSE', value: '0.3s', color: 'cyan', icon: Zap },
                      { label: 'ACCURACY', value: '94.7%', color: 'purple', icon: Target },
                      { label: 'UPTIME', value: '99.7%', color: 'green', icon: Shield },
                      { label: 'LOAD', value: `${realTimeData.systemLoad}%`, color: 'orange', icon: Gauge }
                    ].map((metric, index) => (
                      <div key={metric.label} className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                        <metric.icon className={`w-6 h-6 mx-auto mb-2 ${
                          metric.color === 'cyan' ? 'text-cyan-400' :
                          metric.color === 'purple' ? 'text-purple-400' :
                          metric.color === 'green' ? 'text-emerald-400' :
                          'text-orange-400'
                        } group-hover:scale-110 transition-transform duration-300`} />
                        <div className={`text-xl font-mono font-bold mb-1 ${
                          metric.color === 'cyan' ? 'text-cyan-400' :
                          metric.color === 'purple' ? 'text-purple-400' :
                          metric.color === 'green' ? 'text-emerald-400' :
                          'text-orange-400'
                        }`}>
                          {metric.value}
                        </div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Performance Graph */}
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <div className="text-sm text-gray-300 mb-3 font-mono">SYSTEM LOAD (24H)</div>
                    <div className="h-16 flex items-end space-x-1">
                      {[...Array(24)].map((_, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-sm"
                          style={{ height: `${Math.random() * 60 + 10}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </CollapsibleModule>
            )}

            {activeSection === 'analytics' && (
              <CollapsibleModule 
                id="analytics" 
                title="PREDICTIVE ANALYTICS" 
                status="operational" 
                icon={BarChart3} 
                delay={300}
                badge="ML"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl border border-cyan-500/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <Hexagon className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-mono text-cyan-300">PREDICTION ENGINE</span>
                      </div>
                      <div className="text-xs text-gray-300">Next crisis probability: 73% (West Africa)</div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <Waves className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-mono text-purple-300">PATTERN ANALYSIS</span>
                      </div>
                      <div className="text-xs text-gray-300">Anomaly detected in climate data streams</div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-mono text-green-300">INTERVENTION</span>
                      </div>
                      <div className="text-xs text-gray-300">Recommended action: Deploy aid to Somalia</div>
                    </div>
                  </div>
                </div>
              </CollapsibleModule>
            )}

            {/* Recent Events */}
            <CollapsibleModule 
              id="events" 
              title="RECENT EVENTS" 
              status="operational" 
              icon={Clock} 
              delay={600}
              badge="LIVE"
            >
              <div className="space-y-3">
                {[
                  { 
                    time: '14:32:07', 
                    event: 'FOOD SECURITY ALERT - EAST AFRICA', 
                    severity: 'critical',
                    id: 'FS-2025-001',
                    source: 'SATELLITE'
                  },
                  { 
                    time: '13:45:23', 
                    event: 'CLIMATE ANOMALY DETECTED - SOUTH ASIA', 
                    severity: 'high',
                    id: 'CL-2025-047',
                    source: 'WEATHER'
                  },
                  { 
                    time: '12:18:45', 
                    event: 'CRISIS RESOLVED - EASTERN EUROPE', 
                    severity: 'resolved',
                    id: 'CR-2025-156',
                    source: 'FIELD'
                  }
                ].map((event, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400 font-mono">{event.time}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 font-mono">{event.source}</span>
                        <span className="text-xs text-gray-500 font-mono">{event.id}</span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-1.5 shadow-lg ${
                        event.severity === 'critical' ? 'bg-red-400 shadow-red-400/50' :
                        event.severity === 'high' ? 'bg-orange-400 shadow-orange-400/50' :
                        event.severity === 'resolved' ? 'bg-emerald-400 shadow-emerald-400/50' :
                        'bg-yellow-400 shadow-yellow-400/50'
                      } animate-pulse`}></div>
                      <span className="text-xs text-gray-300 leading-tight group-hover:text-white transition-colors duration-300">
                        {event.event}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleModule>

            {/* Footer */}
            <div className={`border-t border-white/10 pt-6 transition-all duration-500 ${animationStates.loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '700ms' }}>
              <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
                <span>ETHRON v2.1.0</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                  <span>SECURE</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Collapsed State */}
        {isCollapsed && (
          <div className="space-y-4">
            <div className="flex flex-col space-y-3">
              {[
                { icon: Globe, active: activeSection === 'overview', badge: activeCrises.length },
                { icon: Brain, active: activeSection === 'agents', badge: 4 },
                { icon: AlertTriangle, active: activeSection === 'threats' },
                { icon: Activity, active: activeSection === 'performance' },
                { icon: BarChart3, active: activeSection === 'analytics' }
              ].map(({ icon: Icon, active, badge }, index) => (
                <button 
                  key={index}
                  className={`relative p-3 rounded-xl transition-all duration-300 border backdrop-blur-sm ${
                    active 
                      ? 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30' 
                      : 'text-gray-400 hover:text-white hover:bg-white/10 border-transparent hover:border-white/20'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {badge && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {badge}
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            <div className="border-t border-white/10 pt-4">
              <div className="flex flex-col space-y-3">
                <button className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 border border-transparent hover:border-white/20 backdrop-blur-sm">
                  <Settings className="w-5 h-5" />
                </button>
                <button className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 border border-transparent hover:border-white/20 backdrop-blur-sm">
                  <Bell className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
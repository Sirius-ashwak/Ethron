import React, { useState, useEffect } from 'react';
import { mockGlobalStats, mockAIAgents } from '../data/mockData';
import { Crisis } from '../types/crisis';
import { 
  Activity, AlertTriangle, Users, Brain, TrendingUp, Globe, 
  Zap, Clock, ChevronRight, Shield, Target, Cpu, Database,
  ChevronDown, Menu, X, Settings, Bell, Layers, BarChart3,
  Eye, Wifi, Server, HardDrive, Network
} from 'lucide-react';

interface DashboardProps {
  crises: Crisis[];
}

export default function Dashboard({ crises }: DashboardProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState<'overview' | 'agents' | 'threats' | 'performance'>('overview');
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(['system', 'agents']));
  const [animationStates, setAnimationStates] = useState<Record<string, boolean>>({});

  const activeCrises = crises.filter(c => c.severity === 'high' || c.severity === 'critical');
  const totalAffected = crises.reduce((sum, crisis) => sum + crisis.affectedPopulation, 0);

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
    delay = 0
  }: {
    icon: React.ElementType;
    label: string;
    value: string | number;
    unit?: string;
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
    accent?: 'cyan' | 'purple' | 'green' | 'orange' | 'red' | 'blue';
    size?: 'normal' | 'large';
    delay?: number;
  }) => {
    const [isCardVisible, setIsCardVisible] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setIsCardVisible(true), delay);
      return () => clearTimeout(timer);
    }, [delay]);

    const accentColors = {
      cyan: 'from-cyan-400/10 via-cyan-500/5 to-transparent',
      purple: 'from-purple-400/10 via-purple-500/5 to-transparent',
      green: 'from-emerald-400/10 via-emerald-500/5 to-transparent',
      orange: 'from-orange-400/10 via-orange-500/5 to-transparent',
      red: 'from-red-400/10 via-red-500/5 to-transparent',
      blue: 'from-blue-400/10 via-blue-500/5 to-transparent'
    };

    const iconColors = {
      cyan: 'text-cyan-400',
      purple: 'text-purple-400',
      green: 'text-emerald-400',
      orange: 'text-orange-400',
      red: 'text-red-400',
      blue: 'text-blue-400'
    };

    const borderColors = {
      cyan: 'border-cyan-500/20 hover:border-cyan-400/40',
      purple: 'border-purple-500/20 hover:border-purple-400/40',
      green: 'border-emerald-500/20 hover:border-emerald-400/40',
      orange: 'border-orange-500/20 hover:border-orange-400/40',
      red: 'border-red-500/20 hover:border-red-400/40',
      blue: 'border-blue-500/20 hover:border-blue-400/40'
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
        
        <div className={`relative p-${size === 'large' ? '6' : '5'} z-10`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300`}>
              <Icon className={`w-${size === 'large' ? '6' : '5'} h-${size === 'large' ? '6' : '5'} ${iconColors[accent]}`} />
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
                {typeof value === 'number' ? value.toLocaleString() : value}
              </span>
              {unit && <span className="text-sm text-gray-400 font-mono">{unit}</span>}
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">
              {label}
            </div>
          </div>
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
    delay = 0
  }: {
    id: string;
    title: string;
    status: 'operational' | 'warning' | 'critical';
    children: React.ReactNode;
    icon: React.ElementType;
    delay?: number;
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
    delay = 0
  }: {
    id: string;
    label: string;
    icon: React.ElementType;
    isActive: boolean;
    onClick: () => void;
    delay?: number;
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
        {!isCollapsed && <span className="relative z-10">{label}</span>}
        
        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
      </button>
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
            <div className="grid grid-cols-2 gap-2">
              <NavigationTab
                id="overview"
                label="Overview"
                icon={Globe}
                isActive={activeSection === 'overview'}
                onClick={() => setActiveSection('overview')}
                delay={100}
              />
              <NavigationTab
                id="agents"
                label="AI Agents"
                icon={Brain}
                isActive={activeSection === 'agents'}
                onClick={() => setActiveSection('agents')}
                delay={150}
              />
              <NavigationTab
                id="threats"
                label="Threats"
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
            </div>

            {/* Content based on active section */}
            {activeSection === 'overview' && (
              <>
                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <MetricCard
                    icon={AlertTriangle}
                    label="ACTIVE THREATS"
                    value={activeCrises.length}
                    change="+2.3%"
                    changeType="negative"
                    accent="red"
                    delay={300}
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
                  />
                  <MetricCard
                    icon={Globe}
                    label="REGIONS"
                    value="127"
                    change="STABLE"
                    changeType="neutral"
                    accent="purple"
                    delay={450}
                  />
                </div>

                {/* System Status */}
                <CollapsibleModule id="system" title="SYSTEM STATUS" status="operational" icon={Shield} delay={500}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                      <div className="flex items-center space-x-3">
                        <Cpu className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-gray-300 font-mono">PROCESSING</span>
                      </div>
                      <span className="text-sm text-white font-mono">847 TPS</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                      <div className="flex items-center space-x-3">
                        <Database className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-gray-300 font-mono">DATA SOURCES</span>
                      </div>
                      <span className="text-sm text-white font-mono">127 ACTIVE</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm text-gray-300 font-mono">SECURITY</span>
                      </div>
                      <span className="text-sm text-emerald-400 font-mono">SECURE</span>
                    </div>
                  </div>
                </CollapsibleModule>
              </>
            )}

            {activeSection === 'agents' && (
              <CollapsibleModule id="agents" title="AI AGENTS" status="operational" icon={Brain} delay={300}>
                <div className="space-y-3">
                  {mockAIAgents.map((agent, index) => (
                    <div key={agent.id} className="group p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer">
                      <div className="flex items-center justify-between">
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
                    </div>
                  ))}
                </div>
              </CollapsibleModule>
            )}

            {activeSection === 'threats' && (
              <CollapsibleModule id="threats" title="THREAT ANALYSIS" status="warning" icon={AlertTriangle} delay={300}>
                <div className="space-y-4">
                  {[
                    { level: 'CRITICAL', count: crises.filter(c => c.severity === 'critical').length, color: 'red', width: '75%' },
                    { level: 'HIGH', count: crises.filter(c => c.severity === 'high').length, color: 'orange', width: '50%' },
                    { level: 'MEDIUM', count: crises.filter(c => c.severity === 'medium').length, color: 'yellow', width: '33%' },
                    { level: 'LOW', count: crises.filter(c => c.severity === 'low').length, color: 'green', width: '20%' }
                  ].map((threat, index) => (
                    <div key={threat.level} className="p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-300 font-mono font-semibold">{threat.level}</span>
                        <span className={`text-sm font-mono font-bold ${
                          threat.color === 'red' ? 'text-red-400' :
                          threat.color === 'orange' ? 'text-orange-400' :
                          threat.color === 'yellow' ? 'text-yellow-400' :
                          'text-emerald-400'
                        }`}>
                          {threat.count}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ease-out ${
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
              <CollapsibleModule id="performance" title="PERFORMANCE" status="operational" icon={Activity} delay={300}>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'RESPONSE', value: '0.3s', color: 'cyan' },
                    { label: 'ACCURACY', value: '94.7%', color: 'purple' },
                    { label: 'THREATS', value: '847', color: 'green' },
                    { label: 'PREVENTED', value: '156', color: 'orange' }
                  ].map((metric, index) => (
                    <div key={metric.label} className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                      <div className={`text-xl font-mono font-bold mb-1 ${
                        metric.color === 'cyan' ? 'text-cyan-400' :
                        metric.color === 'purple' ? 'text-purple-400' :
                        metric.color === 'green' ? 'text-emerald-400' :
                        'text-orange-400'
                      } group-hover:scale-110 transition-transform duration-300`}>
                        {metric.value}
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </CollapsibleModule>
            )}

            {/* Recent Events */}
            <CollapsibleModule id="events" title="RECENT EVENTS" status="operational" icon={Clock} delay={600}>
              <div className="space-y-3">
                {[
                  { 
                    time: '14:32:07', 
                    event: 'FOOD SECURITY ALERT - EAST AFRICA', 
                    severity: 'critical',
                    id: 'FS-2025-001'
                  },
                  { 
                    time: '13:45:23', 
                    event: 'CLIMATE ANOMALY DETECTED - SOUTH ASIA', 
                    severity: 'high',
                    id: 'CL-2025-047'
                  },
                  { 
                    time: '12:18:45', 
                    event: 'CRISIS RESOLVED - EASTERN EUROPE', 
                    severity: 'resolved',
                    id: 'CR-2025-156'
                  }
                ].map((event, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400 font-mono">{event.time}</span>
                      <span className="text-xs text-gray-500 font-mono">{event.id}</span>
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
                { icon: Globe, active: activeSection === 'overview' },
                { icon: Brain, active: activeSection === 'agents' },
                { icon: AlertTriangle, active: activeSection === 'threats' },
                { icon: Activity, active: activeSection === 'performance' }
              ].map(({ icon: Icon, active }, index) => (
                <button 
                  key={index}
                  className={`p-3 rounded-xl transition-all duration-300 border backdrop-blur-sm ${
                    active 
                      ? 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30' 
                      : 'text-gray-400 hover:text-white hover:bg-white/10 border-transparent hover:border-white/20'
                  }`}
                >
                  <Icon className="w-5 h-5" />
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
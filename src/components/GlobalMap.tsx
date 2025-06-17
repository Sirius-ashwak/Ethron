import React, { useState } from 'react';
import { Crisis } from '../types/crisis';
import { MapPin, TrendingUp, TrendingDown, Minus, Info, Layers, Satellite, Map } from 'lucide-react';

interface GlobalMapProps {
  crises: Crisis[];
  selectedCrisis: Crisis | null;
  onCrisisSelect: (crisis: Crisis) => void;
}

export default function GlobalMap({ crises, selectedCrisis, onCrisisSelect }: GlobalMapProps) {
  const [hoveredCrisis, setHoveredCrisis] = useState<Crisis | null>(null);
  const [mapStyle, setMapStyle] = useState<'default' | 'satellite' | 'terrain'>('default');

  const getSeverityColor = (severity: Crisis['severity']) => {
    switch (severity) {
      case 'low': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'high': return '#FF6B35';
      case 'critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getTrendIcon = (trend: Crisis['trend']) => {
    switch (trend) {
      case 'improving': return <TrendingDown className="w-3 h-3 text-green-400" />;
      case 'worsening': return <TrendingUp className="w-3 h-3 text-red-400" />;
      case 'stable': return <Minus className="w-3 h-3 text-gray-400" />;
    }
  };

  const getMapBackground = () => {
    switch (mapStyle) {
      case 'satellite':
        return 'bg-gradient-to-br from-slate-800 via-gray-900 to-black';
      case 'terrain':
        return 'bg-gradient-to-br from-green-900 via-yellow-900 to-brown-900';
      default:
        return 'bg-gradient-to-br from-blue-50 via-gray-50 to-blue-100';
    }
  };

  return (
    <div className={`relative w-full h-full ${getMapBackground()} overflow-hidden transition-all duration-500`}>
      {/* Google Maps Style Base Layer */}
      <div className="absolute inset-0">
        {mapStyle === 'default' && (
          <>
            {/* Water Bodies */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200"></div>
            
            {/* Continents */}
            <svg
              viewBox="0 0 1000 600"
              className="w-full h-full opacity-90"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* North America */}
              <path
                d="M50,150 Q100,120 150,140 L200,130 Q250,140 300,150 L350,145 Q400,160 450,150 L500,155 Q550,140 600,150 L650,145 Q700,160 750,150"
                fill="#E5E7EB"
                stroke="#D1D5DB"
                strokeWidth="1"
              />
              <path
                d="M80,180 Q130,160 180,170 L230,165 Q280,175 330,180 L380,175 Q430,190 480,180"
                fill="#E5E7EB"
                stroke="#D1D5DB"
                strokeWidth="1"
              />
              
              {/* Europe */}
              <path
                d="M400,100 Q450,90 500,100 L550,95 Q600,105 650,100 L700,105"
                fill="#E5E7EB"
                stroke="#D1D5DB"
                strokeWidth="1"
              />
              
              {/* Asia */}
              <path
                d="M500,80 Q600,70 700,80 L800,75 Q850,85 900,80"
                fill="#E5E7EB"
                stroke="#D1D5DB"
                strokeWidth="1"
              />
              <path
                d="M520,110 Q620,100 720,110 L820,105 Q870,115 920,110"
                fill="#E5E7EB"
                stroke="#D1D5DB"
                strokeWidth="1"
              />
              
              {/* Africa */}
              <path
                d="M420,200 Q470,190 520,200 L570,195 Q620,210 670,200 L720,205"
                fill="#E5E7EB"
                stroke="#D1D5DB"
                strokeWidth="1"
              />
              <path
                d="M440,250 Q490,240 540,250 L590,245 Q640,260 690,250"
                fill="#E5E7EB"
                stroke="#D1D5DB"
                strokeWidth="1"
              />
              
              {/* South America */}
              <path
                d="M200,300 Q250,290 300,300 L350,295 Q400,310 450,300"
                fill="#E5E7EB"
                stroke="#D1D5DB"
                strokeWidth="1"
              />
              <path
                d="M220,350 Q270,340 320,350 L370,345 Q420,360 470,350"
                fill="#E5E7EB"
                stroke="#D1D5DB"
                strokeWidth="1"
              />
              
              {/* Australia */}
              <path
                d="M700,400 Q750,390 800,400 L850,395"
                fill="#E5E7EB"
                stroke="#D1D5DB"
                strokeWidth="1"
              />
              
              {/* Antarctica */}
              <path
                d="M100,500 Q300,490 500,500 L700,495 Q800,505 900,500"
                fill="#F3F4F6"
                stroke="#E5E7EB"
                strokeWidth="1"
              />
            </svg>

            {/* Grid Lines (Google Maps Style) */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(rgba(156, 163, 175, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(156, 163, 175, 0.3) 1px, transparent 1px)`,
                backgroundSize: '100px 100px'
              }}></div>
            </div>
          </>
        )}

        {mapStyle === 'satellite' && (
          <>
            {/* Satellite View */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-gray-900 to-black"></div>
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.3) 0%, transparent 40%), 
                               radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.2) 0%, transparent 40%),
                               radial-gradient(circle at 40% 70%, rgba(168, 85, 247, 0.2) 0%, transparent 40%)`
            }}></div>
          </>
        )}

        {mapStyle === 'terrain' && (
          <>
            {/* Terrain View */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-yellow-100 to-orange-100"></div>
            <div className="absolute inset-0 opacity-40" style={{
              backgroundImage: `radial-gradient(circle at 30% 40%, rgba(34, 197, 94, 0.4) 0%, transparent 50%), 
                               radial-gradient(circle at 70% 60%, rgba(251, 191, 36, 0.3) 0%, transparent 50%)`
            }}></div>
          </>
        )}
      </div>

      {/* Crisis Markers */}
      <div className="absolute inset-0 z-10">
        {crises.map((crisis, index) => {
          // Convert lat/lng to screen coordinates with better distribution
          const left = Math.min(Math.max((crisis.location.coordinates[0] + 180) / 360 * 100, 5), 95);
          const top = Math.min(Math.max((90 - crisis.location.coordinates[1]) / 180 * 100, 10), 90);

          return (
            <div
              key={crisis.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                zIndex: selectedCrisis?.id === crisis.id ? 30 : hoveredCrisis?.id === crisis.id ? 25 : 20
              }}
              onMouseEnter={() => setHoveredCrisis(crisis)}
              onMouseLeave={() => setHoveredCrisis(null)}
              onClick={() => onCrisisSelect(crisis)}
            >
              {/* Google Maps Style Marker */}
              <div className="relative group">
                {/* Marker Pin */}
                <div
                  className={`relative w-6 h-8 transform transition-all duration-300 ${
                    selectedCrisis?.id === crisis.id 
                      ? 'scale-125' 
                      : hoveredCrisis?.id === crisis.id 
                      ? 'scale-110' 
                      : 'scale-100'
                  }`}
                  style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                >
                  {/* Pin Shape */}
                  <div
                    className="w-6 h-6 rounded-full border-2 border-white"
                    style={{ backgroundColor: getSeverityColor(crisis.severity) }}
                  ></div>
                  <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0"
                    style={{
                      borderLeft: '3px solid transparent',
                      borderRight: '3px solid transparent',
                      borderTop: `6px solid ${getSeverityColor(crisis.severity)}`
                    }}
                  ></div>
                  
                  {/* Pulse Effect */}
                  <div 
                    className="absolute top-0 left-0 w-6 h-6 rounded-full animate-ping opacity-40"
                    style={{ backgroundColor: getSeverityColor(crisis.severity) }}
                  ></div>
                </div>

                {/* Google Maps Style Info Window */}
                {hoveredCrisis?.id === crisis.id && (
                  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-50">
                    <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 min-w-80 max-w-sm animate-scale-in">
                      {/* Info Window Arrow */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                        <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
                      </div>
                      
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm mb-1">
                            {crisis.title}
                          </h4>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <MapPin className="w-3 h-3" />
                            <span>{crisis.location.country}, {crisis.location.region}</span>
                          </div>
                        </div>
                        {getTrendIcon(crisis.trend)}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <p className="text-xs text-gray-500">Affected</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {(crisis.affectedPopulation / 1000000).toFixed(1)}M
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">AI Confidence</p>
                          <p className="text-sm font-semibold text-gray-900">{crisis.aiConfidence}%</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: getSeverityColor(crisis.severity) }}
                        >
                          {crisis.severity.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500">
                          {crisis.timeframe}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Google Maps Style Controls */}
      <div className="absolute top-4 left-4 z-30">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <button
            onClick={() => setMapStyle('default')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mapStyle === 'default' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Map className="w-4 h-4 inline mr-2" />
            Map
          </button>
          <button
            onClick={() => setMapStyle('satellite')}
            className={`px-4 py-2 text-sm font-medium transition-colors border-l border-gray-200 ${
              mapStyle === 'satellite' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Satellite className="w-4 h-4 inline mr-2" />
            Satellite
          </button>
          <button
            onClick={() => setMapStyle('terrain')}
            className={`px-4 py-2 text-sm font-medium transition-colors border-l border-gray-200 ${
              mapStyle === 'terrain' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Layers className="w-4 h-4 inline mr-2" />
            Terrain
          </button>
        </div>
      </div>

      {/* Google Maps Style Legend */}
      <div className="absolute bottom-4 left-4 z-30">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm flex items-center space-x-2">
            <Info className="w-4 h-4" />
            <span>Crisis Severity</span>
          </h4>
          <div className="space-y-2">
            {[
              { level: 'Critical', color: '#EF4444', count: crises.filter(c => c.severity === 'critical').length },
              { level: 'High', color: '#FF6B35', count: crises.filter(c => c.severity === 'high').length },
              { level: 'Medium', color: '#F59E0B', count: crises.filter(c => c.severity === 'medium').length },
              { level: 'Low', color: '#10B981', count: crises.filter(c => c.severity === 'low').length },
            ].map((item) => (
              <div key={item.level} className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-4 h-4 rounded-full border border-white shadow-sm"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-700 font-medium">{item.level}</span>
                </div>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full font-mono">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Google Maps Style Status */}
      <div className="absolute top-4 right-4 z-30">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-900">LIVE</span>
            </div>
            <div className="text-sm text-gray-600 font-mono">
              {crises.length} ACTIVE
            </div>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            Updated 2 minutes ago
          </div>
        </div>
      </div>

      {/* Zoom Controls (Google Maps Style) */}
      <div className="absolute bottom-4 right-4 z-30">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <button className="block w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-200">
            <span className="text-lg font-light">+</span>
          </button>
          <button className="block w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors">
            <span className="text-lg font-light">−</span>
          </button>
        </div>
      </div>
    </div>
  );
}
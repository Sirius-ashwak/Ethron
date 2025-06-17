import React from 'react';
import { Crisis } from '../types/crisis';
import { 
  X, MapPin, Users, Clock, TrendingUp, TrendingDown, Minus, 
  AlertTriangle, Brain, ExternalLink, Share2, BookOpen, ChevronRight 
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface CrisisPanelProps {
  crisis: Crisis | null;
  onClose: () => void;
}

export default function CrisisPanel({ crisis, onClose }: CrisisPanelProps) {
  if (!crisis) return null;

  const getSeverityColor = (severity: Crisis['severity']) => {
    switch (severity) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTrendIcon = (trend: Crisis['trend']) => {
    switch (trend) {
      case 'improving': return <TrendingDown className="w-4 h-4 text-green-400" />;
      case 'worsening': return <TrendingUp className="w-4 h-4 text-red-400" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="fixed right-0 top-20 bottom-0 w-96 bg-gray-900/95 backdrop-blur-xl border-l border-gray-700/50 shadow-2xl z-40 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-gray-900/95 backdrop-blur-xl p-6 border-b border-gray-700/50">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-2xl">{crisis.type === 'food-security' ? '🌾' : crisis.type === 'climate' ? '🌡️' : crisis.type === 'health' ? '🏥' : '⚡'}</span>
              <span 
                className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getSeverityColor(crisis.severity)}`}
              >
                {crisis.severity.toUpperCase()}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2 leading-tight">
              {crisis.title}
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>{crisis.location.country}, {crisis.location.region}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">AI Confidence</span>
              <Brain className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="text-2xl font-semibold text-white">
              {crisis.aiConfidence}%
            </span>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">Affected</span>
              <Users className="w-4 h-4 text-orange-400" />
            </div>
            <span className="text-2xl font-semibold text-white">
              {(crisis.affectedPopulation / 1000000).toFixed(1)}M
            </span>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">Timeframe</span>
              <Clock className="w-4 h-4 text-purple-400" />
            </div>
            <span className="text-sm font-semibold text-white">
              {crisis.timeframe}
            </span>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">Trend</span>
              {getTrendIcon(crisis.trend)}
            </div>
            <span className="text-sm font-semibold text-white capitalize">
              {crisis.trend}
            </span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="font-semibold text-white mb-3">Current Situation</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            {crisis.description}
          </p>
        </div>

        {/* AI Prediction */}
        <div className="bg-cyan-500/10 backdrop-blur-sm rounded-2xl p-4 border border-cyan-500/20">
          <div className="flex items-center space-x-2 mb-2">
            <Brain className="w-4 h-4 text-cyan-400" />
            <h3 className="font-semibold text-cyan-300">AI Prediction</h3>
          </div>
          <p className="text-sm text-cyan-200">
            {crisis.predictedImpact}
          </p>
        </div>

        {/* Data Sources */}
        <div>
          <h3 className="font-semibold text-white mb-3">Data Sources</h3>
          <div className="space-y-2">
            {crisis.sources.map((source, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-gray-800/50 backdrop-blur-sm rounded-xl hover:bg-gray-800/70 transition-colors cursor-pointer"
              >
                <span className="text-sm text-gray-300 font-medium">{source}</span>
                <ExternalLink className="w-4 h-4 text-gray-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Related Crises */}
        {crisis.relatedCrises.length > 0 && (
          <div>
            <h3 className="font-semibold text-white mb-3">Related Crises</h3>
            <div className="space-y-2">
              {crisis.relatedCrises.map((relatedId, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-800/50 backdrop-blur-sm rounded-xl hover:bg-gray-800/70 transition-colors cursor-pointer"
                >
                  <span className="text-sm text-gray-300 font-medium">Crisis {relatedId}</span>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Last Updated */}
        <div className="text-xs text-gray-500 pt-4 border-t border-gray-700">
          Last updated: {formatDistanceToNow(crisis.lastUpdated)} ago
        </div>
      </div>

      {/* Action Buttons */}
      <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-xl p-6 border-t border-gray-700/50">
        <div className="flex space-x-3">
          <button className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-3 px-4 rounded-2xl font-medium transition-colors flex items-center justify-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>Full Report</span>
          </button>
          <button className="p-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-2xl transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
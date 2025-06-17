import React, { useState, useEffect } from 'react';
import { Crisis } from '../types/crisis';
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Target, Clock } from 'lucide-react';

interface AIInsightsProps {
  crises: Crisis[];
  selectedCrisis: Crisis | null;
}

interface AIInsight {
  id: string;
  type: 'prediction' | 'correlation' | 'recommendation' | 'alert';
  title: string;
  description: string;
  confidence: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  relatedCrises: string[];
  timestamp: Date;
}

export default function AIInsights({ crises, selectedCrisis }: AIInsightsProps) {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Simulate AI insight generation
  useEffect(() => {
    const generateInsights = () => {
      setIsGenerating(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const newInsights: AIInsight[] = [
          {
            id: 'insight-1',
            type: 'prediction',
            title: 'Food Crisis Expansion Predicted',
            description: 'AI models predict 73% likelihood of food security crisis spreading to neighboring regions within 6 weeks based on climate patterns and supply chain disruptions.',
            confidence: 87,
            priority: 'critical',
            relatedCrises: ['c001', 'c002'],
            timestamp: new Date()
          },
          {
            id: 'insight-2',
            type: 'correlation',
            title: 'Economic-Social Unrest Pattern Detected',
            description: 'Strong correlation identified between economic instability indicators and social unrest probability. Historical data shows 89% accuracy in similar scenarios.',
            confidence: 91,
            priority: 'high',
            relatedCrises: ['c004', 'c005'],
            timestamp: new Date()
          },
          {
            id: 'insight-3',
            type: 'recommendation',
            title: 'Preventive Healthcare Intervention',
            description: 'Recommend immediate deployment of mobile health units to regions showing early indicators of healthcare system strain.',
            confidence: 78,
            priority: 'medium',
            relatedCrises: ['c003'],
            timestamp: new Date()
          },
          {
            id: 'insight-4',
            type: 'alert',
            title: 'Climate Pattern Anomaly',
            description: 'Unusual weather patterns detected in South Asia. AI models suggest potential for extreme weather events in next 2-3 weeks.',
            confidence: 82,
            priority: 'high',
            relatedCrises: ['c002'],
            timestamp: new Date()
          }
        ];
        
        setInsights(newInsights);
        setIsGenerating(false);
      }, 2000);
    };

    generateInsights();
  }, [crises]);

  const getInsightIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'prediction': return <TrendingUp className="w-4 h-4" />;
      case 'correlation': return <Brain className="w-4 h-4" />;
      case 'recommendation': return <Lightbulb className="w-4 h-4" />;
      case 'alert': return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: AIInsight['priority']) => {
    switch (priority) {
      case 'low': return 'text-green-400 bg-green-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/20';
      case 'critical': return 'text-red-400 bg-red-500/20';
    }
  };

  const getTypeColor = (type: AIInsight['type']) => {
    switch (type) {
      case 'prediction': return 'text-cyan-400 bg-cyan-500/20';
      case 'correlation': return 'text-purple-400 bg-purple-500/20';
      case 'recommendation': return 'text-green-400 bg-green-500/20';
      case 'alert': return 'text-red-400 bg-red-500/20';
    }
  };

  return (
    <div className="bg-gray-900/95 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-white">AI Insights</h2>
        </div>
        <div className="flex items-center space-x-2">
          {isGenerating && (
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              <span>Analyzing...</span>
            </div>
          )}
          <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full">
            {insights.length} insights
          </span>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="border border-gray-700/50 rounded-lg p-4 hover:bg-gray-800/30 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-lg ${getTypeColor(insight.type)}`}>
                  {getInsightIcon(insight.type)}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">
                    {insight.title}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-2xs font-medium ${getPriorityColor(insight.priority)}`}>
                      {insight.priority.toUpperCase()}
                    </span>
                    <span className="text-2xs text-gray-500">
                      {insight.confidence}% confidence
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-2xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>2m ago</span>
              </div>
            </div>

            <p className="text-sm text-gray-300 mb-3 leading-relaxed">
              {insight.description}
            </p>

            {insight.relatedCrises.length > 0 && (
              <div className="flex items-center space-x-2">
                <Target className="w-3 h-3 text-gray-500" />
                <span className="text-2xs text-gray-500">
                  Related to {insight.relatedCrises.length} crisis{insight.relatedCrises.length > 1 ? 'es' : ''}
                </span>
              </div>
            )}

            {/* Confidence Bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-2xs text-gray-500 mb-1">
                <span>AI Confidence</span>
                <span>{insight.confidence}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-1.5">
                <div
                  className="bg-cyan-400 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${insight.confidence}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Model Status */}
      <div className="mt-6 pt-4 border-t border-gray-700/50">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-gray-400">AI Models Active</span>
          </div>
          <span className="text-gray-500">GPT-4o + Gemini 1.5</span>
        </div>
      </div>
    </div>
  );
}
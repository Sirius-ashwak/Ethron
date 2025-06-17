import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, AlertTriangle, Clock, Brain, Target } from 'lucide-react';
import { Crisis } from '../types/crisis';

interface ForecastTimelineProps {
  crises: Crisis[];
  onClose: () => void;
}

interface TimelineEvent {
  id: string;
  date: Date;
  type: 'past' | 'present' | 'predicted';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  confidence?: number;
  relatedCrisis?: string;
}

export default function ForecastTimeline({ crises, onClose }: ForecastTimelineProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'6m' | '1y' | '2y'>('1y');
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Generate timeline events based on crises
    const events: TimelineEvent[] = [];
    
    // Past events
    events.push(
      {
        id: 'past-1',
        date: new Date('2024-08-15'),
        type: 'past',
        severity: 'high',
        title: 'East Africa Drought Begins',
        description: 'Severe drought conditions detected across Kenya, Somalia, and Ethiopia',
        relatedCrisis: 'c001'
      },
      {
        id: 'past-2',
        date: new Date('2024-11-20'),
        type: 'past',
        severity: 'medium',
        title: 'Economic Instability Indicators',
        description: 'Currency volatility patterns emerge in South America',
        relatedCrisis: 'c004'
      }
    );

    // Present events
    events.push(
      {
        id: 'present-1',
        date: new Date(),
        type: 'present',
        severity: 'critical',
        title: 'Current Crisis Peak',
        description: 'Multiple crises converging - food security, climate, and social unrest',
        confidence: 94
      }
    );

    // Predicted events
    events.push(
      {
        id: 'pred-1',
        date: new Date('2025-03-15'),
        type: 'predicted',
        severity: 'high',
        title: 'Predicted Food Crisis Expansion',
        description: 'AI models predict 73% likelihood of food security crisis spreading to West Africa',
        confidence: 87
      },
      {
        id: 'pred-2',
        date: new Date('2025-06-20'),
        type: 'predicted',
        severity: 'medium',
        title: 'Climate Pattern Shift',
        description: 'Monsoon disruption likely to affect South Asian agriculture',
        confidence: 78
      },
      {
        id: 'pred-3',
        date: new Date('2025-09-10'),
        type: 'predicted',
        severity: 'low',
        title: 'Recovery Phase Begins',
        description: 'AI intervention strategies show positive impact on crisis resolution',
        confidence: 82
      }
    );

    setTimelineEvents(events.sort((a, b) => a.date.getTime() - b.date.getTime()));
  }, [crises]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'from-green-400 to-green-500';
      case 'medium': return 'from-yellow-400 to-yellow-500';
      case 'high': return 'from-orange-400 to-orange-500';
      case 'critical': return 'from-red-400 to-red-500';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'past': return 'text-gray-400';
      case 'present': return 'text-cyan-400';
      case 'predicted': return 'text-purple-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl shadow-2xl border border-white/10 w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-cyan-400" />
              <div>
                <h2 className="text-2xl font-bold text-white">Crisis Forecast Timeline</h2>
                <p className="text-sm text-gray-400">AI-powered temporal analysis and prediction</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex bg-white/10 rounded-lg p-1">
                {[
                  { id: '6m', label: '6 Months' },
                  { id: '1y', label: '1 Year' },
                  { id: '2y', label: '2 Years' }
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedPeriod(id as any)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedPeriod === id
                        ? 'bg-cyan-500 text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Content */}
        <div className="flex-1 p-6 overflow-hidden">
          <div className="relative h-full">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-600 via-cyan-400 to-purple-500 transform -translate-x-1/2"></div>

            {/* Current Date Indicator */}
            <div className="absolute left-1/2 top-1/3 w-4 h-4 bg-cyan-400 rounded-full transform -translate-x-1/2 animate-pulse shadow-lg">
              <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping"></div>
            </div>

            {/* Timeline Events */}
            <div className="h-full overflow-y-auto">
              <div className="space-y-8 py-8">
                {timelineEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    {/* Event Card */}
                    <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-white mb-1">{event.title}</h4>
                            <p className="text-sm text-gray-400">
                              {event.date.toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getSeverityColor(event.severity)}`}></div>
                            {event.type === 'predicted' && (
                              <Brain className="w-4 h-4 text-purple-400" />
                            )}
                          </div>
                        </div>

                        <p className="text-sm text-gray-300 mb-3">{event.description}</p>

                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(event.type)} bg-white/10`}>
                            {event.type.toUpperCase()}
                          </span>
                          {event.confidence && (
                            <div className="flex items-center space-x-1 text-xs text-gray-400">
                              <Target className="w-3 h-3" />
                              <span>{event.confidence}% confidence</span>
                            </div>
                          )}
                        </div>

                        {/* Severity Curve */}
                        {event.type === 'predicted' && (
                          <div className="mt-3">
                            <div className="text-xs text-gray-400 mb-1">Impact Trajectory</div>
                            <div className="h-8 bg-gray-800 rounded relative overflow-hidden">
                              <div 
                                className={`h-full bg-gradient-to-r ${getSeverityColor(event.severity)} opacity-60`}
                                style={{ width: `${event.confidence}%` }}
                              ></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <TrendingUp className="w-4 h-4 text-white" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Timeline Marker */}
                    <div className="w-2/12 flex justify-center">
                      <div className={`w-6 h-6 rounded-full border-4 border-white shadow-lg bg-gradient-to-r ${getSeverityColor(event.severity)}`}>
                        {event.type === 'present' && (
                          <div className="w-full h-full bg-cyan-400 rounded-full animate-pulse"></div>
                        )}
                      </div>
                    </div>

                    {/* Empty Space */}
                    <div className="w-5/12"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-black/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="text-sm text-gray-400">Historical</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-cyan-400">Current</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <span className="text-sm text-purple-400">AI Predicted</span>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Powered by temporal pattern analysis & machine learning
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
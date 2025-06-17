import React, { useState, useEffect } from 'react';
import { 
  MapPin, Users, TrendingDown, TrendingUp, Minus, 
  Truck, Clock, Heart, Utensils, Package, 
  AlertTriangle, CheckCircle, ArrowRight, Target,
  Zap, Globe, Brain, Calendar
} from 'lucide-react';
import { FoodSecurityData, FoodSurplus, ActionPlan } from '../types/foodSecurity';
import { mockFoodSecurityData, mockFoodSurplus, mockActionPlans, getHungerLevelColor, getFoodCategoryIcon } from '../data/foodSecurityData';

interface FoodSecurityTrackerProps {
  onClose: () => void;
}

export default function FoodSecurityTracker({ onClose }: FoodSecurityTrackerProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'surplus' | 'routes' | 'actions'>('overview');
  const [selectedRegion, setSelectedRegion] = useState<FoodSecurityData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const getTrendIcon = (trend: FoodSecurityData['predictedTrend']) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-success-500" />;
      case 'deteriorating': return <TrendingDown className="w-4 h-4 text-danger-500" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const runAIAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  const RegionCard = ({ region }: { region: FoodSecurityData }) => (
    <div 
      className="bg-white dark:bg-dark-800 rounded-lg p-4 border border-gray-200 dark:border-dark-700 hover:shadow-lg transition-all cursor-pointer"
      onClick={() => setSelectedRegion(region)}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">{region.country}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{region.region}</p>
        </div>
        <div className="flex items-center space-x-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: getHungerLevelColor(region.hungerLevel) }}
          ></div>
          {getTrendIcon(region.predictedTrend)}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p className="text-xs text-gray-500">Affected Population</p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {(region.affectedPopulation / 1000000).toFixed(1)}M
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Food Availability</p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {region.foodAvailability}%
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className={`px-2 py-1 rounded-full text-xs font-medium text-white`}
              style={{ backgroundColor: getHungerLevelColor(region.hungerLevel) }}>
          {region.hungerLevel.toUpperCase()}
        </span>
        <span className="text-xs text-gray-500">
          AI: {region.aiConfidence}%
        </span>
      </div>
    </div>
  );

  const SurplusCard = ({ surplus }: { surplus: FoodSurplus }) => (
    <div className="bg-white dark:bg-dark-800 rounded-lg p-4 border border-gray-200 dark:border-dark-700">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">{surplus.contributorName}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
            {surplus.contributorType} • {surplus.location.country}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          surplus.status === 'available' ? 'bg-success-100 text-success-700' :
          surplus.status === 'reserved' ? 'bg-warning-100 text-warning-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {surplus.status}
        </span>
      </div>

      <div className="flex items-center space-x-4 mb-3">
        <div className="flex items-center space-x-1">
          <Package className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium">{surplus.totalWeight}kg</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm">
            {Math.ceil((surplus.expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {surplus.foodItems.slice(0, 3).map((item, index) => (
          <span key={index} className="flex items-center space-x-1 bg-gray-100 dark:bg-dark-700 px-2 py-1 rounded text-xs">
            <span>{getFoodCategoryIcon(item.category)}</span>
            <span>{item.name}</span>
          </span>
        ))}
      </div>

      <button className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
        Request Pickup
      </button>
    </div>
  );

  const ActionPlanCard = ({ plan }: { plan: ActionPlan }) => (
    <div className="bg-white dark:bg-dark-800 rounded-lg p-4 border border-gray-200 dark:border-dark-700">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">{plan.title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{plan.timeframe}</p>
        </div>
        <div className="flex items-center space-x-2">
          {plan.aiGenerated && <Brain className="w-4 h-4 text-primary-500" />}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            plan.urgency === 'critical' ? 'bg-danger-100 text-danger-700' :
            plan.urgency === 'high' ? 'bg-warning-100 text-warning-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {plan.urgency}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{plan.description}</p>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p className="text-xs text-gray-500">Estimated Impact</p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {plan.estimatedImpact.toLocaleString()} people
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">AI Confidence</p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {plan.confidence}%
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            plan.status === 'approved' ? 'bg-success-500' :
            plan.status === 'in-progress' ? 'bg-warning-500' :
            'bg-gray-500'
          }`}></div>
          <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">
            {plan.status.replace('-', ' ')}
          </span>
        </div>
        <button className="text-primary-500 hover:text-primary-600 text-sm font-medium">
          View Details
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-dark-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-dark-700 w-full max-w-7xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-dark-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Utensils className="w-8 h-8 text-primary-500" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-danger-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Food Security Tracker
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  AI-powered global hunger prevention & food redistribution
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={runAIAnalysis}
                disabled={isAnalyzing}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white rounded-lg transition-colors"
              >
                {isAnalyzing ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Zap className="w-4 h-4" />
                )}
                <span>AI Analysis</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mt-4 bg-gray-100 dark:bg-dark-800 rounded-lg p-1">
            {[
              { id: 'overview', label: 'Hunger Hotspots', icon: AlertTriangle },
              { id: 'surplus', label: 'Food Surplus', icon: Heart },
              { id: 'routes', label: 'Distribution', icon: Truck },
              { id: 'actions', label: 'AI Action Plans', icon: Target }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === id
                    ? 'bg-white dark:bg-dark-700 text-primary-600 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'overview' && (
            <div className="h-full flex">
              {/* Map Area */}
              <div className="flex-1 relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-dark-800 dark:to-dark-900">
                <div className="absolute inset-4">
                  <div className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm rounded-lg p-4 h-full">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                      <Globe className="w-5 h-5 text-primary-500" />
                      <span>Global Hunger Map</span>
                    </h3>
                    
                    {/* Simulated Map with Hotspots */}
                    <div className="relative h-full bg-gray-100 dark:bg-dark-700 rounded-lg overflow-hidden">
                      {mockFoodSecurityData.map((region, index) => {
                        const left = Math.random() * 80 + 10;
                        const top = Math.random() * 60 + 20;
                        return (
                          <div
                            key={region.id}
                            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                            style={{ left: `${left}%`, top: `${top}%` }}
                            onClick={() => setSelectedRegion(region)}
                          >
                            <div
                              className="w-6 h-6 rounded-full border-2 border-white shadow-lg animate-pulse"
                              style={{ backgroundColor: getHungerLevelColor(region.hungerLevel) }}
                            ></div>
                            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                              {region.country}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-80 border-l border-gray-200 dark:border-dark-700 p-4 overflow-y-auto">
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-danger-50 to-warning-50 dark:from-danger-900/20 dark:to-warning-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Critical Alert
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {mockFoodSecurityData.filter(r => r.hungerLevel === 'critical').length} regions 
                      in critical hunger state affecting{' '}
                      {(mockFoodSecurityData
                        .filter(r => r.hungerLevel === 'critical')
                        .reduce((sum, r) => sum + r.affectedPopulation, 0) / 1000000
                      ).toFixed(1)}M people
                    </p>
                  </div>

                  {mockFoodSecurityData.map(region => (
                    <RegionCard key={region.id} region={region} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'surplus' && (
            <div className="p-6 h-full overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockFoodSurplus.map(surplus => (
                  <SurplusCard key={surplus.id} surplus={surplus} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'actions' && (
            <div className="p-6 h-full overflow-y-auto">
              <div className="space-y-6">
                {mockActionPlans.map(plan => (
                  <ActionPlanCard key={plan.id} plan={plan} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* AI Analysis Overlay */}
        {isAnalyzing && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white dark:bg-dark-800 rounded-lg p-6 shadow-xl border border-gray-200 dark:border-dark-700">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    AI Analysis in Progress...
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Processing global food security patterns
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import IntroPage from './components/IntroPage';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import GlobalMap from './components/GlobalMap';
import CrisisPanel from './components/CrisisPanel';
import FilterPanel from './components/FilterPanel';
import VoiceInterface from './components/VoiceInterface';
import AIInsights from './components/AIInsights';
import MultiLanguageSupport from './components/MultiLanguageSupport';
import ExportReports from './components/ExportReports';
import FoodSecurityTracker from './components/FoodSecurityTracker';
import FoodSurplusRegistration from './components/FoodSurplusRegistration';
import CrisisDashboard from './components/CrisisDashboard';
import ForecastTimeline from './components/ForecastTimeline';
import AgentChat from './components/AgentChat';
import ImpactContribution from './components/ImpactContribution';
import { mockCrises } from './data/mockData';
import { Crisis } from './types/crisis';
import { Filter, Brain, Utensils, Download, Plus, Calendar, MessageCircle, Heart } from 'lucide-react';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [userRole, setUserRole] = useState<'public' | 'ngo' | 'government'>('public');
  const [selectedCrisis, setSelectedCrisis] = useState<Crisis | null>(null);
  const [filteredCrises, setFilteredCrises] = useState<Crisis[]>(mockCrises);
  const [showFilters, setShowFilters] = useState(false);
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [showExportPanel, setShowExportPanel] = useState(false);
  const [showFoodTracker, setShowFoodTracker] = useState(false);
  const [showSurplusRegistration, setShowSurplusRegistration] = useState(false);
  const [showForecastTimeline, setShowForecastTimeline] = useState(false);
  const [showAgentChat, setShowAgentChat] = useState(false);
  const [showImpactHub, setShowImpactHub] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const handleCrisisSelect = (crisis: Crisis) => {
    setSelectedCrisis(crisis);
  };

  const handleCloseCrisisPanel = () => {
    setSelectedCrisis(null);
  };

  const handleFilterChange = (filters: any) => {
    let filtered = [...mockCrises];

    // Apply severity filter
    if (filters.severity.length > 0) {
      filtered = filtered.filter(crisis => filters.severity.includes(crisis.severity));
    }

    // Apply type filter
    if (filters.types.length > 0) {
      filtered = filtered.filter(crisis => filters.types.includes(crisis.type));
    }

    // Apply region filter
    if (filters.regions.length > 0) {
      filtered = filtered.filter(crisis => filters.regions.includes(crisis.location.region));
    }

    // Apply search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(crisis => 
        crisis.title.toLowerCase().includes(searchLower) ||
        crisis.description.toLowerCase().includes(searchLower) ||
        crisis.location.country.toLowerCase().includes(searchLower) ||
        crisis.location.region.toLowerCase().includes(searchLower)
      );
    }

    setFilteredCrises(filtered);
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('show filters') || lowerCommand.includes('open filters')) {
      setShowFilters(true);
    } else if (lowerCommand.includes('hide filters') || lowerCommand.includes('close filters')) {
      setShowFilters(false);
    } else if (lowerCommand.includes('show insights') || lowerCommand.includes('ai insights')) {
      setShowAIInsights(true);
    } else if (lowerCommand.includes('export') || lowerCommand.includes('download')) {
      setShowExportPanel(true);
    } else if (lowerCommand.includes('food security') || lowerCommand.includes('food tracker')) {
      setShowFoodTracker(true);
    } else if (lowerCommand.includes('register food') || lowerCommand.includes('donate food')) {
      setShowSurplusRegistration(true);
    } else if (lowerCommand.includes('timeline') || lowerCommand.includes('forecast')) {
      setShowForecastTimeline(true);
    } else if (lowerCommand.includes('chat') || lowerCommand.includes('agent')) {
      setShowAgentChat(true);
    } else if (lowerCommand.includes('impact') || lowerCommand.includes('contribute')) {
      setShowImpactHub(true);
    }
  };

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
  };

  const handleSurplusSubmit = (data: any) => {
    console.log('Food surplus registered:', data);
  };

  const handleEnterNoosphere = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return <IntroPage onEnter={handleEnterNoosphere} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-slate-900">
      {/* Header */}
      <Header
        darkMode={darkMode}
        toggleDarkMode={setDarkMode}
        userRole={userRole}
        setUserRole={setUserRole}
      />

      {/* Main Content */}
      <div className="flex h-screen pt-20">
        {/* Left Dashboard */}
        <Dashboard crises={filteredCrises} />

        {/* Central Map Area */}
        <div className="flex-1 relative" style={{ marginLeft: '0px', marginRight: selectedCrisis ? '384px' : '0' }}>
          {/* Map Container */}
          <div className="h-full relative">
            <GlobalMap
              crises={filteredCrises}
              selectedCrisis={selectedCrisis}
              onCrisisSelect={handleCrisisSelect}
            />

            {/* Floating Controls */}
            <div className="absolute top-8 left-8 z-20 space-y-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-3 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 px-4 py-3 rounded-2xl border border-gray-200/50 shadow-lg transition-all duration-200"
              >
                <Filter className="w-5 h-5" />
                <span className="font-medium">Filters</span>
              </button>

              <button
                onClick={() => setShowAIInsights(!showAIInsights)}
                className="flex items-center space-x-3 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 px-4 py-3 rounded-2xl border border-gray-200/50 shadow-lg transition-all duration-200"
              >
                <Brain className="w-5 h-5 text-blue-600" />
                <span className="font-medium">AI Insights</span>
              </button>

              <button
                onClick={() => setShowFoodTracker(!showFoodTracker)}
                className="flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-2xl shadow-lg transition-all duration-200"
              >
                <Utensils className="w-5 h-5" />
                <span className="font-medium">Food Security</span>
              </button>

              <button
                onClick={() => setShowExportPanel(!showExportPanel)}
                className="flex items-center space-x-3 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 px-4 py-3 rounded-2xl border border-gray-200/50 shadow-lg transition-all duration-200"
              >
                <Download className="w-5 h-5" />
                <span className="font-medium">Export</span>
              </button>
            </div>

            {/* Top Right Controls */}
            <div className="absolute top-8 right-8 z-20 flex items-center space-x-3">
              <button
                onClick={() => setShowSurplusRegistration(true)}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-2xl shadow-lg transition-all duration-200"
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">Donate Food</span>
              </button>
              
              <MultiLanguageSupport
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
              />
            </div>

            {/* Crisis Count Badge */}
            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 border border-gray-200/50 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-gray-900">
                  {filteredCrises.length} Active Crises
                </span>
              </div>
            </div>
          </div>

          {/* Overlay Panels */}
          {(showFilters || showAIInsights || showExportPanel) && (
            <div className="absolute inset-0 z-30">
              <div 
                className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                onClick={() => {
                  setShowFilters(false);
                  setShowAIInsights(false);
                  setShowExportPanel(false);
                }}
              ></div>
              
              {showFilters && (
                <div className="absolute top-24 left-8 w-80">
                  <FilterPanel 
                    crises={mockCrises}
                    onFilterChange={handleFilterChange}
                    onClose={() => setShowFilters(false)}
                  />
                </div>
              )}

              {showAIInsights && (
                <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-96">
                  <AIInsights 
                    crises={filteredCrises}
                    selectedCrisis={selectedCrisis}
                  />
                </div>
              )}

              {showExportPanel && (
                <div className="absolute top-24 right-8 w-80">
                  <ExportReports 
                    crises={filteredCrises}
                    selectedCrisis={selectedCrisis}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Crisis Panel */}
        <CrisisPanel
          crisis={selectedCrisis}
          onClose={handleCloseCrisisPanel}
        />
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col space-y-3">
        <button
          onClick={() => setShowForecastTimeline(true)}
          className="p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl shadow-xl transition-all transform hover:scale-105"
          title="Forecast Timeline"
        >
          <Calendar className="w-6 h-6" />
        </button>
        
        <button
          onClick={() => setShowAgentChat(true)}
          className="p-4 bg-cyan-600 hover:bg-cyan-700 text-white rounded-2xl shadow-xl transition-all transform hover:scale-105"
          title="AI Agent Chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
        
        <button
          onClick={() => setShowImpactHub(true)}
          className="p-4 bg-pink-600 hover:bg-pink-700 text-white rounded-2xl shadow-xl transition-all transform hover:scale-105"
          title="Impact Hub"
        >
          <Heart className="w-6 h-6" />
        </button>
      </div>

      {/* Modals */}
      {showForecastTimeline && (
        <ForecastTimeline 
          crises={filteredCrises}
          onClose={() => setShowForecastTimeline(false)}
        />
      )}

      {showAgentChat && (
        <AgentChat onClose={() => setShowAgentChat(false)} />
      )}

      {showImpactHub && (
        <ImpactContribution onClose={() => setShowImpactHub(false)} />
      )}

      {showFoodTracker && (
        <FoodSecurityTracker onClose={() => setShowFoodTracker(false)} />
      )}

      {showSurplusRegistration && (
        <FoodSurplusRegistration 
          onClose={() => setShowSurplusRegistration(false)}
          onSubmit={handleSurplusSubmit}
        />
      )}

      {/* Voice Interface */}
      <VoiceInterface
        onVoiceCommand={handleVoiceCommand}
        darkMode={darkMode}
      />
    </div>
  );
}

export default App;
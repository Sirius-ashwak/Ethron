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
  const [showDashboard, setShowDashboard] = useState(true);

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
        {/* Left Dashboard - Only show if enabled */}
        {showDashboard && <Dashboard crises={filteredCrises} />}

        {/* Central Map Area */}
        <div 
          className="flex-1 relative transition-all duration-300" 
          style={{ 
            marginLeft: showDashboard ? '384px' : '0px', 
            marginRight: selectedCrisis ? '384px' : '0' 
          }}
        >
          {/* Map Container */}
          <div className="h-full relative">
            <GlobalMap
              crises={filteredCrises}
              selectedCrisis={selectedCrisis}
              onCrisisSelect={handleCrisisSelect}
            />

            {/* Floating Controls - Left Side */}
            <div className="absolute top-6 left-6 z-20 flex flex-col space-y-3">
              {/* Dashboard Toggle */}
              <button
                onClick={() => setShowDashboard(!showDashboard)}
                className="flex items-center justify-center w-12 h-12 bg-gray-900/90 backdrop-blur-sm hover:bg-gray-800 text-white rounded-xl border border-gray-700/50 shadow-lg transition-all duration-200 hover:scale-105"
                title="Toggle Dashboard"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center w-12 h-12 bg-gray-900/90 backdrop-blur-sm hover:bg-gray-800 text-white rounded-xl border border-gray-700/50 shadow-lg transition-all duration-200 hover:scale-105"
                title="Filters"
              >
                <Filter className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowAIInsights(!showAIInsights)}
                className="flex items-center justify-center w-12 h-12 bg-gray-900/90 backdrop-blur-sm hover:bg-gray-800 text-white rounded-xl border border-gray-700/50 shadow-lg transition-all duration-200 hover:scale-105"
                title="AI Insights"
              >
                <Brain className="w-5 h-5 text-cyan-400" />
              </button>

              <button
                onClick={() => setShowFoodTracker(!showFoodTracker)}
                className="flex items-center justify-center w-12 h-12 bg-cyan-600/90 backdrop-blur-sm hover:bg-cyan-700 text-white rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
                title="Food Security"
              >
                <Utensils className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowExportPanel(!showExportPanel)}
                className="flex items-center justify-center w-12 h-12 bg-gray-900/90 backdrop-blur-sm hover:bg-gray-800 text-white rounded-xl border border-gray-700/50 shadow-lg transition-all duration-200 hover:scale-105"
                title="Export"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>

            {/* Top Right Controls */}
            <div className="absolute top-6 right-6 z-20 flex items-center space-x-3">
              <button
                onClick={() => setShowSurplusRegistration(true)}
                className="flex items-center space-x-2 bg-green-600/90 backdrop-blur-sm hover:bg-green-700 text-white px-4 py-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span className="font-medium text-sm">Donate Food</span>
              </button>
              
              <MultiLanguageSupport
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
              />
            </div>

            {/* Crisis Count Badge */}
            <div className="absolute bottom-6 left-6 bg-gray-900/90 backdrop-blur-sm rounded-xl px-4 py-3 border border-gray-700/50 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="font-semibold text-white text-sm">
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
                <div className="absolute top-24 left-24 w-80">
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
                <div className="absolute top-24 right-24 w-80">
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

      {/* Floating Action Buttons - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        <button
          onClick={() => setShowForecastTimeline(true)}
          className="flex items-center justify-center w-14 h-14 bg-purple-600/90 backdrop-blur-sm hover:bg-purple-700 text-white rounded-xl shadow-xl transition-all transform hover:scale-105"
          title="Forecast Timeline"
        >
          <Calendar className="w-6 h-6" />
        </button>
        
        <button
          onClick={() => setShowAgentChat(true)}
          className="flex items-center justify-center w-14 h-14 bg-cyan-600/90 backdrop-blur-sm hover:bg-cyan-700 text-white rounded-xl shadow-xl transition-all transform hover:scale-105"
          title="AI Agent Chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
        
        <button
          onClick={() => setShowImpactHub(true)}
          className="flex items-center justify-center w-14 h-14 bg-pink-600/90 backdrop-blur-sm hover:bg-pink-700 text-white rounded-xl shadow-xl transition-all transform hover:scale-105"
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
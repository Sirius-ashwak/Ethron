import React, { useState, useEffect, useRef } from 'react';
import { Brain, ArrowRight, Globe, Shield, Activity, Users, TrendingUp, Eye, Target, ChevronDown, Zap } from 'lucide-react';

interface IntroPageProps {
  onEnter: () => void;
}

export default function IntroPage({ onEnter }: IntroPageProps) {
  const [scrollY, setScrollY] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollY(containerRef.current.scrollTop);
        
        // Calculate current section based on scroll position
        const sectionHeight = window.innerHeight;
        const section = Math.floor(containerRef.current.scrollTop / sectionHeight);
        setCurrentSection(section);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToSection = (sectionIndex: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: sectionIndex * window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="h-screen overflow-y-auto scroll-smooth"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      {/* Section 1: Hero */}
      <section 
        className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-100 flex items-center justify-center relative overflow-hidden"
        style={{ scrollSnapAlign: 'start' }}
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.05) 0%, transparent 50%)`,
          }}></div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-8">
          {/* Logo */}
          <div 
            className="mb-12 transition-all duration-1000"
            style={{ 
              transform: `translateY(${scrollY * 0.1}px)`,
              opacity: Math.max(0, 1 - scrollY / 800)
            }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-900 to-slate-800 rounded-2xl mb-8 shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Main Content */}
          <div 
            className="mb-16"
            style={{ 
              transform: `translateY(${scrollY * 0.05}px)`,
              opacity: Math.max(0, 1 - scrollY / 600)
            }}
          >
            <h1 className="text-6xl md:text-8xl font-extralight text-gray-900 mb-6 tracking-tight leading-none">
              Ethron
            </h1>
            <div className="w-24 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            <p className="text-2xl md:text-3xl text-gray-600 font-light mb-6 leading-relaxed">
              Advanced AI Crisis Intelligence
            </p>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
              Protecting humanity through real-time global threat detection, 
              predictive analysis, and intelligent crisis prevention
            </p>
          </div>

          {/* CTA */}
          <div 
            className="mb-20"
            style={{ 
              opacity: Math.max(0, 1 - scrollY / 400)
            }}
          >
            <button
              onClick={onEnter}
              className="group inline-flex items-center space-x-3 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Enter Platform</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Scroll Indicator */}
          <div 
            className="animate-bounce"
            style={{ 
              opacity: Math.max(0, 1 - scrollY / 200)
            }}
          >
            <button
              onClick={() => scrollToSection(1)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Global Intelligence */}
      <section 
        className="min-h-screen bg-white flex items-center justify-center relative"
        style={{ scrollSnapAlign: 'start' }}
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div 
              style={{ 
                transform: `translateY(${Math.max(0, (scrollY - window.innerHeight) * 0.1)}px)`,
                opacity: scrollY > window.innerHeight * 0.5 ? 1 : 0
              }}
            >
              <h2 className="text-5xl md:text-6xl font-extralight text-gray-900 mb-8 leading-tight">
                Global
                <br />
                Intelligence
              </h2>
              <div className="w-16 h-0.5 bg-blue-600 mb-8"></div>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Our AI continuously monitors 7.8 billion lives across the globe, 
                processing millions of data points to detect crisis patterns and 
                prevent humanitarian disasters before they unfold.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-light text-gray-900 mb-2">94.7%</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">AI Accuracy</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-gray-900 mb-2">0.3s</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">Response Time</div>
                </div>
              </div>
            </div>

            {/* Visual - Abstract Data Visualization */}
            <div 
              className="relative"
              style={{ 
                transform: `translateY(${Math.max(0, (scrollY - window.innerHeight) * 0.05)}px)`,
                opacity: scrollY > window.innerHeight * 0.7 ? 1 : 0
              }}
            >
              <div className="relative w-full h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden">
                {/* Abstract Data Visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-80 h-80">
                    {/* Central Hub */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full animate-pulse opacity-50"></div>
                    </div>
                    
                    {/* Data Nodes */}
                    {[...Array(8)].map((_, i) => {
                      const angle = (i / 8) * 2 * Math.PI;
                      const radius = 120;
                      const x = Math.cos(angle) * radius;
                      const y = Math.sin(angle) * radius;
                      
                      return (
                        <div
                          key={i}
                          className="absolute w-4 h-4 bg-blue-500 rounded-full shadow-md"
                          style={{
                            left: `calc(50% + ${x}px - 8px)`,
                            top: `calc(50% + ${y}px - 8px)`,
                            animationDelay: `${i * 0.2}s`
                          }}
                        >
                          <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75"></div>
                        </div>
                      );
                    })}
                    
                    {/* Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full">
                      {[...Array(8)].map((_, i) => {
                        const angle = (i / 8) * 2 * Math.PI;
                        const radius = 120;
                        const x1 = 160; // center
                        const y1 = 160; // center
                        const x2 = x1 + Math.cos(angle) * radius;
                        const y2 = y1 + Math.sin(angle) * radius;
                        
                        return (
                          <line
                            key={i}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="rgba(59, 130, 246, 0.3)"
                            strokeWidth="2"
                            className="animate-pulse"
                            style={{ animationDelay: `${i * 0.1}s` }}
                          />
                        );
                      })}
                    </svg>
                    
                    {/* Floating Data Points */}
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                          animationDelay: `${Math.random() * 2}s`,
                          animationDuration: `${2 + Math.random() * 2}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: AI Capabilities */}
      <section 
        className="min-h-screen bg-gray-50 flex items-center justify-center relative"
        style={{ scrollSnapAlign: 'start' }}
      >
        <div className="max-w-7xl mx-auto px-8">
          <div 
            className="text-center mb-16"
            style={{ 
              transform: `translateY(${Math.max(0, (scrollY - window.innerHeight * 2) * 0.1)}px)`,
              opacity: scrollY > window.innerHeight * 1.5 ? 1 : 0
            }}
          >
            <h2 className="text-5xl md:text-6xl font-extralight text-gray-900 mb-8">
              Intelligent Prevention
            </h2>
            <div className="w-16 h-0.5 bg-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Advanced machine learning algorithms analyze patterns, predict outcomes, 
              and recommend interventions to prevent crises before they occur.
            </p>
          </div>

          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            style={{ 
              transform: `translateY(${Math.max(0, (scrollY - window.innerHeight * 2) * 0.05)}px)`,
              opacity: scrollY > window.innerHeight * 2.2 ? 1 : 0
            }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-time Monitoring</h3>
              <p className="text-gray-600 leading-relaxed">
                Continuous surveillance of global patterns, social sentiment, 
                and environmental data to detect emerging threats instantly.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Predictive Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Machine learning models analyze historical patterns to forecast 
                potential crises with industry-leading accuracy.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Strategic Response</h3>
              <p className="text-gray-600 leading-relaxed">
                Automated intervention strategies and resource allocation 
                to prevent humanitarian disasters before they occur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Crisis Types */}
      <section 
        className="min-h-screen bg-white flex items-center justify-center relative"
        style={{ scrollSnapAlign: 'start' }}
      >
        <div className="max-w-7xl mx-auto px-8">
          <div 
            className="text-center mb-16"
            style={{ 
              transform: `translateY(${Math.max(0, (scrollY - window.innerHeight * 3) * 0.1)}px)`,
              opacity: scrollY > window.innerHeight * 2.5 ? 1 : 0
            }}
          >
            <h2 className="text-5xl md:text-6xl font-extralight text-gray-900 mb-8">
              Comprehensive Coverage
            </h2>
            <div className="w-16 h-0.5 bg-gray-900 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From food security to climate disasters, we monitor and prevent 
              multiple types of global crises across all sectors.
            </p>
          </div>

          <div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            style={{ 
              transform: `translateY(${Math.max(0, (scrollY - window.innerHeight * 3) * 0.05)}px)`,
              opacity: scrollY > window.innerHeight * 3.2 ? 1 : 0
            }}
          >
            {[
              { icon: '🌾', title: 'Food Security', desc: 'Hunger prevention & distribution' },
              { icon: '🌡️', title: 'Climate Crisis', desc: 'Weather pattern monitoring' },
              { icon: '🏥', title: 'Health Systems', desc: 'Medical infrastructure surveillance' },
              { icon: '⚡', title: 'Social Stability', desc: 'Conflict prediction & prevention' },
              { icon: '💰', title: 'Economic Health', desc: 'Market stability analysis' },
              { icon: '🛡️', title: 'Security Threats', desc: 'Safety & protection monitoring' },
              { icon: '🏗️', title: 'Infrastructure', desc: 'Critical system resilience' },
              { icon: '🚶', title: 'Migration', desc: 'Population movement tracking' }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-gray-50 hover:bg-gray-100 rounded-xl p-6 transition-all text-center group cursor-pointer"
              >
                <div className="text-2xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h4 className="text-gray-900 font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Call to Action */}
      <section 
        className="min-h-screen bg-gray-900 flex items-center justify-center relative"
        style={{ scrollSnapAlign: 'start' }}
      >
        <div className="max-w-4xl mx-auto px-8 text-center">
          <div 
            style={{ 
              transform: `translateY(${Math.max(0, (scrollY - window.innerHeight * 4) * 0.1)}px)`,
              opacity: scrollY > window.innerHeight * 3.5 ? 1 : 0
            }}
          >
            <h2 className="text-5xl md:text-6xl font-extralight text-white mb-8">
              Ready to Begin?
            </h2>
            <div className="w-16 h-0.5 bg-white mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join the mission to protect humanity. Access the world's most 
              advanced crisis intelligence platform.
            </p>

            <button
              onClick={onEnter}
              className="group inline-flex items-center space-x-3 bg-white hover:bg-gray-100 text-gray-900 px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <span>Enter Ethron</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="mt-16 grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl font-light text-white mb-2">847</div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">Active Threats</div>
              </div>
              <div>
                <div className="text-2xl font-light text-white mb-2">156</div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">Crises Prevented</div>
              </div>
              <div>
                <div className="text-2xl font-light text-white mb-2">7.8B</div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">Lives Protected</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll Progress Indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col space-y-3">
          {[0, 1, 2, 3, 4].map((index) => (
            <button
              key={index}
              onClick={() => scrollToSection(index)}
              className={`w-2 h-8 rounded-full transition-all duration-300 ${
                currentSection === index 
                  ? 'bg-gray-900' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
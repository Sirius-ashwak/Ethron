import React, { useState } from 'react';
import { 
  MapPin, Heart, Award, Users, Target, TrendingUp, 
  Plus, Flag, Gift, Zap, Star, Globe
} from 'lucide-react';

interface Contribution {
  id: string;
  type: 'donation' | 'volunteer' | 'report' | 'mission';
  title: string;
  location: string;
  impact: number;
  date: Date;
  status: 'active' | 'completed' | 'pending';
}

interface ImpactContributionProps {
  onClose: () => void;
}

export default function ImpactContribution({ onClose }: ImpactContributionProps) {
  const [activeTab, setActiveTab] = useState<'contribute' | 'impact' | 'rewards'>('contribute');
  const [contributions] = useState<Contribution[]>([
    {
      id: '1',
      type: 'donation',
      title: 'Food Surplus Donation',
      location: 'San Francisco, CA',
      impact: 150,
      date: new Date('2025-01-10'),
      status: 'completed'
    },
    {
      id: '2',
      type: 'report',
      title: 'Anomaly Report - Water Shortage',
      location: 'Cape Town, SA',
      impact: 2500,
      date: new Date('2025-01-12'),
      status: 'active'
    }
  ]);

  const [earthTokens] = useState(1247);
  const [impactBadges] = useState([
    { name: 'Crisis Spotter', icon: '🔍', earned: true },
    { name: 'Food Hero', icon: '🍽️', earned: true },
    { name: 'Climate Guardian', icon: '🌍', earned: false },
    { name: 'Peace Builder', icon: '🕊️', earned: false }
  ]);

  const contributionTypes = [
    {
      id: 'surplus',
      title: 'Report Food Surplus',
      description: 'Share available food resources with those in need',
      icon: Gift,
      color: 'from-green-500 to-emerald-600',
      action: 'Report Surplus'
    },
    {
      id: 'mission',
      title: 'Join Aid Mission',
      description: 'Volunteer for crisis response and humanitarian aid',
      icon: Users,
      color: 'from-blue-500 to-cyan-600',
      action: 'Join Mission'
    },
    {
      id: 'anomaly',
      title: 'Flag Anomaly',
      description: 'Report unusual patterns or emerging crisis indicators',
      icon: Flag,
      color: 'from-orange-500 to-red-600',
      action: 'Report Anomaly'
    },
    {
      id: 'data',
      title: 'Contribute Data',
      description: 'Share local insights and ground-truth information',
      icon: Target,
      color: 'from-purple-500 to-pink-600',
      action: 'Share Data'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl shadow-2xl border border-white/10 w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Heart className="w-8 h-8 text-pink-400" />
              <div>
                <h2 className="text-2xl font-bold text-white">Global Impact Hub</h2>
                <p className="text-sm text-gray-400">Contribute to crisis prevention and response</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-yellow-500/20 px-3 py-1 rounded-full">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-300 font-medium">{earthTokens} Earth Tokens</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mt-4 bg-white/10 rounded-lg p-1">
            {[
              { id: 'contribute', label: 'Contribute', icon: Plus },
              { id: 'impact', label: 'My Impact', icon: TrendingUp },
              { id: 'rewards', label: 'Rewards', icon: Award }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === id
                    ? 'bg-white/20 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'contribute' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {contributionTypes.map((type) => (
                  <div
                    key={type.id}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${type.color}`}>
                        <type.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">{type.title}</h3>
                        <p className="text-sm text-gray-400 mb-4">{type.description}</p>
                        <button className={`px-4 py-2 bg-gradient-to-r ${type.color} text-white rounded-lg font-medium transition-all group-hover:scale-105`}>
                          {type.action}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Global Impact Map */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-cyan-400" />
                  <span>Global Contribution Map</span>
                </h3>
                <div className="h-64 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg relative overflow-hidden">
                  {/* Simulated world map with contribution markers */}
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 bg-green-400 rounded-full animate-pulse cursor-pointer"
                      style={{
                        left: `${Math.random() * 90 + 5}%`,
                        top: `${Math.random() * 70 + 15}%`
                      }}
                      title="Contribution location"
                    />
                  ))}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-3xl font-bold mb-2">2,847</div>
                      <div className="text-sm text-gray-400">Active Contributors Worldwide</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'impact' && (
            <div className="space-y-6">
              {/* Impact Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-xl p-6 border border-green-500/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <Users className="w-8 h-8 text-green-400" />
                    <div>
                      <div className="text-2xl font-bold text-white">2,650</div>
                      <div className="text-sm text-green-300">People Helped</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">Through your contributions</div>
                </div>

                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 rounded-xl p-6 border border-blue-500/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <Target className="w-8 h-8 text-blue-400" />
                    <div>
                      <div className="text-2xl font-bold text-white">7</div>
                      <div className="text-sm text-blue-300">Crises Prevented</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">Early intervention impact</div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-xl p-6 border border-purple-500/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <Award className="w-8 h-8 text-purple-400" />
                    <div>
                      <div className="text-2xl font-bold text-white">12</div>
                      <div className="text-sm text-purple-300">Impact Badges</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">Recognition earned</div>
                </div>
              </div>

              {/* Contribution History */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Contribution History</h3>
                <div className="space-y-4">
                  {contributions.map((contribution) => (
                    <div key={contribution.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          contribution.type === 'donation' ? 'bg-green-500' :
                          contribution.type === 'report' ? 'bg-orange-500' :
                          contribution.type === 'volunteer' ? 'bg-blue-500' :
                          'bg-purple-500'
                        }`}>
                          {contribution.type === 'donation' && <Gift className="w-5 h-5 text-white" />}
                          {contribution.type === 'report' && <Flag className="w-5 h-5 text-white" />}
                          {contribution.type === 'volunteer' && <Users className="w-5 h-5 text-white" />}
                          {contribution.type === 'mission' && <Target className="w-5 h-5 text-white" />}
                        </div>
                        <div>
                          <div className="font-medium text-white">{contribution.title}</div>
                          <div className="text-sm text-gray-400 flex items-center space-x-2">
                            <MapPin className="w-3 h-3" />
                            <span>{contribution.location}</span>
                            <span>•</span>
                            <span>{contribution.date.toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-white">+{contribution.impact} people</div>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          contribution.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                          contribution.status === 'active' ? 'bg-blue-500/20 text-blue-300' :
                          'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {contribution.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rewards' && (
            <div className="space-y-6">
              {/* Earth Tokens */}
              <div className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-xl p-6 border border-yellow-500/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-8 h-8 text-yellow-400" />
                    <div>
                      <div className="text-2xl font-bold text-white">{earthTokens}</div>
                      <div className="text-sm text-yellow-300">Earth Tokens</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-colors">
                    Redeem Tokens
                  </button>
                </div>
                <div className="text-sm text-gray-400">
                  Earn tokens by contributing to crisis prevention. Use them for exclusive features and recognition.
                </div>
              </div>

              {/* Impact Badges */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Impact Badges</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {impactBadges.map((badge) => (
                    <div
                      key={badge.name}
                      className={`p-4 rounded-lg border text-center transition-all ${
                        badge.earned
                          ? 'bg-gradient-to-br from-purple-500/20 to-pink-600/20 border-purple-500/30'
                          : 'bg-gray-800/50 border-gray-700'
                      }`}
                    >
                      <div className="text-3xl mb-2">{badge.icon}</div>
                      <div className={`font-medium ${badge.earned ? 'text-white' : 'text-gray-500'}`}>
                        {badge.name}
                      </div>
                      {badge.earned && (
                        <div className="flex items-center justify-center mt-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Leaderboard */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Global Impact Leaderboard</h3>
                <div className="space-y-3">
                  {[
                    { rank: 1, name: 'You', impact: 2650, tokens: 1247 },
                    { rank: 2, name: 'Alex Chen', impact: 2340, tokens: 1156 },
                    { rank: 3, name: 'Maria Santos', impact: 2180, tokens: 1089 },
                    { rank: 4, name: 'David Kim', impact: 1950, tokens: 987 },
                    { rank: 5, name: 'Sarah Johnson', impact: 1820, tokens: 923 }
                  ].map((user) => (
                    <div
                      key={user.rank}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        user.name === 'You' ? 'bg-cyan-500/20 border border-cyan-500/30' : 'bg-white/5'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          user.rank === 1 ? 'bg-yellow-500 text-black' :
                          user.rank === 2 ? 'bg-gray-400 text-black' :
                          user.rank === 3 ? 'bg-orange-500 text-black' :
                          'bg-gray-600 text-white'
                        }`}>
                          {user.rank}
                        </div>
                        <div>
                          <div className="font-medium text-white">{user.name}</div>
                          <div className="text-sm text-gray-400">{user.impact} people helped</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-yellow-400">{user.tokens}</div>
                        <div className="text-xs text-gray-400">tokens</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
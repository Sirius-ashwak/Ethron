import React from 'react';
import { Brain, Search, Bell, Settings, User } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  userRole: 'public' | 'ngo' | 'government';
  setUserRole: (role: 'public' | 'ngo' | 'government') => void;
}

export default function Header({ darkMode, toggleDarkMode, userRole, setUserRole }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Ethron</h1>
              <p className="text-xs text-gray-400">Crisis Intelligence</p>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search global crises, locations, or insights..."
                className="w-full pl-12 pr-6 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:bg-gray-800 transition-all"
              />
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-4">
            {/* Role Selector */}
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value as 'public' | 'ngo' | 'government')}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 font-medium"
            >
              <option value="public">Public</option>
              <option value="ngo">NGO</option>
              <option value="government">Government</option>
            </select>

            {/* Notifications */}
            <button className="relative p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* Settings */}
            <button className="p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all">
              <Settings className="w-5 h-5" />
            </button>

            {/* Profile */}
            <button className="p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
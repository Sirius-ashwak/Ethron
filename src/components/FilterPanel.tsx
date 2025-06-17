import React, { useState, useEffect } from 'react';
import { Crisis, CrisisType } from '../types/crisis';
import { X, Search, Filter, RotateCcw } from 'lucide-react';
import { crisisTypeColors } from '../data/mockData';

interface FilterPanelProps {
  crises: Crisis[];
  onFilterChange: (filters: FilterState) => void;
  onClose: () => void;
}

interface FilterState {
  searchTerm: string;
  severity: string[];
  types: CrisisType[];
  regions: string[];
  trend: string[];
}

export default function FilterPanel({ crises, onFilterChange, onClose }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    severity: [],
    types: [],
    regions: [],
    trend: []
  });

  // Extract unique values from crises data
  const uniqueRegions = [...new Set(crises.map(c => c.location.region))];
  const uniqueTypes = [...new Set(crises.map(c => c.type))];
  const severityLevels = ['low', 'medium', 'high', 'critical'];
  const trendTypes = ['improving', 'stable', 'worsening'];

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleCheckboxChange = (category: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value as never)
        ? prev[category].filter((item: any) => item !== value)
        : [...prev[category], value as never]
    }));
  };

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      searchTerm: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      searchTerm: '',
      severity: [],
      types: [],
      regions: [],
      trend: []
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-6">
      <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
        {title}
      </h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );

  const Checkbox = ({ 
    checked, 
    onChange, 
    label, 
    color,
    count 
  }: { 
    checked: boolean; 
    onChange: () => void; 
    label: string; 
    color?: string;
    count?: number;
  }) => (
    <label className="flex items-center space-x-3 cursor-pointer group hover:bg-gray-800/50 p-2 rounded-lg transition-colors">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div className={`w-4 h-4 rounded border-2 transition-all ${
          checked 
            ? 'bg-cyan-500 border-cyan-500' 
            : 'border-gray-600 group-hover:border-cyan-400'
        }`}>
          {checked && (
            <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between flex-1">
        <div className="flex items-center space-x-2">
          {color && <div className={`w-3 h-3 rounded-full ${color}`}></div>}
          <span className="text-sm text-gray-300 capitalize">
            {label.replace('-', ' ')}
          </span>
        </div>
        {count !== undefined && (
          <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full">
            {count}
          </span>
        )}
      </div>
    </label>
  );

  return (
    <div className="bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700/50 animate-scale-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-cyan-400" />
          <h2 className="font-semibold text-white">Filter Crises</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={resetFilters}
            className="p-1.5 text-gray-400 hover:text-white transition-colors"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search crises, locations..."
              value={filters.searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-transparent"
            />
          </div>
        </div>

        {/* Severity Filter */}
        <FilterSection title="Severity Level">
          {severityLevels.map(severity => (
            <Checkbox
              key={severity}
              checked={filters.severity.includes(severity)}
              onChange={() => handleCheckboxChange('severity', severity)}
              label={severity}
              color={getSeverityColor(severity)}
              count={crises.filter(c => c.severity === severity).length}
            />
          ))}
        </FilterSection>

        {/* Crisis Type Filter */}
        <FilterSection title="Crisis Type">
          {uniqueTypes.map(type => (
            <Checkbox
              key={type}
              checked={filters.types.includes(type)}
              onChange={() => handleCheckboxChange('types', type)}
              label={type}
              count={crises.filter(c => c.type === type).length}
            />
          ))}
        </FilterSection>

        {/* Region Filter */}
        <FilterSection title="Region">
          {uniqueRegions.map(region => (
            <Checkbox
              key={region}
              checked={filters.regions.includes(region)}
              onChange={() => handleCheckboxChange('regions', region)}
              label={region}
              count={crises.filter(c => c.location.region === region).length}
            />
          ))}
        </FilterSection>

        {/* Trend Filter */}
        <FilterSection title="Trend">
          {trendTypes.map(trend => (
            <Checkbox
              key={trend}
              checked={filters.trend.includes(trend)}
              onChange={() => handleCheckboxChange('trend', trend)}
              label={trend}
              count={crises.filter(c => c.trend === trend).length}
            />
          ))}
        </FilterSection>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700/50 bg-gray-800/50 rounded-b-xl">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">
            Showing {crises.filter(c => {
              if (filters.severity.length > 0 && !filters.severity.includes(c.severity)) return false;
              if (filters.types.length > 0 && !filters.types.includes(c.type)) return false;
              if (filters.regions.length > 0 && !filters.regions.includes(c.location.region)) return false;
              if (filters.trend.length > 0 && !filters.trend.includes(c.trend)) return false;
              if (filters.searchTerm) {
                const searchLower = filters.searchTerm.toLowerCase();
                return c.title.toLowerCase().includes(searchLower) ||
                       c.description.toLowerCase().includes(searchLower) ||
                       c.location.country.toLowerCase().includes(searchLower) ||
                       c.location.region.toLowerCase().includes(searchLower);
              }
              return true;
            }).length} of {crises.length} crises
          </span>
        </div>
      </div>
    </div>
  );
}
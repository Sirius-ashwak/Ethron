import { FoodSecurityData, FoodSurplus, RedistributionRoute, ActionPlan } from '../types/foodSecurity';

export const mockFoodSecurityData: FoodSecurityData[] = [
  {
    id: 'fs001',
    region: 'East Africa',
    country: 'Somalia',
    coordinates: [46.1996, 5.1521],
    hungerLevel: 'critical',
    population: 15893000,
    affectedPopulation: 6200000,
    foodAvailability: 23,
    priceIndex: 187,
    lastUpdated: new Date('2025-01-15T10:30:00Z'),
    predictedTrend: 'deteriorating',
    aiConfidence: 94,
    relatedCrises: ['c001', 'drought-2025-ea']
  },
  {
    id: 'fs002',
    region: 'South Asia',
    country: 'Afghanistan',
    coordinates: [67.7090, 33.9391],
    hungerLevel: 'severe',
    population: 38928000,
    affectedPopulation: 22800000,
    foodAvailability: 34,
    priceIndex: 156,
    lastUpdated: new Date('2025-01-15T09:15:00Z'),
    predictedTrend: 'stable',
    aiConfidence: 87,
    relatedCrises: ['conflict-2024-af', 'economic-2024-af']
  },
  {
    id: 'fs003',
    region: 'West Africa',
    country: 'Mali',
    coordinates: [-3.9962, 17.5707],
    hungerLevel: 'severe',
    population: 20250000,
    affectedPopulation: 5100000,
    foodAvailability: 41,
    priceIndex: 143,
    lastUpdated: new Date('2025-01-15T08:45:00Z'),
    predictedTrend: 'improving',
    aiConfidence: 78,
    relatedCrises: ['conflict-2024-ml', 'climate-2024-sahel']
  }
];

export const mockFoodSurplus: FoodSurplus[] = [
  {
    id: 'surplus001',
    contributorId: 'rest001',
    contributorName: 'Green Valley Restaurant Chain',
    contributorType: 'restaurant',
    location: {
      address: '123 Main St, San Francisco, CA',
      coordinates: [-122.4194, 37.7749],
      country: 'United States',
      region: 'North America'
    },
    foodItems: [
      {
        name: 'Prepared Meals',
        category: 'prepared',
        weight: 45,
        nutritionalValue: 250,
        shelfLife: 2,
        storageRequirements: 'refrigerated',
        allergens: ['gluten', 'dairy']
      },
      {
        name: 'Fresh Vegetables',
        category: 'vegetables',
        weight: 30,
        nutritionalValue: 25,
        shelfLife: 5,
        storageRequirements: 'refrigerated',
        allergens: []
      }
    ],
    totalWeight: 75,
    expiryDate: new Date('2025-01-17T18:00:00Z'),
    availableFrom: new Date('2025-01-15T20:00:00Z'),
    availableUntil: new Date('2025-01-17T10:00:00Z'),
    status: 'available',
    specialRequirements: ['Refrigerated transport required'],
    contactInfo: {
      phone: '+1-555-0123',
      email: 'donations@greenvalley.com',
      preferredContact: 'app'
    },
    createdAt: new Date('2025-01-15T14:30:00Z'),
    updatedAt: new Date('2025-01-15T14:30:00Z')
  },
  {
    id: 'surplus002',
    contributorId: 'farm001',
    contributorName: 'Sunrise Organic Farm',
    contributorType: 'farm',
    location: {
      address: 'Rural Route 45, Iowa',
      coordinates: [-93.6091, 41.5868],
      country: 'United States',
      region: 'North America'
    },
    foodItems: [
      {
        name: 'Corn',
        category: 'grains',
        weight: 500,
        nutritionalValue: 365,
        shelfLife: 180,
        storageRequirements: 'ambient',
        allergens: []
      },
      {
        name: 'Potatoes',
        category: 'vegetables',
        weight: 300,
        nutritionalValue: 77,
        shelfLife: 60,
        storageRequirements: 'ambient',
        allergens: []
      }
    ],
    totalWeight: 800,
    expiryDate: new Date('2025-07-15T00:00:00Z'),
    availableFrom: new Date('2025-01-16T08:00:00Z'),
    availableUntil: new Date('2025-01-30T17:00:00Z'),
    status: 'available',
    specialRequirements: ['Bulk transport needed', 'Dry storage'],
    contactInfo: {
      phone: '+1-555-0456',
      email: 'harvest@sunrisefarm.com',
      preferredContact: 'phone'
    },
    createdAt: new Date('2025-01-15T12:15:00Z'),
    updatedAt: new Date('2025-01-15T12:15:00Z')
  }
];

export const mockActionPlans: ActionPlan[] = [
  {
    id: 'plan001',
    regionId: 'fs001',
    title: 'Emergency Food Distribution - Somalia',
    description: 'Immediate deployment of 400kg dry food supplies to Mogadishu region within 48 hours to address critical hunger levels.',
    urgency: 'critical',
    timeframe: '48 hours',
    requiredResources: {
      food: [
        { type: 'Rice', quantity: 200, unit: 'kg' },
        { type: 'Lentils', quantity: 100, unit: 'kg' },
        { type: 'Cooking Oil', quantity: 50, unit: 'liters' },
        { type: 'Salt', quantity: 25, unit: 'kg' }
      ],
      logistics: ['Refrigerated trucks', 'Local distribution network', 'Security escort'],
      personnel: 12,
      funding: 15000
    },
    steps: [
      {
        id: 'step001',
        title: 'Secure food supplies from nearest surplus',
        description: 'Contact verified surplus contributors within 500km radius',
        assignedTo: 'Logistics Team Alpha',
        deadline: new Date('2025-01-16T08:00:00Z'),
        status: 'in-progress',
        dependencies: []
      },
      {
        id: 'step002',
        title: 'Arrange transportation',
        description: 'Coordinate with local transport partners for secure delivery',
        assignedTo: 'Transport Coordinator',
        deadline: new Date('2025-01-16T12:00:00Z'),
        status: 'pending',
        dependencies: ['step001']
      },
      {
        id: 'step003',
        title: 'Deploy distribution teams',
        description: 'Position teams at identified distribution points',
        assignedTo: 'Field Operations',
        deadline: new Date('2025-01-17T06:00:00Z'),
        status: 'pending',
        dependencies: ['step002']
      }
    ],
    aiGenerated: true,
    confidence: 91,
    estimatedImpact: 2500,
    createdAt: new Date('2025-01-15T14:45:00Z'),
    status: 'approved'
  }
];

export const getHungerLevelColor = (level: FoodSecurityData['hungerLevel']) => {
  switch (level) {
    case 'low': return '#10B981';
    case 'moderate': return '#F59E0B';
    case 'severe': return '#FF6B35';
    case 'critical': return '#EF4444';
    default: return '#6B7280';
  }
};

export const getFoodCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    'grains': '🌾',
    'vegetables': '🥕',
    'fruits': '🍎',
    'protein': '🥩',
    'dairy': '🥛',
    'prepared': '🍽️',
    'canned': '🥫'
  };
  return icons[category] || '🍽️';
};
export interface FoodSecurityData {
  id: string;
  region: string;
  country: string;
  coordinates: [number, number];
  hungerLevel: 'low' | 'moderate' | 'severe' | 'critical';
  population: number;
  affectedPopulation: number;
  foodAvailability: number; // percentage
  priceIndex: number;
  lastUpdated: Date;
  predictedTrend: 'improving' | 'stable' | 'deteriorating';
  aiConfidence: number;
  relatedCrises: string[];
}

export interface FoodSurplus {
  id: string;
  contributorId: string;
  contributorName: string;
  contributorType: 'restaurant' | 'farm' | 'grocery' | 'individual' | 'ngo';
  location: {
    address: string;
    coordinates: [number, number];
    country: string;
    region: string;
  };
  foodItems: FoodItem[];
  totalWeight: number; // in kg
  expiryDate: Date;
  availableFrom: Date;
  availableUntil: Date;
  status: 'available' | 'reserved' | 'collected' | 'expired';
  specialRequirements: string[];
  contactInfo: {
    phone: string;
    email: string;
    preferredContact: 'phone' | 'email' | 'app';
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface FoodItem {
  name: string;
  category: 'grains' | 'vegetables' | 'fruits' | 'protein' | 'dairy' | 'prepared' | 'canned';
  weight: number; // in kg
  nutritionalValue: number; // calories per 100g
  shelfLife: number; // days remaining
  storageRequirements: 'ambient' | 'refrigerated' | 'frozen';
  allergens: string[];
}

export interface RedistributionRoute {
  id: string;
  surplusId: string;
  destinationId: string;
  distance: number; // in km
  estimatedTime: number; // in hours
  transportMethod: 'truck' | 'air' | 'ship' | 'local';
  cost: number;
  carbonFootprint: number; // kg CO2
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'planned' | 'in-transit' | 'delivered' | 'cancelled';
  aiOptimizationScore: number;
  createdAt: Date;
  estimatedDelivery: Date;
}

export interface ActionPlan {
  id: string;
  regionId: string;
  title: string;
  description: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  timeframe: string;
  requiredResources: {
    food: { type: string; quantity: number; unit: string }[];
    logistics: string[];
    personnel: number;
    funding: number;
  };
  steps: ActionStep[];
  aiGenerated: boolean;
  confidence: number;
  estimatedImpact: number; // people helped
  createdAt: Date;
  status: 'draft' | 'approved' | 'in-progress' | 'completed';
}

export interface ActionStep {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  deadline: Date;
  status: 'pending' | 'in-progress' | 'completed';
  dependencies: string[];
}
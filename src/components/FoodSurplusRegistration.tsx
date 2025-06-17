import React, { useState } from 'react';
import { Plus, MapPin, Clock, Package, User, Phone, Mail, Camera } from 'lucide-react';
import { FoodItem } from '../types/foodSecurity';
import { getFoodCategoryIcon } from '../data/foodSecurityData';

interface FoodSurplusRegistrationProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function FoodSurplusRegistration({ onClose, onSubmit }: FoodSurplusRegistrationProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    contributorName: '',
    contributorType: 'restaurant',
    address: '',
    phone: '',
    email: '',
    foodItems: [] as FoodItem[],
    availableFrom: '',
    availableUntil: '',
    specialRequirements: '',
    photos: [] as string[]
  });

  const [currentFoodItem, setCurrentFoodItem] = useState<Partial<FoodItem>>({
    name: '',
    category: 'prepared',
    weight: 0,
    shelfLife: 1,
    storageRequirements: 'ambient',
    allergens: []
  });

  const addFoodItem = () => {
    if (currentFoodItem.name && currentFoodItem.weight) {
      setFormData(prev => ({
        ...prev,
        foodItems: [...prev.foodItems, currentFoodItem as FoodItem]
      }));
      setCurrentFoodItem({
        name: '',
        category: 'prepared',
        weight: 0,
        shelfLife: 1,
        storageRequirements: 'ambient',
        allergens: []
      });
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-dark-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-dark-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-dark-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-success-100 dark:bg-success-900/20 rounded-lg">
                <Plus className="w-6 h-6 text-success-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Register Food Surplus
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Help feed the hungry by sharing your surplus food
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center space-x-4 mt-6">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNum 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-200 dark:bg-dark-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    step > stepNum ? 'bg-primary-500' : 'bg-gray-200 dark:bg-dark-700'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Contributor Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name/Organization
                  </label>
                  <input
                    type="text"
                    value={formData.contributorName}
                    onChange={(e) => setFormData(prev => ({ ...prev, contributorName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                    placeholder="Your name or business name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contributor Type
                  </label>
                  <select
                    value={formData.contributorType}
                    onChange={(e) => setFormData(prev => ({ ...prev, contributorType: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  >
                    <option value="restaurant">Restaurant</option>
                    <option value="farm">Farm</option>
                    <option value="grocery">Grocery Store</option>
                    <option value="individual">Individual</option>
                    <option value="ngo">NGO</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  placeholder="Full address for pickup"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Food Items
              </h3>

              {/* Add Food Item Form */}
              <div className="bg-gray-50 dark:bg-dark-800 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">Add Food Item</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Food Name
                    </label>
                    <input
                      type="text"
                      value={currentFoodItem.name}
                      onChange={(e) => setCurrentFoodItem(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                      placeholder="e.g., Prepared meals, Rice, Vegetables"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={currentFoodItem.category}
                      onChange={(e) => setCurrentFoodItem(prev => ({ ...prev, category: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                    >
                      <option value="prepared">Prepared Food</option>
                      <option value="grains">Grains</option>
                      <option value="vegetables">Vegetables</option>
                      <option value="fruits">Fruits</option>
                      <option value="protein">Protein</option>
                      <option value="dairy">Dairy</option>
                      <option value="canned">Canned Goods</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      value={currentFoodItem.weight}
                      onChange={(e) => setCurrentFoodItem(prev => ({ ...prev, weight: Number(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Shelf Life (days)
                    </label>
                    <input
                      type="number"
                      value={currentFoodItem.shelfLife}
                      onChange={(e) => setCurrentFoodItem(prev => ({ ...prev, shelfLife: Number(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                      placeholder="1"
                      min="1"
                    />
                  </div>
                </div>

                <button
                  onClick={addFoodItem}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Add Food Item
                </button>
              </div>

              {/* Food Items List */}
              {formData.foodItems.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Added Items</h4>
                  <div className="space-y-2">
                    {formData.foodItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between bg-white dark:bg-dark-800 p-3 rounded-lg border border-gray-200 dark:border-dark-700">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{getFoodCategoryIcon(item.category)}</span>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {item.weight}kg • {item.shelfLife} days • {item.category}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            foodItems: prev.foodItems.filter((_, i) => i !== index)
                          }))}
                          className="text-danger-500 hover:text-danger-600 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Availability & Requirements
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Available From
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.availableFrom}
                    onChange={(e) => setFormData(prev => ({ ...prev, availableFrom: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Available Until
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.availableUntil}
                    onChange={(e) => setFormData(prev => ({ ...prev, availableUntil: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Special Requirements
                </label>
                <textarea
                  value={formData.specialRequirements}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialRequirements: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  rows={3}
                  placeholder="e.g., Refrigerated transport required, Halal certified, etc."
                />
              </div>

              <div className="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg p-4">
                <h4 className="font-medium text-success-800 dark:text-success-200 mb-2">
                  🌍 Impact Estimate
                </h4>
                <p className="text-sm text-success-700 dark:text-success-300">
                  Your donation of {formData.foodItems.reduce((sum, item) => sum + item.weight, 0)}kg 
                  could feed approximately{' '}
                  <strong>{Math.floor(formData.foodItems.reduce((sum, item) => sum + item.weight, 0) * 2.5)} people</strong> 
                  for one day.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-dark-700 flex justify-between">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : onClose()}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {step > 1 ? 'Previous' : 'Cancel'}
          </button>
          
          <button
            onClick={() => step < 3 ? setStep(step + 1) : handleSubmit()}
            className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
          >
            {step < 3 ? 'Next' : 'Register Surplus'}
          </button>
        </div>
      </div>
    </div>
  );
}
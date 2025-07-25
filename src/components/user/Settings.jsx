import React, { useState } from 'react';
import { Bell, Shield, CreditCard, MapPin, Globe, Moon, Sun, Smartphone } from 'lucide-react';

const Settings = ({ user, onLogout }) => {
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newRestaurants: true,
    email: true,
    sms: false
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    language: 'english',
    currency: 'inr'
  });

  const handleNotificationChange = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };

  const handlePreferenceChange = (key, value) => {
    setPreferences({
      ...preferences,
      [key]: value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Bell className="w-6 h-6 text-red-600" />
                <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Order Updates</p>
                  <p className="text-sm text-gray-600">Get notified about your order status</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('orderUpdates')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.orderUpdates ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.orderUpdates ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Promotions & Offers</p>
                  <p className="text-sm text-gray-600">Receive deals and discount notifications</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('promotions')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.promotions ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.promotions ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">New Restaurants</p>
                  <p className="text-sm text-gray-600">Get notified when new restaurants join</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('newRestaurants')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.newRestaurants ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.newRestaurants ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <hr />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-600">Receive notifications via email</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('email')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.email ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.email ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">SMS Notifications</p>
                  <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('sms')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.sms ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.sms ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Globe className="w-6 h-6 text-red-600" />
                <h2 className="text-xl font-bold text-gray-900">Preferences</h2>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Dark Mode</p>
                  <p className="text-sm text-gray-600">Switch between light and dark theme</p>
                </div>
                <button
                  onClick={() => handlePreferenceChange('darkMode', !preferences.darkMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences.darkMode ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.darkMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <div>
                <p className="font-medium text-gray-900 mb-2">Language</p>
                <select
                  value={preferences.language}
                  onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="english">English</option>
                  <option value="hindi">हिंदी</option>
                  <option value="spanish">Español</option>
                  <option value="french">Français</option>
                </select>
              </div>

              <div>
                <p className="font-medium text-gray-900 mb-2">Currency</p>
                <select
                  value={preferences.currency}
                  onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="inr">₹ Indian Rupee</option>
                  <option value="usd">$ US Dollar</option>
                  <option value="eur">€ Euro</option>
                  <option value="gbp">£ British Pound</option>
                </select>
              </div>
            </div>
          </div>

          {/* Account & Security */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-red-600" />
                <h2 className="text-xl font-bold text-gray-900">Account & Security</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-900">Change Password</span>
                </div>
                <span className="text-gray-400">›</span>
              </button>

              <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-900">Two-Factor Authentication</span>
                </div>
                <span className="text-gray-400">›</span>
              </button>

              <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-900">Payment Methods</span>
                </div>
                <span className="text-gray-400">›</span>
              </button>

              <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-900">Saved Addresses</span>
                </div>
                <span className="text-gray-400">›</span>
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-xl shadow-sm border border-red-200">
            <div className="p-6 border-b border-red-200">
              <h2 className="text-xl font-bold text-red-600">Danger Zone</h2>
            </div>
            <div className="p-6">
              <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium">
                Delete Account
              </button>
              <p className="text-xs text-gray-500 text-center mt-2">
                This action cannot be undone. All your data will be permanently deleted.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { 
  MapPin, 
  ShoppingCart, 
  User, 
  Search, 
  Bell, 
  LogOut, 
  Settings, 
  Truck, 
  Heart,
  Gift,
  Wallet,
  HelpCircle,
  Star,
  MessageSquare
} from 'lucide-react';

const Header = ({ user, onLogout, cartItems = [] }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const locations = [
    { id: 1, name: 'Home', address: '123 Main Street, Apartment 4B', isDefault: true },
    { id: 2, name: 'Work', address: '456 Business Ave, Floor 12', isDefault: false },
    { id: 3, name: 'Mom\'s Place', address: '789 Family Lane, House 5', isDefault: false }
  ];

  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  const notifications = [
    { id: 1, title: 'Order Delivered!', message: 'Your order from Mama\'s Kitchen has been delivered', time: '2 mins ago', read: false },
    { id: 2, title: 'New Restaurant Alert', message: 'Tasty Treats just joined TatoBites in your area', time: '1 hour ago', read: false },
    { id: 3, title: 'Special Offer', message: '50% off on your next order. Use code SAVE50', time: '3 hours ago', read: true }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-red-600">TatoBites</span>
          </Link>

          {/* Location Selector */}
          <div className="hidden md:flex items-center space-x-2 relative">
            <button
              onClick={() => setShowLocationMenu(!showLocationMenu)}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <div className="text-left">
                <div className="text-sm font-medium">{selectedLocation.name}</div>
                <div className="text-xs text-gray-500 truncate max-w-32">
                  {selectedLocation.address}
                </div>
              </div>
            </button>

            {showLocationMenu && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-200">
                  <h3 className="font-medium text-gray-900">Select Delivery Location</h3>
                </div>
                {locations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => {
                      setSelectedLocation(loc);
                      setShowLocationMenu(false);
                    }}
                    className={`w-full flex items-start space-x-3 px-4 py-3 hover:bg-gray-50 ${
                      selectedLocation.id === loc.id ? 'bg-red-50' : ''
                    }`}
                  >
                    <MapPin className={`w-4 h-4 mt-1 ${selectedLocation.id === loc.id ? 'text-red-600' : 'text-gray-400'}`} />
                    <div className="text-left">
                      <div className={`font-medium ${selectedLocation.id === loc.id ? 'text-red-600' : 'text-gray-900'}`}>
                        {loc.name}
                        {loc.isDefault && <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">Default</span>}
                      </div>
                      <div className="text-sm text-gray-600">{loc.address}</div>
                    </div>
                  </button>
                ))}
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-medium">
                    + Add New Address
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search for restaurants, cuisines, or dishes..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                onClick={() => navigate('/search')}
                readOnly
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/dashboard" 
              className={`font-medium transition-colors ${
                location.pathname === '/dashboard' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/offers" 
              className={`font-medium transition-colors flex items-center space-x-1 ${
                location.pathname === '/offers' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
              }`}
            >
              <Gift className="w-4 h-4" />
              <span>Offers</span>
            </Link>
            <Link 
              to="/orders" 
              className={`font-medium transition-colors flex items-center space-x-1 ${
                location.pathname === '/orders' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Orders</span>
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Search Icon for Mobile */}
            <button 
              onClick={() => navigate('/search')}
              className="lg:hidden p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => navigate('/notifications')}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-red-600" />
                </div>
                <span className="hidden md:block font-medium">{user.name}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  
                  <Link
                    to="/orders"
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Truck className="w-4 h-4" />
                    <span>My Orders</span>
                  </Link>
                  
                  <Link
                    to="/favorites"
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Heart className="w-4 h-4" />
                    <span>Favorites</span>
                  </Link>
                  
                  <Link
                    to="/wallet"
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Wallet className="w-4 h-4" />
                    <span>Wallet</span>
                  </Link>
                  
                  <Link
                    to="/loyalty"
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Star className="w-4 h-4" />
                    <span>Loyalty Points</span>
                  </Link>
                  
                  <Link
                    to="/reviews"
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Reviews</span>
                  </Link>
                  
                  <Link
                    to="/help"
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>Help & Support</span>
                  </Link>
                  
                  <Link
                    to="/settings"
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                  
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
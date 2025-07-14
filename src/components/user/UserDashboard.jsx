import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  Filter, 
  ShoppingCart, 
  User, 
  Heart, 
  Truck,
  Gift,
  TrendingUp,
  Zap,
  Award,
  ChevronRight,
  Timer,
  Percent
} from 'lucide-react';
import Header from './Header';

const UserDashboard = ({ user, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState([]);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);

  const categories = [
    { id: 'all', name: 'All', icon: '🍽️' },
    { id: 'pizza', name: 'Pizza', icon: '🍕' },
    { id: 'burger', name: 'Burgers', icon: '🍔' },
    { id: 'indian', name: 'Indian', icon: '🍛' },
    { id: 'chinese', name: 'Chinese', icon: '🥡' },
    { id: 'dessert', name: 'Desserts', icon: '🍰' },
    { id: 'healthy', name: 'Healthy', icon: '🥗' },
    { id: 'beverages', name: 'Beverages', icon: '🥤' },
  ];

  const bannerOffers = [
    {
      id: 1,
      title: "50% OFF on First Order",
      subtitle: "Use code WELCOME50",
      image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "from-red-500 to-red-600"
    },
    {
      id: 2,
      title: "Free Delivery Weekend",
      subtitle: "No delivery charges this weekend",
      image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      title: "Buy 1 Get 1 Free",
      subtitle: "On selected restaurants",
      image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "from-blue-500 to-blue-600"
    }
  ];

  const quickActions = [
    { id: 1, name: 'Reorder', icon: Truck, color: 'bg-green-100 text-green-600', link: '/orders' },
    { id: 2, name: 'Favorites', icon: Heart, color: 'bg-red-100 text-red-600', link: '/favorites' },
    { id: 3, name: 'Offers', icon: Gift, color: 'bg-yellow-100 text-yellow-600', link: '/offers' },
    { id: 4, name: 'Wallet', icon: Award, color: 'bg-purple-100 text-purple-600', link: '/wallet' },
  ];

  const restaurants = [
    {
      id: 1,
      name: "Mama's Kitchen",
      cuisine: "Indian",
      rating: 4.5,
      reviews: 1250,
      deliveryTime: "30-45 min",
      image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400",
      offer: "50% OFF up to ₹100",
      distance: "2.1 km",
      category: 'indian',
      isPromoted: true,
      tags: ['Bestseller', 'Fast Delivery'],
      avgCost: '₹300 for two',
      deliveryFee: 'FREE'
    },
    {
      id: 2,
      name: "Pizza Palace",
      cuisine: "Italian",
      rating: 4.3,
      reviews: 890,
      deliveryTime: "25-40 min",
      image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400",
      offer: "Buy 1 Get 1 Free",
      distance: "1.8 km",
      category: 'pizza',
      isPromoted: false,
      tags: ['Popular'],
      avgCost: '₹400 for two',
      deliveryFee: '₹25'
    },
    {
      id: 3,
      name: "Burger Junction",
      cuisine: "American",
      rating: 4.2,
      reviews: 567,
      deliveryTime: "20-35 min",
      image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400",
      offer: "20% OFF",
      distance: "3.2 km",
      category: 'burger',
      isPromoted: false,
      tags: ['Quick Bites'],
      avgCost: '₹250 for two',
      deliveryFee: '₹30'
    },
    {
      id: 4,
      name: "Dragon Wok",
      cuisine: "Chinese",
      rating: 4.4,
      reviews: 1100,
      deliveryTime: "35-50 min",
      image: "https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=400",
      offer: "Free Delivery",
      distance: "2.5 km",
      category: 'chinese',
      isPromoted: true,
      tags: ['Trending'],
      avgCost: '₹350 for two',
      deliveryFee: 'FREE'
    },
    {
      id: 5,
      name: "Sweet Dreams",
      cuisine: "Desserts",
      rating: 4.6,
      reviews: 445,
      deliveryTime: "15-30 min",
      image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400",
      offer: "30% OFF",
      distance: "1.2 km",
      category: 'dessert',
      isPromoted: false,
      tags: ['Sweet Treats'],
      avgCost: '₹200 for two',
      deliveryFee: '₹20'
    },
    {
      id: 6,
      name: "Healthy Bites",
      cuisine: "Healthy",
      rating: 4.3,
      reviews: 678,
      deliveryTime: "25-40 min",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      offer: "15% OFF",
      distance: "2.8 km",
      category: 'healthy',
      isPromoted: false,
      tags: ['Healthy', 'Organic'],
      avgCost: '₹280 for two',
      deliveryFee: '₹35'
    }
  ];

  const trendingDishes = [
    {
      id: 1,
      name: "Butter Chicken",
      restaurant: "Mama's Kitchen",
      price: "₹320",
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.6
    },
    {
      id: 2,
      name: "Margherita Pizza",
      restaurant: "Pizza Palace",
      price: "₹280",
      image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.4
    },
    {
      id: 3,
      name: "Chicken Biryani",
      restaurant: "Spice Route",
      price: "₹380",
      image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.7
    }
  ];

  const recentOrders = [
    {
      id: 1,
      restaurant: "Mama's Kitchen",
      items: "Butter Chicken, Naan",
      amount: "₹450",
      date: "Yesterday"
    },
    {
      id: 2,
      restaurant: "Pizza Palace",
      items: "Margherita Pizza",
      amount: "₹280",
      date: "2 days ago"
    }
  ];

  // Auto-rotate banner offers
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOfferIndex((prev) => (prev + 1) % bannerOffers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || restaurant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {user.name}! 👋
          </h1>
          <p className="text-gray-600">What would you like to eat today?</p>
        </div>

        {/* Banner Offers Carousel */}
        <div className="relative mb-8 rounded-2xl overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentOfferIndex * 100}%)` }}
          >
            {bannerOffers.map((offer, index) => (
              <div
                key={offer.id}
                className={`w-full flex-shrink-0 bg-gradient-to-r ${offer.color} p-8 text-white relative overflow-hidden`}
              >
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-2">{offer.title}</h2>
                  <p className="text-xl mb-4">{offer.subtitle}</p>
                  <button className="bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                    Order Now
                  </button>
                </div>
                <div className="absolute right-0 top-0 w-1/3 h-full opacity-20">
                  <img 
                    src={offer.image} 
                    alt={offer.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Carousel Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {bannerOffers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentOfferIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentOfferIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {quickActions.map((action) => (
            <Link
              key={action.id}
              to={action.link}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-center group"
            >
              <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-gray-900">{action.name}</span>
            </Link>
          ))}
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for restaurants, cuisines, or dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What's on your mind?</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 flex flex-col items-center p-4 rounded-xl transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-red-100 border-2 border-red-500 text-red-600'
                    : 'bg-white border border-gray-200 hover:border-red-300 text-gray-700'
                }`}
              >
                <span className="text-2xl mb-2">{category.icon}</span>
                <span className="font-medium text-sm">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Trending Dishes */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-red-600" />
              Trending Now
            </h2>
            <Link to="/search" className="text-red-600 hover:text-red-700 font-medium flex items-center">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {trendingDishes.map((dish) => (
              <div key={dish.id} className="flex-shrink-0 w-64 bg-white rounded-xl shadow-sm overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">{dish.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{dish.restaurant}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-red-600">{dish.price}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{dish.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        {recentOrders.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Timer className="w-5 h-5 mr-2 text-red-600" />
                Reorder from your favorites
              </h2>
              <Link to="/orders" className="text-red-600 hover:text-red-700 font-medium flex items-center">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex-shrink-0 w-72 bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900">{order.restaurant}</h3>
                    <span className="text-sm text-gray-500">{order.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{order.items}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">{order.amount}</span>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                      Reorder
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Restaurants Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'All Restaurants' : `${categories.find(c => c.id === selectedCategory)?.name} Restaurants`}
              <span className="text-sm font-normal text-gray-500 ml-2">({filteredRestaurants.length} restaurants)</span>
            </h2>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <Link
                key={restaurant.id}
                to={`/restaurant/${restaurant.id}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden group relative"
              >
                {restaurant.isPromoted && (
                  <div className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold z-10">
                    <Zap className="w-3 h-3 inline mr-1" />
                    PROMOTED
                  </div>
                )}
                
                <div className="relative">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {restaurant.offer}
                  </div>
                  <button className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors">
                    <Heart className="w-4 h-4 text-gray-600 hover:text-red-600" />
                  </button>
                </div>
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg text-gray-900">{restaurant.name}</h3>
                    <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded">
                      <Star className="w-3 h-3 text-green-600 fill-current" />
                      <span className="text-xs font-medium text-green-600">{restaurant.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {restaurant.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{restaurant.distance}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{restaurant.avgCost}</span>
                    <span className={`text-sm font-medium ${restaurant.deliveryFee === 'FREE' ? 'text-green-600' : 'text-gray-600'}`}>
                      {restaurant.deliveryFee === 'FREE' ? 'FREE Delivery' : `Delivery ${restaurant.deliveryFee}`}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Special Offers Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center">
                <Percent className="w-6 h-6 mr-2" />
                Special Offers Just for You!
              </h2>
              <p className="text-purple-100 mb-4">Don't miss out on these amazing deals</p>
              <Link
                to="/offers"
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                View All Offers
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
            <div className="hidden md:block">
              <Gift className="w-24 h-24 text-purple-200" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
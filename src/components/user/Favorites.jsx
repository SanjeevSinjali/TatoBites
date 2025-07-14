import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Clock, MapPin, ShoppingCart, Filter, Search } from 'lucide-react';
import Header from './Header';

const Favorites = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('restaurants');
  const [searchQuery, setSearchQuery] = useState('');

  const favoriteRestaurants = [
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
      avgCost: "₹300 for two",
      lastOrdered: "2 days ago"
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
      avgCost: "₹350 for two",
      lastOrdered: "1 week ago"
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
      avgCost: "₹200 for two",
      lastOrdered: "Yesterday"
    }
  ];

  const favoriteDishes = [
    {
      id: 1,
      name: "Butter Chicken",
      restaurant: "Mama's Kitchen",
      price: "₹320",
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.6,
      description: "Tender chicken in rich tomato and butter gravy",
      isVeg: false,
      lastOrdered: "2 days ago"
    },
    {
      id: 2,
      name: "Chicken Hakka Noodles",
      restaurant: "Dragon Wok",
      price: "₹280",
      image: "https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.4,
      description: "Stir-fried noodles with vegetables and chicken",
      isVeg: false,
      lastOrdered: "1 week ago"
    },
    {
      id: 3,
      name: "Chocolate Brownie",
      restaurant: "Sweet Dreams",
      price: "₹180",
      image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.7,
      description: "Rich chocolate brownie with vanilla ice cream",
      isVeg: true,
      lastOrdered: "Yesterday"
    },
    {
      id: 4,
      name: "Paneer Tikka Masala",
      restaurant: "Mama's Kitchen",
      price: "₹280",
      image: "https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.4,
      description: "Grilled cottage cheese in spicy tomato gravy",
      isVeg: true,
      lastOrdered: "3 days ago"
    }
  ];

  const filteredRestaurants = favoriteRestaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDishes = favoriteDishes.filter(dish =>
    dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dish.restaurant.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const removeFavorite = (id, type) => {
    console.log(`Removing ${type} with id ${id} from favorites`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} cartItems={[]} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Heart className="w-8 h-8 mr-3 text-red-600" />
              My Favorites
            </h1>
            <p className="text-gray-600 mt-2">Your saved restaurants and dishes</p>
          </div>
        </div>

        <div className="flex space-x-1 bg-gray-200 rounded-lg p-1 mb-8 max-w-md">
          <button
            onClick={() => setActiveTab('restaurants')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'restaurants'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Restaurants ({favoriteRestaurants.length})
          </button>
          <button
            onClick={() => setActiveTab('dishes')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'dishes'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Dishes ({favoriteDishes.length})
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>

        {activeTab === 'restaurants' ? (
          <div>
            {filteredRestaurants.length === 0 ? (
              <div className="text-center py-16">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No favorite restaurants yet</h3>
                <p className="text-gray-600 mb-6">Start adding restaurants to your favorites!</p>
                <Link
                  to="/dashboard"
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Explore Restaurants
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants.map((restaurant) => (
                  <div key={restaurant.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden group">
                    <div className="relative">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {restaurant.offer}
                      </div>
                      <button
                        onClick={() => removeFavorite(restaurant.id, 'restaurant')}
                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                      >
                        <Heart className="w-4 h-4 text-red-600 fill-current" />
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
                      <p className="text-xs text-gray-500 mb-3">Last ordered: {restaurant.lastOrdered}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
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
                        <Link
                          to={`/restaurant/${restaurant.id}`}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                        >
                          Order Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {filteredDishes.length === 0 ? (
              <div className="text-center py-16">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No favorite dishes yet</h3>
                <p className="text-gray-600 mb-6">Start adding dishes to your favorites!</p>
                <Link
                  to="/dashboard"
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Explore Dishes
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDishes.map((dish) => (
                  <div key={dish.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 p-6">
                    <div className="flex space-x-4">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <div className={`w-3 h-3 rounded-full ${dish.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></div>
                              <h3 className="font-bold text-lg text-gray-900">{dish.name}</h3>
                            </div>
                            <p className="text-sm text-gray-600">{dish.restaurant}</p>
                          </div>
                          <button
                            onClick={() => removeFavorite(dish.id, 'dish')}
                            className="p-1 hover:bg-red-50 rounded transition-colors"
                          >
                            <Heart className="w-4 h-4 text-red-600 fill-current" />
                          </button>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">{dish.description}</p>
                        <p className="text-xs text-gray-500 mb-3">Last ordered: {dish.lastOrdered}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="text-lg font-bold text-gray-900">{dish.price}</span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{dish.rating}</span>
                            </div>
                          </div>
                          <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center space-x-2">
                            <ShoppingCart className="w-4 h-4" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Favorites;
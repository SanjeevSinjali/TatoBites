import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search as SearchIcon,
  Clock,
  TrendingUp,
  Star,
  MapPin,
  Filter,
  X,
  Sliders
} from 'lucide-react';

const Search = ({ user, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [deliveryTime, setDeliveryTime] = useState('any');
  const [rating, setRating] = useState(0);

  const recentSearches = [
    'Pizza',
    'Burger',
    'Biryani',
    'Chinese',
    'Desserts'
  ];

  const trendingSearches = [
    'Butter Chicken',
    'Margherita Pizza',
    'Chicken Biryani',
    'Pad Thai',
    'Chocolate Cake'
  ];

  const cuisines = [
    'Indian', 'Italian', 'Chinese', 'American', 'Thai', 'Mexican', 'Japanese', 'Mediterranean'
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
      avgCost: 300,
      tags: ['Bestseller', 'Fast Delivery']
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
      avgCost: 400,
      tags: ['Popular']
    },
    {
      id: 3,
      name: "Dragon Wok",
      cuisine: "Chinese",
      rating: 4.4,
      reviews: 1100,
      deliveryTime: "35-50 min",
      image: "https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=400",
      offer: "Free Delivery",
      distance: "2.5 km",
      avgCost: 350,
      tags: ['Trending']
    }
  ];

  const dishes = [
    {
      id: 1,
      name: "Butter Chicken",
      restaurant: "Mama's Kitchen",
      price: 320,
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.6,
      description: "Tender chicken in rich tomato and butter gravy",
      isVeg: false,
      cuisine: "Indian"
    },
    {
      id: 2,
      name: "Margherita Pizza",
      restaurant: "Pizza Palace",
      price: 280,
      image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.4,
      description: "Classic pizza with tomato sauce, mozzarella and basil",
      isVeg: true,
      cuisine: "Italian"
    },
    {
      id: 3,
      name: "Chicken Hakka Noodles",
      restaurant: "Dragon Wok",
      price: 250,
      image: "https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.3,
      description: "Stir-fried noodles with vegetables and chicken",
      isVeg: false,
      cuisine: "Chinese"
    }
  ];

  const filterData = () => {
    let filteredRestaurants = restaurants;
    let filteredDishes = dishes;

    if (searchQuery) {
      filteredRestaurants = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      filteredDishes = dishes.filter(dish =>
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (selectedCuisines.length > 0) {
      filteredRestaurants = filteredRestaurants.filter(restaurant =>
        selectedCuisines.includes(restaurant.cuisine)
      );
      filteredDishes = filteredDishes.filter(dish =>
        selectedCuisines.includes(dish.cuisine)
      );
    }

    if (rating > 0) {
      filteredRestaurants = filteredRestaurants.filter(restaurant => restaurant.rating >= rating);
      filteredDishes = filteredDishes.filter(dish => dish.rating >= rating);
    }

    filteredRestaurants = filteredRestaurants.filter(restaurant =>
      restaurant.avgCost >= priceRange[0] && restaurant.avgCost <= priceRange[1]
    );

    filteredDishes = filteredDishes.filter(dish =>
      dish.price >= priceRange[0] && dish.price <= priceRange[1]
    );

    // Sort results
    if (sortBy === 'rating') {
      filteredRestaurants.sort((a, b) => b.rating - a.rating);
      filteredDishes.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price_low') {
      filteredRestaurants.sort((a, b) => a.avgCost - b.avgCost);
      filteredDishes.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_high') {
      filteredRestaurants.sort((a, b) => b.avgCost - a.avgCost);
      filteredDishes.sort((a, b) => b.price - a.price);
    }

    return { filteredRestaurants, filteredDishes };
  };

  const { filteredRestaurants, filteredDishes } = filterData();

  const toggleCuisine = (cuisine) => {
    setSelectedCuisines(prev =>
      prev.includes(cuisine)
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const clearFilters = () => {
    setSelectedCuisines([]);
    setPriceRange([0, 1000]);
    setDeliveryTime('any');
    setRating(0);
    setSortBy('relevance');
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for restaurants, cuisines, or dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
              autoFocus
            />
          </div>
        </div>

        {!searchQuery ? (
          <div className="space-y-8">
            {/* Recent Searches */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-gray-600" />
                Recent Searches
              </h2>
              <div className="flex flex-wrap gap-3">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(search)}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-full hover:border-red-500 hover:text-red-600 transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Searches */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-red-600" />
                Trending Searches
              </h2>
              <div className="flex flex-wrap gap-3">
                {trendingSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(search)}
                    className="px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded-full hover:bg-red-100 transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Search Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Search results for "{searchQuery}"
                </h2>
                <p className="text-gray-600">
                  {filteredRestaurants.length + filteredDishes.length} results found
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="relevance">Sort by Relevance</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Sliders className="w-4 h-4" />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={clearFilters}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Cuisines */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Cuisines</h4>
                    <div className="space-y-2">
                      {cuisines.map((cuisine) => (
                        <label key={cuisine} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedCuisines.includes(cuisine)}
                            onChange={() => toggleCuisine(cuisine)}
                            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{cuisine}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="Min"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Rating</h4>
                    <div className="space-y-2">
                      {[4, 3.5, 3, 0].map((ratingValue) => (
                        <label key={ratingValue} className="flex items-center">
                          <input
                            type="radio"
                            name="rating"
                            checked={rating === ratingValue}
                            onChange={() => setRating(ratingValue)}
                            className="text-red-600 focus:ring-red-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {ratingValue === 0 ? 'Any Rating' : `${ratingValue}+ Stars`}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Time */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Delivery Time</h4>
                    <div className="space-y-2">
                      {[
                        { value: 'any', label: 'Any Time' },
                        { value: '30', label: 'Under 30 mins' },
                        { value: '45', label: 'Under 45 mins' },
                        { value: '60', label: 'Under 1 hour' }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center">
                          <input
                            type="radio"
                            name="deliveryTime"
                            checked={deliveryTime === option.value}
                            onChange={() => setDeliveryTime(option.value)}
                            className="text-red-600 focus:ring-red-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Filter Tabs */}
            <div className="flex space-x-1 bg-gray-200 rounded-lg p-1 mb-8 max-w-md">
              <button
                onClick={() => setActiveFilter('all')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeFilter === 'all'
                  ? 'bg-white text-red-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                All ({filteredRestaurants.length + filteredDishes.length})
              </button>
              <button
                onClick={() => setActiveFilter('restaurants')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeFilter === 'restaurants'
                  ? 'bg-white text-red-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Restaurants ({filteredRestaurants.length})
              </button>
              <button
                onClick={() => setActiveFilter('dishes')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeFilter === 'dishes'
                  ? 'bg-white text-red-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Dishes ({filteredDishes.length})
              </button>
            </div>

            {/* Search Results */}
            <div className="space-y-8">
              {(activeFilter === 'all' || activeFilter === 'restaurants') && filteredRestaurants.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Restaurants</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRestaurants.map((restaurant) => (
                      <Link
                        key={restaurant.id}
                        to={`/restaurant/${restaurant.id}`}
                        className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden"
                      >
                        <div className="relative">
                          <img
                            src={restaurant.image}
                            alt={restaurant.name}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {restaurant.offer}
                          </div>
                        </div>

                        <div className="p-4">
                          <h4 className="font-bold text-lg text-gray-900 mb-1">{restaurant.name}</h4>
                          <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>

                          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span>{restaurant.rating}</span>
                              <span>({restaurant.reviews})</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{restaurant.deliveryTime}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">₹{restaurant.avgCost} for two</span>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{restaurant.distance}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {(activeFilter === 'all' || activeFilter === 'dishes') && filteredDishes.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Dishes</h3>
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
                            <div className="flex items-center space-x-2 mb-1">
                              <div className={`w-3 h-3 rounded-full ${dish.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></div>
                              <h4 className="font-bold text-lg text-gray-900">{dish.name}</h4>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{dish.restaurant}</p>
                            <p className="text-sm text-gray-600 mb-3">{dish.description}</p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <span className="text-lg font-bold text-gray-900">₹{dish.price}</span>
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="text-sm font-medium">{dish.rating}</span>
                                </div>
                              </div>
                              <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredRestaurants.length === 0 && filteredDishes.length === 0 && (
                <div className="text-center py-16">
                  <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600 mb-6">Try searching with different keywords or adjust your filters</p>
                  <button
                    onClick={clearFilters}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Search;

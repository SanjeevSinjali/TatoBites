import React, { useState, useEffect } from 'react';
import {
  Search as SearchIcon,
  TrendingUp,
  Star,
  X,
  Sliders
} from 'lucide-react';
import { api } from '../../lib/api-client';
import { useCart } from '../../lib/cart-provider';

const Search = ({ user, onLogout }) => {
  const { addToCart } = useCart();
  const [menu, setMenu] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [deliveryTime, setDeliveryTime] = useState('any');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchMenu = async () => {
      const menu = await api.get("/menu")
      setMenu(menu.data)
    }

    fetchMenu();
  }, [])

  const trendingSearches = [
    'Butter Chicken',
    'Margherita Pizza',
    'Chicken Biryani',
    'Pad Thai',
    'Chocolate Cake'
  ];


  const filterData = () => {
    let filteredDishes = menu;

    if (searchQuery) {
      filteredDishes = menu.filter(dish =>
        dish.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (selectedCuisines.length > 0) {
      filteredDishes = filteredDishes.filter(dish =>
        selectedCuisines.includes(dish.cuisine)
      );
    }

    if (rating > 0) {
      filteredDishes = filteredDishes.filter(dish => dish.rating >= rating);
    }

    filteredDishes = filteredDishes.filter(dish =>
      dish.price >= priceRange[0] && dish.price <= priceRange[1]
    );

    // Sort results
    if (sortBy === 'rating') {
      filteredDishes.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price_low') {
      filteredDishes.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_high') {
      filteredDishes.sort((a, b) => b.price - a.price);
    }

    return { filteredDishes };
  };

  const { filteredDishes } = filterData();

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
              placeholder="Search for dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
              autoFocus
            />
          </div>
        </div>

        {!searchQuery ? (
          <div className="space-y-8">
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
              </div>
            </div>

            {/* Search Results */}
            <div className="space-y-8">
              {(activeFilter === 'all' || activeFilter === 'dishes') && filteredDishes.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Dishes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredDishes.map((dish) => (
                      <div key={dish.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 p-6">
                        <div className="flex space-x-4">
                          <img
                            src={dish.image_url}
                            alt={dish.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />

                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <div className={`w-3 h-3 rounded-full ${dish.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></div>
                              <h4 className="font-bold text-lg text-gray-900">{dish.name}</h4>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{dish.description}</p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <span className="text-lg font-bold text-gray-900">₹{dish.price}</span>
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="text-sm font-medium">{dish.rating}</span>
                                </div>
                              </div>
                              <button
                                onClick={() => addToCart(dish)}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
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

              {filteredDishes.length === 0 && (
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

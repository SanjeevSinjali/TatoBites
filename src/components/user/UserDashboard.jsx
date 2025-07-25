import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  Truck,
  Gift,
  TrendingUp,
  ChevronRight,
  Percent
} from 'lucide-react';
import { api } from '../../lib/api-client';
import { useCart } from '../../lib/cart-provider';
import { useAuth } from '../../lib/auth';

const UserDashboard = () => {
  const { user } = useAuth()
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [trendingDishes, setTrendingDishes] = useState([])
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await api.get('/menu');
        console.log(response)
        setMenuItems(response.data.slice(0, 5));
        setTrendingDishes(response.data)
      } catch (err) {
        console.error('Error fetching menu:', err);
      }
    };
    fetchMenuItems();


    const interval = setInterval(() => {
      setCurrentOfferIndex((prev) => (prev + 1) % bannerOffers.length);
    }, 5000);
    return () => clearInterval(interval);

  }, []);

  const categories = [
    { id: 'all', name: 'All', icon: '🍽️' },
    { id: 'pizza', name: 'Pizza', icon: '🍕' },
    { id: 'burger', name: 'Burgers', icon: '🍔' },
    { id: 'rice', name: 'Rice', icon: '🍛' },
    { id: 'chinese', name: 'Chinese', icon: '🥡' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' },
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
    }
  ];

  const quickActions = [
    { id: 1, name: 'Reorder', icon: Truck, color: 'bg-green-100 text-green-600', link: '/orders', requiresUser: true },
    { id: 2, name: 'Offers', icon: Gift, color: 'bg-yellow-100 text-yellow-600', link: '/offers' }
  ];

  const filteredMenu = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesCategory;
  });

  const filteredActions = quickActions.filter(action => {
    if (action.requiresUser && !user) return false;
    return true;
  });


  return (
    <div className="min-h-screen bg-gray-50">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {/* Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {user.name}! 👋 */}
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
                  {/* <button className="bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"> */}
                  {/*   Order Now */}
                  {/* </button> */}
                  <Link
                    to="/menu"
                    className="bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-block text-center"
                  >
                    Order Now
                  </Link>
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
                className={`w-2 h-2 rounded-full transition-colors ${index === currentOfferIndex ? 'bg-white' : 'bg-white/50'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`grid gap-2 mb-8 ${filteredActions.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {filteredActions.map((action) => (
            <Link
              key={action.id}
              to={action.link}
              className={`bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-center group
        ${filteredActions.length === 1 ? 'text-lg' : ''}`} // optional: bigger text if single item
            >
              <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-gray-900">{action.name}</span>
            </Link>
          ))}
        </div>


        {/* Trending Dishes */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-red-600" />
              Trending Now
            </h2>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {trendingDishes && trendingDishes.slice(0, 4).map((dish) => (
              <div key={dish.id} className="flex-shrink-0 w-64 bg-white rounded-xl shadow-sm overflow-hidden hover:cursor-pointer">
                <img
                  src={dish.image_url}
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
                  <div className='flex justify-end mt-4'>
                    <button
                      onClick={
                        () => addToCart(dish)
                      }
                      className='px-4 py-2 rounded-lg font-medium transition-colors bg-red-600 text-white hover:bg-red-700'>Add to cart</button>
                  </div>
                </div>
              </div>
            ))}
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
                className={`flex-shrink-0 flex flex-col items-center p-4 rounded-xl transition-all duration-200 ${selectedCategory === category.id
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


        {/* menu */}
        {/* menu */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-red-600" />
              Menu
            </h2>
            <Link to="/search" className="text-red-600 hover:text-red-700 font-medium flex items-center">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-4">
            {filteredMenu && filteredMenu.map((dish) => (
              <div key={dish.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:cursor-pointer">
                <img
                  src={dish.image_url}
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
                <div className='flex justify-end my-4'>
                  <button
                    onClick={() => addToCart(dish)}
                    className='px-4 py-2 rounded-lg font-medium transition-colors bg-red-600 text-white hover:bg-red-700'
                  >
                    Add to cart
                  </button>
                </div>
              </div>
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

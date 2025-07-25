import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Clock, MapPin, Heart, Plus, Minus, ShoppingCart } from 'lucide-react';
import { api } from '../../lib/api-client';

const RestaurantDetail = ({ user, onLogout }) => {
  const { id } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await api.get('/api/v1/menu');
        setMenuItems(response.data.data);
      } catch (err) {
        console.error('Error fetching menu:', err);
        setError('Failed to load menu');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);
  // Mock restaurant data
  const restaurant = {
    id: 1,
    name: "Mama's Kitchen",
    cuisine: "Indian",
    rating: 4.5,
    reviews: 1250,
    deliveryTime: "30-45 min",
    deliveryFee: "₹40",
    image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800",
    offer: "50% OFF up to ₹100",
    distance: "2.1 km",
    description: "Authentic Indian cuisine with traditional flavors and modern presentation."
  };

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'starters', name: 'Starters' },
    { id: 'mains', name: 'Main Course' },
    { id: 'rice', name: 'Rice & Biryani' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'beverages', name: 'Beverages' }
  ];

  const filteredItems = selectedCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === itemId);
    if (existingItem && existingItem.quantity > 1) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ));
    } else {
      setCartItems(cartItems.filter(cartItem => cartItem.id !== itemId));
    }
  };

  const getItemQuantity = (itemId) => {
    const item = cartItems.find(cartItem => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/dashboard"
          className="flex items-center space-x-2 text-gray-600 hover:text-red-600 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to restaurants</span>
        </Link>

        {/* Restaurant Header */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="relative h-64">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <button className="p-3 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors">
                <Heart className="w-5 h-5 text-gray-600 hover:text-red-600" />
              </button>
            </div>
            <div className="absolute bottom-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full font-medium">
              {restaurant.offer}
            </div>
          </div>

          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
            <p className="text-gray-600 mb-4">{restaurant.description}</p>

            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-medium">{restaurant.rating}</span>
                <span className="text-gray-500">({restaurant.reviews} reviews)</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{restaurant.distance}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Menu Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${selectedCategory === category.id
                      ? 'bg-red-100 text-red-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm p-6 flex">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        {item.bestseller && (
                          <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">
                            Bestseller
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{item.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-lg text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                    <p className="text-xl font-bold text-gray-900">₹{item.price}</p>
                  </div>

                  <div className="ml-6 flex flex-col items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg mb-4"
                    />

                    {getItemQuantity(item.id) === 0 ? (
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add</span>
                      </button>
                    ) : (
                      <div className="flex items-center space-x-3 bg-red-600 text-white rounded-lg px-3 py-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="hover:bg-red-700 rounded p-1"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-medium">{getItemQuantity(item.id)}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="hover:bg-red-700 rounded p-1"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)} items
                </p>
                <p className="text-sm text-gray-600">₹{getTotalAmount()}</p>
              </div>
              <Link
                to="/cart"
                className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>View Cart</span>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default RestaurantDetail;

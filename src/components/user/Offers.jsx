import React, { useState } from 'react';
import { Gift, Clock, Star, Copy, Check, Percent, Zap, Users, Calendar } from 'lucide-react';
import Header from './Header';

const Offers = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [copiedCode, setCopiedCode] = useState('');

  const offers = [
    {
      id: 1,
      title: "50% OFF on First Order",
      description: "Get 50% discount up to ₹100 on your first order",
      code: "WELCOME50",
      discount: "50% OFF",
      maxDiscount: "₹100",
      minOrder: "₹200",
      validTill: "Dec 31, 2024",
      image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400",
      type: "new_user",
      category: "discount",
      usageCount: 0,
      maxUsage: 1,
      restaurants: "All restaurants"
    },
    {
      id: 2,
      title: "Free Delivery Weekend",
      description: "No delivery charges on orders above ₹299 this weekend",
      code: "FREEDEL",
      discount: "Free Delivery",
      maxDiscount: "₹50",
      minOrder: "₹299",
      validTill: "Dec 25, 2024",
      image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400",
      type: "delivery",
      category: "free_delivery",
      usageCount: 2,
      maxUsage: 5,
      restaurants: "All restaurants"
    },
    {
      id: 3,
      title: "Buy 1 Get 1 Free",
      description: "Buy any pizza and get another pizza of equal or lesser value free",
      code: "BOGO",
      discount: "BOGO",
      maxDiscount: "₹500",
      minOrder: "₹400",
      validTill: "Dec 30, 2024",
      image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400",
      type: "bogo",
      category: "special",
      usageCount: 1,
      maxUsage: 3,
      restaurants: "Pizza Palace, Italian Corner"
    },
    {
      id: 4,
      title: "Loyalty Bonus",
      description: "Extra 20% off for our loyal customers",
      code: "LOYAL20",
      discount: "20% OFF",
      maxDiscount: "₹150",
      minOrder: "₹500",
      validTill: "Jan 15, 2025",
      image: "https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=400",
      type: "loyalty",
      category: "discount",
      usageCount: 0,
      maxUsage: 10,
      restaurants: "Selected restaurants"
    },
    {
      id: 5,
      title: "Midnight Munchies",
      description: "30% off on late night orders between 11 PM - 6 AM",
      code: "NIGHT30",
      discount: "30% OFF",
      maxDiscount: "₹120",
      minOrder: "₹300",
      validTill: "Dec 31, 2024",
      image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400",
      type: "time_based",
      category: "discount",
      usageCount: 3,
      maxUsage: 15,
      restaurants: "24/7 restaurants"
    },
    {
      id: 6,
      title: "Group Order Discount",
      description: "Order for 4+ people and get 25% off",
      code: "GROUP25",
      discount: "25% OFF",
      maxDiscount: "₹200",
      minOrder: "₹800",
      validTill: "Jan 10, 2025",
      image: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400",
      type: "group",
      category: "discount",
      usageCount: 0,
      maxUsage: 5,
      restaurants: "All restaurants"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Offers', icon: Gift },
    { id: 'discount', name: 'Discounts', icon: Percent },
    { id: 'free_delivery', name: 'Free Delivery', icon: Zap },
    { id: 'special', name: 'Special', icon: Star },
  ];

  const filteredOffers = activeTab === 'all' 
    ? offers 
    : offers.filter(offer => offer.category === activeTab);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const getOfferIcon = (type) => {
    switch (type) {
      case 'new_user':
        return <Users className="w-5 h-5" />;
      case 'delivery':
        return <Zap className="w-5 h-5" />;
      case 'bogo':
        return <Gift className="w-5 h-5" />;
      case 'loyalty':
        return <Star className="w-5 h-5" />;
      case 'time_based':
        return <Clock className="w-5 h-5" />;
      case 'group':
        return <Users className="w-5 h-5" />;
      default:
        return <Percent className="w-5 h-5" />;
    }
  };

  const getOfferColor = (type) => {
    switch (type) {
      case 'new_user':
        return 'bg-blue-100 text-blue-600';
      case 'delivery':
        return 'bg-green-100 text-green-600';
      case 'bogo':
        return 'bg-purple-100 text-purple-600';
      case 'loyalty':
        return 'bg-yellow-100 text-yellow-600';
      case 'time_based':
        return 'bg-indigo-100 text-indigo-600';
      case 'group':
        return 'bg-pink-100 text-pink-600';
      default:
        return 'bg-red-100 text-red-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} cartItems={[]} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Gift className="w-8 h-8 mr-3 text-red-600" />
            Offers & Deals
          </h1>
          <p className="text-gray-600 mt-2">Save more on your favorite food</p>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-white mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="bg-white/20 p-2 rounded-lg mr-3">
                <Zap className="w-6 h-6" />
              </div>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                Limited Time
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-2">Mega Weekend Sale!</h2>
            <p className="text-red-100 mb-4 text-lg">Up to 60% off on all restaurants + Free delivery</p>
            <div className="flex items-center space-x-4">
              <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Order Now
              </button>
              <div className="flex items-center space-x-2 text-red-100">
                <Clock className="w-4 h-4" />
                <span>Ends in 2 days</span>
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-0 w-1/3 h-full opacity-20">
            <img 
              src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400" 
              alt="Featured offer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex space-x-1 bg-gray-200 rounded-lg p-1 mb-8 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`flex items-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === category.id
                  ? 'bg-white text-red-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredOffers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden">
              <div className="relative">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-32 object-cover"
                />
                <div className={`absolute top-3 left-3 ${getOfferColor(offer.type)} px-3 py-1 rounded-full flex items-center space-x-1`}>
                  {getOfferIcon(offer.type)}
                  <span className="text-sm font-medium">{offer.discount}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{offer.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Max Discount:</span>
                    <span className="font-medium">{offer.maxDiscount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Min Order:</span>
                    <span className="font-medium">{offer.minOrder}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Valid Till:</span>
                    <span className="font-medium flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {offer.validTill}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Restaurants:</span>
                    <span className="font-medium text-right">{offer.restaurants}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Used {offer.usageCount} of {offer.maxUsage} times</span>
                    <span>{Math.round((offer.usageCount / offer.maxUsage) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(offer.usageCount / offer.maxUsage) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                    <span className="font-mono font-bold text-gray-900">{offer.code}</span>
                    <button
                      onClick={() => copyCode(offer.code)}
                      className="text-red-600 hover:text-red-700 transition-colors"
                    >
                      {copiedCode === offer.code ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  
                  <button 
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      offer.usageCount >= offer.maxUsage
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                    disabled={offer.usageCount >= offer.maxUsage}
                  >
                    {offer.usageCount >= offer.maxUsage ? 'Used Up' : 'Use Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
          <h3 className="font-bold text-lg text-gray-900 mb-4">Terms & Conditions</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Offers are valid for limited time only and subject to availability</p>
            <p>• Maximum discount amount and minimum order value as mentioned in each offer</p>
            <p>• Offers cannot be combined with other promotions or discounts</p>
            <p>• TatoBites reserves the right to modify or cancel offers at any time</p>
            <p>• Delivery charges may apply separately unless mentioned as free delivery</p>
            <p>• Offers are applicable only on the TatoBites platform</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Offers;
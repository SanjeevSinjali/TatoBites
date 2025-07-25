import React, { useEffect, useState } from 'react';
import { Gift, Clock, Star, Copy, Check, Percent, Zap, Users, Calendar } from 'lucide-react';
import { api } from '../../lib/api-client';


const Offers = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('ALL');
  const [copiedCode, setCopiedCode] = useState('');
  const [offer, setOffer] = useState([])

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await api.get('/offer');
        console.log(response)
        setOffer(response.data);
      } catch (err) {
        console.error('Error fetching offers:', err);
      }
    };
    fetchOffers();
  }, [])


  const categories = [
    { id: 'ALL', name: 'All Offers', icon: Gift },
    { id: 'DISCOUNT', name: 'Discounts', icon: Percent },
    { id: 'SPECIAL', name: 'Special', icon: Star },
  ];

  const filteredOffers = activeTab === 'ALL'
    ? offer
    : offer.filter(offer => offer.category === activeTab);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const getOfferIcon = (type) => {
    switch (type) {
      case 'NEW_USER':
        return <Users className="w-5 h-5" />;
      case 'DELIVERY':
        return <Zap className="w-5 h-5" />;
      case 'BOGO':
        return <Gift className="w-5 h-5" />;
      case 'LOYALTY':
        return <Star className="w-5 h-5" />;
      case 'TIME_BASED':
        return <Clock className="w-5 h-5" />;
      case 'GROUP':
        return <Users className="w-5 h-5" />;
      default:
        return <Percent className="w-5 h-5" />;
    }
  };

  const getOfferColor = (type) => {
    switch (type) {
      case 'NEW_USER':
        return 'bg-blue-100 text-blue-600';
      case 'DELIVERY':
        return 'bg-green-100 text-green-600';
      case 'BOGO':
        return 'bg-purple-100 text-purple-600';
      case 'LOYALTY':
        return 'bg-yellow-100 text-yellow-600';
      case 'TIME_BASED':
        return 'bg-indigo-100 text-indigo-600';
      case 'GROUP':
        return 'bg-pink-100 text-pink-600';
      default:
        return 'bg-red-100 text-red-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Gift className="w-8 h-8 mr-3 text-red-600" />
            Offers & Deals
          </h1>
          <p className="text-gray-600 mt-2">Save more on your favorite food</p>
        </div>


        <div className="flex space-x-1 bg-gray-200 rounded-lg p-1 mb-8 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`flex items-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${activeTab === category.id
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
                      {offer?.validTill?.split("T")[0]}
                    </span>
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
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${offer.usageCount >= offer.maxUsage
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

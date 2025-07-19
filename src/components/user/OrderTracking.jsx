import React, { useState } from 'react';
import { Clock, CheckCircle, Truck, MapPin, Phone, Star } from 'lucide-react';
import Header from './Header';

const OrderTracking = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('current');

  const currentOrder = {
    id: '#ORD-12345',
    restaurant: "Mama's Kitchen",
    items: ['Butter Chicken x2', 'Chicken Biryani x1'],
    total: '₹1040',
    status: 'preparing',
    estimatedTime: '25 mins',
    deliveryPartner: {
      name: 'Rahul Kumar',
      phone: '+91 98765 43210',
      rating: 4.8
    },
    timeline: [
      { status: 'confirmed', time: '2:30 PM', completed: true },
      { status: 'preparing', time: '2:35 PM', completed: true },
      { status: 'ready', time: '2:50 PM', completed: false },
      { status: 'picked_up', time: '2:55 PM', completed: false },
      { status: 'delivered', time: '3:15 PM', completed: false }
    ]
  };

  const orderHistory = [
    {
      id: '#ORD-12344',
      restaurant: 'Pizza Palace',
      date: 'Yesterday, 8:30 PM',
      items: ['Margherita Pizza', 'Garlic Bread'],
      total: '₹680',
      status: 'delivered',
      rating: 5
    },
    {
      id: '#ORD-1234',
      restaurant: 'Burger Junction',
      date: 'Dec 15, 7:45 PM',
      items: ['Classic Burger', 'French Fries', 'Coke'],
      total: '₹420',
      status: 'delivered',
      rating: 4
    },
    {
      id: '#ORD-12342',
      restaurant: 'Dragon Wok',
      date: 'Dec 14, 9:20 PM',
      items: ['Chicken Fried Rice', 'Sweet & Sour Chicken'],
      total: '₹590',
      status: 'delivered',
      rating: 0
    }
  ];

  const getStatusIcon = (status, completed) => {
    if (completed) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    
    switch (status) {
      case 'preparing':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'ready':
      case 'picked_up':
        return <Truck className="w-5 h-5 text-blue-500" />;
      default:
        return <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Order Confirmed';
      case 'preparing':
        return 'Preparing Your Food';
      case 'ready':
        return 'Ready for Pickup';
      case 'picked_up':
        return 'Out for Delivery';
      case 'delivered':
        return 'Delivered';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} cartItems={[]} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-200 rounded-lg p-1 mb-8">
          <button
            onClick={() => setActiveTab('current')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'current'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Current Order
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'history'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Order History
          </button>
        </div>

        {activeTab === 'current' ? (
          <div className="space-y-6">
            {/* Current Order */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{currentOrder.restaurant}</h2>
                    <p className="text-gray-600">{currentOrder.id}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {currentOrder.items.join(', ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">{currentOrder.total}</p>
                    <p className="text-sm text-orange-600 font-medium">
                      Arriving in {currentOrder.estimatedTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Timeline */}
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">Order Status</h3>
                <div className="space-y-4">
                  {currentOrder.timeline.map((step, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      {getStatusIcon(step.status, step.completed)}
                      <div className="flex-1">
                        <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                          {getStatusText(step.status)}
                        </p>
                        <p className="text-sm text-gray-500">{step.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Delivery Partner */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">Delivery Partner</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">
                        {currentOrder.deliveryPartner.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{currentOrder.deliveryPartner.name}</p>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{currentOrder.deliveryPartner.rating}</span>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                    <Phone className="w-4 h-4" />
                    <span>Call</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">Delivery Address</h3>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-red-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Home</p>
                    <p className="text-gray-600 text-sm">123 Main Street, Apartment 4B, New York, NY 10001</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {orderHistory.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{order.restaurant}</h3>
                    <p className="text-gray-600">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{order.total}</p>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{order.items.join(', ')}</p>
                
                <div className="flex justify-between items-center">
                  {order.rating > 0 ? (
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-600">Your rating:</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < order.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Rate Order
                    </button>
                  )}
                  
                  <div className="space-x-3">
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Reorder
                    </button>
                    <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default OrderTracking;
import React, { useState } from 'react';
import { 
  Bell, 
  Check, 
  Trash2, 
  Settings, 
  Package, 
  Gift, 
  Star, 
  AlertCircle,
  Clock,
  CheckCircle,
  X
} from 'lucide-react';
import Header from './Header';

const Notifications = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'Order Delivered Successfully!',
      message: 'Your order from Mama\'s Kitchen has been delivered. Enjoy your meal!',
      time: '2 minutes ago',
      read: false,
      icon: Package,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      orderId: '#ORD-12345'
    },
    {
      id: 2,
      type: 'offer',
      title: 'Special Weekend Offer!',
      message: '50% off on your next order. Use code WEEKEND50. Valid till Sunday.',
      time: '1 hour ago',
      read: false,
      icon: Gift,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      offerCode: 'WEEKEND50'
    },
    {
      id: 3,
      type: 'restaurant',
      title: 'New Restaurant Alert',
      message: 'Tasty Treats just joined TatoBites in your area. Check out their menu!',
      time: '3 hours ago',
      read: true,
      icon: Star,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      restaurantId: 7
    },
    {
      id: 4,
      type: 'order',
      title: 'Order Confirmed',
      message: 'Your order from Pizza Palace has been confirmed and is being prepared.',
      time: '5 hours ago',
      read: true,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      orderId: '#ORD-12344'
    },
    {
      id: 5,
      type: 'system',
      title: 'Account Security Alert',
      message: 'Your password was changed successfully. If this wasn\'t you, please contact support.',
      time: '1 day ago',
      read: true,
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      id: 6,
      type: 'offer',
      title: 'Cashback Credited',
      message: '₹50 cashback has been credited to your wallet for your recent order.',
      time: '2 days ago',
      read: true,
      icon: Gift,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      amount: 50
    },
    {
      id: 7,
      type: 'order',
      title: 'Rate Your Experience',
      message: 'How was your order from Dragon Wok? Rate and review to help others.',
      time: '3 days ago',
      read: true,
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      orderId: '#ORD-12343'
    }
  ]);

  const categories = [
    { id: 'all', name: 'All', count: notifications.length },
    { id: 'order', name: 'Orders', count: notifications.filter(n => n.type === 'order').length },
    { id: 'offer', name: 'Offers', count: notifications.filter(n => n.type === 'offer').length },
    { id: 'restaurant', name: 'Restaurants', count: notifications.filter(n => n.type === 'restaurant').length },
    { id: 'system', name: 'System', count: notifications.filter(n => n.type === 'system').length }
  ];

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(notification => notification.type === activeTab);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} cartItems={[]} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Bell className="w-8 h-8 mr-3 text-red-600" />
              Notifications
              {unreadCount > 0 && (
                <span className="ml-3 bg-red-600 text-white text-sm px-2 py-1 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </h1>
            <p className="text-gray-600 mt-2">Stay updated with your orders and offers</p>
          </div>
          
          <div className="flex items-center space-x-3">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
              >
                <Check className="w-4 h-4" />
                <span>Mark all as read</span>
              </button>
            )}
            <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
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
              <span>{category.name}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                activeTab === category.id
                  ? 'bg-red-100  text-red-600'
                  : 'bg-gray-300 text-gray-600'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-16">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">You're all caught up! Check back later for updates.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-xl shadow-sm border-l-4 transition-all duration-200 hover:shadow-md ${
                  !notification.read 
                    ? 'border-l-red-500 bg-red-50/30' 
                    : 'border-l-gray-200'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${notification.bgColor}`}>
                      <notification.icon className={`w-5 h-5 ${notification.color}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                            {!notification.read && (
                              <span className="ml-2 w-2 h-2 bg-red-600 rounded-full inline-block"></span>
                            )}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                          
                          {/* Action buttons based on notification type */}
                          <div className="flex items-center space-x-4 mt-3">
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>{notification.time}</span>
                            </div>
                            
                            {notification.orderId && (
                              <button className="text-red-600 hover:text-red-700 text-xs font-medium">
                                View Order
                              </button>
                            )}
                            
                            {notification.offerCode && (
                              <button className="text-red-600 hover:text-red-700 text-xs font-medium">
                                Use Offer
                              </button>
                            )}
                            
                            {notification.restaurantId && (
                              <button className="text-red-600 hover:text-red-700 text-xs font-medium">
                                View Menu
                              </button>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                              title="Mark as read"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete notification"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Clear All Button */}
            {filteredNotifications.length > 0 && (
              <div className="text-center pt-6">
                <button
                  onClick={clearAll}
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-600 mx-auto"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear all notifications</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Settings className="w-5 h-5 mr-2 text-red-600" />
            Notification Preferences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Order Updates</p>
                <p className="text-sm text-gray-600">Get notified about order status</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-red-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Offers & Promotions</p>
                <p className="text-sm text-gray-600">Receive deals and discounts</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">New Restaurants</p>
                <p className="text-sm text-gray-600">When new restaurants join</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-red-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-600">Receive notifications via email</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-red-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notifications;
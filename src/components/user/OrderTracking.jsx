import React, { useEffect, useState } from 'react';
import { Clock, CheckCircle, Truck, MapPin, Star, PackageCheck } from 'lucide-react';
import { api } from '../../lib/api-client';
import toast from 'react-hot-toast';

const OrderTracking = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('current');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/order');
        if (response.success) {
          setOrders(response.data);
        } else {
          toast.error("Couldn't fetch orders");
        }
      } catch (err) {
        toast.error("Couldn't fetch orders");
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const currentStatuses = ['PENDING', 'CONFIRMED', 'PREPARING'];
  const historyStatuses = ['COMPLETED', 'CANCELLED'];

  const currentOrders = orders.filter(o => currentStatuses.includes(o.status));
  const historyOrders = orders.filter(o => historyStatuses.includes(o.status));

  // Helper to get a basic status icon for current order timeline - simplified here
  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'CONFIRMED':
        return <PackageCheck className="w-5 h-5 text-green-700" />;
      case 'COMPLETED':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Truck className="w-5 h-5 text-blue-500" />;
    }
  };

  const formatItems = (orderItems) => {
    if (!orderItems || orderItems.length === 0) return ['No items'];
    return orderItems.map(item => {
      const itemName = item.MenuItem?.name || `Item #${item.menu_item_id}`;
      return `${itemName} x${item.quantity}`;
    });
  };
  const handleReorder = async (order) => {
    try {
      if (!order.OrderItems || order.OrderItems.length === 0) {
        toast.error("No items to reorder");
        return;
      }

      // Calculate total price by summing OrderItems' total_price
      const totalPrice = order.OrderItems.reduce(
        (sum, item) => sum + parseFloat(item.total_price),
        0
      );

      // Prepare items payload with required fields
      const items = order.OrderItems.map(item => ({
        menu_item_id: item.menu_item_id,
        quantity: item.quantity,
        price_each: parseFloat(item.price_each),
        total_price: parseFloat(item.total_price)
      }));

      console.log({
        order_type: order.order_type,
        total_price: totalPrice,
        items
      })

      // POST to your create order endpoint
      const response = await api.post('/order', {
        order_type: order.order_type,
        total_price: totalPrice,
        items
      });

      if (response.success) {
        toast.success(`Reorder for order #${order.id} placed!`);
        // Optionally refresh orders here
      } else {
        toast.error('Failed to place reorder.');
      }
    } catch (err) {
      console.error('Error placing reorder:', err);
      toast.error('Failed to place reorder.');
    }
  };
  if (loading) {
    return <div className="p-4 text-center">Loading orders...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-200 rounded-lg p-1 mb-8">
          <button
            onClick={() => setActiveTab('current')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'current'
              ? 'bg-white text-red-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            Current Orders
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'history'
              ? 'bg-white text-red-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            Order History
          </button>
        </div>

        {activeTab === 'current' ? (
          <div className="space-y-6">
            {currentOrders.length === 0 && (
              <p className="text-gray-600">No current orders.</p>
            )}
            {currentOrders.map(order => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-600 font-semibold">Order #{order.id}</p>
                    <p className="text-sm text-gray-500 mt-1">{formatItems(order.OrderItems).join(', ')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">₹{order.total_price}</p>
                    <p className="text-sm text-orange-600 font-medium">{order.status}</p>
                  </div>
                </div>

                {/* You can add a simplified timeline here if you have statuses */}
                <div className="flex space-x-3">
                  {getStatusIcon(order.status)}
                  <p className="text-gray-700 font-medium">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {historyOrders.length === 0 && (
              <p className="text-gray-600">No past orders.</p>
            )}
            {historyOrders.map(order => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-600 font-semibold">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                    <p className="text-sm text-gray-500 mt-1">{formatItems(order.OrderItems).join(', ')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">₹{order.total_price}</p>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium capitalize">
                      {order.status.toLowerCase()}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleReorder(order)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Reorder
                  </button>
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

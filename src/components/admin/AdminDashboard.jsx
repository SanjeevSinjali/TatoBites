import React, { useEffect, useState } from 'react';
import {
  BarChart3,
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Clock,
  Star,
  MapPin,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import AdminHeader from './AdminHeader';
import { api } from '../../lib/api-client';
import toast from 'react-hot-toast';

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([])
  const [selectedStatuses, setSelectedStatuses] = useState({});

  useEffect(() => {

    const fetchUser = async () => {

      const users = await api.get("/users")

      console.log(users.data)

      setUsers(users.data)
    }

    fetchUser()

  }, [])

  const handleStatusChange = (orderId, newStatus) => {
    setSelectedStatuses((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));

    toast.success(`Updated status : ${newStatus}`)
  };

  const stats = [
    {
      title: 'Total Revenue',
      value: '₹480',
      change: '+12.5%',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Total Orders',
      value: '2',
      change: '+8.2%',
      icon: ShoppingBag,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Users',
      value: '1',
      change: '+1%',
      icon: Users,
      color: 'bg-purple-500'
    }
    // {
    //   title: 'Restaurants',
    //   value: '156',
    //   change: '+3.1%',
    //   icon: MapPin,
    //   color: 'bg-red-500'
    // }
  ];

  const recentOrders = [
    {
      id: '#ORD-2',
      customer: 'sujita',
      item: "Butter Chicken",
      amount: '₹300',
      status: 'PENDING',
      time: '2 mins ago'
    },
    {
      id: '#ORD-1',
      customer: 'sujita',
      item: 'Mango Lassi',
      amount: '₹180',
      status: 'PENDING',
      time: '5 mins ago'
    }
    // {
    //   id: '#ORD-2',
    //   customer: 'customerhoma',
    //   restaurant: 'Burger Junction',
    //   amount: '₹320',
    //   status: 'CONFIRMED',
    //   time: '8 mins ago'
    // },
    // {
    //   id: '#ORD-1',
    //   customer: 'customerhoma',
    //   restaurant: 'Dragon Wok',
    //   amount: '₹590',
    //   status: 'COMPLETED',
    //   time: '12 mins ago'
    // }
  ];


  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800';
      case 'on the way':
        return 'bg-blue-100 text-blue-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm h-screen sticky top-16">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'overview' ? 'bg-red-100 text-red-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'orders' ? 'bg-red-100 text-red-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Orders</span>
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'users' ? 'bg-red-100 text-red-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <Users className="w-5 h-5" />
              <span>Users</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'overview' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        <p className="text-green-600 text-sm mt-1 flex items-center">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          {stat.change}
                        </p>
                      </div>
                      <div className={`${stat.color} p-3 rounded-lg`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentOrders.map((order, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {order.customer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {order.item}
                          </td>                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.time}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentOrders.map((order, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.customer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.amount}
                        </td>


                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={selectedStatuses[order.id] || order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className={`px-2 py-2 text-center text-xs font-medium rounded-full ${getStatusColor(order.status)} bg-transparent border-none outline-none`}
                          >
                            {['PENDING', 'CONFIRMED', 'PREPARING', 'COMPLETED', 'CANCELLED'].map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </td>


                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Users</h1>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add User</span>
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search user..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Filter className="w-4 h-4" />
                      <span>Filter</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">UserName</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {users && users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{user.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-800">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-800">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-800">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div >
  );
};

export default AdminDashboard;

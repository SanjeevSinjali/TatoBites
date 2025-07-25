import React, { useEffect, useState } from 'react';
import {
  BarChart3,
  Users,
  ShoppingBag,
  DollarSign,
  X,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  CirclePercent,
  SquareMenu
} from 'lucide-react';
import { api } from '../../lib/api-client';
import toast from 'react-hot-toast';

const iconMap = {
  BarChart3,
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2
}

const statuses = [
  'PENDING', 'CONFIRMED', 'PREPARING', 'COMPLETED'
]

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [menuItems, setMenuItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [stats, setStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [offers, setOffers] = useState([]);
  const [isMenuDialogOpen, setIsMenuDialogOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [offerData, setOfferData] = useState({
    title: "",
    description: "",
    code: "",
    discount_percentage: "",
    maxDiscount: "",
    minOrder: "",
    validTill: "",
    image: "",
    type: "",
    category: "",
    maxUsage: "",
  });
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editOfferData, setEditOfferData] = useState(null);
  const [menuData, setMenuData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    is_available: true,
    rating: "",
    isVeg: true,
    bestseller: false,
    image_url: "",
  });
  const [isEditMenuDialogOpen, setIsEditMenuDialogOpen] = useState(false);
  const [editMenuData, setEditMenuData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    is_available: true,
    rating: "",
    isVeg: true,
    bestseller: false,
    image_url: "",
  });

  const handleEditMenu = (item) => {
    setEditMenuData(item);
    setIsEditMenuDialogOpen(true);
  };

  const handleEditMenuChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditMenuData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMenuUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/menu/${editMenuData.id}`, {
        ...editMenuData
      })
      toast.success("Sucessfully updated!!")
      setMenuItems(prevMenu =>
        prevMenu.map(item =>
          item.id === editMenuData.id ? res.data : item
        )
      );
    } catch (e) {
      toast.error("Error while updating menu")
    }
    setIsEditMenuDialogOpen(false);
  };

  const formatDateForDatetimeLocal = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const pad = (n) => n.toString().padStart(2, "0");

    const year = d.getFullYear();
    const month = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const hours = pad(d.getHours());
    const minutes = pad(d.getMinutes());

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  useEffect(() => {

    const fetchUser = async () => {
      const users = await api.get("/users")
      console.log(users.data)
      setUsers(users.data)
      setFilteredUsers(users.data)
    }

    const fetchOffers = async () => {
      try {
        const res = await api.get('/offer');
        if (res.success && Array.isArray(res.data)) {
          setOffers(res.data);
        } else {
          toast.error('Failed to load offers');
        }
      } catch (error) {
        toast.error('Error fetching offers');
        console.error(error);
      }
    };

    const fetchMenu = async () => {
      try {
        const res = await api.get('/menu');
        if (res.success && Array.isArray(res.data)) {
          setMenuItems(res.data);
        } else {
          toast.error('Failed to load menu');
        }
      } catch (error) {
        toast.error('Error fetching menu');
        console.error(error);
      }
    };

    const fetchStats = async () => {
      const res = await api.get("/admin/overview");
      if (res.success && Array.isArray(res.data)) {
        const mapped = res.data.map(stat => ({
          ...stat,
          icon: iconMap[stat.icon]
        }));
        setStats(mapped);
      } else {
        toast.error("Failed to load stats");
      }
    };

    const fetchRecentOrders = async () => {
      try {
        const res = await api.get('/admin/recentOrder');
        if (res.success && Array.isArray(res.data)) {
          const mappedOrders = res.data.map(order => ({
            id: `#ORD-${order.id}`,
            customer: order.User?.name || 'Unknown',
            item: '—',
            amount: `₹${order.total_price}`,
            status: order.status,
            time: new Date(order.createdAt).toLocaleString()
          }));
          setRecentOrders(mappedOrders);
        } else {
          toast.error('Failed to load recent orders');
        }
      } catch {
        toast.error('Failed to load recent orders');
      }
    };

    const fetchAllOrders = async () => {
      try {
        const res = await api.get('/order/admin');
        setAllOrders(res.data)
      } catch (error) {
        toast.error('Failed to load orders');
        console.error(error);
      }
    };

    fetchUser();
    fetchStats();
    fetchRecentOrders();
    fetchAllOrders();
    fetchOffers();
    fetchMenu();

  }, [])

  // Filter users whenever searchQuery or users change
  useEffect(() => {
    if (!searchQuery) {
      setFilteredUsers(users);
      return;
    }
    const lowerQuery = searchQuery.toLowerCase();
    const filtered = users.filter(u =>
      (u.name && u.name.toLowerCase().includes(lowerQuery)) ||
      (u.email && u.email.toLowerCase().includes(lowerQuery)) ||
      (u.phone && u.phone.toLowerCase().includes(lowerQuery))
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users])

  useEffect(() => {
    if (activeTab !== 'orders') {
      setShowDialog(false);
      setSelectedOrder(null);
    }
  }, [activeTab]);


  const openUpdateDialog = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setShowDialog(true);
  };

  const handleUpdate = async () => {
    try {
      console.log(newStatus)
      const res = await api.put(`/order/${selectedOrder.id}`, { status: newStatus });
      if (res.success) {
        toast.success('Order status updated!');
        setAllOrders(prev =>
          prev.map(o => (o.id === selectedOrder.id ? { ...o, status: newStatus } : o))
        );
        setShowDialog(false);
        setSelectedOrder(null);
      } else {
        toast.error('Failed to update order status');
      }
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOfferData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(offerData)
    try {
      const response = await api.post("/offer", {
        ...offerData,
        discount_percentage: parseFloat(offerData.discount_percentage),
        maxDiscount: parseFloat(offerData.maxDiscount),
        minOrder: parseFloat(offerData.minOrder),
        maxUsage: parseInt(offerData.maxUsage, 10),
      });
      toast.success("Offer created successfully!");
      setIsDialogOpen(false);
      setOfferData({
        title: "",
        description: "",
        code: "",
        discount_percentage: "",
        maxDiscount: "",
        minOrder: "",
        validTill: "",
        image: "",
        type: "",
        category: "",
        maxUsage: "",
      });
      setOffers(prevOffers => [...prevOffers, response.data]);
    } catch (error) {
      toast.error("Failed to create offer");
    }
  };

  const deleteUser = async (user) => {
    try {
      await api.delete(`/users/${user.id}`);
      setUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));
      toast.success(`User ${user.name} deleted !!`)
    } catch {
      toast.error('Failed to delete user');
    }
  }


  const handleMenuChange = (e) => {
    setMenuData({
      ...menuData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/menu", {
        ...menuData
      })
      console.log(response)
      setIsMenuDialogOpen(false);
      toast.success("Menu added successfully!!")
      setMenuItems(prevMenu => [...prevMenu, response.data]);

    } catch (e) {
      toast.error("Error while adding menu!!")
    }
  };

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

  const deleteOffer = async (offer) => {
    console.log(offer)
    try {
      await api.delete(`/offer/${offer.id}`)
      setOffers(prevOffers => prevOffers.filter(u => u.id !== offer.id));
      toast.success("Deleted successfully!!")
    }
    catch (e) {
      toast.error(("Error while deleting"))
    }
  }

  const handleDeleteMenu = async (menu_id) => {
    try {
      await api.delete(`/menu/${menu_id}`)
      setMenuItems(prevMenu => prevMenu.filter(u => u.id !== menu_id));
      toast.success("Deleted successfully!!")
    }
    catch (e) {
      toast.error(("Error while deleting"))
    }
  }

  const handleOfferEditSubmit = async (e) => {
    e.preventDefault();
    console.log(editOfferData)
    try {
      await api.put(`/offer/${editOfferData.id}`, {
        ...editOfferData,
        discount_percentage: parseFloat(editOfferData.discount_percentage),
        maxDiscount: parseFloat(editOfferData.maxDiscount),
        minOrder: parseFloat(editOfferData.minOrder),
        maxUsage: parseInt(editOfferData.maxUsage, 10),
      });
      toast.success("Offer updated successfully!");
      setIsEditDialogOpen(false);
      setOffers((prev) =>
        prev.map((o) => (o.id === editOfferData.id ? editOfferData : o))
      );
    } catch (error) {
      toast.error("Failed to update offer");
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
              onClick={() => setActiveTab('offers')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'offers' ? 'bg-red-100 text-red-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <CirclePercent className="w-5 h-5" />
              <span>Offers</span>
            </button>

            <button
              onClick={() => setActiveTab('menu')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'menu' ? 'bg-red-100 text-red-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <SquareMenu className="w-5 h-5" />
              <span>Menu</span>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        {stat.change && (
                          <p className={`text-sm mt-1 flex items-center ${stat.change.startsWith('-') ? 'text-red-600' : 'text-green-600'}`}>
                            <TrendingUp className="w-4 h-4 mr-1" />
                            {stat.change}
                          </p>
                        )}
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


          {/* Modal Dialog */}
          {showDialog && (
            <div
              className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
              onClick={() => setShowDialog(false)}
            >
              <div
                className="bg-white rounded-lg shadow-lg p-6 w-96"
                onClick={e => e.stopPropagation()}
              >
                <h3 className="text-lg font-semibold mb-4">Update Order Status</h3>
                <p className="mb-2">
                  Order ID: <strong>{selectedOrder?.id}</strong>
                </p>
                <select
                  className="w-full border border-gray-300 rounded-md p-2 mb-4"
                  value={newStatus}
                  onChange={e => setNewStatus(e.target.value)}
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowDialog(false)}
                    className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}


          {activeTab === 'orders' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">All Orders</h2>
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
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {allOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.User?.name || 'Unknown'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${order.total_price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            onClick={() => openUpdateDialog(order)}
                            disabled={order.status === 'COMPLETED' || order.status === 'CANCELLED'}
                            className={`
      px-3 py-1 text-xs font-medium rounded-md
      ${order.status === 'COMPLETED' || order.status === 'CANCELLED'
                                ? 'bg-gray-300 cursor-not-allowed text-gray-600'
                                : 'bg-blue-500 hover:bg-blue-600 text-white'}
    `}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'menu' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Menu Items</h1>

              {/* Add Menu Item button */}
              <button
                onClick={() => setIsMenuDialogOpen(true)}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition mb-4"
              >
                <Plus className="w-5 h-5 mr-2" /> Add Menu Item
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.length > 0 ? (
                  menuItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden h-full justify-between"
                    >
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="flex flex-col p-4 flex-grow">
                        <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>

                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded ${item.isVeg
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                              }`}
                          >
                            {item.isVeg ? 'Veg' : 'Non-Veg'}
                          </span>
                          <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded capitalize">
                            {item.category}
                          </span>
                        </div>

                        <p className="text-sm font-bold mb-1">₹{item.price}</p>
                        <p className="text-xs text-yellow-600 mb-1">Rating: {item.rating}</p>

                        {item.bestseller && (
                          <p className="text-xs mt-1 text-red-500 font-semibold">Bestseller</p>
                        )}

                        {/* Push buttons to bottom */}
                        <div className="flex justify-between mt-auto pt-4">
                          <button
                            onClick={() => handleEditMenu(item)}
                            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteMenu(item.id)}
                            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No menu items found.</p>
                )}
              </div>
            </div>
          )}

          {/* EDIT MENU ITEM MODAL */}
          {isEditMenuDialogOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                {/* Close Button */}
                <button
                  onClick={() => setIsEditMenuDialogOpen(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                  <X className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-bold mb-4">Edit Menu Item</h2>

                <form onSubmit={handleMenuUpdate} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editMenuData.name}
                      onChange={handleEditMenuChange}
                      className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                      name="description"
                      value={editMenuData.description}
                      onChange={handleEditMenuChange}
                      rows="2"
                      className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium">Price (₹)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="price"
                      value={editMenuData.price}
                      onChange={handleEditMenuChange}
                      className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium">Category</label>
                    <select
                      name="category"
                      value={editMenuData.category}
                      onChange={handleEditMenuChange}
                      className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 capitalize"
                      required
                    >
                      <option value="">Select category</option>
                      <option value="starters">Starters</option>
                      <option value="mains">Mains</option>
                      <option value="desserts">Desserts</option>
                      <option value="beverages">Beverages</option>
                    </select>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium">Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      max="5"
                      min="0"
                      name="rating"
                      value={editMenuData.rating}
                      onChange={handleEditMenuChange}
                      className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="block text-sm font-medium">Image URL</label>
                    <input
                      type="url"
                      name="image_url"
                      value={editMenuData.image_url}
                      onChange={handleEditMenuChange}
                      className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>

                  {/* Booleans */}
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="is_available"
                        checked={editMenuData.is_available}
                        onChange={(e) =>
                          setEditMenuData({ ...editMenuData, is_available: e.target.checked })
                        }
                      />
                      Available
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="isVeg"
                        checked={editMenuData.isVeg}
                        onChange={(e) =>
                          setEditMenuData({ ...editMenuData, isVeg: e.target.checked })
                        }
                      />
                      Veg
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="bestseller"
                        checked={editMenuData.bestseller}
                        onChange={(e) =>
                          setEditMenuData({ ...editMenuData, bestseller: e.target.checked })
                        }
                      />
                      Bestseller
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Update Menu Item
                  </button>
                </form>
              </div>
            </div>
          )}

          {isMenuDialogOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                {/* Close Button */}
                <button
                  onClick={() => setIsMenuDialogOpen(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                  <X className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-bold mb-4">Add Menu Item</h2>

                <form onSubmit={handleMenuSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={menuData.name}
                      onChange={handleMenuChange}
                      className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                      name="description"
                      value={menuData.description}
                      onChange={handleMenuChange}
                      rows="2"
                      className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium">Price (₹)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="price"
                      value={menuData.price}
                      onChange={handleMenuChange}
                      className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium">Category</label>
                    <select
                      name="category"
                      value={menuData.category}
                      onChange={handleMenuChange}
                      className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 capitalize"
                      required
                    >
                      <option value="">Select category</option>
                      <option value="starters">Starters</option>
                      <option value="mains">Mains</option>
                      <option value="desserts">Desserts</option>
                      <option value="beverages">Beverages</option>
                    </select>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium">Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      max="5"
                      min="0"
                      name="rating"
                      value={menuData.rating}
                      onChange={handleMenuChange}
                      className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="block text-sm font-medium">Image URL</label>
                    <input
                      type="url"
                      name="image_url"
                      value={menuData.image_url}
                      onChange={handleMenuChange}
                      className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>

                  {/* Booleans */}
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="is_available"
                        checked={menuData.is_available}
                        onChange={(e) =>
                          setMenuData({ ...menuData, is_available: e.target.checked })
                        }
                      />
                      Available
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="isVeg"
                        checked={menuData.isVeg}
                        onChange={(e) =>
                          setMenuData({ ...menuData, isVeg: e.target.checked })
                        }
                      />
                      Veg
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="bestseller"
                        checked={menuData.bestseller}
                        onChange={(e) =>
                          setMenuData({ ...menuData, bestseller: e.target.checked })
                        }
                      />
                      Bestseller
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Save Menu Item
                  </button>
                </form>
              </div>
            </div>
          )}


          {activeTab === 'offers' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Active Offers</h1>
              <button
                onClick={() => setIsDialogOpen(true)}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition mb-4 "
              >
                <Plus className="w-5 h-5 mr-2" /> Add Offer
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers.length > 0 ? (
                  offers.map((offer) => (
                    <div key={offer.id} className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
                      <img src={offer.image} alt={offer.title} className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <h2 className="text-lg font-semibold text-gray-900">{offer.title}</h2>
                        <p className="text-sm text-gray-600 mb-2">{offer.description}</p>

                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded">
                            {offer.type}
                          </span>
                          <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded">
                            {offer.category}
                          </span>
                        </div>

                        <p className="text-sm">
                          <strong>Code:</strong> <span className="bg-gray-100 px-2 py-1 rounded">{offer.code}</span>
                        </p>
                        <p className="text-sm"><strong>Discount:</strong> {offer.discount_percentage}%</p>
                        <p className="text-sm"><strong>Max Discount:</strong> ₹{offer.maxDiscount}</p>
                        <p className="text-sm"><strong>Min Order:</strong> {offer.minOrder}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Valid till {new Date(offer.validTill).toLocaleDateString()}
                        </p>

                        <div className="mt-4 flex space-x-2">
                          <button
                            onClick={() => {
                              setEditOfferData({
                                ...offer,
                                validTill: formatDateForDatetimeLocal(offer.validTill),
                              });
                              setIsEditDialogOpen(true);
                            }}
                            className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteOffer(offer)}
                            className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No active offers found.</p>
                )}
              </div>
            </div>
          )}

          {/* Modal */}
          {isDialogOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                {/* Close Button */}
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                  <X className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-bold mb-4">Create Offer</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    "title",
                    "description",
                    "code",
                    "discount_percentage",
                    "maxDiscount",
                    "minOrder",
                    "validTill",
                    "image",
                    "type",
                    "category",
                    "maxUsage",
                  ].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium capitalize">
                        {field.replace(/_/g, " ")}
                      </label>

                      {field === "type" ? (
                        <select
                          name={field}
                          value={offerData[field]}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        >
                          <option value="">Select type</option>
                          <option value="NEW_USER">NEW_USER</option>
                        </select>
                      ) : field === "category" ? (
                        <select
                          name={field}
                          value={offerData[field]}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        >
                          <option value="">Select category</option>
                          <option value="DISCOUNT">DISCOUNT</option>
                          <option value="FREE_DELIVERY">FREE_DELIVERY</option>
                          <option value="SPECIAL">SPECIAL</option>
                        </select>
                      ) : (
                        <input
                          type={
                            field === "discount_percentage" ||
                              field === "maxDiscount" ||
                              field === "minOrder" ||
                              field === "maxUsage"
                              ? "number"
                              : field === "validTill"
                                ? "datetime-local"
                                : "text"
                          }
                          step={
                            field === "discount_percentage" ||
                              field === "maxDiscount" ||
                              field === "minOrder"
                              ? "0.01"
                              : undefined
                          }
                          name={field}
                          value={offerData[field]}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        />
                      )}
                    </div>
                  ))}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Save Offer
                  </button>
                </form>
              </div>
            </div>
          )}


          {isEditDialogOpen && editOfferData && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                <button
                  onClick={() => setIsEditDialogOpen(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                  <X className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-bold mb-4">Edit Offer</h2>

                <form onSubmit={handleOfferEditSubmit} className="space-y-4">
                  {[
                    "title",
                    "description",
                    "code",
                    "discount_percentage",
                    "maxDiscount",
                    "minOrder",
                    "validTill",
                    "image",
                    "type",
                    "category",
                    "maxUsage",
                  ].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium capitalize">
                        {field.replace(/_/g, " ")}
                      </label>

                      {field === "type" ? (
                        <select
                          name={field}
                          value={editOfferData[field]}
                          onChange={(e) =>
                            setEditOfferData({ ...editOfferData, [field]: e.target.value })
                          }
                          className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        >
                          <option value="">Select type</option>
                          <option value="NEW_USER">NEW_USER</option>
                        </select>
                      ) : field === "category" ? (
                        <select
                          name={field}
                          value={editOfferData[field]}
                          onChange={(e) =>
                            setEditOfferData({ ...editOfferData, [field]: e.target.value })
                          }
                          className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        >
                          <option value="">Select category</option>
                          <option value="DISCOUNT">DISCOUNT</option>
                          <option value="FREE_DELIVERY">FREE_DELIVERY</option>
                          <option value="SPECIAL">SPECIAL</option>
                        </select>
                      ) : (
                        <input
                          type={
                            field === "discount_percentage" ||
                              field === "maxDiscount" ||
                              field === "minOrder" ||
                              field === "maxUsage"
                              ? "number"
                              : field === "validTill"
                                ? "datetime-local"
                                : "text"
                          }
                          step={
                            field === "discount_percentage" ||
                              field === "maxDiscount" ||
                              field === "minOrder"
                              ? "0.01"
                              : undefined
                          }
                          name={field}
                          value={editOfferData[field]}
                          onChange={(e) =>
                            setEditOfferData({ ...editOfferData, [field]: e.target.value })
                          }
                          className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        />
                      )}
                    </div>
                  ))}

                  <button
                    type="submit"
                    className="w-full bg-red-600 text-white rounded-lg py-2 text-lg font-semibold hover:bg-red-700 transition"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search user..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">UserName</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredUsers && filteredUsers.map((user) => (
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
                              <button
                                onClick={() => deleteUser(user)}
                                className="text-red-600 hover:text-red-800">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredUsers.length === 0 && (
                        <tr>
                          <td colSpan={4} className="text-center p-4 text-gray-500">
                            No users found.
                          </td>
                        </tr>
                      )}
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


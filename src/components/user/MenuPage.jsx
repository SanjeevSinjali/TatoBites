import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api-client';
import toast from 'react-hot-toast';
import { useCart } from '../../lib/cart-provider';

const Menu = ({ user, onLogout }) => {
  const { addToCart } = useCart();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
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
    fetchMenu();
  }, []);

  // Placeholder: You need to implement these handlers
  const handleEditMenu = (item) => {
    console.log('Edit menu item', item);
    // Implement edit logic or open edit dialog here
  };

  const handleDeleteMenu = async (id) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) return;

    try {
      const res = await api.delete(`/menu/${id}`);
      if (res.success) {
        setMenuItems((prev) => prev.filter((item) => item.id !== id));
        toast.success('Menu item deleted');
      } else {
        toast.error('Failed to delete menu item');
      }
    } catch (error) {
      toast.error('Error deleting menu item');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">Menu</h1>
        </div>

        <div>
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
                        className={`px-2 py-1 text-xs font-semibold rounded ${item.isVeg ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
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

                    <div className='flex justify-end my-4'>
                      <button
                        onClick={() => addToCart(item)}
                        className='px-4 py-2 rounded-lg font-medium transition-colors bg-red-600 text-white hover:bg-red-700'
                      >
                        Add to cart
                      </button>
                    </div>

                  </div>
                </div>
              ))
            ) : (
              <p>No menu items available.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Menu;


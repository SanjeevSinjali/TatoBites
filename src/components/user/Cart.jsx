import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Trash2, MapPin, Clock, CreditCard } from 'lucide-react';
import { useCart } from '../../lib/cart-provider';
import toast from 'react-hot-toast';
import { api } from '../../lib/api-client';

const Cart = ({ user, onLogout }) => {
  const { cart, removeFromCart, updateQuantity, getTotalAmount, clearCart } = useCart();

  const [deliveryAddress, setDeliveryAddress] = useState({
    type: 'Home',
    address: '123 Main Street, Apartment 4B, New York, NY 10001'
  });

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const convertCartToOrder = (cartItems) => {
    const items = cartItems.map(item => {
      const priceEach = parseFloat(item.price);
      const totalPrice = priceEach * item.quantity;

      return {
        menu_item_id: item.id,
        quantity: item.quantity,
        price_each: priceEach,
        total_price: totalPrice
      };
    });

    const total_price = items.reduce((sum, item) => sum + item.total_price, 0);

    return {
      order_type: "DINE_IN",
      total_price,
      items
    };
  };

  const placeOrder = async (data) => {
    const order = await api.post("/order", data)

  }

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/dashboard"
          className="flex items-center space-x-2 text-gray-600 hover:text-red-600 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to dashboard</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
              </div>

              <div className="p-6 space-y-4">
                {cart && cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-gray-600">₹{item.price}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm sticky top-24">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{getSubtotal()}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{getSubtotal()}</span>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200">
                <button
                  onClick={() => {

                    if (cart.length < 1) {
                      toast.error("Cart cannot be empty..")
                      return
                    }

                    try {
                      const converted_data = convertCartToOrder(cart)
                      console.log(converted_data)
                      placeOrder(converted_data)
                      toast.success("Order Successful", {
                        duration: 5000
                      })
                      clearCart()
                    } catch (e) {
                      console.log(e)
                      toast.error("err occured while placing order")
                    }

                  }}
                  className="w-full bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Place Order</span>
                </button>

                <p className="text-xs text-gray-500 text-center mt-3">
                  By placing your order, you agree to our Terms & Conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;

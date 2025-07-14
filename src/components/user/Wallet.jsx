import React, { useState } from 'react';
import { 
  Wallet as WalletIcon, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Gift, 
  CreditCard,
  Smartphone,
  Building,
  Calendar,
  TrendingUp,
  Award,
  RefreshCw
} from 'lucide-react';
import Header from './Header';

const Wallet = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('balance');
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [addAmount, setAddAmount] = useState('');

  const walletBalance = 1250;
  const loyaltyPoints = 850;
  const cashbackEarned = 320;

  const quickAmounts = [100, 200, 500, 1000];

  const transactions = [
    {
      id: 1,
      type: 'credit',
      amount: 100,
      description: 'Cashback from order #ORD-12345',
      date: '2024-12-20',
      time: '2:30 PM',
      orderId: '#ORD-12345'
    },
    {
      id: 2,
      type: 'debit',
      amount: 450,
      description: 'Payment for order at Mama\'s Kitchen',
      date: '2024-12-20',
      time: '1:15 PM',
      orderId: '#ORD-12344'
    },
    {
      id: 3,
      type: 'credit',
      amount: 200,
      description: 'Money added to wallet',
      date: '2024-12-19',
      time: '6:45 PM',
      orderId: null
    },
    {
      id: 4,
      type: 'credit',
      amount: 50,
      description: 'Referral bonus',
      date: '2024-12-19',
      time: '3:20 PM',
      orderId: null
    },
    {
      id: 5,
      type: 'debit',
      amount: 320,
      description: 'Payment for order at Pizza Palace',
      date: '2024-12-18',
      time: '8:30 PM',
      orderId: '#ORD-12343'
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: 'card',
      name: 'Credit Card',
      details: '**** **** **** 1234',
      icon: CreditCard,
      isDefault: true
    },
    {
      id: 2,
      type: 'upi',
      name: 'UPI',
      details: 'john.doe@paytm',
      icon: Smartphone,
      isDefault: false
    },
    {
      id: 3,
      type: 'netbanking',
      name: 'Net Banking',
      details: 'HDFC Bank',
      icon: Building,
      isDefault: false
    }
  ];

  const offers = [
    {
      id: 1,
      title: 'Add ₹500, Get ₹50 Bonus',
      description: 'Add money to your wallet and get extra cashback',
      minAmount: 500,
      bonus: 50,
      validTill: 'Dec 31, 2024'
    },
    {
      id: 2,
      title: 'First Time Wallet User',
      description: 'Get ₹100 bonus on your first wallet top-up',
      minAmount: 200,
      bonus: 100,
      validTill: 'Dec 25, 2024'
    }
  ];

  const handleAddMoney = () => {
    if (addAmount && parseFloat(addAmount) > 0) {
      console.log(`Adding ₹${addAmount} to wallet`);
      setShowAddMoney(false);
      setAddAmount('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} cartItems={[]} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <WalletIcon className="w-8 h-8 mr-3 text-red-600" />
            My Wallet
          </h1>
          <p className="text-gray-600 mt-2">Manage your wallet balance and transactions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <WalletIcon className="w-8 h-8" />
              <button 
                onClick={() => setShowAddMoney(true)}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-lg font-medium mb-2">Wallet Balance</h3>
            <p className="text-3xl font-bold">₹{walletBalance}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center mb-4">
              <Gift className="w-8 h-8 text-yellow-500 mr-3" />
              <h3 className="text-lg font-medium">Loyalty Points</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{loyaltyPoints}</p>
            <p className="text-sm text-gray-600 mt-2">Earn more points with every order</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-8 h-8 text-green-500 mr-3" />
              <h3 className="text-lg font-medium">Cashback Earned</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">₹{cashbackEarned}</p>
            <p className="text-sm text-gray-600 mt-2">This month</p>
          </div>
        </div>

        {/* Rest of the Wallet component */}
      </main>
    </div>
  );
};

export default Wallet;
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
      // In a real app, this would process the payment
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

        {/* Wallet Balance Cards */}
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
            <p className="text-3xl font-bold">₹{walletBalance.toLocaleString()}</p>
            <p className="text-red-100 text-sm mt-2">Available to spend</p>
          </div>

          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <Award className="w-8 h-8" />
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">Points</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Loyalty Points</h3>
            <p className="text-3xl font-bold">{loyaltyPoints.toLocaleString()}</p>
            <p className="text-yellow-100 text-sm mt-2">≈ ₹{Math.floor(loyaltyPoints / 10)} value</p>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8" />
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">This Month</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Cashback Earned</h3>
            <p className="text-3xl font-bold">₹{cashbackEarned}</p>
            <p className="text-green-100 text-sm mt-2">From 12 orders</p>
          </div>
        </div>

        {/* Wallet Offers */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Gift className="w-5 h-5 mr-2 text-red-600" />
            Wallet Offers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {offers.map((offer) => (
              <div key={offer.id} className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">{offer.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{offer.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Min ₹{offer.minAmount} • Valid till {offer.validTill}
                  </div>
                  <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">
                    Add Money
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-200 rounded-lg p-1 mb-8">
          <button
            onClick={() => setActiveTab('balance')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'balance'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Transactions
          </button>
          <button
            onClick={() => setActiveTab('methods')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'methods'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Payment Methods
          </button>
        </div>

        {activeTab === 'balance' ? (
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Recent Transactions</h3>
                <button className="flex items-center space-x-2 text-red-600 hover:text-red-700">
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh</span>
                </button>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'credit' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? (
                          <ArrowDownLeft className="w-5 h-5" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{transaction.date} at {transaction.time}</span>
                          {transaction.orderId && (
                            <>
                              <span>•</span>
                              <span>{transaction.orderId}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Payment Methods</h3>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Method</span>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-red-300 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <method.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{method.name}</p>
                      <p className="text-sm text-gray-600">{method.details}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {method.isDefault && (
                      <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
                        Default
                      </span>
                    )}
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Money Modal */}
        {showAddMoney && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Add Money to Wallet</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Amount
                </label>
                <input
                  type="number"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  placeholder="₹0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                />
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Quick amounts:</p>
                <div className="grid grid-cols-4 gap-2">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setAddAmount(amount.toString())}
                      className="p-2 border border-gray-300 rounded-lg hover:border-red-500 hover:text-red-600 transition-colors text-sm"
                    >
                      ₹{amount}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAddMoney(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMoney}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Add Money
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Wallet;
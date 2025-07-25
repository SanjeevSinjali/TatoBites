import React, { useState } from 'react';
import { 
  Star, 
  Gift, 
  Trophy, 
  Crown, 
  Zap, 
  Calendar,
  TrendingUp,
  Award,
  Target,
  Clock
} from 'lucide-react';
import Header from './Header';

const Loyalty = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const loyaltyData = {
    currentPoints: 2450,
    tier: 'Gold',
    nextTier: 'Platinum',
    pointsToNextTier: 550,
    totalEarned: 5670,
    totalRedeemed: 3220,
    ordersThisMonth: 8,
    cashbackEarned: 450
  };

  const tiers = [
    {
      name: 'Bronze',
      minPoints: 0,
      maxPoints: 999,
      benefits: ['1x points on orders', 'Basic customer support'],
      color: 'from-amber-600 to-amber-700',
      icon: Award
    },
    {
      name: 'Silver',
      minPoints: 1000,
      maxPoints: 2499,
      benefits: ['1.5x points on orders', 'Priority support', 'Birthday bonus'],
      color: 'from-gray-400 to-gray-500',
      icon: Star
    },
    {
      name: 'Gold',
      minPoints: 2500,
      maxPoints: 4999,
      benefits: ['2x points on orders', 'Free delivery', 'Exclusive offers', 'Early access'],
      color: 'from-yellow-400 to-yellow-500',
      icon: Trophy,
      current: true
    },
    {
      name: 'Platinum',
      minPoints: 5000,
      maxPoints: 9999,
      benefits: ['3x points on orders', 'Premium support', 'VIP events', 'Special discounts'],
      color: 'from-purple-400 to-purple-500',
      icon: Crown
    },
    {
      name: 'Diamond',
      minPoints: 10000,
      maxPoints: null,
      benefits: ['5x points on orders', 'Dedicated manager', 'Unlimited perks', 'Exclusive access'],
      color: 'from-blue-400 to-blue-500',
      icon: Zap
    }
  ];

  const rewardOptions = [
    {
      id: 1,
      name: '₹50 Off Next Order',
      points: 500,
      description: 'Get ₹50 discount on orders above ₹300',
      type: 'discount',
      validFor: '30 days',
      popular: true
    },
    {
      id: 2,
      name: 'Free Delivery',
      points: 200,
      description: 'Free delivery on your next 3 orders',
      type: 'delivery',
      validFor: '15 days',
      popular: false
    },
    {
      id: 3,
      name: '₹100 Cashback',
      points: 1000,
      description: 'Get ₹100 cashback on orders above ₹500',
      type: 'cashback',
      validFor: '45 days',
      popular: true
    },
    {
      id: 4,
      name: 'Double Points Weekend',
      points: 800,
      description: 'Earn 2x points on all weekend orders',
      type: 'bonus',
      validFor: '7 days',
      popular: false
    },
    {
      id: 5,
      name: '₹200 Restaurant Voucher',
      points: 2000,
      description: 'Voucher valid at premium restaurants',
      type: 'voucher',
      validFor: '60 days',
      popular: true
    },
    {
      id: 6,
      name: 'VIP Customer Status',
      points: 3000,
      description: 'Priority support and exclusive offers for 3 months',
      type: 'status',
      validFor: '90 days',
      popular: false
    }
  ];

  const pointsHistory = [
    {
      id: 1,
      type: 'earned',
      points: 150,
      description: 'Order from Mama\'s Kitchen',
      date: '2024-12-20',
      orderId: '#ORD-12345'
    },
    {
      id: 2,
      type: 'redeemed',
      points: -500,
      description: 'Redeemed ₹50 off coupon',
      date: '2024-12-19',
      orderId: null
    },
    {
      id: 3,
      type: 'earned',
      points: 200,
      description: 'Order from Pizza Palace',
      date: '2024-12-18',
      orderId: '#ORD-12344'
    },
    {
      id: 4,
      type: 'bonus',
      points: 100,
      description: 'Weekend bonus points',
      date: '2024-12-17',
      orderId: null
    },
    {
      id: 5,
      type: 'earned',
      points: 120,
      description: 'Order from Dragon Wok',
      date: '2024-12-16',
      orderId: '#ORD-12343'
    }
  ];

  const currentTier = tiers.find(tier => tier.current);
  const nextTier = tiers.find(tier => tier.minPoints > loyaltyData.currentPoints);

  const redeemReward = (rewardId, points) => {
    if (loyaltyData.currentPoints >= points) {
      console.log(`Redeeming reward ${rewardId} for ${points} points`);
      // In a real app, this would make an API call
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} cartItems={[]} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Star className="w-8 h-8 mr-3 text-yellow-500" />
            TatoBites Loyalty
          </h1>
          <p className="text-gray-600 mt-2">Earn points, unlock rewards, and enjoy exclusive benefits</p>
        </div>

        {/* Loyalty Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <Star className="w-8 h-8" />
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-medium">
                Current Points
              </span>
            </div>
            <h3 className="text-lg font-medium mb-2">Available Points</h3>
            <p className="text-3xl font-bold">{loyaltyData.currentPoints.toLocaleString()}</p>
            <p className="text-yellow-100 text-sm mt-2">≈ ₹{Math.floor(loyaltyData.currentPoints / 10)} value</p>
          </div>

          <div className={`bg-gradient-to-r ${currentTier.color} rounded-xl p-6 text-white`}>
            <div className="flex items-center justify-between mb-4">
              <currentTier.icon className="w-8 h-8" />
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-medium">
                Current Tier
              </span>
            </div>
            <h3 className="text-lg font-medium mb-2">{currentTier.name} Member</h3>
            <p className="text-2xl font-bold">{loyaltyData.pointsToNextTier}</p>
            <p className="text-white/80 text-sm mt-2">points to {nextTier?.name || 'Max Tier'}</p>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8" />
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-medium">
                This Month
              </span>
            </div>
            <h3 className="text-lg font-medium mb-2">Orders Completed</h3>
            <p className="text-3xl font-bold">{loyaltyData.ordersThisMonth}</p>
            <p className="text-green-100 text-sm mt-2">+{loyaltyData.cashbackEarned} points earned</p>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <Gift className="w-8 h-8" />
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-medium">
                Lifetime
              </span>
            </div>
            <h3 className="text-lg font-medium mb-2">Total Earned</h3>
            <p className="text-3xl font-bold">{loyaltyData.totalEarned.toLocaleString()}</p>
            <p className="text-purple-100 text-sm mt-2">{loyaltyData.totalRedeemed.toLocaleString()} redeemed</p>
          </div>
        </div>

        {/* Tier Progress */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Your Tier Progress</h3>
          <div className="space-y-4">
            {tiers.map((tier, index) => (
              <div key={tier.name} className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${
                  tier.current 
                    ? `bg-gradient-to-r ${tier.color} text-white` 
                    : loyaltyData.currentPoints >= tier.minPoints
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  <tier.icon className="w-5 h-5" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`font-medium ${tier.current ? 'text-yellow-600' : 'text-gray-900'}`}>
                      {tier.name}
                      {tier.current && <span className="ml-2 text-sm bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">Current</span>}
                    </h4>
                    <span className="text-sm text-gray-600">
                      {tier.minPoints.toLocaleString()}{tier.maxPoints ? ` - ${tier.maxPoints.toLocaleString()}` : '+'} points
                    </span>
                  </div>
                  
                  {tier.current && nextTier && (
                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{loyaltyData.currentPoints.toLocaleString()} points</span>
                        <span>{nextTier.minPoints.toLocaleString()} points</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${((loyaltyData.currentPoints - tier.minPoints) / (nextTier.minPoints - tier.minPoints)) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <span key={benefitIndex} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-200 rounded-lg p-1 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Rewards Store
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'history'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Points History
          </button>
        </div>

        {activeTab === 'overview' ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Redeem Your Points</h3>
              <div className="text-sm text-gray-600">
                You have <span className="font-bold text-yellow-600">{loyaltyData.currentPoints.toLocaleString()}</span> points
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewardOptions.map((reward) => (
                <div key={reward.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200">
                  {reward.popular && (
                    <div className="bg-red-600 text-white text-center py-1 text-xs font-medium">
                      POPULAR
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-gray-900 mb-2">{reward.name}</h4>
                        <p className="text-gray-600 text-sm mb-3">{reward.description}</p>
                      </div>
                      <div className="ml-4">
                        {reward.type === 'discount' && <Target className="w-6 h-6 text-red-500" />}
                        {reward.type === 'delivery' && <Zap className="w-6 h-6 text-blue-500" />}
                        {reward.type === 'cashback' && <Gift className="w-6 h-6 text-green-500" />}
                        {reward.type === 'bonus' && <Star className="w-6 h-6 text-yellow-500" />}
                        {reward.type === 'voucher' && <Award className="w-6 h-6 text-purple-500" />}
                        {reward.type === 'status' && <Crown className="w-6 h-6 text-indigo-500" />}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="font-bold text-gray-900">{reward.points.toLocaleString()} points</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>Valid for {reward.validFor}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => redeemReward(reward.id, reward.points)}
                      disabled={loyaltyData.currentPoints < reward.points}
                      className={`w-full py-3 rounded-lg font-medium transition-colors ${
                        loyaltyData.currentPoints >= reward.points
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {loyaltyData.currentPoints >= reward.points ? 'Redeem Now' : 'Insufficient Points'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Points History</h3>
            </div>
            
            <div className="divide-y divide-gray-200">
              {pointsHistory.map((transaction) => (
                <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'earned' 
                          ? 'bg-green-100 text-green-600'
                          : transaction.type === 'bonus'
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {transaction.type === 'earned' ? (
                          <TrendingUp className="w-5 h-5" />
                        ) : transaction.type === 'bonus' ? (
                          <Star className="w-5 h-5" />
                        ) : (
                          <Gift className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{transaction.date}</span>
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
                        transaction.points > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.points > 0 ? '+' : ''}{transaction.points} points
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* How to Earn Points */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mt-8">
          <h3 className="text-2xl font-bold mb-4">How to Earn More Points</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Target className="w-8 h-8" />
              </div>
              <h4 className="font-medium mb-2">Place Orders</h4>
              <p className="text-blue-100 text-sm">Earn 1 point for every ₹10 spent</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Star className="w-8 h-8" />
              </div>
              <h4 className="font-medium mb-2">Write Reviews</h4>
              <p className="text-blue-100 text-sm">Get 50 bonus points for each review</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Gift className="w-8 h-8" />
              </div>
              <h4 className="font-medium mb-2">Refer Friends</h4>
              <p className="text-blue-100 text-sm">Earn 200 points for each referral</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Loyalty;
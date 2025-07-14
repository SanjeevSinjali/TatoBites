import React, { useState } from 'react';
import { 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  Camera, 
  Filter,
  Calendar,
  User,
  Edit,
  Trash2
} from 'lucide-react';
import Header from '../components/Header';

const Reviews = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('my_reviews');
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: '',
    comment: '',
    restaurant: '',
    order: ''
  });

  const myReviews = [
    {
      id: 1,
      restaurant: "Mama's Kitchen",
      restaurantId: 1,
      orderId: '#ORD-12345',
      rating: 5,
      title: 'Absolutely delicious!',
      comment: 'The butter chicken was amazing and the service was quick. Definitely ordering again!',
      date: '2024-12-20',
      likes: 12,
      helpful: 8,
      images: ['https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300'],
      response: {
        text: 'Thank you for your wonderful review! We\'re glad you enjoyed your meal.',
        date: '2024-12-21'
      }
    },
    {
      id: 2,
      restaurant: 'Pizza Palace',
      restaurantId: 2,
      orderId: '#ORD-12344',
      rating: 4,
      title: 'Good pizza, could be better',
      comment: 'The pizza was tasty but arrived a bit cold. The toppings were fresh though.',
      date: '2024-12-18',
      likes: 5,
      helpful: 3,
      images: [],
      response: null
    },
    {
      id: 3,
      restaurant: 'Dragon Wok',
      restaurantId: 4,
      orderId: '#ORD-12343',
      rating: 3,
      title: 'Average experience',
      comment: 'The noodles were okay but nothing special. Service was slow.',
      date: '2024-12-16',
      likes: 2,
      helpful: 1,
      images: [],
      response: {
        text: 'We apologize for the delay. We\'re working on improving our service speed.',
        date: '2024-12-17'
      }
    }
  ];

  const pendingReviews = [
    {
      id: 1,
      restaurant: 'Sweet Dreams',
      orderId: '#ORD-12346',
      orderDate: '2024-12-21',
      items: ['Chocolate Brownie', 'Vanilla Ice Cream']
    },
    {
      id: 2,
      restaurant: 'Burger Junction',
      orderId: '#ORD-12347',
      orderDate: '2024-12-20',
      items: ['Classic Burger', 'French Fries']
    }
  ];

  const reviewStats = {
    totalReviews: myReviews.length,
    averageRating: myReviews.reduce((sum, review) => sum + review.rating, 0) / myReviews.length,
    totalLikes: myReviews.reduce((sum, review) => sum + review.likes, 0),
    helpfulVotes: myReviews.reduce((sum, review) => sum + review.helpful, 0)
  };

  const handleStarClick = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const submitReview = () => {
    if (newReview.rating > 0 && newReview.comment.trim()) {
      console.log('Submitting review:', newReview);
      setShowWriteReview(false);
      setNewReview({ rating: 0, title: '', comment: '', restaurant: '', order: '' });
    }
  };

  const deleteReview = (reviewId) => {
    console.log('Deleting review:', reviewId);
  };

  const renderStars = (rating, interactive = false, onStarClick = null) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onStarClick && onStarClick(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            disabled={!interactive}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} cartItems={[]} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <MessageSquare className="w-8 h-8 mr-3 text-red-600" />
              My Reviews
            </h1>
            <p className="text-gray-600 mt-2">Share your dining experiences and help others</p>
          </div>
          <button
            onClick={() => setShowWriteReview(true)}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <Edit className="w-4 h-4" />
            <span>Write Review</span>
          </button>
        </div>

        {/* Review Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">{reviewStats.totalReviews}</div>
            <div className="text-gray-600">Total Reviews</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">{reviewStats.averageRating.toFixed(1)}</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{reviewStats.totalLikes}</div>
            <div className="text-gray-600">Total Likes</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{reviewStats.helpfulVotes}</div>
            <div className="text-gray-600">Helpful Votes</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-200 rounded-lg p-1 mb-8">
          <button
            onClick={() => setActiveTab('my_reviews')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'my_reviews'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            My Reviews ({myReviews.length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'pending'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Pending Reviews ({pendingReviews.length})
          </button>
        </div>

        {activeTab === 'my_reviews' ? (
          <div className="space-y-6">
            {myReviews.length === 0 ? (
              <div className="text-center py-16">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No reviews yet</h3>
                <p className="text-gray-600 mb-6">Start sharing your dining experiences!</p>
                <button
                  onClick={() => setShowWriteReview(true)}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Write Your First Review
                </button>
              </div>
            ) : (
              myReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-bold text-lg text-gray-900">{review.restaurant}</h3>
                        <span className="text-sm text-gray-500">Order {review.orderId}</span>
                      </div>
                      <div className="flex items-center space-x-4 mb-3">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-500 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {review.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteReview(review.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {review.title && (
                    <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                  )}
                  
                  <p className="text-gray-700 mb-4">{review.comment}</p>

                  {review.images.length > 0 && (
                    <div className="flex space-x-2 mb-4">
                      {review.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt="Review"
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm">{review.likes} likes</span>
                      </button>
                      <span className="text-sm text-gray-500">{review.helpful} found helpful</span>
                    </div>
                  </div>

                  {review.response && (
                    <div className="mt-4 bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-600 text-xs font-bold">R</span>
                        </div>
                        <span className="font-medium text-gray-900">Restaurant Response</span>
                        <span className="text-xs text-gray-500">{review.response.date}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{review.response.text}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {pendingReviews.length === 0 ? (
              <div className="text-center py-16">
                <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No pending reviews</h3>
                <p className="text-gray-600">All caught up! Your reviews help other customers.</p>
              </div>
            ) : (
              pendingReviews.map((order) => (
                <div key={order.id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{order.restaurant}</h3>
                      <p className="text-gray-600 text-sm mb-2">Order {order.orderId} • {order.orderDate}</p>
                      <p className="text-gray-600 text-sm">{order.items.join(', ')}</p>
                    </div>
                    <button
                      onClick={() => {
                        setNewReview({
                          ...newReview,
                          restaurant: order.restaurant,
                          order: order.orderId
                        });
                        setShowWriteReview(true);
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Write Review
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Write Review Modal */}
        {showWriteReview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Write a Review</h3>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Restaurant Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Restaurant
                  </label>
                  <select
                    value={newReview.restaurant}
                    onChange={(e) => setNewReview({ ...newReview, restaurant: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Select a restaurant</option>
                    <option value="Mama's Kitchen">Mama's Kitchen</option>
                    <option value="Pizza Palace">Pizza Palace</option>
                    <option value="Dragon Wok">Dragon Wok</option>
                    <option value="Sweet Dreams">Sweet Dreams</option>
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <div className="flex items-center space-x-2">
                    {renderStars(newReview.rating, true, handleStarClick)}
                    <span className="text-sm text-gray-600 ml-2">
                      {newReview.rating > 0 ? `${newReview.rating} star${newReview.rating > 1 ? 's' : ''}` : 'Select rating'}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Review Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                    placeholder="Summarize your experience"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Share your experience with this restaurant..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add Photos (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors cursor-pointer">
                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload photos</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex space-x-3">
                <button
                  onClick={() => setShowWriteReview(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submitReview}
                  disabled={newReview.rating === 0 || !newReview.comment.trim()}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Reviews;
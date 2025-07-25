import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  MessageCircle,
  Phone,
  Mail,
  ChevronRight,
  ChevronDown,
  Clock,
  CheckCircle,
  Book,
  Headphones,
  FileText
} from 'lucide-react';

const Help = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  // const [supportTicket, setSupportTicket] = useState({
  //   subject: '',
  //   category: '',
  //   description: '',
  //   priority: 'medium'
  // });

  const faqCategories = [
    {
      id: 'orders',
      name: 'Orders & Delivery',
      icon: '📦',
      faqs: [
        {
          id: 1,
          question: 'How can I track my order?',
          answer: 'You can track your order in real-time by going to "My Orders" section in your account. You\'ll see the current status and estimated delivery time.'
        },
        {
          id: 2,
          question: 'What if my order is delayed?',
          answer: 'If your order is delayed beyond the estimated time, you can contact our support team. We\'ll investigate and provide updates or compensation if needed.'
        },
        {
          id: 3,
          question: 'Can I modify my order after placing it?',
          answer: 'Orders can be modified within 2 minutes of placing them. After that, the restaurant starts preparing your food and modifications aren\'t possible.'
        },
        {
          id: 4,
          question: 'What are the delivery charges?',
          answer: 'Delivery charges vary by distance and restaurant. Most orders above ₹299 qualify for free delivery. You can see the exact charges before confirming your order.'
        }
      ]
    },
    {
      id: 'payments',
      name: 'Payments & Refunds',
      icon: '💳',
      faqs: [
        {
          id: 5,
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit/debit cards, UPI, net banking, and digital wallets. You can also pay cash on delivery where available.'
        },
        {
          id: 6,
          question: 'How do refunds work?',
          answer: 'Refunds are processed within 5-7 business days to your original payment method. For wallet payments, refunds are instant.'
        },
        {
          id: 7,
          question: 'Why was my payment declined?',
          answer: 'Payment can be declined due to insufficient funds, bank restrictions, or technical issues. Please try a different payment method or contact your bank.'
        }
      ]
    },
    {
      id: 'account',
      name: 'Account & Profile',
      icon: '👤',
      faqs: [
        {
          id: 8,
          question: 'How do I change my delivery address?',
          answer: 'Go to your profile settings and update your address. You can also add multiple addresses and select during checkout.'
        },
        {
          id: 9,
          question: 'How do I delete my account?',
          answer: 'You can delete your account from Settings > Account > Delete Account. Note that this action is irreversible.'
        },
        {
          id: 10,
          question: 'How do I change my password?',
          answer: 'Go to Settings > Security > Change Password. You\'ll need to enter your current password and set a new one.'
        }
      ]
    },
    {
      id: 'restaurants',
      name: 'Restaurants & Menu',
      icon: '🍽️',
      faqs: [
        {
          id: 11,
          question: 'How do I find restaurants near me?',
          answer: 'Enter your location and we\'ll show all available restaurants in your area. You can filter by cuisine, rating, and delivery time.'
        },
        {
          id: 12,
          question: 'Why is a restaurant not available?',
          answer: 'Restaurants may be temporarily closed, outside delivery radius, or not accepting orders. Check back later or try other restaurants.'
        }
      ]
    }
  ];

  const contactOptions = [
    {
      id: 'chat',
      name: 'Live Chat',
      description: 'Chat with our support team',
      icon: MessageCircle,
      availability: '24/7',
      responseTime: 'Instant',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'phone',
      name: 'Phone Support',
      description: 'Call us for immediate help',
      icon: Phone,
      availability: '9 AM - 11 PM',
      responseTime: 'Immediate',
      color: 'bg-green-100 text-green-600',
      number: '+91 1800-123-4567'
    },
    {
      id: 'email',
      name: 'Email Support',
      description: 'Send us a detailed message',
      icon: Mail,
      availability: '24/7',
      responseTime: '2-4 hours',
      color: 'bg-purple-100 text-purple-600',
      email: 'support@tatobites.com'
    }
  ];

  const quickActions = [
    { name: 'Track Order', icon: '📍', action: () => console.log('Track order') },
    { name: 'Cancel Order', icon: '❌', action: () => console.log('Cancel order') },
    { name: 'Report Issue', icon: '⚠️', action: () => console.log('Report issue') },
    { name: 'Request Refund', icon: '💰', action: () => console.log('Request refund') }
  ];

  const allFaqs = faqCategories.flatMap(category =>
    category.faqs.map(faq => ({ ...faq, category: category.name }))
  );

  const filteredFaqs = searchQuery
    ? allFaqs.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : allFaqs;

  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  // const submitTicket = () => {
  //   if (supportTicket.subject && supportTicket.description) {
  //     console.log('Submitting support ticket:', supportTicket);
  //     setSupportTicket({ subject: '', category: '', description: '', priority: 'medium' });
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <HelpCircle className="w-8 h-8 mr-3 text-red-600" />
            Help & Support
          </h1>
          <p className="text-gray-600 mt-2">Get help with your orders, account, and more</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-center group"
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <span className="text-sm font-medium text-gray-900 group-hover:text-red-600">
                {action.name}
              </span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-200 rounded-lg p-1 mb-8">
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex items-center space-x-2 flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'faq'
              ? 'bg-white text-red-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            <Book className="w-4 h-4" />
            <span>FAQ</span>
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`flex items-center space-x-2 flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'contact'
              ? 'bg-white text-red-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            <Headphones className="w-4 h-4" />
            <span>Contact Us</span>
          </button>
          {/* <button */}
          {/*   onClick={() => setActiveTab('ticket')} */}
          {/*   className={`flex items-center space-x-2 flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'ticket' */}
          {/*     ? 'bg-white text-red-600 shadow-sm' */}
          {/*     : 'text-gray-600 hover:text-gray-900' */}
          {/*     }`} */}
          {/* > */}
          {/*   <FileText className="w-4 h-4" /> */}
          {/*   <span>Submit Ticket</span> */}
          {/* </button> */}
        </div>

        {activeTab === 'faq' && (
          <div>
            {searchQuery ? (
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900">
                    Search Results ({filteredFaqs.length})
                  </h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {filteredFaqs.map((faq) => (
                    <div key={faq.id} className="p-6">
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full flex items-center justify-between text-left"
                      >
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">{faq.question}</h4>
                          <span className="text-sm text-gray-500">{faq.category}</span>
                        </div>
                        {expandedFaq === faq.id ? (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      {expandedFaq === faq.id && (
                        <div className="mt-4 text-gray-700">{faq.answer}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {faqCategories.map((category) => (
                  <div key={category.id} className="bg-white rounded-xl shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center">
                        <span className="text-2xl mr-3">{category.icon}</span>
                        {category.name}
                      </h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {category.faqs.map((faq) => (
                        <div key={faq.id} className="p-6">
                          <button
                            onClick={() => toggleFaq(faq.id)}
                            className="w-full flex items-center justify-between text-left"
                          >
                            <h4 className="font-medium text-gray-900">{faq.question}</h4>
                            {expandedFaq === faq.id ? (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                          {expandedFaq === faq.id && (
                            <div className="mt-4 text-gray-700">{faq.answer}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactOptions.map((option) => (
                <div key={option.id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className={`w-12 h-12 ${option.color} rounded-lg flex items-center justify-center mb-4`}>
                    <option.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{option.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{option.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Available: {option.availability}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-600">Response: {option.responseTime}</span>
                    </div>
                  </div>

                  {option.number && (
                    <a
                      href={`tel:${option.number}`}
                      className="block w-full bg-red-600 text-white text-center py-3 rounded-lg hover:bg-red-700 transition-colors mb-2"
                    >
                      Call {option.number}
                    </a>
                  )}

                  {option.email && (
                    <a
                      href={`mailto:${option.email}`}
                      className="block w-full bg-red-600 text-white text-center py-3 rounded-lg hover:bg-red-700 transition-colors mb-2"
                    >
                      Email {option.email}
                    </a>
                  )}

                  {option.id === 'chat' && (
                    <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors">
                      Start Chat
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Live Chat Interface */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-red-600" />
                  Quick Chat
                </h3>
              </div>
              <div className="p-6">
                <div className="bg-gray-50 rounded-lg p-4 mb-4 h-32 overflow-y-auto">
                  <div className="text-sm text-gray-600">
                    <div className="mb-2">
                      <span className="font-medium">Support:</span> Hi! How can I help you today?
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* {activeTab === 'ticket' && ( */}
        {/*   <div className="bg-white rounded-xl shadow-sm"> */}
        {/*     <div className="p-6 border-b border-gray-200"> */}
        {/*       <h3 className="text-xl font-bold text-gray-900">Submit Support Ticket</h3> */}
        {/*       <p className="text-gray-600 mt-2">Describe your issue and we'll get back to you</p> */}
        {/*     </div> */}
        {/**/}
        {/*     <div className="p-6 space-y-6"> */}
        {/*       <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
        {/*         <div> */}
        {/*           <label className="block text-sm font-medium text-gray-700 mb-2"> */}
        {/*             Subject */}
        {/*           </label> */}
        {/*           <input */}
        {/*             type="text" */}
        {/*             value={supportTicket.subject} */}
        {/*             onChange={(e) => setSupportTicket({ ...supportTicket, subject: e.target.value })} */}
        {/*             placeholder="Brief description of your issue" */}
        {/*             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" */}
        {/*           /> */}
        {/*         </div> */}
        {/**/}
        {/*         <div> */}
        {/*           <label className="block text-sm font-medium text-gray-700 mb-2"> */}
        {/*             Category */}
        {/*           </label> */}
        {/*           <select */}
        {/*             value={supportTicket.category} */}
        {/*             onChange={(e) => setSupportTicket({ ...supportTicket, category: e.target.value })} */}
        {/*             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" */}
        {/*           > */}
        {/*             <option value="">Select category</option> */}
        {/*             <option value="order">Order Issues</option> */}
        {/*             <option value="payment">Payment Problems</option> */}
        {/*             <option value="account">Account Issues</option> */}
        {/*             <option value="technical">Technical Problems</option> */}
        {/*             <option value="other">Other</option> */}
        {/*           </select> */}
        {/*         </div> */}
        {/*       </div> */}
        {/**/}
        {/*       <div> */}
        {/*         <label className="block text-sm font-medium text-gray-700 mb-2"> */}
        {/*           Priority */}
        {/*         </label> */}
        {/*         <div className="flex space-x-4"> */}
        {/*           {['low', 'medium', 'high', 'urgent'].map((priority) => ( */}
        {/*             <label key={priority} className="flex items-center"> */}
        {/*               <input */}
        {/*                 type="radio" */}
        {/*                 name="priority" */}
        {/*                 value={priority} */}
        {/*                 checked={supportTicket.priority === priority} */}
        {/*                 onChange={(e) => setSupportTicket({ ...supportTicket, priority: e.target.value })} */}
        {/*                 className="text-red-600 focus:ring-red-500" */}
        {/*               /> */}
        {/*               <span className="ml-2 text-sm text-gray-700 capitalize">{priority}</span> */}
        {/*             </label> */}
        {/*           ))} */}
        {/*         </div> */}
        {/*       </div> */}
        {/**/}
        {/*       <div> */}
        {/*         <label className="block text-sm font-medium text-gray-700 mb-2"> */}
        {/*           Description */}
        {/*         </label> */}
        {/*         <textarea */}
        {/*           value={supportTicket.description} */}
        {/*           onChange={(e) => setSupportTicket({ ...supportTicket, description: e.target.value })} */}
        {/*           placeholder="Please provide detailed information about your issue..." */}
        {/*           rows={6} */}
        {/*           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none" */}
        {/*         /> */}
        {/*       </div> */}
        {/**/}
        {/*       <div className="flex space-x-3"> */}
        {/*         <button */}
        {/*           onClick={() => setSupportTicket({ subject: '', category: '', description: '', priority: 'medium' })} */}
        {/*           className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors" */}
        {/*         > */}
        {/*           Clear */}
        {/*         </button> */}
        {/*         <button */}
        {/*           onClick={submitTicket} */}
        {/*           disabled={!supportTicket.subject || !supportTicket.description} */}
        {/*           className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed" */}
        {/*         > */}
        {/*           Submit Ticket */}
        {/*         </button> */}
        {/*       </div> */}
        {/*     </div> */}
        {/*   </div> */}
        {/* )} */}

        {/* Status Banner */}
        {/* <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-8"> */}
        {/*   <div className="flex items-center space-x-3"> */}
        {/*     <CheckCircle className="w-5 h-5 text-green-600" /> */}
        {/*     <div> */}
        {/*       <p className="font-medium text-green-900">All systems operational</p> */}
        {/*       <p className="text-sm text-green-700">Our services are running smoothly</p> */}
        {/*     </div> */}
        {/*   </div> */}
        {/* </div> */}
      </main>
    </div>
  );
};

export default Help;

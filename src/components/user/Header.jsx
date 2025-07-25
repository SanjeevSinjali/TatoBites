// import React, { useState } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
//
// import {
//   ShoppingCart,
//   User,
//   Search,
//   ShoppingBasket,
//   LogOut,
//   Truck,
//   Gift,
// } from 'lucide-react';
// import { useAuth } from '../../lib/auth';
// import { useCart } from '../../lib/cart-provider';
//
// const Header = ({ cartItems = [] }) => {
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const { cart } = useCart()
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, logout } = useAuth();
//
//   const onLogout = async () => {
//     await logout();
//     navigate("/login")
//   }
//
//   return (
//     <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link to="/dashboard" className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-lg">T</span>
//             </div>
//             <span className="text-xl font-bold text-red-600">TatoBites</span>
//           </Link>
//
//           {/* Search Bar */}
//           <div className="hidden lg:flex flex-1 max-w-lg mx-8">
//             <div className="relative w-full">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <input
//                 type="text"
//                 placeholder="Search for restaurants, cuisines, or dishes..."
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                 onClick={() => navigate('/search')}
//                 readOnly
//               />
//             </div>
//           </div>
//
//           {/* Navigation */}
//           <nav className="hidden md:flex items-center space-x-6">
//             <Link
//               to="/dashboard"
//               className={`font-medium transition-colors ${location.pathname === '/dashboard' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
//                 }`}
//             >
//               Home
//             </Link>
//             <Link
//               to="/offers"
//               className={`font-medium transition-colors flex items-center space-x-1 ${location.pathname === '/offers' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
//                 }`}
//             >
//               <Gift className="w-4 h-4" />
//               <span>Offers</span>
//             </Link>
//             <Link
//               to="/menu"
//               className={`font-medium transition-colors flex items-center space-x-1 ${location.pathname === '/menu' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
//                 }`}
//             >
//               <ShoppingBasket className="w-4 h-4" />
//               <span>Menu</span>
//             </Link>
//
//             <Link
//               to="/orders"
//               className={`font-medium transition-colors flex items-center space-x-1 ${location.pathname === '/orders' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
//                 }`}
//             >
//               <Truck className="w-4 h-4" />
//               <span>Orders</span>
//             </Link>
//           </nav>
//
//           {/* Right Section */}
//           <div className="flex items-center space-x-3">
//             {/* Search Icon for Mobile */}
//             <button
//               onClick={() => navigate('/search')}
//               className="lg:hidden p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//             >
//               <Search className="w-5 h-5" />
//             </button>
//
//             {/* Notifications */}
//             {/* <div className="relative"> */}
//             {/*   <button */}
//             {/*     onClick={() => navigate('/notifications')} */}
//             {/*     className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors relative" */}
//             {/*   > */}
//             {/*     <Bell className="w-5 h-5" /> */}
//             {/*     {unreadCount > 0 && ( */}
//             {/*       <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"> */}
//             {/*         {unreadCount} */}
//             {/*       </span> */}
//             {/*     )} */}
//             {/*   </button> */}
//             {/* </div> */}
//
//             {/* Cart */}
//             <Link
//               to="/cart"
//               className="relative p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//             >
//               <ShoppingCart className="w-5 h-5" />
//               {cart.length > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                   {cart.length}
//                 </span>
//               )}
//             </Link>
//
//             {/* User Menu */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowUserMenu(!showUserMenu)}
//                 className="flex items-center space-x-2 p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//               >
//                 <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
//                   <User className="w-4 h-4 text-red-600" />
//                 </div>
//                 <span className="hidden md:block font-medium">{user.name}</span>
//               </button>
//
//               {showUserMenu && (
//                 <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
//                   <div className="px-4 py-3 border-b border-gray-200">
//                     <p className="text-sm font-medium text-gray-900">{user.name}</p>
//                     <p className="text-xs text-gray-500">{user.email}</p>
//                   </div>
//
//                   <Link
//                     to="/profile"
//                     className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
//                     onClick={() => setShowUserMenu(false)}
//                   >
//                     <User className="w-4 h-4" />
//                     <span>Profile</span>
//                   </Link>
//
//                   <Link
//                     to="/orders"
//                     className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
//                     onClick={() => setShowUserMenu(false)}
//                   >
//                     <Truck className="w-4 h-4" />
//                     <span>My Orders</span>
//                   </Link>
//
//                   <hr className="my-2" />
//                   <button
//                     onClick={onLogout}
//                     className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
//                   >
//                     <LogOut className="w-4 h-4" />
//                     <span>Logout</span>
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };
//
// export default Header;
//
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import {
  ShoppingCart,
  User,
  Search,
  ShoppingBasket,
  LogOut,
  Truck,
  Gift,
  LogIn,
} from 'lucide-react';
import { useAuth } from '../../lib/auth';
import { useCart } from '../../lib/cart-provider';

const Header = ({ cartItems = [] }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { cart } = useCart()
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const onLogout = async () => {
    await logout();
    navigate("/login")
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-red-600">TatoBites</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search for restaurants, cuisines, or dishes..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                onClick={() => navigate('/search')}
                readOnly
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`font-medium transition-colors ${location.pathname === '/' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
                }`}
            >
              Home
            </Link>
            <Link
              to="/offers"
              className={`font-medium transition-colors flex items-center space-x-1 ${location.pathname === '/offers' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
                }`}
            >
              <Gift className="w-4 h-4" />
              <span>Offers</span>
            </Link>
            <Link
              to="/menu"
              className={`font-medium transition-colors flex items-center space-x-1 ${location.pathname === '/menu' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
                }`}
            >
              <ShoppingBasket className="w-4 h-4" />
              <span>Menu</span>
            </Link>

            {/* Only show Orders link if user is logged in */}
            {user && (
              <Link
                to="/orders"
                className={`font-medium transition-colors flex items-center space-x-1 ${location.pathname === '/orders' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
                  }`}
              >
                <Truck className="w-4 h-4" />
                <span>Orders</span>
              </Link>
            )}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Search Icon for Mobile */}
            <button
              onClick={() => navigate('/search')}
              className="lg:hidden p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart - only show if user is logged in */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>


            {/* Conditional User Menu or Login Button */}
            {user ? (
              /* User Menu - when logged in */
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="hidden md:block font-medium">{user.name}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>

                    <Link
                      to="/orders"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Truck className="w-4 h-4" />
                      <span>My Orders</span>
                    </Link>

                    <hr className="my-2" />
                    <button
                      onClick={onLogout}
                      className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Login Button - when not logged in */
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden md:block">Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors font-medium"
                >
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

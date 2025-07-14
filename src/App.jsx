import React, { useState, Suspense, lazy, startTransition } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Constants
const USER_TYPES = {
  CUSTOMER: 'customer',
  ADMIN: 'admin'
};

// Lazy-loaded components
const Login = lazy(() => import('./components/auth/Login'));
const SignUp = lazy(() => import('./components/auth/SignUp'));
const UserDashboard = lazy(() => import('./components/user/UserDashboard'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));
const RestaurantDetail = lazy(() => import('./components/user/RestaurantDetail'));
const Cart = lazy(() => import('./components/user/Cart'));
const OrderTracking = lazy(() => import('./components/user/OrderTracking'));
const Profile = lazy(() => import('./components/user/Profile'));
const Settings = lazy(() => import('./components/user/Settings'));
const Favorites = lazy(() => import('./components/user/Favorites'));
const Offers = lazy(() => import('./components/user/Offers'));
const Wallet = lazy(() => import('./components/user/Wallet'));
const Help = lazy(() => import('./components/user/Help'));
const Search = lazy(() => import('./components/user/Search'));
const Notifications = lazy(() => import('./components/user/Notifications'));
const Loyalty = lazy(() => import('./components/user/Loyalty'));
const Reviews = lazy(() => import('./components/user/Reviews'));
// const NotFound = lazy(() => import('./components/common/NotFound'));
const Header = lazy(() => import('./components/user/Header'));
const AdminHeader = lazy(() => import('./components/admin/AdminHeader'));

// Protected Route Component
const ProtectedRoute = ({ user, userType, adminOnly = false, children }) => {
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && userType !== USER_TYPES.ADMIN) return <Navigate to="/dashboard" />;
  return children;
};

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [userType, setUserType] = useState(USER_TYPES.CUSTOMER);

  const handleLogin = (userData, type) => {
    startTransition(() => {
      setUser(userData);
      setUserType(type);
      localStorage.setItem('user', JSON.stringify(userData));
    });
  };

  const handleLogout = () => {
    setUser(null);
    setUserType(USER_TYPES.CUSTOMER);
    localStorage.removeItem('user');
  };

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Conditionally render appropriate header */}
        {user && (
          userType === USER_TYPES.ADMIN ? (
            <AdminHeader user={user} onLogout={handleLogout} />
          ) : (
            <Header user={user} onLogout={handleLogout} />
          )
        )}

        <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={
              user ? (
                <Navigate to={userType === USER_TYPES.ADMIN ? '/admin' : '/dashboard'} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            } />
            <Route path="/signup" element={
              user ? <Navigate to="/dashboard" /> : <SignUp onSignUp={handleLogin} />
            } />

            {/* Customer Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute user={user} userType={userType}>
                <UserDashboard user={user} />
              </ProtectedRoute>
            } />
            <Route path="/restaurant/:id" element={
              <ProtectedRoute user={user} userType={userType}>
                <RestaurantDetail user={user} />
              </ProtectedRoute>
            } />
            <Route path="/cart" element={
              <ProtectedRoute user={user} userType={userType}>
                <Cart user={user} />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute user={user} userType={userType}>
                <OrderTracking user={user} />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute user={user} userType={userType}>
                <Profile user={user} />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute user={user} userType={userType}>
                <Settings user={user} />
              </ProtectedRoute>
            } />
            <Route path="/favorites" element={
              <ProtectedRoute user={user} userType={userType}>
                <Favorites user={user} />
              </ProtectedRoute>
            } />
            <Route path="/offers" element={
              <ProtectedRoute user={user} userType={userType}>
                <Offers user={user} />
              </ProtectedRoute>
            } />
            <Route path="/wallet" element={
              <ProtectedRoute user={user} userType={userType}>
                <Wallet user={user} />
              </ProtectedRoute>
            } />
            <Route path="/help" element={
              <ProtectedRoute user={user} userType={userType}>
                <Help user={user} />
              </ProtectedRoute>
            } />
            <Route path="/search" element={
              <ProtectedRoute user={user} userType={userType}>
                <Search user={user} />
              </ProtectedRoute>
            } />
            <Route path="/notifications" element={
              <ProtectedRoute user={user} userType={userType}>
                <Notifications user={user} />
              </ProtectedRoute>
            } />
            <Route path="/loyalty" element={
              <ProtectedRoute user={user} userType={userType}>
                <Loyalty user={user} />
              </ProtectedRoute>
            } />
            <Route path="/reviews" element={
              <ProtectedRoute user={user} userType={userType}>
                <Reviews user={user} />
              </ProtectedRoute>
            } />

            {/* Admin Route */}
            <Route path="/admin" element={
              <ProtectedRoute user={user} userType={userType} adminOnly>
                <AdminDashboard user={user} />
              </ProtectedRoute>
            } />

            {/* Default and Catch-all Routes */}
            <Route path="/" element={<Navigate to="/login" />} />
            
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
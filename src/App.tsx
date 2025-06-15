import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import UserDashboard from './components/user/UserDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import RestaurantDetail from './components/user/RestaurantDetail';
import Cart from './components/user/Cart';
import OrderTracking from './components/user/OrderTracking';
import Profile from './components/user/Profile';
import Settings from './components/user/Settings';
import Favorites from './components/user/Favorites';
import Offers from './components/user/Offers';
import Wallet from './components/user/Wallet';
import Help from './components/user/Help';
import Search from './components/user/Search';
import Notifications from './components/user/Notifications';
import Loyalty from './components/user/Loyalty';
import Reviews from './components/user/Reviews';

function App() {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState('customer'); // 'customer' or 'admin'

  const handleLogin = (userData, type) => {
    setUser(userData);
    setUserType(type);
  };

  const handleLogout = () => {
    setUser(null);
    setUserType('customer');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route 
            path="/login" 
            element={
              user ? (
                <Navigate to={userType === 'admin' ? '/admin' : '/dashboard'} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            } 
          />
          <Route 
            path="/signup" 
            element={
              user ? (
                <Navigate to="/dashboard" />
              ) : (
                <SignUp onSignUp={handleLogin} />
              )
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              user && userType === 'customer' ? (
                <UserDashboard user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/admin" 
            element={
              user && userType === 'admin' ? (
                <AdminDashboard user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/restaurant/:id" 
            element={
              user ? (
                <RestaurantDetail user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/cart" 
            element={
              user ? (
                <Cart user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/orders" 
            element={
              user ? (
                <OrderTracking user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/profile" 
            element={
              user ? (
                <Profile user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/settings" 
            element={
              user ? (
                <Settings user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/favorites" 
            element={
              user ? (
                <Favorites user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/offers" 
            element={
              user ? (
                <Offers user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/wallet" 
            element={
              user ? (
                <Wallet user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/help" 
            element={
              user ? (
                <Help user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/search" 
            element={
              user ? (
                <Search user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/notifications" 
            element={
              user ? (
                <Notifications user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/loyalty" 
            element={
              user ? (
                <Loyalty user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/reviews" 
            element={
              user ? (
                <Reviews user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
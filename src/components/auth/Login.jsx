import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Shield } from 'lucide-react';
import { useAuth } from '../../lib/auth';

const Login = () => {
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
    } catch (err) {
      console.error(`Error occured at login: ${err.response?.data.error}`)
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-600 mb-2">TatoBites</h1>
          <p className="text-gray-600">Welcome back! Please sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Email or Phone"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* <div className="flex justify-center space-x-4 mb-6"> */}
          {/*   <button */}
          {/*     type="button" */}
          {/*     onClick={() => setLoginType(USER_TYPES.CUSTOMER)} */}
          {/*     className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${loginType === 'customer' */}
          {/*       ? 'bg-red-100 text-red-600 border-2 border-red-200' */}
          {/*       : 'bg-gray-100 text-gray-600 hover:bg-gray-200' */}
          {/*       }`} */}
          {/*   > */}
          {/*     <User className="w-4 h-4" /> */}
          {/*     <span>Customer</span> */}
          {/*   </button> */}
          {/*   <button */}
          {/*     type="button" */}
          {/*     onClick={() => setLoginType(USER_TYPES.ADMIN)} */}
          {/*     className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${loginType === 'admin' */}
          {/*       ? 'bg-red-100 text-red-600 border-2 border-red-200' */}
          {/*       : 'bg-gray-100 text-gray-600 hover:bg-gray-200' */}
          {/*       }`} */}
          {/*   > */}
          {/*     <Shield className="w-4 h-4" /> */}
          {/*     <span>Admin</span> */}
          {/*   </button> */}
          {/* </div> */}

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            New to TatoBites?{' '}
            <Link to="/signup" className="text-red-600 hover:text-red-700 font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

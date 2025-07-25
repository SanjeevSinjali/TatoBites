import React, { useState, startTransition, useEffect } from 'react';
import { Bell, User, LogOut, Settings, Shield, X } from 'lucide-react';
import { useAuth } from '../../lib/auth';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/api-client';
import toast from 'react-hot-toast';

const ProfileDialog = ({ user, onClose }) => {
  const { updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(true);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  const handleSave = async () => {
    try {
      const res = await api.patch(`/users/${user.id}`, { ...formData });
      toast.success("Successfully updated")
      updateUser(res.data);
    } catch (e) {
      toast.error("Couldn't update ")
    }
    setIsEditing(false);
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email
    });
    setIsEditing(false);
    onClose();
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 relative">
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminHeader = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate("/login");
  };

  const onSettingsClick = () => {
    console.log("settings")
    startTransition(() => {
      setShowUserMenu(false);
      setShowProfileDialog(true);
    });
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold text-red-600">TatoBites</span>
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium ml-2">
                Admin
              </span>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => {
                    startTransition(() => {
                      setShowUserMenu((prev) => !prev);
                    });
                  }}
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="font-medium">{user.name}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">Administrator</p>
                    </div>
                    <button
                      onClick={onSettingsClick}
                      className="text-sm flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 w-full text-left"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={onLogout}
                      className="text-xs flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {showProfileDialog && (
        <ProfileDialog user={user} onClose={() => setShowProfileDialog(false)} />
      )}
    </>
  );
};

export default AdminHeader;




// export default AdminLoginPage;
import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

// Notification Component
const Notification = ({ type, message, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800';
  const icon = type === 'success' ? '✅' : '❌';

  return (
    <div className={`fixed top-4 right-4 max-w-md p-4 rounded-lg border shadow-lg z-50 ${bgColor}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <span className="text-lg">{icon}</span>
          <div>
            <p className="font-medium">
              {type === 'success' ? 'Success!' : 'Error!'}
            </p>
            <p className="text-sm mt-1">{message}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 ml-4"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

const AdminLoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    loginType: 'superadmin'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState(null);


  const encryptData = (data, isSuperAdmin) => {
    try {
      console.log('[1] Starting encryption for', isSuperAdmin ? 'superadmin' : 'user');
      
      if (!data) throw new Error('No data provided for encryption');
      
      const secretKey = import.meta.env.VITE_APP_BODY_SECRET;
      if (!secretKey) throw new Error("Encryption secret key not configured");
      
      // Format data differently for superadmin vs regular user
      const backendData = isSuperAdmin 
        ? { su_email: data.email, su_pass: data.password }    
        : { username: data.email, password: data.password }; 

//       const backendData = {
//   username: data.email,  
//   password: data.password
// };

      console.log('[2] Data formatted for backend:', backendData);

      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(backendData),
        secretKey
      ).toString();

      console.log('[3] Encryption successful. Encrypted string:', encrypted);
      return encrypted;
    } catch (error) {
      console.error('[ENCRYPTION ERROR]:', error);
      throw new Error('Failed to encrypt data');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setNotification(null);

    try {
      console.log('[4] Login process started for', formData.loginType);
      
      // Validate inputs
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all fields');
      }

      // Encrypt the data with correct format for endpoint
      const isSuperAdmin = formData.loginType === 'superadmin';
      const encryptedData = await encryptData(formData, isSuperAdmin);

      const requestBody = {
        payload: encryptedData
      };

      console.log('[5] Request payload:', requestBody);

     
      const baseUrl = import.meta.env.VITE_APP_BASE_URL;
      const apiPrefix = import.meta.env.VITE_APP_API_PREFIX;
      
      if (!baseUrl || !apiPrefix) {
        throw new Error('API configuration missing');
      }

      const endpoint = isSuperAdmin
        ? `${baseUrl}${apiPrefix}/login-super-user`
        : `${baseUrl}${apiPrefix}/login-user`;

      console.log('[6] Making request to:', endpoint);

      // Make API call
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const responseData = await response.json();
      console.log('[7] Full API response:', responseData);

      if (!response.ok || !responseData.success) {
        const errorMessage = responseData.message || 'Login failed. Please check your credentials.';
        throw new Error(errorMessage);
      }

      // Handle token from response
      const token = responseData.token || responseData.result?.token;
      if (!token) {
        throw new Error('Authentication token missing in response');
      }

      console.log('[8] Token received:', token);

      // Store token and user data
      localStorage.setItem('authToken', token);
      console.log('[9] Token stored in localStorage');

      if (responseData.user || responseData.result?.user) {
        const userData = responseData.user || responseData.result.user;
        localStorage.setItem('user', JSON.stringify(userData));
        console.log('[10] User data stored');
      }

      showNotification('success', responseData.message || 'Login successful!');
      
      setTimeout(() => {
        window.location.href = '/admin';
      }, 2000);

    } catch (err) {
      console.error('[11] Login error:', err);
      setError(err.message);
      showNotification('error', err.message);
      setFormData(prev => ({ ...prev, password: '' }));
    } finally {
      setLoading(false);
      console.log('[12] Login process completed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={closeNotification}
        />
      )}

      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"/>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to your admin account</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Login As
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, loginType: 'user'})}
                  disabled={loading}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                    formData.loginType === 'user'
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  👤 Staff Login
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, loginType: 'superadmin'})}
                  disabled={loading}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                    formData.loginType === 'superadmin'
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  🔐 Super Admin
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                `Sign in ${formData.loginType === 'superadmin' ? 'as Super Admin' : 'as Staff'}`
              )}
            </button>
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2024 Store Management System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;


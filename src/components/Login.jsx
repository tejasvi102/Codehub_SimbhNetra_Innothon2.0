import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userType, setUserType] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!userType) {
      alert('Please select a user type.');
      return;
    }

    if (!username || !password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, userType }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        // Redirect based on user type
        if (userType === 'user') {
          navigate('/user');
        } else if (userType === 'authority') {
          navigate('/authority');
        }
      } else {
        alert(data.message || 'Login failed.');
      }
    } catch (error) {
      setLoading(false);
      alert('Something went wrong. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        {!userType ? (
          <div className="space-y-4">
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-md"
              onClick={() => setUserType('user')}
            >
              Login as User
            </button>
            <button
              className="w-full bg-green-500 text-white py-2 rounded-md"
              onClick={() => setUserType('authority')}
            >
              Login as Authority
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-700 text-center capitalize">Logging in as {userType}</p>

            <div>
              <label className="block text-sm mb-1">Username</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 p-2 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            <button
              className="w-full bg-blue-600 text-white py-2 rounded-md"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <button
              className="w-full text-sm text-gray-500 underline"
              onClick={() => setUserType('')}
            >
              Go Back
            </button>

            <div className="mt-4 text-center">
              <p className="text-sm">
                Don't have an account?{' '}
                <a href="/register" className="text-blue-600 hover:underline">
                  Register now
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';

const apiUrl = (process.env.REACT_APP_API_BASE_URL || 'https://zithara-jewellery.onrender.com').replace(/\/$/, '');

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const state = location.state;
    if (state?.isAdminLogin) {
      setRole('admin');
    }
  }, [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await response.json();

      console.log("Login response:", data);

      if (data.success) {
        localStorage.setItem('user', JSON.stringify({ role: data.role }));
        if (data.role === 'admin') {
          console.log("Redirecting to Admin Page");
          navigate('/admin');
        } else {
          console.log("Redirecting to Upload Page");
          navigate('/upload');
        }
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Server error. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{role === 'admin' ? 'Admin Login' : 'Login to Zitara'}</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!location.state?.isAdminLogin && (
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          )}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

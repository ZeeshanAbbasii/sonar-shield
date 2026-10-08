import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/auth';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignup) {
        // Signup logic
        if (!name || !email || !password) {
          setError('All fields are required');
          setLoading(false);
          return;
        }
        console.log('Attempting signup...');
        const response = await axios.post(`${API_URL}/register`, {
          name,
          email: email.trim(),
          password
        });
        console.log('Signup response:', response.data);

        localStorage.setItem('portal_token', response.data.token);
        localStorage.setItem('portal_user', JSON.stringify(response.data.user));
        console.log('Navigating to dashboard...');
        window.dispatchEvent(new CustomEvent('auth-change', { detail: { authenticated: true } }));
        navigate('/dashboard');
      } else {
        // Login logic
        console.log('Attempting login...');
        const response = await axios.post(`${API_URL}/login`, {
          email: email.trim(),
          password
        });
        console.log('Login response:', response.data);

        localStorage.setItem('portal_token', response.data.token);
        localStorage.setItem('portal_user', JSON.stringify(response.data.user));
        console.log('Navigating to dashboard...');
        window.dispatchEvent(new CustomEvent('auth-change', { detail: { authenticated: true } }));
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Auth error:', err);
      console.error('Error response:', err.response?.data);
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '40px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            color: '#333',
            marginBottom: '8px',
            fontSize: '28px',
            fontWeight: '700',
          }}
        >
          {isSignup ? 'Create Account' : 'Welcome Back'}
        </h1>
        <p
          style={{
            textAlign: 'center',
            color: '#666',
            marginBottom: '32px',
            fontSize: '14px',
          }}
        >
          {isSignup ? 'Sign up to access your projects' : 'Sign in to access your projects'}
        </p>

        {error && (
          <div
            style={{
              backgroundColor: '#fee',
              color: '#c33',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px',
              textAlign: 'center',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleAuth}>
          {isSignup && (
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  color: '#333',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#667eea';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e0e0e0';
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                color: '#333',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '14px',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#667eea';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e0e0e0';
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label
              style={{
                display: 'block',
                color: '#333',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '14px',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#667eea';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e0e0e0';
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: loading ? '#999' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = '#5568d3';
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = '#667eea';
            }}
          >
            {loading ? 'Processing...' : (isSignup ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        <p
          style={{
            textAlign: 'center',
            marginTop: '24px',
            color: '#666',
            fontSize: '14px',
          }}
        >
          {isSignup ? 'Already have an account? ' : "Don't have an account? "}
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              setError('');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#667eea',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              padding: '0',
              textDecoration: 'underline',
            }}
          >
            {isSignup ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

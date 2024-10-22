import React, { useState } from 'react';
import '../LoginPage/Login.css';
import loginImage from '../../assets/imgs/driving-amico 1.png';


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted', { username, password, rememberMe });
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="illustration-container">
          <img
            src={loginImage}
            alt="Login illustration"
            className="login-illustration"
          />
        </div>
        <div className="form-container">
          <div className="login-form">
            <h2 className="form-title">Welcome to Dutch Driving!</h2>
            <p className="form-description">Log in to access your driving lessons and quizzes, and get closer to mastering the road.</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">User name</label>
                <input
                  id="username"
                  type="text"
                  required
                  placeholder="Enter your user name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>
              <div className="form-options">
                <div className="remember-me">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember-me">Remember me</label>
                </div>
                <a href="#" className="forgot-password">Forgot Password?</a>
              </div>
            </form>
            <div className="login-register-container">
              <button type="button" className="login-button">Login</button>
              <button type="button" className="register-button-login">Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
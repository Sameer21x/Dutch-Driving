import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../LoginPage/Login.css';
import axios from 'axios';
import Loader from '../../Components/Loader';
import loginImage from '../../assets/imgs/driving-amico 1.png';
import Swal from 'sweetalert2';
import { BaseUrl } from '../../Constants/Constant';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailAddress, setemailAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handlesignup = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/signup');
    }, 500); // Delay for smooth transition
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${BaseUrl}/user/login`, {
        emailAddress: emailAddress,
        password
      });

      setLoading(false);
      const { message, token, otpRequired } = response.data;

      // Show success alert and navigate based on otpRequired
      Swal.fire({
        icon: 'success',
        title: message,
      });

      if (otpRequired) {
        // Navigate to OTP page if OTP is required
        navigate('/otp', { state: { emailAddress } });
      } else {
        // Store token if needed, then navigate to user profile
        localStorage.setItem('token', token);
        navigate('/userprofile');
      }
    } catch (err) {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid login credentials. Please try again.',
      });
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-container">
      {loading && <Loader />}
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
            <p className="form-description">
              Log in to access your driving lessons and quizzes, and get closer to mastering the road.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="emailAddress">Email Address</label>
                <input
                  id="emailAddress"
                  type="text"
                  required
                  placeholder="Enter your user name"
                  value={emailAddress}
                  onChange={(e) => setemailAddress(e.target.value)}
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
              <button type="submit" className="login-button">Login</button>
            </form>
            <div className="login-register-container">
              <button type="button" className="register-button-login" onClick={handlesignup}>Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


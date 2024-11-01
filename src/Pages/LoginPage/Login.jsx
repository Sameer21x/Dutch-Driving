import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../LoginPage/Login.css';
import axios from 'axios';
import Loader from '../../Components/Loader';
import loginImage from '../../assets/imgs/driving-amico 1.png';
import Swal from 'sweetalert2';
import { BaseUrl } from '../../Constants/Constant';
import { jwtDecode } from 'jwt-decode';
import { useUser } from '../../UserContext';


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailAddress, setemailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Clear any existing token
    localStorage.removeItem('token');

    try {
      const response = await axios.post(`${BaseUrl}/user/login`, {
        emailAddress,
        password,
      });

      setLoading(false);
      const { message, token, otpRequired } = response.data;
      console.log(response.data, "response is here");

      Swal.fire({
        icon: 'success',
        title: message,
      });

      if (otpRequired) {
        navigate('/otp', { state: { emailAddress } });
      } else {
        // Save the token
        localStorage.setItem('token', token);

        const decodedToken = jwtDecode(token.replace("Bearer ", ""));
        console.log(decodedToken, "decoded token are here");

        const userId = decodedToken.userId || decodedToken._id;
        const paymentActive = decodedToken.paymentActive;

        // Use the login function from UserContext
        login(userId);

        console.log("User ID:", userId); // For debugging
        console.log("Payment Active:", paymentActive); // For debugging

        // Navigate based on paymentActive status
        if (paymentActive) {
          navigate('/userprofile');
        } else {
          navigate('/membershipplan');
        }
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
                  placeholder="Enter your email"
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
              <button type="button" className="register-button-login" onClick={() => navigate('/signup')}>Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

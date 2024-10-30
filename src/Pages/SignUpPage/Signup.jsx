import React, { useState } from 'react';
import axios from 'axios';
import '../SignUpPage/Signup.css';
import loginImage from '../../assets/imgs/driving-amico 1.png';
import Loader from '../../Components/Loader';
import { BaseUrl } from '../../Constants/Constant.js';
import { useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailAddress, setemailAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();


  
  
  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (!username || !emailAddress || !password) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in all fields.",
        icon: "error",
        confirmButtonText: "OK"
      });
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await axios.post(`${BaseUrl}/user/signup`, {
        username,
        emailAddress,
        password,
      });
  
      setLoading(false);
  
      console.log('Signup response:', response.data);

      if (response.data && response.data.message === "User created successfully, OTP sent to email") {
        Swal.fire({
          title: "Success!",
          text: "User created successfully, OTP sent to email.",
          icon: "success",
          confirmButtonText: "OK"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/otp',{ state: { emailAddress } }, { replace: true });
          }
        });
      } else {
        throw new Error(response.data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error during signup:', error);
      Swal.fire({
        title: "Error!",
        text: error.message || 'An error occurred. Please try again.',
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  return (
    <div className="login-container">
      {loading && <Loader />}
      <div className="login-content">
        <div className="illustration-container">
          <img src={loginImage} alt="Login illustration" className="login-illustration" />
        </div>
        <div className="form-container">
          <div className="login-form">
            <h2 className="form-title">Welcome to Dutch Driving!</h2>
            <p className="form-description">Log in to access your driving lessons and quizzes, and get closer to mastering the road.</p>
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label htmlFor="emailAddress">Email Address</label>
                <input
                  id="emailAddress" 
                  type="text"
                  required
                  placeholder="Enter your Email Address"
                  value={emailAddress}
                  onChange={(e) => setemailAddress(e.target.value)}
                />
              </div>
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
              </div>
              <div className="login-register-container">
                <button type="submit" className="register-button">Register</button> {/* Changed to type="submit" */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

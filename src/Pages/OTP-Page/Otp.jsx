import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loader from '../../Components/Loader';
import '../OTP-Page/Otp.css';
import otpimage from '../../assets/imgs/Forgot password.png';
import { BaseUrl } from '../../Constants/Constant';
import { useLocation,useNavigate } from 'react-router-dom';

export default function OTP() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const emailAddress = location.state?.emailAddress || ''; // Retrieve emailAddress from navigation state
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const navigate = useNavigate();


  useEffect(() => {
    console.log('Email Address:', emailAddress); // Console log the email address to confirm it's passed correctly
    inputRefs[0].current.focus();
  }, [emailAddress]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    const otpNumber = Number(enteredOtp);
  
    setLoading(true);
  
    try {
      // Verify OTP and get `paymentActive` in response
      const otpResponse = await axios.post(`${BaseUrl}/user/verify-otp`, {
        emailAddress,
        otp: otpNumber,
      });
  
      const { paymentActive } = otpResponse.data; // Retrieve paymentActive
  
      Swal.fire({
        icon: 'success',
        title: 'Verification Successful!',
        text: otpResponse.data.message,
      });
  
      setLoading(false);
  
      // Navigate based on payment status
      if (paymentActive) {
        navigate('/userprofile');
      } else {
        navigate('/membershipplan');
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Verification Failed',
        text: error.response?.data?.message || 'An error occurred during verification.',
      });
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="otp-container">
      {loading && <Loader />} {/* Display Loader when loading is true */}
      <div className="otp-content">
        <div className="illustration-container">
          <div className="illustration-background">
            <div className="illustration-foreground">
              <img
                src={otpimage}
                alt="OTP Illustration"
                className="otp-illustration"
              />
            </div>
          </div>
        </div>
        <div className="form-container">
          <h2 className="form-title">Enter OTP</h2>
          <p className="form-description">
            An OTP has been sent to your registered E-mail Address. Please enter it below to proceed.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="otp-input-container">
              {otp.map((data, index) => (
                <input
                  className="otp-input"
                  type="text"
                  name="otp"
                  maxLength="1"
                  key={index}
                  value={data}
                  onChange={e => handleChange(e.target, index)}
                  onKeyDown={e => handleKeyDown(e, index)}
                  ref={inputRefs[index]}
                />
              ))}
            </div>
            <button type="submit" className="verify-button" disabled={loading}>
              Verify Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
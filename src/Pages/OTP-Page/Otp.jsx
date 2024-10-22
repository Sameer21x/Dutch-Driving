import React, { useState, useRef, useEffect } from 'react';
import '../OTP-Page/Otp.css';
import otpimage from '../../assets/imgs/Forgot password.png'

export default function OTP() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    console.log('Submitted OTP:', enteredOtp);
    // Add your OTP verification logic here
  };

  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);

  return (
    <div className="otp-container">
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
            Lorem ipsum is simply dummy text of the printing and typesetting industry.
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
            <button type="submit" className="verify-button">
              Verify Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import '../Help & Support/Help.css';
import profilepic from '../../assets/imgs/profilepic.png';
import contactusimage from '../../assets/imgs/Emails-amico.png';
import { useNavigate } from 'react-router-dom';


export default function Help() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', { email, name, message });
  };

  return (
    <div className="help-page">
      <header className="header-help">
        <div className="logo" onClick={() => navigate('/')}>Dutch Driving</div>
        <div className="header-right">
          <span>Help & Support</span>
          {/* <div className="user-profile-help">
            <img src={profilepic} alt="User" className="user-avatar" />
            <span>Lisa</span>
          </div> */}
        </div>
      </header>

      <main className="help-content">
        <h1 className="main-help-heading">Help & Support</h1>

        <section className="help-section">
          <h2 className="subheading">Membership Details</h2>
          <div className="membership-info">
            <h3>Validity</h3>
            <p>Your Dutch Driving membership is valid for the duration of your chosen plan. Access to all features is granted immediately upon successful payment.</p>

            <h3>Starting Dates</h3>
            <p>Your membership starts on the day of purchase. You can begin accessing our courses and resources right away!</p>
          </div>
        </section>

        <section className="help-section">
          <h2 className="subheading">Contact Us</h2>
          <div className="contact-us-container">
            <div className="contact-us-content">
              <div className="illustration-container">
                <img
                  src={contactusimage}
                  alt="Contact illustration"
                  className="contact-illustration"
                />
              </div>
              <div className="form-container">
                <h3 className="form-title">Get in Touch</h3>
                <p className="form-description">
                  Feel free to reach out to us for any inquiries or support. We're here to assist you with all your questions and concerns.
                </p>
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your Email Address"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message/ Queries</label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Enter your Message Here..."
                      rows={4}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="submit-button">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">Dutch Driving</div>
          <div className="footer-text">Virtual Class for Zoom</div>
          <div className="newsletter">
            <input type="email" placeholder="Your Email" className="email-input" />
            <button className="subscribe-button">Subscribe</button>
          </div>
          <div className="footer-links">
            <a href="/help" className="footer-link">Help & Support</a>
            <a href="/termsandconditions" className="footer-link">Terms & Conditions</a>
          </div>
          <div className="copyright">© 2024 Class Technologies Inc.</div>
        </div>
      </footer>


    </div>
  );
}
import React from 'react';
import '../Help & Support/Help.css';
import profilepic from '../../assets/imgs/profilepic.png';

export default function postaHelp() {
  return (
    <div className="help-page">
      <header className="header-help">
        <div className="logo">Dutch Driving</div>
        <div className="header-right">
          <span>Help & Support</span>
          <div className="user-profile-help">
            <img src={profilepic} alt="User" className="user-avatar" />
            <span>Lisa</span>
          </div>
        </div>
      </header>

      <main className="help-content">
        <h1 className="main-heading">Help & Support</h1>

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
          <h2 className="subheading">Payment Plans</h2>
          <div className="payment-plans">
            <div className="plan">
              <h3>1 Month Plan</h3>
              <p>Perfect for quick learners or those looking to refresh their knowledge.</p>
              <span className="price">€49.99/month</span>
            </div>
            <div className="plan">
              <h3>6 Month Plan</h3>
              <p>Ideal for most learners, providing ample time to master all concepts.</p>
              <span className="price">€39.99/month</span>
            </div>
            <div className="plan">
              <h3>12 Month Plan</h3>
              <p>Best value for thorough learning and extended practice.</p>
              <span className="price">€29.99/month</span>
            </div>
          </div>
        </section>

        <section className="help-section">
          <h2 className="subheading">Contact Us</h2>
          <div className="contact-info">
            <p>Our dedicated support team is here to assist you with any questions or concerns.</p>
            <ul>
              <li><strong>Helpline:</strong> +31 20 123 4567</li>
              <li><strong>Email:</strong> support@dutchdriving.nl</li>
              <li><strong>Live Chat:</strong> Available on our website 24/7</li>
            </ul>
            <p>Operating Hours: Monday to Friday, 9:00 AM - 6:00 PM CET</p>
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
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms & Conditions</a>
          </div>
          <div className="copyright">© 2024 Class Technologies Inc.</div>
        </div>
      </footer>
    </div>
  );
}
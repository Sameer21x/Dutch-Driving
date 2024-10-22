import React from 'react';
import '../MembershipPage/MembershipPlan.css';
import profilepic from '../../assets/imgs/profilepic.png'

export default function MembershipPlan() {
  return (
    <div className="membership-page">
      <header className="header-membership">
        <div className="logo">Dutch Driving</div>
        <div className="header-right">
          <span>About Us</span>
          <div className="user-profile-membership">
            <img src={profilepic} alt="User" className="user-avatar" />
            <span>Lisa</span>
          </div>
        </div>
      </header>

      <main className="main-content">
        <h1 className="title">Choose a Plan</h1>

        <div className="plans-container">
          <div className="plan">
            <h2 className="plan-title">1 Month</h2>
            <p className="plan-price">19.99 €</p>
            <ul className="plan-features">
              <li>Comprehensive driven system</li><br />
              <li>Sales-boosting landing pages</li><br />
              <li>Awesome Feather icons pack</li>
            </ul>
            <button className="buy-button">Buy Now</button>
          </div>

          <div className="plan featured">
            <h2 className="plan-title">3 Months</h2>
            <p className="plan-price">14.99 €</p>
            <ul className="plan-features">
              <li>Comprehensive driven system</li><br />
              <li>Sales-boosting landing pages</li><br />
              <li>Awesome Feather icons pack</li><br />
              <li>Themed into 3 different styles</li><br />
              <li>Will help to learn Figma</li>
            </ul>
            <button className="buy-button">Buy Now</button>
          </div>

          <div className="plan">
            <h2 className="plan-title">6 Months</h2>
            <p className="plan-price">9.99 €</p>
            <ul className="plan-features">
              <li>Comprehensive driven system</li><br />
              <li>Sales-boosting landing pages</li><br />
              <li>Awesome Feather icons pack</li><br />
              <li>Themed into 3 different styles</li>
            </ul>
            <button className="buy-button">Buy Now</button>
          </div>
        </div>

        <div className="coaching-banner">
          <h2>Online coaching lessons for remote learning.</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor
            sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
          <button className="start-learning-button">Start learning now</button>
        </div>
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
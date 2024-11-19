import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../MembershipPage/MembershipPlan.css';
import profilepic from '../../assets/imgs/profilepic.png';
import { useUser } from '../../UserContext';
import { BaseUrl } from '../../Constants/Constant';
import Loader from '../../Components/Loader';
import Swal from 'sweetalert2';

export default function MembershipPlan() {
  const [loading, setLoading] = useState(false);
  const { userId } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const status = urlParams.get('payment_status');

    if (status === 'success') {
      Swal.fire({
        icon: 'success',
        title: 'Payment Successful',
        text: 'Your membership has been updated.',
      });
    } else if (status === 'cancel') {
      Swal.fire({
        icon: 'error',
        title: 'Payment Cancelled',
        text: 'Your payment was cancelled. Please try again.',
      });
    }
  }, [location]);

  const handleBuyNow = async (planType) => {
    setLoading(true);

    try {
      const response = await axios.post(`${BaseUrl}/user/updateMembershipPlan`, {
        userId,
        membershipPlanType: planType
      });

      window.location.href = response.data.checkoutUrl;
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while processing your request. Please try again.',
      });
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

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
            <button className="buy-button" onClick={() => handleBuyNow('1month')}>
              Buy Now
            </button>
          </div>

          <div className="plan featured">
            <h2 className="plan-title">6 Months</h2>
            <p className="plan-price">9.99 €</p>
            <ul className="plan-features">
              <li>Comprehensive driven system</li><br />
              <li>Sales-boosting landing pages</li><br />
              <li>Awesome Feather icons pack</li><br />
              <li>Themed into 3 different styles</li><br />
              <li>Will help to learn Figma</li>
            </ul>
            <button className="buy-button" onClick={() => handleBuyNow('6months')}>
              Buy Now
            </button>
          </div>

          <div className="plan">
            <h2 className="plan-title">3 Months</h2>
            <p className="plan-price">14.99 €</p>
            <ul className="plan-features">
              <li>Comprehensive driven system</li><br />
              <li>Sales-boosting landing pages</li><br />
              <li>Awesome Feather icons pack</li><br />
              <li>Themed into 3 different styles</li>
            </ul>
            <button className="buy-button" onClick={() => handleBuyNow('3months')}>
              Buy Now
            </button>
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
            <a href="/help" className="footer-link">Help & Support</a>
            <a href="/termsandconditions" className="footer-link">Terms & Conditions</a>
          </div>
          <div className="copyright">© 2024 Class Technologies Inc.</div>
        </div>
      </footer>
    </div>
  );
}
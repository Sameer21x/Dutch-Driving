import React, { useState, useEffect } from 'react';
import '../Help & Support/Help.css';
import profilepic from '../../assets/imgs/profilepic.png';
import contactusimage from '../../assets/imgs/Emails-amico.png';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../../Constants/Constant';
import Loader from '../../Components/Loader';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useUser } from '../../UserContext';

export default function Help() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [memberId, setMemberId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic]=useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { userId } = useUser();

  useEffect(() => {
    if (userId) {
      setIsAuthenticated(true);
      fetchUserDetails();
    } else {
      setIsAuthenticated(false);
    }
  }, [userId]);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BaseUrl}/user/${userId}`);
      const user = response.data.user;
      setProfilePic(user.profilePic);
      setEmail(user.emailAddress);
      setName(user.username);
      setMemberId(user.memberId || '');
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user details:', error);
      setLoading(false);
      Swal.fire('Error', 'Failed to load user details', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      Swal.fire({
        title: 'Authentication Required',
        text: 'In order to submit a query, you must first sign up for the Dutch Driving WebApp.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sign Up',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/signup');
        }
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BaseUrl}/user/contactUs`, {
        emailAddress: email,
        name: name,
        memberId: memberId,
        message: message
      });

      setLoading(false);
      Swal.fire('Success', 'Your query has been submitted successfully.', 'success');
      setMessage('');
    } catch (error) {
      setLoading(false);
      console.error('Error submitting query:', error);
      Swal.fire('Error', 'Failed to submit your query. Please try again.', 'error');
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="help-page">
      <header className="header-help">
        <div className="logo" onClick={() => navigate('/')}>Dutch Driving</div>
        <div className="header-right">
          <span>Help & Support</span>
          {isAuthenticated && (
            <div className="user-profile-help">
              <img src={profilePic} alt="User" className="user-avatar" />
              <span>{name}</span>
            </div>
          )}
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
              <div className="contact-form-container">
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
                    <label htmlFor="memberId">Member ID</label>
                    <input
                      type="text"
                      id="memberId"
                      value={memberId}
                      onChange={(e) => setMemberId(e.target.value)}
                      placeholder="Enter your Member ID"
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
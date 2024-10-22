import React, { useState } from 'react';
import '../ContactUs/Contactus.css';
import contactusimage from '../../assets/imgs/Emails-amico.png'

export default function ContactUs() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', { email, name, message });
  };

  return (
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
          <h1 className="form-title">Contact Us</h1>
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
  );
}
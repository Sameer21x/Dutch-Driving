import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Payment Failed/Payment.css';
import { AlertCircle, PhoneCall, RefreshCw } from 'lucide-react';

export default function Payment() {
  const navigate = useNavigate();

  const handleRetry = () => {
    // Navigate back to the membership page or trigger the Stripe checkout again
    navigate('/membershipplan');
  };

  const handleContact = () => {
    // Navigate to a contact page or open a modal with contact information
    navigate('/contactus');
  };

  return (
    <div className="payment-failed-page">
      <div className="payment-failed-content">
        <AlertCircle className="error-icon" size={64} />
        <h1 className="main-heading">Payment Failed</h1>
        <p className="sub-heading">
          We're sorry, but your payment couldn't be processed. Please try again or contact our team for assistance.
        </p>
        <div className="action-buttons">
          <button className="retry-button" onClick={handleRetry}>
            <RefreshCw size={20} />
            Try Again
          </button>
          <button className="contact-button" onClick={handleContact}>
            <PhoneCall size={20} />
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
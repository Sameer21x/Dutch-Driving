import React from 'react';
import '../AboutUs/About.css';
import profilepic from '../../assets/imgs/profilepic.png';

export default function Aboutus() {
  return (
    <div className="aboutus-page">
      <header className="header-aboutus">
        <div className="logo">Dutch Driving</div>
        <div className="header-right">
          <span>About Us</span>
          <div className="user-profile-aboutus">
            <img src={profilepic} alt="User" className="user-avatar" />
            <span>Lisa</span>
          </div>
        </div>
      </header>

      <main className="aboutus-content">
        <h1 className="main-heading">About Us</h1><hr /><br />
        
        <section className="aboutus-section">
          <h2 className="subheading">Who We Are</h2>
          <p>
            Dutch Driving is a leading online platform dedicated to providing comprehensive driving education to learners across the Netherlands. Founded in 2020, we have quickly become the go-to resource for aspiring drivers, combining traditional learning methods with cutting-edge technology to deliver an unparalleled educational experience.
          </p>
        </section>

        <section className="aboutus-section">
          <h2 className="subheading">What We Offer</h2>
          <p>
            At Dutch Driving, we offer a wide range of services tailored to meet the needs of every learner. Our offerings include:
          </p>
          <ul>
            <li>Interactive online theory courses</li>
            <li>Virtual driving simulations</li>
            <li>Live webinars with experienced instructors</li>
            <li>Personalized learning paths</li>
            <li>Practice tests and exam preparation</li>
          </ul>
        </section>

        <section className="aboutus-section">
          <h2 className="subheading">Our Mission</h2>
          <p>
            Our mission is to make high-quality driving education accessible to everyone, ensuring safer roads and more confident drivers. We strive to innovate continuously, incorporating the latest research and technology into our teaching methods.
          </p>
        </section>

        <section className="aboutus-section">
          <h2 className="subheading">Why Choose Us</h2>
          <p>
            Choosing Dutch Driving means opting for excellence in driving education. Our team of expert instructors, coupled with our state-of-the-art learning platform, ensures that you receive the best possible preparation for your driving journey. We pride ourselves on our high pass rates and the positive feedback we receive from our students.
          </p>
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
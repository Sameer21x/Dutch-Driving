import React, { } from 'react';
import '../Home/Home.css';
import car from '../../assets/imgs/driving-amico 2.png';
import { useNavigate } from 'react-router-dom';



export default function Home() {

    const navigate = useNavigate();




    return (
        <div className="home">


            <header className="header">
                <div className="heading-text" onClick={() => navigate('/')}>Dutch Driving</div>
                <div className="header-right">
                    <span className="about-us" onClick={() => navigate('/aboutus')}>About Us</span>
                    <button className="btn btn-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polygon points="10 8 16 12 10 16 10 8"></polygon>
                        </svg>
                        Watch how it works
                    </button>
                </div>
            </header>

            <main className="main-contentt">
                <section className="hero">
                    <div className="hero-content">
                        <h1>Learn Driving Online,<br />Anytime, Anywhere Easily!</h1>
                        <p>Dutch Driving is an interesting platform that will teach you in more an interactive way</p>
                        <div className="cta-buttons">
                            <button className='login-btn' onClick={() => navigate('/login')}>Login</button>
                            <button className='signup-btn' onClick={() => navigate('/signup')}>Sign Up</button>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src={car} alt="People driving" />
                    </div>
                </section>
            </main>

            <main className="main-content">
                <h1 className="home-title">Checkout our membership Plans</h1>

                <div className="plans-container">
                    <div className="plan">
                        <h2 className="plan-title">1 Month</h2>
                        <p className="plan-price">19.99 €</p>
                        <ul className="plan-features">
                            <li>Comprehensive driven system</li><br />
                            <li>Sales-boosting landing pages</li><br />
                            <li>Awesome Feather icons pack</li>
                        </ul>
                        <button className="buy-button"  >
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
                        <button className="buy-button" >
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
                        <button className="buy-button" >
                            Buy Now
                        </button>
                    </div>
                </div>

                <div className="coaching-banner">
                    <h2>Let's start learning and testing your driving skills and knowledge.</h2>
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

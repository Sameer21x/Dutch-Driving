import React from 'react';
import '../Terms&Conditions/TermsAndConditions.css';

export default function TermsAndConditions() {
    return (
        <div className="terms-and-conditions">

            <header className="terms-header">
                <h1>Terms & Conditions</h1>
            </header>
            <main className="terms-content">
                <section>
                    <h2>1. Acceptance of Terms</h2>
                    <p>By accessing or using our E-Learning Driving WebApp, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>
                </section>

                <section>
                    <h2>2. User Account</h2>
                    <p>You must create an account to access the platform. You are responsible for maintaining the confidentiality of your login details and for all activities that occur under your account.</p>
                </section>

                <section>
                    <h2>3. Use of Platform</h2>
                    <p>Our platform is designed for educational purposes. You agree to use the content solely for your personal learning. You may not distribute, modify, or use the material for commercial purposes without permission.</p>
                </section>

                <section>
                    <h2>4. Course Content</h2>
                    <p>We strive to keep all course materials up-to-date and accurate. However, we do not guarantee that all information is completely error-free. It is your responsibility to stay informed about the latest traffic rules and driving regulations in your region.</p>
                </section>

                <section>
                    <h2>5. Payments</h2>
                    <p>Access to some courses may require payment. All fees are non-refundable unless otherwise stated. By making a payment, you agree to our pricing, payment, and refund policies.</p>
                </section>

                <section>
                    <h2>6. License to Use</h2>
                    <p>Upon payment, we grant you a limited, non-exclusive, non-transferable license to access and use the course material for your own personal learning. This license does not permit you to reproduce, distribute, or publicly display any material from the platform.</p>
                </section>

                <section>
                    <h2>10. Contact Us</h2>
                    <p>If you have any questions or need further clarification regarding these terms, feel free to contact us at support@drivingwebapp.com.</p>
                </section>
                

                <p className="agreement">By using our platform, you acknowledge that you have read, understood, and agree to these terms and conditions.</p>
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
import React, { useState, useEffect } from 'react';
import '../User-ProfilePage/UserProfile.css';
import defaultProfilePic from '../../assets/imgs/profilepic.png'; // Static fallback image
import car from '../../assets/imgs/driving-amico 2.png';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Components/Loader';
import { useUser } from '../../UserContext';
import { ChevronDown, LogOut, User, HelpCircle, FileText } from 'lucide-react';
import { BaseUrl } from '../../Constants/Constant';

export default function UserProfile() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const { userId } = useUser();

    useEffect(() => {
        if (userId) {
            const fetchUserDetails = async () => {
                try {
                    const response = await fetch(`${BaseUrl}/user/${userId}`);
                    const data = await response.json();
                    if (response.ok) {
                        setUserDetails(data.user);
                    } else {
                        console.error("Failed to fetch user details:", data.message);
                    }
                } catch (error) {
                    console.error("Error fetching user details:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchUserDetails();
        }
    }, [userId]);

    const handleNavigation = (path) => navigate(path, { state: { userId } });

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="user-profile">
            <header className="header">
                <div className="logo">Dutch Driving</div>
                <div className="header-right">
                    <span className="about-us" onClick={() => handleNavigation("/aboutus")}>About Us</span>
                    <div className="user-profile-wrapper">
                        <div className="user-icon">
                            <img
                                src={userDetails?.profilePic || defaultProfilePic}
                                alt="User"
                                className="user-avatar"
                            />
                            <span>{userDetails?.username || "User"}</span>
                        </div>
                        <button
                            className="dropdown-trigger"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <ChevronDown className="dropdown-icon" />
                        </button>
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <button className="dropdown-item" onClick={() => handleNavigation("/accsettings")}>
                                    <User size={20} />
                                    Account Settings
                                </button>
                                <button className="dropdown-item" onClick={() => handleNavigation("/help")}>
                                    <HelpCircle size={20} />
                                    Help & Support
                                </button>
                                <button className="dropdown-item" onClick={() => handleNavigation("/termsandconditions")}>
                                    <FileText size={20} />
                                    Terms & Conditions
                                </button>
                            </div>
                        )}
                    </div>
                    <LogOut className="logout-icon" />
                </div>
            </header>

            <main className="main-contentt">
                <section className="hero">
                    <div className="hero-content">
                        <h1>Learn Driving Online,<br />Anytime, Anywhere Easily!</h1>
                        <p>Dutch Driving is an interesting platform that will teach you in more an interactive way</p>
                        <div className="cta-buttons">
                            <button className="btn btn-primary">Contact Us</button>
                            <button className="btn btn-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polygon points="10 8 16 12 10 16 10 8"></polygon>
                                </svg>
                                Watch how it works
                            </button>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src={car} alt="People driving" />
                    </div>
                </section>

                <section className="welcome-message">
                    <h2>Welcome back, {userDetails?.username || "User"}! Ready to continue your driving journey?</h2>
                </section>

                <section className="action-buttons">
                    <button className="btn btn-large" onClick={() => handleNavigation("/alllessons")}>Learn Lessons</button>
                    <button className="btn btn-large" onClick={() => handleNavigation("/quizqna")}>Attempt Quiz</button>
                    <button className="btn btn-large" onClick={() => handleNavigation("/quizresult")}>Check Results</button>
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

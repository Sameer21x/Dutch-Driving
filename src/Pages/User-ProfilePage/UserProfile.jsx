import React from 'react';
import '../User-ProfilePage/UserProfile.css';
import profilepic from '../../assets/imgs/profilepic.png'
import car from '../../assets/imgs/driving-amico 2.png'
import { useNavigate } from 'react-router-dom';
import Loader from '../../Components/Loader';



export default function UserProfile() {
    const navigate = useNavigate();

    const getlessons=()=>{
        navigate("/alllessons")
    }



    return (
        <div className="user-profile">
            <header className="header">
                <div className="logo">Dutch Driving</div>
                <div className="header-right">
                    <span className="about-us">About Us</span>
                    <div className="user-icon">
                        <img src={profilepic} alt="User" className="user-avatar" />
                        <span>Lisa</span>
                    </div>
                    <div className="svg-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>


                    </div>
                </div>
            </header>

            <main className="main-content">
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
                    <h2>Welcome back! Ready to continue your driving journey?</h2>
                </section>

                <section className="action-buttons">
                    <button className="btn btn-large" onClick={getlessons}>Learn Lessons</button>
                    <button className="btn btn-large" >Attempt Quiz</button>
                    <button className="btn btn-large">Check Results</button>
                </section>
            </main>
        </div>
    );
}
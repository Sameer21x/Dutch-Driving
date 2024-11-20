import React, { useState, useEffect } from 'react';
import '../LessonsPage/AllLessons.css';
import profilepic from '../../assets/imgs/profilepic.png';
import car from '../../assets/imgs/driving-amico 2.png';
import axios from 'axios';
import Loader from '../../Components/Loader';
import { BaseUrl } from '../../Constants/Constant';
import { useNavigate,useLocation } from 'react-router-dom';
import { useUser } from '../../UserContext';



import icon1 from '../../assets/icons/icon1.png';
import icon2 from '../../assets/icons/icon2.png';
import icon3 from '../../assets/icons/icon3.png';
import icon4 from '../../assets/icons/icon4.png';
import icon5 from '../../assets/icons/icon5.png';
import icon6 from '../../assets/icons/icon6.png';
import icon7 from '../../assets/icons/icon7.png';
import icon8 from '../../assets/icons/icon8.png';
import icon9 from '../../assets/icons/icon9.png';

export default function AllLessons() {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const { userId } = useUser();
    console.log("UserID is here on all lessons page",userId);
    




    const selectlesson = (lessonId) => {
        navigate("/lessonqna", { state: { lessonId,userId } });
    };


    // Fetch lessons from API
    useEffect(() => {
        axios.get(`${BaseUrl}/lessons`)
            .then(response => {
                setLessons(response.data.lessons);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching lessons:", error);
                setLoading(false);
            });
    }, []);

    const icons = [icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8, icon9];

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

            <main className="main-lesson-content">
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <section className="hero">
                            <div className="hero-content">
                                <h1>Learn Driving Online,<br />Anytime, Anywhere Easily!</h1>
                                <p>Dutch Driving is an interesting platform that will teach you in a more interactive way</p>
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

                        <section className="driving-lessons">
                            <h2>Driving Lessons</h2>
                            <p>Dutch Driving offers a dynamic online platform featuring interactive driving lessons and quizzes, providing all the essential tools to help learners succeed in mastering road knowledge and driving skills.</p>
                            <div className="lessons-grid">
                                {lessons.map((lesson, index) => (
                                    <div key={lesson._id} className="lesson-card" onClick={() => selectlesson(lesson._id)}>
                                        <img src={icons[index % icons.length]} alt={`Lesson ${lesson.number} icon`} className="lesson-icon" />
                                        {/* <h3>Lesson {lesson.number}</h3> */}
                                        <h3>{lesson.title}</h3><br />

                                        <p>Total Questions {lesson.noOfQuestions}</p><br />
                                        <p>{lesson.description}</p>
                                        

                                    </div>
                                ))}
                            </div>

                        </section>
                    </>
                )}
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

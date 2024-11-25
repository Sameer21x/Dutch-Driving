import React from 'react';
import '../User Guide/UserGuide.css';
import { useNavigate } from 'react-router-dom';
import { Book, Clock, Award, Zap, Moon, Type, BadgeIcon as Certificate, DollarSign } from 'lucide-react';

export default function UserGuide() {
    const navigate = useNavigate();

    return (

        <div className="User-Guide-parent">




            <header className="header-userguide">
                <div className="logo" onClick={() => navigate('/userprofile')}>Dutch Driving</div>
                <div className="header-right">
                    <span>About Us</span>
                    {/* <div className="user-profile-accountsettings">
                <img src={profileImage} alt="User" className="user-avatar" />
                <span>{formData.username}</span>
            </div> */}
                </div>
            </header>



            <div className="user-guide">


                <h1 className="guide-title">User Guide for E-learning and Quiz Platform</h1>
                <p className="guide-intro">Welcome to the platform! This guide explains how to explore lessons, attempt quizzes, and utilize additional features effectively.</p>

                <section className="guide-section">
                    <h2><Book size={24} /> Section 1: Lesson Module</h2>
                    <h3>1.1 Accessing Lessons</h3>
                    <ul>
                        <li>Navigate to the Lessons tab after logging in.</li>
                        <li>Browse through available categories such as:
                            <ul>
                                <li>Science</li>
                                <li>Mathematics</li>
                                <li>History</li>
                                <li>General Knowledge</li>
                            </ul>
                        </li>
                        <li>Select a lesson to view the following:
                            <ul>
                                <li>Learning Materials: Includes videos, text-based content, and diagrams.</li>
                                <li>Interactive Activities: Drag-and-drop activities, matching exercises, or puzzles.</li>
                                <li>Save Progress: Resume lessons from where you left off.</li>
                            </ul>
                        </li>
                    </ul>

                    <h3>1.2 Key Features of Lessons</h3>
                    <ul>
                        <li>Self-Paced Learning: Pause, rewind, or rewatch as needed.</li>
                        <li>Note-Taking: Write and save notes during lessons.</li>
                        <li>Assessments: Practice questions appear at the end of each lesson to test understanding.</li>
                    </ul>
                </section>

                <section className="guide-section">
                    <h2><Zap size={24} /> Section 2: Quiz Module</h2>
                    <p>The quiz module evaluates your understanding through different question types and levels.</p>

                    <h3>2.1 Sections of a Quiz</h3>
                    <h4>Section A: Basics</h4>
                    <ul>
                        <li>This section consists of introductory-level questions.</li>
                        <li>Question types include:
                            <ul>
                                <li>True/False</li>
                                <li>Single-answer multiple-choice</li>
                            </ul>
                        </li>
                        <li>Example: "The capital of France is Paris. True or False?"</li>
                    </ul>

                    <h4>Section B: Application</h4>
                    <ul>
                        <li>Focuses on applying knowledge from the lessons.</li>
                        <li>Includes:
                            <ul>
                                <li>Fill-in-the-blanks</li>
                                <li>Multiple-choice with multiple correct answers</li>
                            </ul>
                        </li>
                        <li>Example: "Fill in the blank: Water boils at ___ degrees Celsius."</li>
                    </ul>

                    <h4>Section C: Challenges</h4>
                    <ul>
                        <li>Advanced, scenario-based questions requiring critical thinking.</li>
                        <li>Includes:
                            <ul>
                                <li>Case studies or problem-solving</li>
                                <li>Timed challenges for added difficulty</li>
                            </ul>
                        </li>
                        <li>Example: "Analyze the graph and identify the trend."</li>
                    </ul>

                    <h3>2.2 Quiz Features</h3>
                    <ul>
                        <li><Clock size={16} /> Timer: Each section has a time limit.</li>
                        <li>Instant Feedback: Get feedback for each question or after completing the quiz.</li>
                        <li>Retry Option: Retake the quiz to improve your score.</li>
                    </ul>
                </section>

                <section className="guide-section">
                    <h2><Award size={24} /> Section 3: Results and Progress Tracking</h2>
                    <h3>3.1 Viewing Results</h3>
                    <ul>
                        <li>After completing a quiz, your results appear on the Results page.</li>
                        <li>Metrics displayed include:
                            <ul>
                                <li>Score Breakdown: Performance per section (A, B, C).</li>
                                <li>Time Spent: Time taken to complete each section.</li>
                                <li>Rank: Your rank among other users on the leaderboard.</li>
                            </ul>
                        </li>
                    </ul>

                    <h3>3.2 Progress Dashboard</h3>
                    <ul>
                        <li>Completion Rate: Tracks lesson and quiz completion.</li>
                        <li>Badges Earned: View badges for milestones like "First Quiz Completed" or "Top 10% Performance."</li>
                    </ul>
                </section>

                <section className="guide-section">
                    <h2>Section 4: Additional Features</h2>
                    <h3>4.1 Gamification</h3>
                    <ul>
                        <li>Earn points for completing lessons, quizzes, and challenges.</li>
                        <li>Compete with peers on the leaderboard for rewards.</li>
                    </ul>

                    <h3>4.2 Accessibility Options</h3>
                    <ul>
                        <li><Moon size={16} /> Dark Mode: Toggle for a comfortable viewing experience.</li>
                        <li><Type size={16} /> Text Resizing: Adjust font size for better readability.</li>
                    </ul>

                    <h3>4.3 Certificates</h3>
                    <ul>
                        <li><Certificate size={16} /> Receive certificates for completing courses or scoring high in quizzes.</li>
                    </ul>
                </section>

                <section className="guide-section">
                    <h2><DollarSign size={24} /> Section 5: Membership Plans</h2>
                    <h3>5.1 Plans Overview</h3>
                    <ul>
                        <li>Basic Access: Free, limited lessons and quizzes.</li>
                        <li>Premium Plans:
                            <ul>
                                <li>1 Month Plan: €19.99</li>
                                <li>3 Month Plan: €14.99/month</li>
                                <li>6 Month Plan: €9.99/month</li>
                            </ul>
                        </li>
                    </ul>

                    <h3>5.2 Managing Membership</h3>
                    <ul>
                        <li>Upgrade or cancel membership in the Account Settings  Membership tab.</li>
                        <li>Premium plans unlock:
                            <ul>
                                <li>Full access to advanced lessons and quizzes.</li>
                                <li>Priority support and exclusive content.</li>
                            </ul>
                        </li>
                    </ul>
                </section>

                <p className="guide-conclusion">By following this guide, you'll have a smooth experience navigating the app. Dive into lessons, challenge yourself with quizzes, and track your progress toward becoming a top learner!</p>



            </div>

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
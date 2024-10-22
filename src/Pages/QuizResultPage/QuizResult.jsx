import React from 'react';
import '../QuizResultPage/QuizResult.css';
import profilepic from '../../assets/imgs/profilepic.png'

const AttemptCard = ({ attempt, percentage, score, duration, date }) => (
  <div className="attempt-card">
    <div className="attempt-number">Attempt {attempt}</div>
    <div className="attempt-details">
      <div className="detail">
        <span className="detail-label">Percentage</span>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${percentage}%`, backgroundColor: getColor(percentage) }}></div>
        </div>
        <span className="detail-value">{percentage}%</span>
      </div>
      <div className="detail">
        <span className="detail-label">Score</span>
        <span className="detail-icon">🏆</span>
        <span className="detail-value">{score}</span>
      </div>
      <div className="detail">
        <span className="detail-label">Duration</span>
        <span className="detail-icon">⏳</span>
        <span className="detail-value">{duration}</span>
      </div>
      <div className="detail">
        <span className="detail-label">Date</span>
        <span className="detail-icon">📅</span>
        <span className="detail-value">{date}</span>
      </div>
    </div>
  </div>
);

const getColor = (percentage) => {
  if (percentage >= 80) return '#4CAF50';
  if (percentage >= 60) return '#FFC107';
  return '#FF5722';
};

export default function QuizResult() {
  const attempts = [
    { attempt: 1, percentage: 85, score: '60/65', duration: '19:20', date: '22-09-24' },
    { attempt: 2, percentage: 65, score: '60/65', duration: '19:20', date: '22-09-24' },
    { attempt: 3, percentage: 55, score: '60/65', duration: '19:20', date: '22-09-24' },
  ];

  return (
    <div className="quiz-result-page">
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

      <main className="quiz-result-content">
        <h1>Quiz Results</h1>
        <div className="attempt-cards">
          {attempts.map((attempt, index) => (
            <AttemptCard key={index} {...attempt} />
          ))}
        </div>
      </main>
    </div>
  );
}
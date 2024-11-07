import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../QuizResultPage/QuizResult.css';
import profilepic from '../../assets/imgs/profilepic.png';
import Loader from '../../Components/Loader';
import { BaseUrl } from '../../Constants/Constant';
import { useUser } from '../../UserContext';

const AttemptCard = ({ attempt, correctAnswers, totalQuestions, totalTime, dateAttempted }) => {
  const percentage = (correctAnswers / totalQuestions) * 100;
  const formattedDate = new Date(dateAttempted).toLocaleDateString('en-GB');
  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;
  const duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  const getColor = (percentage) => {
    if (percentage >= 80) return '#4CAF50';
    if (percentage >= 60) return '#FFC107';
    return '#FF5722';
  };

  return (
    <div className="attempt-card">
      <div className="attempt-number">Attempt {attempt}</div>
      <div className="attempt-details">
        <div className="detail">
          <span className="detail-label">Percentage</span>
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{ 
                width: `${percentage}%`, 
                backgroundColor: getColor(percentage) 
              }}
            />
          </div>
          <span className="detail-value">{percentage.toFixed(1)}%</span>
        </div>
        <div className="detail">
          <span className="detail-label">Score</span>
          <span className="detail-icon">🏆</span>
          <span className="detail-value">{correctAnswers}/{totalQuestions}</span>
        </div>
        <div className="detail">
          <span className="detail-label">Duration</span>
          <span className="detail-icon">⏳</span>
          <span className="detail-value">{duration}</span>
        </div>
        <div className="detail">
          <span className="detail-label">Date</span>
          <span className="detail-icon">📅</span>
          <span className="detail-value">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default function QuizResult() {
  const [loading, setLoading] = useState(true);
  const [quizResults, setQuizResults] = useState([]);
  const { userId } = useUser();

  useEffect(() => {
    const fetchQuizResults = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/quiz/results/${userId}`);
        console.log('Quiz results:', response.data);

        // Group results by attempt number
        const groupedResults = response.data.results.reduce((acc, result) => {
          if (!acc[result.attempt]) {
            acc[result.attempt] = [];
          }
          acc[result.attempt].push(result);
          return acc;
        }, {});

        // Combine sections for each attempt
        const combinedResults = Object.entries(groupedResults).map(([attempt, results]) => {
          const totalCorrect = results.reduce((sum, r) => sum + r.correctAnswers, 0);
          const totalQuestions = results.reduce((sum, r) => sum + r.totalQuestions, 0);
          const totalTime = results.reduce((sum, r) => sum + r.totalTime, 0);
          // Use the latest date among the sections
          const dateAttempted = results.reduce((latest, r) => 
            new Date(r.dateAttempted) > new Date(latest) ? r.dateAttempted : latest, 
            results[0].dateAttempted
          );

          return {
            attempt: parseInt(attempt),
            correctAnswers: totalCorrect,
            totalQuestions,
            totalTime,
            dateAttempted
          };
        });

        setQuizResults(combinedResults);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz results:', error);
        setLoading(false);
      }
    };

    if (userId) {
      fetchQuizResults();
    }
  }, [userId]);

  if (loading) {
    return <Loader />;
  }

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
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
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
          {quizResults.map((result) => (
            <AttemptCard 
              key={`attempt-${result.attempt}`}
              {...result}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
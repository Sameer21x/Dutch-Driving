import React, { useState } from 'react';
import quizimage from '../../assets/imgs/quizqna.png'
import timer from '../../assets/icons/timer.png'
import './QuizQuestion.css';

export default function QuizQuestion() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const correctAnswer = 1; // Assuming the second option is correct

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
  };

  const getAnswerClass = (index) => {
    if (selectedAnswer === null) return '';
    if (index === correctAnswer) return 'correct';
    if (index === selectedAnswer) return 'incorrect';
    return '';
  };

  return (
    <div className="quiz-question-page">
      <div className="progress-bar">
        <div className="progress" style={{ width: '37%' }}></div>
      </div>
      <div className="question-counter">24/65</div>

      <div className="section-title">
        Section A(Hazard Perception)
      </div>

      <div className="question-container">
        <h2 className="question">
          What does this sign indicate about pedestrian and cyclist crossings?
        </h2>
        <div className="question-image">
          <img src={quizimage} alt="Road sign for pedestrian and cyclist crossing" />
          <div className="question-hint">
            <img src={timer} alt="Hint icon" className="hint-icon" />
          </div>
        </div>
      </div>

      <div className="answer-options">
        <button 
          className={`answer-option ${getAnswerClass(0)}`}
          onClick={() => handleAnswerSelect(0)}
        >
          Cyclists must dismount and walk across the crossing
        </button>
        <button 
          className={`answer-option ${getAnswerClass(1)}`}
          onClick={() => handleAnswerSelect(1)}
        >
          Pedestrian crossing ahead, cyclists beware
        </button>
        <button 
          className={`answer-option ${getAnswerClass(2)}`}
          onClick={() => handleAnswerSelect(2)}
        >
          Cyclists have priority over pedestrians
        </button>
        <button 
          className={`answer-option ${getAnswerClass(3)}`}
          onClick={() => handleAnswerSelect(3)}
        >
          No cycling allowed in this area
        </button>
      </div>

      <div className="navigation-buttons">
        <button className="nav-button go-back">Go Back</button>
        <button className="nav-button next">Next</button>
      </div>
    </div>
  );
}
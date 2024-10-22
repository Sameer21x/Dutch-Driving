import React, { useState } from 'react';
import '../LessonsQuestionsPage/LessonQuestions.css';
import questionsimage from '../../assets/imgs/lessonqna.png'
import explainicon from '../../assets/icons/explainicon.png'



export default function LessonQuestions() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    // Assume the correct answer is index 0 for this example
    setIsCorrect(index === 0);
  };

  const getAnswerClass = (index) => {
    if (selectedAnswer === index) {
      return isCorrect ? 'correct' : 'incorrect';
    }
    return '';
  };

  return (
    <div className="lesson-question-page">
      <div className="progress-bar">
        <div className="progress" style={{ width: '1%' }}></div>
      </div>
      <div className="question-counter">1/100</div>

      <div className="question-container">
        <h2 className="question">
          When skidding, if the rear end of the car is skidding to the right, turn your wheel to the:
        </h2>
        <div className="question-image">
          <img src={questionsimage} alt="Car skidding illustration" />
          <div className="question-hint">
            <img src={explainicon} alt="Hint icon" className="hint-icon" />
            <span className="hint-count">1</span>
          </div>
        </div>
      </div>

      <div className="answer-options">
        <button 
          className={`answer-option ${getAnswerClass(0)}`}
          onClick={() => handleAnswerSelect(0)}
        >
          Slowly and safely accelerate while steering in the direction of the skid
        </button>
        <button 
          className={`answer-option ${getAnswerClass(1)}`}
          onClick={() => handleAnswerSelect(1)}
        >
          Turn your front wheels in the same direction that the rear of the vehicle is sliding
        </button>
        <button 
          className={`answer-option ${getAnswerClass(2)}`}
          onClick={() => handleAnswerSelect(2)}
        >
          If your car does start to skid, take your foot off the gas, keep both hands on the wheel
        </button>
        <button 
          className={`answer-option ${getAnswerClass(3)}`}
          onClick={() => handleAnswerSelect(3)}
        >
          Brake hard and turn the steering wheel in the opposite direction of the skid
        </button>
      </div>

      <div className="navigation-buttons">
        <div className="button-row">
          <button className="nav-button-back">Go Back</button>
          <button className="nav-button">Next</button>
        </div>
        <div className="button-row">
          <button className="nav-button-skip">Skip Question</button>
          <button className="nav-button-save">Save Progress</button>
        </div>
      </div>
    </div>
  );
}
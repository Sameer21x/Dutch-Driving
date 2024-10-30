import React, { useState, useEffect } from 'react';
import '../LessonsQuestionsPage/LessonQuestions.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Loader from '../../Components/Loader';
import questionsimage from '../../assets/imgs/lessonqna.png';
import explainicon from '../../assets/icons/explainicon.png';
import { BaseUrl } from '../../Constants/Constant';

export default function LessonQuestions() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { state } = useLocation();
  const { lessonId } = state || {};

  useEffect(() => {
    if (lessonId) {
      axios.get(`${BaseUrl}/lessons/${lessonId}/questions`)
        .then(response => {
          setQuestions(response.data.questions);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching questions:", error);
          setLoading(false);
        });
    }
  }, [lessonId]);

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    setIsCorrect(questions[currentQuestionIndex].answerOptions[index].isCorrect);
  };

  const getAnswerClass = (index) => {
    if (selectedAnswer === index) {
      return isCorrect ? 'correct' : 'incorrect';
    }
    return '';
  };

  const handleNext = () => {
    if (selectedAnswer !== null && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };

  const handleGoBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };

  if (loading) return <Loader />;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="lesson-question-page">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
      </div>
      <div className="question-counter">{currentQuestionIndex + 1}/{questions.length}</div>

      <div className="question-container">
        <h2 className="question">{currentQuestion.questionText}</h2>
        <div className="question-image">
          <img src={currentQuestion.questionImage || questionsimage} alt="Question illustration" />
          <div className="question-hint">
            <img src={explainicon} alt="Hint icon" className="hint-icon" />
            <span className="hint-count">1</span>
          </div>
        </div>
      </div>

      <div className="answer-options">
        {currentQuestion.answerOptions.map((option, index) => (
          <button
            key={option._id}
            className={`answer-option ${getAnswerClass(index)}`}
            onClick={() => handleAnswerSelect(index)}
          >
            {option.optionText}
          </button>
        ))}
      </div>

      <div className="navigation-buttons">
        <div className="button-row">
          <button className="nav-button-back" onClick={handleGoBack} disabled={currentQuestionIndex === 0}>Go Back</button>
          <button className="nav-button" onClick={handleNext} disabled={selectedAnswer === null || currentQuestionIndex === questions.length - 1}>Next</button>
        </div>
        <div className="button-row">
          <button className="nav-button-skip" onClick={handleSkip} disabled={currentQuestionIndex === questions.length - 1}>Skip Question</button>
          <button className="nav-button-save">Save Progress</button>
        </div>
      </div>
    </div>
  );
}

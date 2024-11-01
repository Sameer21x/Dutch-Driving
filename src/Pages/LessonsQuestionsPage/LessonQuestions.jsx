import React, { useState, useEffect } from 'react';
import '../LessonsQuestionsPage/LessonQuestions.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../Components/Loader';
import Swal from 'sweetalert2';
import questionsimage from '../../assets/imgs/lessonqna.png';
import explainicon from '../../assets/icons/explainicon.png';
import { BaseUrl } from '../../Constants/Constant';
import { useUser } from '../../UserContext';


export default function LessonQuestions() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { userId } = useUser();
  
  const { state } = useLocation();
  const { lessonId } = state || {}; 
  const navigate = useNavigate();
  
  useEffect(() => {
    if (lessonId && userId) {
      loadUserProgressAndQuestions();
    }
  }, [lessonId, userId]);

  const loadUserProgressAndQuestions = async () => {
    setLoading(true);
    try {
      // First, get all questions for the lesson
      const questionsResponse = await axios.get(`${BaseUrl}/lessons/${lessonId}/questions`);
      const allQuestions = questionsResponse.data.questions;

      // Then, get the user's progress
      const progressResponse = await axios.get(`${BaseUrl}/lessons/progress`, {
        params: { userId, lessonId }
      });

      if (progressResponse.data && progressResponse.data.completedQuestions) {
        setCurrentQuestionIndex(progressResponse.data.completedQuestions.length);
      }

      setQuestions(allQuestions);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions and progress:", error);
      setLoading(false);
    }
  };

  const handleAnswerSelect = (index) => {
    if (currentQuestion && currentQuestion.answerOptions) {
      setSelectedAnswer(index);
      setIsCorrect(currentQuestion.answerOptions[index].isCorrect);
    }
  };

  const getAnswerClass = (index) => {
    if (selectedAnswer === index) {
      return isCorrect ? 'correct' : 'incorrect';
    }
    return '';
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        // All questions completed
        handleSaveProgress(true);
      }
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

  const handleSaveProgress = (isCompleted = false) => {
    console.log("Saving progress...");
    console.log("UserId:", userId, "LessonId:", lessonId, "Completed Questions:", currentQuestionIndex + 1);
    
    setSaving(true);
    
    axios.post(`${BaseUrl}/lessons/progress`, {
      userId,
      lessonId,
      completedQuestions: currentQuestionIndex + 1,
    })
    .then(() => {
      setSaving(false);
      if (isCompleted) {
        Swal.fire({
          icon: 'success',
          title: 'Lesson Completed!',
          text: `You successfully completed Lesson ${lessonId}`,
          confirmButtonText: 'Go to All Lessons'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/alllessons');
          }
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Progress Saved',
          text: 'Your progress has been saved successfully!',
        });
      }
    })
    .catch(error => {
      setSaving(false);
      console.error("Error saving progress:", error?.response || error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save progress. Please try again.',
      });
    });
  };

  if (loading || saving) return <Loader />;

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div className="lesson-question-page">
        <h2>No questions available for this lesson.</h2>
      </div>
    );
  }

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
        {currentQuestion.answerOptions && currentQuestion.answerOptions.map((option, index) => (
          <button
            key={option._id || index}
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
          <button className="nav-button" onClick={handleNext} disabled={selectedAnswer === null}>
            {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
        <div className="button-row">
          <button className="nav-button-skip" onClick={handleSkip} disabled={currentQuestionIndex === questions.length - 1}>Skip Question</button>
          <button className="nav-button-save" onClick={() => handleSaveProgress(false)}>Save Progress</button>
        </div>
      </div>
    </div>
  );
}
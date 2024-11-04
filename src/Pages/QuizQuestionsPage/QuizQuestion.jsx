import React, { useState, useEffect } from 'react';
import axios from 'axios';
import quizimage from '../../assets/imgs/quizqna.png';
import './QuizQuestion.css';
import Loader from '../../Components/Loader';
import Countdown from 'react-countdown';
import Swal from 'sweetalert2';
import { BaseUrl } from '../../Constants/Constant';
import { useUser } from '../../UserContext';
import { useNavigate } from 'react-router-dom';

export default function QuizQuestion() {
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [section, setSection] = useState('A');
  const [timeLimit, setTimeLimit] = useState(480);
  const [answers, setAnswers] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(true);
  const [isModalActive, setIsModalActive] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [cumulativeScore, setCumulativeScore] = useState({ correct: 0, total: 0, totalTime: 0 });

  const { userId } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizData();
  }, [section]);

  useEffect(() => {
    if (currentQuestionIndex === quizData?.questions.length && quizData) {
      showSubmitModal();
    }
  }, [currentQuestionIndex, quizData]);
  

  const fetchQuizData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BaseUrl}/quiz/${section}/questions`);
      console.log('Quiz Data:', response.data.quiz);
      setQuizData(response.data.quiz);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setAnswers([]);
      setTimeRemaining(true);
      setIsModalActive(false);
      setStartTime(Date.now());

      setTimeLimit(section === 'C' ? 1440 : 480);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      setLoading(false);
    }
  };

  const handleAnswerSelect = (index) => {
    const currentQuestion = quizData.questions[currentQuestionIndex];
    const selectedOption = currentQuestion.answerOptions[index];
    
    console.log('Selected Answer:', {
      questionId: currentQuestion._id,
      selectedOption: selectedOption.optionText,
      isCorrect: selectedOption.isCorrect
    });
    
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const currentQuestion = quizData.questions[currentQuestionIndex];
      const selectedOption = currentQuestion.answerOptions[selectedAnswer];
  
      const newAnswer = {
        _id: currentQuestion._id,
        selectedOption: selectedOption.optionText,
        isCorrect: selectedOption.isCorrect
      };
  
      console.log('Adding answer:', newAnswer);
  
      // Use a functional update to ensure the previous state is used correctly
      setAnswers(prevAnswers => [...prevAnswers, newAnswer]);
    }
  
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      showSubmitModal();
    }
  };
  

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const previousAnswer = answers[currentQuestionIndex - 1];
      if (previousAnswer) {
        const currentQuestion = quizData.questions[currentQuestionIndex - 1];
        const answerIndex = currentQuestion.answerOptions.findIndex(
          option => option.optionText === previousAnswer.selectedOption
        );
        setSelectedAnswer(answerIndex);
      } else {
        setSelectedAnswer(null);
      }
    }
  };

  const submitSection = async () => {
    try {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  
      // Ensure we're using the most up-to-date answers state
      setAnswers((prevAnswers) => {
        const formattedAnswers = prevAnswers.map(({ _id, selectedOption }) => ({
          _id,
          selectedOption
        }));
  
        console.log('Formatted answers:', formattedAnswers);
  
        console.log('Submitting answers:', {
          userId,
          section,
          answers: formattedAnswers,
          totalTime: elapsedTime
        });
  
        axios.post(`${BaseUrl}/quiz/submit`, {
          userId,
          section,
          answers: formattedAnswers,
          totalTime: elapsedTime
        }).then(response => {
          console.log('Submit response:', response.data);
  
          const correctCount = prevAnswers.filter(answer => answer.isCorrect).length;
          console.log('Locally calculated correct answers:', correctCount);
  
          setCumulativeScore(prevScore => ({
            correct: prevScore.correct + response.data.result.correctAnswers,
            total: prevScore.total + response.data.result.totalQuestions,
            totalTime: prevScore.totalTime + elapsedTime
          }));
  
          if (section === 'C') {
            showFinalModal();
          } else {
            setSection(String.fromCharCode(section.charCodeAt(0) + 1));
          }
        }).catch(error => {
          console.error("Error submitting quiz section:", error);
          Swal.fire({
            icon: 'error',
            title: 'Submission Error',
            text: 'There was an error submitting your quiz. Please try again.',
          });
        });
  
        return prevAnswers; // Return the state as it was to avoid overwriting
      });
    } catch (error) {
      console.error("Error preparing for quiz submission:", error);
    }
  };

  const showSubmitModal = () => {
    setIsModalActive(true);
    Swal.fire({
      title: `You have completed Section ${section}`,
      text: `Click "Submit and Continue" to move on to the next section or "Go Back" to review your answers.`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Submit and Continue',
      cancelButtonText: 'Go Back'
    }).then((result) => {
      setIsModalActive(false);
      if (result.isConfirmed) {
        submitSection();
      }
    });
  };

  const showFinalModal = () => {
    const { correct, total, totalTime } = cumulativeScore;
    const score = total > 0 ? (correct / total * 100).toFixed(2) : 0;
    const timeString = new Date(totalTime * 1000).toISOString().substr(11, 8);

    Swal.fire({
      title: 'Congratulations!',
      text: 'You have completed the quiz.',
      icon: 'success',
      html: `
        <div>
          <div style="font-size: 24px; font-weight: bold;">${score}%</div>
          <div style="margin-top: 10px;">Score: ${correct}/${total}</div>
          <div>Time: ${timeString}</div>
        </div>
      `,
      confirmButtonText: 'Go Home',
      cancelButtonText: 'Attempt Again',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/userprofile');
      } else {
        setSection('A');
        setCumulativeScore({ correct: 0, total: 0, totalTime: 0 });
        fetchQuizData();
      }
    });
  };

  const countdownRenderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      setTimeRemaining(false);
      showSubmitModal();
      return null;
    } else {
      return <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>;
    }
  };

  if (loading) {
    return <Loader />;
  }

  const { questions, sectionName } = quizData;
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-question-page">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(currentQuestionIndex + 1) / questions.length * 100}%` }}></div>
      </div>
      <div className="question-counter">{currentQuestionIndex + 1}/{questions.length}</div>

      <div className="section-title">
        Section {section} ({sectionName})
      </div>

      <div className="timer">
        {isModalActive ? null : <Countdown date={Date.now() + timeLimit * 1000} renderer={countdownRenderer} />}
      </div>

      <div className="question-container">
        <h2 className="question">
          {currentQuestion.questionText}
        </h2>
        <div className="question-image">
          {currentQuestion.questionImage ? (
            <img src={currentQuestion.questionImage} alt="Question related visual" />
          ) : (
            <img src={quizimage} alt="Default quiz visual" />
          )}
        </div>
      </div>

      <div className="answer-options">
        {currentQuestion.answerOptions.map((option, index) => (
          <button
            key={option._id}
            className={`answer-option ${selectedAnswer === index ? 'selected' : ''}`}
            onClick={() => handleAnswerSelect(index)}
            disabled={!timeRemaining}
          >
            {option.optionText}
          </button>
        ))}
      </div>

      <div className="navigation-buttons">
        <button className="nav-button go-back" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0 || !timeRemaining}>
          Go Back
        </button>
        <button className="nav-button next" onClick={handleNextQuestion} disabled={!timeRemaining}>
          {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
}
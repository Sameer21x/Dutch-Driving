import React, { useState, useEffect, useRef } from 'react';
import '../LessonsQuestionsPage/LessonQuestions.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../Components/Loader';
import Swal from 'sweetalert2';
import questionsimage from '../../assets/imgs/lessonqna.png';
import explainicon from '../../assets/icons/explainicon.png';
import { BaseUrl } from '../../Constants/Constant';
import { useUser } from '../../UserContext';
import { Pause, Play } from 'lucide-react';

export default function LessonQuestions() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [completedOnce, setCompletedOnce] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);

  const { userId } = useUser();
  const audioRef = useRef(new Audio());
  
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
      const questionsResponse = await axios.get(`${BaseUrl}/lessons/${lessonId}/questions`);
      const allQuestions = questionsResponse.data.questions;
      console.log(allQuestions[0].explanationAudio, "Explanation audio of the first question");      

      const progressResponse = await axios.get(`${BaseUrl}/lessons/progress`, {
        params: { userId, lessonId }
      });

      if (progressResponse.data && progressResponse.data.completedQuestions) {
        const completedCount = progressResponse.data.completedQuestions.length;
        if (completedCount >= allQuestions.length) {
          setCompletedOnce(true);
          setCurrentQuestionIndex(0);
        } else {
          setCurrentQuestionIndex(completedCount);
        }
      }

      setQuestions(allQuestions);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions and progress:", error);
      setLoading(false);
    }
  };

  const handleExplanationClick = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion?.explanationAudio) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current.src !== currentQuestion.explanationAudio) {
        audioRef.current.src = currentQuestion.explanationAudio;
        audioRef.current.load();
      }
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setAudioProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleLoadedMetadata = () => {
      setAudioDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setAudioProgress(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    setIsPlaying(false);
    setAudioProgress(0);
    
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion?.explanationAudio) {
      audio.src = currentQuestion.explanationAudio;
      audio.load();
    }

    return () => {
      audio.pause();
    };
  }, [currentQuestionIndex, questions]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (index) => {
    const currentQuestion = questions[currentQuestionIndex];
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
          confirmButtonText: 'Go to All Lessons',
          showCancelButton: true,
          cancelButtonText: 'Attempt Again'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/alllessons');
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            setCurrentQuestionIndex(0);
            setSelectedAnswer(null);
            setIsCorrect(null);
            setCompletedOnce(true);
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
        <h2>Error: Unable to load questions. Please try again later.</h2>
      </div>
    );
  }

  return (
    <div className="lesson-question-page">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
      </div>
      <div className="question-counter">
        {currentQuestionIndex + 1}/{questions.length}
        {completedOnce && <span className="completed-badge"></span>}
      </div>

      <div className="question-container">
        <h2 className="question">{currentQuestion.questionText}</h2>
        <div className="question-image">
          <img src={currentQuestion.questionImage || questionsimage} alt="Question illustration" />
          <div className="question-hint" onClick={handleExplanationClick}>
            <img src={explainicon} alt="Hint icon" className="hint-icon" />
            <span className="hint-count">1</span>
            {currentQuestion.explanationAudio && (
              <div className={`audio-progress ${isPlaying ? 'playing' : ''}`}>
                <div className="audio-progress-bar">
                  <div 
                    className="audio-progress-fill" 
                    style={{ width: `${audioProgress}%` }}
                  />
                </div>
                <div className="audio-time">
                  {formatTime(audioDuration * (audioProgress / 100))} / {formatTime(audioDuration)}
                </div>
                <span className="audio-icon">
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </span>
              </div>
            )}
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
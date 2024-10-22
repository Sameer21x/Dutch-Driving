import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/LoginPage/Login';
import Signup from './Pages/SignUpPage/Signup';
import OTP from './Pages/OTP-Page/Otp';
import Contactus from './Pages/ContactUs/Contactus';
import MembershipPlan from './Pages/MembershipPage/MembershipPlan';
import UserProfile from './Pages/User-ProfilePage/UserProfile';
import AllLessons from './Pages/LessonsPage/AllLessons';
import LessonQuestions from './Pages/LessonsQuestionsPage/LessonQuestions';
import TermsAndConditions from './Pages/Terms&Conditions/TermsAndConditions';
import QuizResult from './Pages/QuizResultPage/QuizResult';
import QuizQuestion from './Pages/QuizQuestionsPage/QuizQuestion';
import './App.css';  // Import your CSS file

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<OTP />} />
          <Route path='/Contactus' element={<Contactus />} />
          <Route path='/MembershipPlan' element={<MembershipPlan />} />
          <Route path='/userprofile' element={<UserProfile />} />
          <Route path='/AllLessons' element={<AllLessons />} />
          <Route path='/Lessonqna' element={<LessonQuestions />} />
          <Route path='/Quizqna' element={<QuizQuestion />} />
          <Route path='/TermsAndConditions' element={<TermsAndConditions />} />
          <Route path='/QuizResult' element={<QuizResult />} />







        </Routes>
      </Router>
    </div>
  );
}

export default App;

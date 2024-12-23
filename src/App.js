import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/LoginPage/Login';
import Signup from './Pages/SignUpPage/Signup';
import OTP from './Pages/OTP-Page/Otp';
import MembershipPlan from './Pages/MembershipPage/MembershipPlan';
import UserProfile from './Pages/User-ProfilePage/UserProfile';
import AllLessons from './Pages/LessonsPage/AllLessons';
import LessonQuestions from './Pages/LessonsQuestionsPage/LessonQuestions';
import TermsAndConditions from './Pages/Terms&Conditions/TermsAndConditions';
import QuizResult from './Pages/QuizResultPage/QuizResult';
import QuizQuestion from './Pages/QuizQuestionsPage/QuizQuestion';
import AccountSettings from './Pages/Accountsettings/Accountsetting';
import Aboutus from './Pages/AboutUs/About';
import Help from './Pages/Help & Support/Help';
import Payment from './Pages/Payment Failed/Payment';
import UserGuide from './Pages/User Guide/UserGuide';
import './App.css';  // Import your CSS file
import { UserProvider } from './UserContext';

function App() {
  return (
    <div className="App">
      <UserProvider>
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<OTP />} />
          <Route path='/membershipplan' element={<MembershipPlan />} />
          <Route path='/userprofile' element={<UserProfile />} />
          <Route path='/alllessons' element={<AllLessons />} />
          <Route path='/lessonqna' element={<LessonQuestions />} />
          <Route path='/quizqna' element={<QuizQuestion />} />
          <Route path='/termsandconditions' element={<TermsAndConditions />} />
          <Route path='/quizresult' element={<QuizResult />} />
          <Route path='/accsettings' element={<AccountSettings />} />
          <Route path='/aboutus' element={<Aboutus />} />
          <Route path='/help' element={<Help />} />
          <Route path='/userguide' element={<UserGuide />} />
          <Route path='/paymentfailed' element={<Payment />} />











        </Routes>
      </Router>
      </UserProvider>
    </div>
  );
}

export default App;

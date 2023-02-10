import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import CreateAccountPage from "./components/CreateAccountPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import NewPasswordPage from "./components/NewPasswordPage";

function App() {

  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/register' element={<CreateAccountPage />} />
      <Route path='/forgot-password' element={<ForgotPasswordPage />} />
      <Route path='/enter-new-password' element={<NewPasswordPage />} />
    </Routes>
  );
}

export default App;

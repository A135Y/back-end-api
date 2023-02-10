import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateAccountPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // logic for logging in
    // ...

    // redirect to home page after successful login
    navigate("/");
  };

  return (
    <div className="create-account-container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
          <Link to="/register">Create an account?</Link>
        </div>
        <div className="form-group">
          <Link to="/forgot-password" >Forgot password?</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
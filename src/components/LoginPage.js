import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Page.css";
import GoogleSignIn from "./GoogleSignIn"

const LoginPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setErrorMessage(null);
  }, [usernameOrEmail, password]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // create a data object with the form inputs
      const data = { usernameOrEmail, password };

      // send the data to the server
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // handle the response from the server
      if (!response.ok) {
        const result = await response.json();
        setErrorMessage(result.error);
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-account-container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="form-group">
          <label htmlFor="usernameOrEmail">Username or Email:</label>
          <input
            type="text"
            id="usernameOrEmail"
            value={usernameOrEmail}
            onChange={(event) => setUsernameOrEmail(event.target.value)}
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
        {errorMessage && (
          <div style={{ backgroundColor: "red" }}>
            {errorMessage}
          </div>
        )}
        <div className="form-group">
          <button type="submit">Submit</button>
          <Link to="/register">Create an account?</Link>
        </div>
        <div className="form-group">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
        {/* <GoogleSignIn /> */}
      </form>
    </div>
  );
};


export default LoginPage
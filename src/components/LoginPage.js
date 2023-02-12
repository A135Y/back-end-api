import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Page.css";
import GoogleSignIn from "./GoogleSignIn"

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    // create a data object with the form inputs
    const data = { username, password };

    // send the data to the server
    try {
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);
      navigate("/home")
    } catch (error) {
      console.error(error);
    }
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
        {/* <GoogleSignIn /> */}
      </form>
    </div>
  );
};

export default LoginPage;
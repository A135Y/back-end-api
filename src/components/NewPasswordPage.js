import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateAccountPage.css";

const ForgotPasswordPage = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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
                <h1>Enter A New Password</h1>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="text"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Confirm Password:</label>
                    <input
                        type="text"
                        id="password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default ForgotPasswordPage;
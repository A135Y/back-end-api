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
        navigate("/enter-new-password");
    };

    return (
        <div className="create-account-container">
            <form onSubmit={handleSubmit}>
                <h1>Forgot Password</h1>
                <div className="form-group">
                    <label htmlFor="password">Username or Email:</label>
                    <input
                        type="text"
                        id="email"
                        value={usernameOrEmail}
                        onChange={(event) => setUsernameOrEmail(event.target.value)}
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
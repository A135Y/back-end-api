import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Page.css";
import { useLocation } from "react-router-dom";

const NewPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const email = new URLSearchParams(location.search).get("email");
    // Rest of the code remains the same

    const handleSubmit = async (event) => {
        event.preventDefault();
        // create a data object with the form inputs and email
        const data = { email, password, confirmPassword };

        // send the data to the server
        try {
            const response = await fetch(`http://localhost:3000/enter-new-password?email=${email}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const result = await response.json();
                setErrorMessage(result.error);
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error(error);
        }
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
                <div className="error-container" style={{ display: errorMessage ? 'block' : 'none' }}>
                    <p className="error-message" style={{ backgroundColor: 'red', color: 'white', padding: '10px', textAlign: 'center' }}>
                        {errorMessage}
                    </p>
                </div>
            </form>
        </div>
    );
};

export default NewPasswordPage;
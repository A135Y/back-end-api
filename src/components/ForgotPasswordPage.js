import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Page.css";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);


    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // create a data object with the form inputs
            const data = { email };

            // send the data to the server
            const response = await fetch("http://localhost:3000/forgot-password", {
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
                navigate(`/enter-new-password?email=${encodeURIComponent(email)}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="create-account-container">
            <form onSubmit={handleSubmit}>
                <h1>Forgot Password?</h1>
                <div className="form-group">
                    <label htmlFor="password">Email:</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Submit</button>
                </div>
                {errorMessage && (
                    <div style={{ backgroundColor: "red" }}>
                        {errorMessage}
                    </div>
                )}
            </form>
        </div>
    );
};

export default ForgotPasswordPage;
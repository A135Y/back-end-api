import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Page.css";

const CreateAccountPage = () => {
    const [username, setUsername] = useState("");
    const [firstname, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [avatar, setAvatar] = useState(null);

    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        // create a data object with the form inputs
        const data = { username, firstname, surname, dateOfBirth, password, email, avatar };

        // send the data to the server
        try {
            const response = await fetch("http://localhost:3000/register", {
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
            <form onSubmit={handleSubmit} >
                <h1>Create an Account</h1>
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
                    <label htmlFor="firstname">First-Name:</label>
                    <input
                        type="text"
                        id="firstname"
                        value={firstname}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Surname:</label>
                    <input
                        type="text"
                        id="surname"
                        value={surname}
                        onChange={(event) => setSurname(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor

                        ="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dob">Date of Birth:</label>
                    <input
                        type="date"
                        id="dob"
                        value={dateOfBirth}
                        onChange={(event) => setDateOfBirth(event.target.value)}
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
                    <label htmlFor="avatar">Avatar:</label>
                    <input
                        type="file"
                        id="avatar"
                        onChange={(event) => {
                            const file = event.target.files[0];
                            setAvatar(URL.createObjectURL(file));
                        }}
                    />
                </div>
                <button type="submit" >Create Account</button>
                <div className="error-container" style={{ display: errorMessage ? 'block' : 'none' }}>
                    <p className="error-message" style={{ backgroundColor: 'red', color: 'white', padding: '10px', textAlign: 'center' }}>
                        {errorMessage}
                    </p>
                </div>
            </form>
        </div>
    );
}

export default CreateAccountPage


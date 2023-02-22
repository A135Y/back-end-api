import React, { useState, useEffect, handleChange } from "react";
import { useNavigate } from "react-router-dom"; import './HomePage.css';
import localStorage from "localStorage";
import { Avatar } from "antd";


const Homepage = () => {

    const [username, setUsername] = useState();
    const [avatar, setAvatar] = useState("");
    const navigate = useNavigate();
    const [selectedTopic, setSelectedTopic] = useState("Home");

    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await fetch("http://localhost:3000/home", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    const { user } = data;
                    setUsername(user.username);
                    setAvatar(user.avatar);
                }
            };
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleTopicChange = (event) => {
        setSelectedTopic(event.target.value);
        navigate(`/blog/${event.target.value}`);
    };

    const onClick = (event) => {
        event.preventDefault();
        navigate("/profile-page");
    };

    return (
        <div className="homepage">
            <header className="header">
                <div className="header__logo">Back-End API</div>
                <nav className="header__nav">
                    <a href="#" className="header__nav-link" style={{ marginRight: '100px' }}>Home</a>
                    <div className="header__dropdown" style={{ marginRight: '100px' }}>
                        <button className="header__dropdown-btn" style={{ marginRight: '100px' }}>Topics</button>
                        <div className="header__dropdown-content">
                            <a href="#">Software Development Life Cycle</a>
                            <a href="#">OAuth</a>
                            <a href="#">Bcrypt</a>
                            <a href="#">Hashing</a>
                            <a href="#">JWT Tokens</a>
                        </div>
                    </div>
                    <input
                        className="search"
                        type="text"
                        // onChange={onChange}
                        placeholder="Search by the title ..."
                    />
                    <div className="header__user-photo" style={{ marginRight: '100px' }}>
                        <Avatar
                            className="avatar"
                            src={avatar}
                            onClick={onClick}
                        />
                        <p style={{ marginLeft: '20px' }}>{username}</p>
                    </div>
                </nav>
            </header>
            <main>
                <h2>API Integration and Backend Development</h2>
                <p className="homepage-intro">
                    APIs (Application Programming Interfaces) allow applications to communicate with each other and share data. In backend development, we work on building the server-side of an application and managing the data.
                </p>

                <div className="homepage-section">
                    <div className="homepage-section__item">
                        <h3>Software Development Life Cycle (SDLC)</h3>
                        <p>
                            The SDLC is a systematic approach to software development, covering the planning, design, development, testing, and maintenance phases of an application. In the backend development process, we take care of the development and testing phases.
                        </p>
                        <img src="https://bigwater.consulting/wp-content/uploads/2019/04/SDLC_BWC.png" alt="SDLC" />
                    </div>

                    <div className="homepage-section__item">
                        <h3>OAuth</h3>
                        <p>
                            OAuth is an open standard for authorization, allowing users to share their private resources stored on one site with another site without exposing their credentials. It's commonly used for authentication in web applications.
                        </p>
                        <img src="https://supertokens.com/covers/auth_comparison_header.png" alt="OAuth" />
                    </div>

                    <div className="homepage-section__item">
                        <h3>Bcrypt</h3>
                        <p>
                            Bcrypt is a password hashing function designed to be secure and slow. It's used to store passwords securely in a database, making it more difficult for attackers to access the passwords if the database is compromised.
                        </p>
                        <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--t6BmEVLk--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/bv47cvavn5egi1fmjp72.png" alt="Bcrypt" />
                    </div>

                    <div className="homepage-section__item">
                        <h3>Hashing</h3>
                        <p>
                            Hashing is the process of converting input data into a fixed-length, non-readable string of text. It's used in cryptography for digital signatures and data integrity, and for generating unique IDs for data structures like dictionaries and hash tables.
                        </p>
                        <img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*VDRVI-0EfU2v7c43k9IIeA.png" alt="Hashing" />
                    </div>

                    <div className="homepage-section__item">
                        <h3>JWT Tokens</h3>
                        <p>
                            JWT (JSON Web Tokens) are a compact, URL-safe means of representing claims to be transferred between two parties. They are commonly used for authentication in web applications and API authentication.
                        </p>
                        <img src="https://www.appknox.com/hs-fs/hubfs/JWT.jpg?width=1999&name=JWT.jpg" alt="JWT Tokens" />
                    </div>
                </div>
            </main>
            <footer className="footer">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Use</a>
                <a href="#">Contact</a>
            </footer>
        </div>
    );

}
export default Homepage;
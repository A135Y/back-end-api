import React, { useState, useEffect } from "react";
import { Typography, Avatar, Divider, Input } from "antd";
import { UploadOutlined } from '@ant-design/icons';

import "./ProfilePage.css"

const { Title } = Typography;

const ProfilePage = () => {
    const [user, setUser] = useState({});
    const [username, setUsername] = useState("");
    const [firstname, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [avatar, setAvatar] = useState(null);
    // const [likedBlogs, setLikedBlogs] = useState([]);



    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await fetch("http://localhost:3000/profile-page", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    const { user } = data;
                    setUser(user);
                    setAvatar(user.avatar)
                    // setLikedBlogs(data.likedBlogs);

                }
            };
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/profile-page", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    username,
                    firstname,
                    surname,
                    email,
                    dateOfBirth,
                    password,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                setErrorMessage("");
            } else {
                const error = await response.json();
                setErrorMessage(error.message);
            }
        } catch (error) {
            console.log(error);
        }
    };


    const handleChangePassword = () => {
        // Add API call to change password here
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        console.log(URL.createObjectURL(file))
        setAvatar(URL.createObjectURL(file));
    };

    return (
        <div className="root">
            <div className="profile">
                <div className="avatar-container">
                    <Avatar
                        className="avatar"
                        src={avatar}
                        alt="https://wallpapers.com/images/featured/4co57dtwk64fb7lv.jpg"
                    />
                </div>
                <div className="upload-icon-container">
                    <input
                        type="file"
                        id='avatar'
                        onChange={handleAvatarChange}
                    />
                </div>
                <div className="info">
                    <Title level={4} className="name">
                        {user.firstname} {user.surname}
                    </Title>
                </div>
            </div>
            <Divider className="divider" />
            <form className="form">
                <div className="inputContainer">
                    <Input
                        id="firstName"
                        placeholder={user.firstname || "First Name"}
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="input"
                    />
                    <Input
                        id="lastName"
                        placeholder={user.surname || "Last Name"}
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        className="input"
                    />
                    <Input
                        id="username"
                        placeholder={user.username || "Username"}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input"
                    />
                    <Input
                        id="email"
                        placeholder={user.email || "Email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                    />
                    <Input
                        id="dateOfBirth"
                        placeholder={user.dateOfBirth || "Date of Birth"}
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        className="input"
                    />
                    <Input.Password
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="passwordInput"
                    />
                    <Input.Password
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="passwordInput"
                    />
                    <button className="submitButton" type="submit" onSubmit={handleSubmit}>
                        Submit
                    </button>
                    <div className="my-blogs">
                        <Title level={3}>My Blogs</Title>
                        {/* {likedBlogs.map((blog) => (
                            <div key={blog.id}>
                                <Title level={4}>{blog.title}</Title>
                                <p>Author: {blog.author}</p>
                                <p>{blog.abstract}</p>
                            </div>
                        ))} */}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProfilePage;
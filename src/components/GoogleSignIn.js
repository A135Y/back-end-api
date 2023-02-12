import React, { useState, useEffect } from 'react';
// require('dotenv').config();

const GoogleSignIn = () => {
    const [user, setUser] = useState(null);
    const { GOOGLE_CLIENT_ID, PROFILE_EMAIL } = process.env


    useEffect(() => {
        window.gapi.load('auth2', () => {
            window.gapi.auth2
                .init({
                    client_id: GOOGLE_CLIENT_ID,
                    scope: PROFILE_EMAIL
                })
                .then(authInstance => {
                    setUser(authInstance.currentUser.get());
                });
        });
    }, []);


    const onSuccess = (googleUser) => {
        console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    };

    const onFailure = (error) => {
        console.log(error);
    };

    const handleSignIn = () => {
        const authInstance = window.gapi.auth2.getAuthInstance();
        authInstance.signIn().then(() => {
            setUser(authInstance.currentUser.get());
        });
    };

    const handleSignOut = () => {
        const authInstance = window.gapi.auth2.getAuthInstance();
        authInstance.signOut().then(() => {
            setUser(null);
        });
    };

    return (
        <div>
            <div id="my-signin2"></div>
            <script>
                function renderButton() {
                    window.gapi.signin2.render("my-signin2", {
                        scope: "profile email",
                        width: 240,
                        height: 50,
                        longtitle: true,
                        theme: "dark",
                        onsuccess: onSuccess,
                        onfailure: onFailure
                    })
                }
            </script>
            <script src="https://apis.google.com/js/platform.js?onload=renderButton" async defer></script>

        </div>
    );
};

export default GoogleSignIn;
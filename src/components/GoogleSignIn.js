import React, { useState, useEffect } from 'react';

const GoogleSignIn = () => {
    const [clientId, setClientId] = useState(null);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/google-client-id')
            .then(response => response.json())
            .then(data => {
                setClientId(data.client_id);
                window.gapi.load('auth2', () => {
                    window.gapi.auth2
                        .init({
                            client_id: clientId,
                            scope: 'profile email'
                        })
                        .then(authInstance => {
                            setUser(authInstance.currentUser.get());
                        })
                        .catch(error => {
                            setError(error);
                        });
                });
            });
    }, []);


    const onSuccess = (googleUser) => {
        setUser(googleUser);
        console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    };

    const onFailure = (error) => {
        setError(error);
        console.log(error);
    };

    const handleSignIn = () => {
        const authInstance = window.gapi.auth2.getAuthInstance();
        authInstance.signIn().then(onSuccess, onFailure);
    };

    const handleSignOut = () => {
        const authInstance = window.gapi.auth2.getAuthInstance();
        authInstance.signOut().then(() => {
            setUser(null);
        });
    };
    return (
        <div>
            <div>
                {user ? (
                    <div>
                        Logged in as: {user.getBasicProfile().getName()}
                        <button onClick={handleSignOut}>Sign Out</button>
                    </div>
                ) : (
                    <div id="my-signin2"></div>
                )}
            </div>
        </div>
    );
};

export default GoogleSignIn;
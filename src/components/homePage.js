import * as React from 'react';
import './HomePage.css';

const Homepage = () => {

    return (
        <div className="homepage">
            <div className="dashboard">
                <h2>Welcome to the Backend API</h2>
            </div>
            <p className="homepage-description">
                This is your one-stop destination for information about all the backend APIs you can use for your project.
            </p>
            <div className="homepage-features">
                <h3 className="homepage-features-title">Explore our features:</h3>
                <ul className="homepage-features-list">
                    <li className="homepage-features-item">
                        <div className="homepage-features-icon">
                            <img src="https://content-static.upwork.com/blog/uploads/sites/3/2016/09/26071621/Screen-Shot-2016-09-26-at-10.15.45-AM.png" alt="API Icon" />
                        </div>
                        <div className="homepage-features-text">
                            <h4 className="homepage-features-text-title">API Directory</h4>
                            <p className="homepage-features-text-description">
                                Browse through our directory of backend APIs and find the perfect one for your project.
                            </p>
                        </div>
                    </li>
                    <li className="homepage-features-item">
                        <div className="homepage-features-icon">
                            <img src="https://blog.back4app.com/wp-content/uploads/2021/01/api-2.png" alt="Documentation Icon" />
                        </div>
                        <div className="homepage-features-text">
                            <h4 className="homepage-features-text-title">API Documentation</h4>
                            <p className="homepage-features-text-description">
                                Access detailed documentation for each API and learn how to integrate it into your project.
                            </p>
                        </div>
                    </li>
                    <li className="homepage-features-item">
                        <div className="homepage-features-icon">
                            <img src="https://itknowledgeexchange.techtarget.com/cwdn/files/2020/06/TORO-Cloud_Open-API.png" alt="Support Icon" />
                        </div>
                        <div className="homepage-features-text">
                            <h4 className="homepage-features-text-title">API Support</h4>
                            <p className="homepage-features-text-description">
                                Our team of experts is here to provide support and answer any questions you may have about using our APIs.
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="footer">
                <a href="#">About Us</a>
                <a href="#">Contact Us</a>
                <a href="#">Privacy Policy</a>
            </div>
        </div>
    );
}

export default Homepage;
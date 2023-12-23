import React from "react";
import myImage from '../src/18940.jpg';

const Home = () => {
    const backgroundImageStyle = {
        backgroundImage: `url(${myImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "1000px", // Adjust the height as needed
        width: "100%", // Set the width to 100%
    };

    return (
        <div className="home-container" style={{ marginTop: "60px" }}>
            <section className="hero" style={backgroundImageStyle}>
                <div className="hero-content">
                    <h1>Welcome to the Employee Management System</h1>
                    {/* Add any other content */}
                </div>
            </section>
            {/* Other sections or content */}
        </div>
    );
};

export default Home;

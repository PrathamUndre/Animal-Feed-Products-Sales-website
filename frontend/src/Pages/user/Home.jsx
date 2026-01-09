import React from 'react';
import "../../Css/App.css";
// import { Navigate } from 'react-router-dom';  // Ensure this is imported

const Home = ({ user }) => {
  
    return (
        <div className="home-container">
            <h2>Welcome, {user} to Our Store 🎉</h2>
       
            <p>Browse our products and place orders easily!</p>
        </div>
    );
};

export default Home;

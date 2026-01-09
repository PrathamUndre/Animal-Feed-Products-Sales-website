// src/Components/Signup.jsx

import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Css/Login.css";  // use the same CSS file for both Signup and Login

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();  

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://animal-feed-products-sales-website.onrender.com", { 
        username, 
        password 
      });

      setMessage("Signup successful! Redirecting to login...");
      
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="login-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
      {message && <p>{message}</p>}
      <Link to="/login">Already have an account? Login</Link>
    </div>
  );
};

export default Signup;

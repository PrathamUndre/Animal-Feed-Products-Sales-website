// src/Components/Login.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Css/Login.css";  // use the same CSS file for both Signup and Login

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();  // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
  
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", { username, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.username);  // Set user in state
    navigate("/");  // Redirect to home
  } catch (err) {
    setMessage("Invalid credentials!");
  }
};

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      {/* {message && <p id="Invalid-credentials">{message}</p>} */}
      
      <Link to="/signup">Don't have an account? Signup</Link>
    </div>
  );
};

export default Login;

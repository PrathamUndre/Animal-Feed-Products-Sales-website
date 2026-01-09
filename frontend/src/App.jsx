import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import axios from "axios";

import Signup from "./Pages/user/Signup";
import Login from "./Pages/user/Login";
import Home from "./Pages/user/Home";
import Products from "./Pages/user/Products";
import Navbar from "./Components/Navbar";
import Order from "./Pages/user/Order";

import "./Css/App.css";
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import ManageProducts from "./Pages/Admin/ManageProducts";
import ManageOrders from "./Pages/Admin/ManageOrders";
import AdminNavbar from "./Components/AdminNavbar";

const API_BASE_URL = "https://animal-feed-products-sales-website.onrender.com"; // Change this to your backend URL

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token"); // Get JWT token from localStorage
  const location = useLocation(); // Get current location

  if (!token) {
    const confirmRedirect = window.confirm(
      "You need to log in to access this page. Click OK to go to Login, or Cancel to return Home."
    );
    return <Navigate to={confirmRedirect ? "/login" : "/home"} state={{ from: location }} />;
  }

  return element;
};

// Protected Admin Route
const ProtectedAdminRoute = ({ element }) => {
  const token = localStorage.getItem("token"); // Get JWT token from localStorage
  const location = useLocation(); // Get current location

  if (!token) {
    const confirmRedirect = window.confirm(
      "You need to log in as Admin to access this page. Click OK to go to Admin Login, or Cancel to return Home."
    );
    return <Navigate to={confirmRedirect ? "/admin/login" : "/home"} state={{ from: location }} />;
  }

  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    if (decodedToken.role !== "admin") {
      const confirmRedirect = window.confirm(
        "You are not authorized to access this page. Please log in as an Admin."
      );
      return <Navigate to={confirmRedirect ? "/admin/login" : "/home"} state={{ from: location }} />;
    }
  } catch (error) {
    return <Navigate to="/admin/login" />;
  }

  return element;
};

function Admin() {
  return (
    <Router>
      <AdminNavbar />
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedAdminRoute element={<AdminDashboard />} />} />
        <Route path="/admin/manage-products" element={<ProtectedAdminRoute element={<ManageProducts />} />} />
        <Route path="/admin/manage-orders" element={<ProtectedAdminRoute element={<ManageOrders />} />} />
      </Routes>
    </Router>
  );
}

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          // Validate token with backend
          const response = await axios.get(`${API_BASE_URL}/protected/protected-route`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.data.user) {
            setUser(response.data.user); // Set authenticated user
          }
        } catch (error) {
          console.error("Invalid or expired token:", error);
          localStorage.removeItem("token"); // Remove invalid token
          setUser(null);
        }
      }
    };

    checkAuth();
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      
      <Routes>
        <Route path="/home" element={<Home user={user} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/products" element={<Products />} />
        <Route path="/order" element={<ProtectedRoute element={<Order />} />} />
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;

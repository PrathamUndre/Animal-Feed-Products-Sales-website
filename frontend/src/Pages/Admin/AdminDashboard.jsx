import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch stats like number of orders, products, etc.
    const fetchStats = async () => {
      try {
        const response = await axios.get("/api/stats");
        setStats(response.data);
      } catch (error) {
        console.log("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <div className="stats">
        <div className="stat">
          <h3>Products</h3>
          <p>{stats.products}</p>
        </div>
        <div className="stat">
          <h3>Orders</h3>
          <p>{stats.orders}</p>
        </div>
        <div className="stat">
          <h3>Milk Collection</h3>
          <p>{stats.milkCollection}</p>
        </div>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;

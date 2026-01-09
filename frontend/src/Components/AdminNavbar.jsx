import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <h2>Admin Panel</h2>
      <ul>
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/manage-products">Manage Products</Link></li>
        <li><Link to="/admin/manage-orders">Manage Orders</Link></li>
        <li><Link to="/admin/logout">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaUserCircle } from "react-icons/fa"; // ✅ Import Icons
import "../Css/App.css";
import logo2 from "../Assets/logo2.png";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // Create refs for menus
  const menuRef = useRef(null);
  const profileRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

   // Function to handle navigation link click
   const handleNavClick = (path) => {
    navigate(path);
    setMenuOpen(false); // ✅ Close menu when navigating
  };

   // Close profile menu if clicked outside
   useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);  
      }

      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <img src={logo2} alt="Company Logo" className="logo" />

        {/* Navbar Title */}
        <h1 className="navbar-brand">Milk Collection & Dairy Products</h1>

        {/* Hamburger Menu for Small Screens */}
        <div ref={menuRef}>
        <button 
          className="hamburger-menu" 
          onClick={() => setMenuOpen((prev)=>!prev)}
          aria-label="Toggle menu"
         
        >
          <FaBars />
        </button>

        {/* Navigation Links */}
        <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
          {/* <Link to="/home" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link> */}
          <button className="nav-link" onClick={() => handleNavClick("/home")}>Home</button>
          <button className="nav-link" onClick={() => handleNavClick("/products")}>Products</button>

          {user ? (
            <div className="profile-container" ref={profileRef}>
              {/* Profile Icon */}
              <div className="profile-icon" onClick={() => setProfileMenuOpen(!profileMenuOpen)} aria-label="Toggle profile menu">
                <FaUserCircle size={37} />
              </div>

              {/* Profile Dropdown Menu */}
              {profileMenuOpen && (
                <div className="profile-dropdown">
                  <p className="profile-username">{user}</p>
                  <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
            <button className="nav-link" onClick={() => handleNavClick("/login")}>Login</button>
                <button className="nav-link" onClick={() => handleNavClick("/signup")}>Signup</button>
            </>
          )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

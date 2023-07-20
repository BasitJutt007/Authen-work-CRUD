import React from "react";
import {useNavigate} from "react-router-dom";
import logoImage from "./logo.png";
import "./NavBar.css"; // import your custom CSS here

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the user's authentication status
    sessionStorage.removeItem("isAuthenticated");
    // Navigate to the sign-in page
    navigate("/signin");
  };

  return (
    <nav className="navbar">
      <div className="logo-placeholder">
        <img src={logoImage} alt="Logo" className="logo-image" />
      </div>
      <div className="spacer" />
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default NavBar;

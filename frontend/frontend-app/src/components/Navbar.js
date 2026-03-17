import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-title">Student Course Registration System</div>

      <div className="nav-links">
        <Link to="/" className="nav-link">
          Dashboard
        </Link>

        <Link to="/students" className="nav-link">
          Students
        </Link>

        <Link to="/courses" className="nav-link">
          Courses
        </Link>

        <Link to="/registrations" className="nav-link">
          Registrations
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
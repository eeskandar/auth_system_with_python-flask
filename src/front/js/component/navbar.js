import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">The "Club"</span>
        </Link>
        <div className="ml-auto">
          <Link to="/sign-up">
            <button className="btn btn-primary me-2">Register now!</button>
          </Link>
          <Link to="/login">
            <button className="btn btn-secondary">Log-in</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

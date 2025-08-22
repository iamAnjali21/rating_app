// components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";


function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <div className="container-fluid">
        {/* App Name */}
        <Link className="navbar-brand" to="/">
          Star Rating App
        </Link>

        <div className="d-flex">
          {isLoggedIn ? (
            <button
              className="btn btn-light"
              onClick={onLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="btn btn-light me-2">
                Login
              </Link>
              <Link to="/signup" className="btn btn-light">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
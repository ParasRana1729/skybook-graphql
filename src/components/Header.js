import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Header = ({ setShowAuthModal }) => {
  const { user, logout } = useAuth();

  const handleAuthClick = () => {
    if (user) {
      logout();
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <header>
      <nav>
        <div className="nav-container">
          <Link to="/" className="logo">
            <h1>SkyBook</h1>
          </Link>
          <ul className="nav-links">
            <li>
              <NavLink to="/" end>Home</NavLink>
            </li>
            <li>
              <NavLink to="/search">Search Flights</NavLink>
            </li>
            {user && (
              <li>
                <NavLink to="/bookings">My Bookings</NavLink>
              </li>
            )}
            <li>
              <button
                type="button"
                id="auth-link"
                onClick={handleAuthClick}
                className="auth-button"
              >
                {user ? `Logout (${user.name})` : "Login"}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;

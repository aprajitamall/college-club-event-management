import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const toggleDarkMode = () => {
    const newMode = !darkMode;

    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);

    document.body.classList.toggle("dark-mode", newMode);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">

        <Link to="/" className="logo">
          <span className="logo-icon">C</span>
          Campus<span>Connect</span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/admin">Admin</Link>

          <button
            className="theme-toggle"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;


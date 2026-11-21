import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-container">
        <a href="#" className="logo">
          IPL<span>2026</span>
        </a>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a href="#schedule" onClick={() => setMenuOpen(false)}>
            Match Schedule
          </a>
          <a href="#booking" onClick={() => setMenuOpen(false)}>
            Selected Match
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
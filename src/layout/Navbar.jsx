import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";

/** Navbar with site navigation links */
export default function Navbar() {
  const { token, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <p>Fitness Trackr</p>
      {/* Hamburger button */}
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      {/* Only show nav if menu is open */}
      {menuOpen && (
        <nav>
          <Link to="/activities" onClick={() => setMenuOpen(false)}>
            Activities
          </Link>
          {token ? (
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
            >
              Log out
            </button>
          ) : (
            <>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}

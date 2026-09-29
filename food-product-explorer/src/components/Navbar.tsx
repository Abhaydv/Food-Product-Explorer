import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="navbar-logo">🍎</span>
        <span>Food Explorer</span>
      </Link>

      <Link to="/" className="navbar-link">
        Products
      </Link>
    </nav>
  );
}

export default Navbar;
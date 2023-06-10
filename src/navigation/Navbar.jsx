import "./Navbar.css";
import { Link } from "react-router-dom";
import { UseAuthContext } from "../AuthContext";
const Navbar = () => {
  const { username, getUserID } = UseAuthContext();
  const UID = getUserID();
  return (
    <div className="text-bg-light shadow-sm position-relative">
      <div className="position-absolute username translate-middle-y">
        {username}
      </div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item rounded-3">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item rounded-3">
              <Link className="nav-link" to="/faq">
                How It Works
              </Link>
            </li>
            <li className="nav-item rounded-3">
              <Link className="nav-link" to="/pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item rounded-3">
              <Link className="nav-link" to={`/saved/${UID}`}>
                Saved URLS
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

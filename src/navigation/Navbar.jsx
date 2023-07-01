import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { UseAuthContext } from "../AuthContext";
import { useState } from "react";
const Navbar = () => {
  const navigate = useNavigate();
  const { username, getUserID, signout } = UseAuthContext();
  const [drop, setDrop] = useState(false);
  const UID = getUserID();
  const handleDrop = () => {
    setDrop(!drop);
  };
  const handleSignout = async () => {
    try {
      await signout();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="text-bg-light shadow-sm position-relative navvy">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item rounded-3">
              <Link className="nav-link" to="/home">
                Create
              </Link>
            </li>
            <li className="nav-item rounded-3">
              <Link className="nav-link" to={`/saved/${UID}`}>
                Saved URLS
              </Link>
            </li>
          </ul>
          <div className="position-relative username translate-middle-y">
            <div className="dd">
              <button onClick={() => handleDrop()} className="ddbutton">
                {username}
                <span className={drop ? "darrow up" : "darrow down"}></span>
              </button>
              <div className={drop ? "ddmenu" : "hide"}>
                <a onClick={() => handleSignout()} className="ddselect">
                  Sign Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

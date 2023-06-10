import "./Home.css";
import { useEffect, useState } from "react";
import { UseAuthContext } from "../AuthContext";
import { IoIosCheckmarkCircle, IoIosAlert } from "react-icons/io";
import moment from "moment";
import Navbar from "../navigation/Navbar";
const Home = () => {
  const { isUserLoggedIn } = UseAuthContext();
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [linkPrivacy, setLinkPrivacy] = useState(false);
  const { getUserID } = UseAuthContext();
  const [password, setPassword] = useState("");

  const createURL = async (e) => {
    e.preventDefault();
    const currentDate = moment().format("MMMM Do YYYY, h:mm:ss a");
    setLoading(true);
    setSuccess(false);
    setError(false);
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const UID = getUserID();
      const urlInfo = {
        url: link,
        date: currentDate,
        password: password,
        uid: UID,
      };
      const response = await fetch("/newURL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(urlInfo),
      });
      const result = await response.json();
      if (response.ok) {
        if (result.success) {
          setSuccessMessage(result.success);
          setLink("");
          setLoading(false);
          setSuccess(true);
        } else {
          setErrorMessage(result.error);
          setLink("");
          setLoading(false);
          setError(true);
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message);
      setError(true);
      setLoading(false);
    }
  };

  const handleSwitch = () => {
    if (linkPrivacy) {
      setLinkPrivacy(!linkPrivacy);
      setPassword("");
    } else {
      setLinkPrivacy(!linkPrivacy);
    }
  };

  useEffect(() => {
    const subscribe = isUserLoggedIn();
    return subscribe;
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container w-50 vertical">
        <h1>Link Hider</h1>
        <form onSubmit={(e) => createURL(e)} className="form">
          <div className="input-group mb-3">
            <input
              required
              value={link}
              type="url"
              className="form-control"
              placeholder="Enter URL"
              aria-label="Enter URL"
              aria-describedby="basic-addon2"
              onChange={(e) => setLink(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className={
                  loading
                    ? "btn btn-outline-primary loading"
                    : "btn btn-outline-primary"
                }
                type="submit"
              >
                {loading ? <div className="loader"></div> : "Submit URL"}
              </button>
            </div>
          </div>
        </form>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            onChange={() => handleSwitch()}
          />
          <span>{linkPrivacy ? "Private" : "Public"}</span>
        </div>
        {linkPrivacy && (
          <div className="input-group input-group-sm mt-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Password
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
        )}
        {error && (
          <div
            className="p-2 alert alert-danger d-flex align-items-center"
            role="alert"
          >
            <div className="fontsizing">
              <IoIosAlert className="spacing" />
              {errorMessage}
            </div>
          </div>
        )}
        {success && (
          <div
            className="p-2 alert alert-success d-flex align-items-center"
            role="alert"
          >
            <div className="fontsizing">
              <IoIosCheckmarkCircle className="spacing" />
              Success! Your new link is:{" "}
              <a
                className="link-underline-primary"
                target="_blank"
                rel="noreferrer"
                href={`/${successMessage}`}
              >
                https://localhost:5173/{successMessage}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;

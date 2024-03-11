import "./Home.css";
import { useEffect, useState } from "react";
import { UseAuthContext } from "../AuthContext";
import { FiExternalLink } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
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
      const response = await fetch(
        "https://hmu-backend.vercel.app/api/urlshort",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          referrerPolicy: "no-referrer",
          body: JSON.stringify(urlInfo),
        }
      );
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
    <div className="homebody">
      <Navbar />
      <div className="container vertical hmain">
        <h1 className="title htitle">
          Dashboard analytics <span className="colorEffect">coming soon!</span>{" "}
        </h1>
        <div className="subtext hsubtext">
          You can view your saved URL in the top right
        </div>
        <form onSubmit={(e) => createURL(e)} className="form">
          <div className="hsearchbar input-group">
            <input
              required
              value={link}
              type="url"
              className="searching form-control"
              aria-label="Enter URL"
              aria-describedby="basic-addon2"
              onChange={(e) => setLink(e.target.value)}
              placeholder="Paste or Ctrl-V"
            />
            <div className="submitting input-group-append">
              <button
                className={
                  loading ? "actualbutton btn loading" : "actualbutton btn"
                }
                type="submit"
              >
                {loading ? (
                  <svg
                    className="pl"
                    width="80"
                    height="80"
                    viewBox="0 0 240 240"
                  >
                    <circle
                      className="pl__ring pl__ring--a"
                      cx="120"
                      cy="120"
                      r="105"
                      fill="none"
                      stroke="#000"
                      strokeWidth="20"
                      strokeDasharray="0 660"
                      strokeDashoffset="-330"
                      strokeLinecap="round"
                    ></circle>
                    <circle
                      className="pl__ring pl__ring--b"
                      cx="120"
                      cy="120"
                      r="35"
                      fill="none"
                      stroke="#000"
                      strokeWidth="20"
                      strokeDasharray="0 220"
                      strokeDashoffset="-110"
                      strokeLinecap="round"
                    ></circle>
                    <circle
                      className="pl__ring pl__ring--c"
                      cx="85"
                      cy="120"
                      r="70"
                      fill="none"
                      stroke="#000"
                      strokeWidth="20"
                      strokeDasharray="0 440"
                      strokeDashoffset="round"
                    ></circle>
                    <circle
                      className="pl__ring pl__ring--d"
                      cx="155"
                      cy="120"
                      r="70"
                      fill="none"
                      stroke="#000"
                      strokeWidth="20"
                      strokeDasharray="0 440"
                      strokeDashoffset="round"
                    ></circle>
                  </svg>
                ) : (
                  <FaArrowRight className="enter" />
                )}
              </button>
            </div>
          </div>
        </form>
        {error && (
          <div className="success p-2 d-flex justify-content-center">
            <div className="d-flex justify-content-center errorC">
              Something went wrong, please refresh and try again.
            </div>
          </div>
        )}
        {success ? (
          <div className="success hsuccess p-2 d-flex justify-content-center">
            <div className="d-flex justify-content-center sucC">
              <a
                className="link-underline-white sucA"
                target="_blank"
                rel="noreferrer"
                href={`https://urlpp.vercel.app/${successMessage}`}
              >
                https://urlpp.vercel.app/{successMessage}
                <FiExternalLink className="linked" />
              </a>
              <span
                onClick={() =>
                  navigator.clipboard.writeText(
                    `https://urlpp.vercel.app/${successMessage}`
                  )
                }
                className="copy"
              >
                Copy
              </span>
            </div>
          </div>
        ) : (
          <div className="invisible hsuccess success p-2 d-flex justify-content-center">
            <div className="d-flex justify-content-center sucC">
              <a
                className="link-underline-white sucA"
                target="_blank"
                rel="noreferrer"
                href={`https://urlpp.vercel.app/${successMessage}`}
              >
                https://urlpp.vercel.app/{successMessage}
                <FiExternalLink className="linked" />
              </a>
            </div>
          </div>
        )}
        <label className="label">Add a password</label>
        <input
          type="checkbox"
          onChange={() => handleSwitch()}
          className="theme-checkbox"
        ></input>
        {linkPrivacy && (
          <div className="input-group">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              name="Password"
              id="Password"
              className="input"
              type="password"
            />
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;

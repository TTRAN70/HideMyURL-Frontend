import "./Landing.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";
import { FiExternalLink } from "react-icons/fi";
import {
  FaLock,
  FaInfinity,
  FaPlus,
  FaMinus,
  FaArrowRight,
} from "react-icons/fa";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { CiLink } from "react-icons/ci";
const Landing = () => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [minus1, setMinus1] = useState(false);
  const [minus2, setMinus2] = useState(false);
  const [minus3, setMinus3] = useState(false);

  const [minus4, setMinus4] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    [...document.querySelectorAll(".fbutton")].forEach((item) => {
      item.addEventListener("click", (e) => {
        const parent = e.currentTarget.parentNode.children;
        const second = parent[1];
        if (second.style.maxHeight) {
          second.style.maxHeight = null;
        } else {
          second.style.maxHeight = second.scrollHeight + "px";
        }
        const element = document.getElementById("faq-0");
        element.scrollTop = element.scrollHeight;
      });
    });
    return () => {
      [...document.querySelectorAll(".fbutton")].forEach((item) => {
        item.addEventListener("click", (e) => {
          const parent = e.currentTarget.parentNode.children;
          const second = parent[1];
          if (second.style.maxHeight) {
            second.style.maxHeight = null;
          } else {
            second.style.maxHeight = second.scrollHeight + "px";
          }
          const element = document.getElementById("faq-0");
          element.scrollTop = element.scrollHeight;
        });
      });
    };
  }, []);

  const createURL = async (e) => {
    e.preventDefault();
    const currentDate = moment().format("MMMM Do YYYY, h:mm:ss a");
    setLoading(true);
    setSuccess(false);
    setError(false);
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const urlInfo = {
        url: link,
        date: currentDate,
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
  return (
    <div className="main">
      <div className="logging">
        <div onClick={() => navigate("/")} className="logo">
          <CiLink className="newLogo" />
          <span className="logName">URL</span>
          <span className="plusplus">++</span>
        </div>
        <button
          onClick={() => navigate("/createaccount")}
          type="button"
          className="sign btn"
        >
          Sign Up
        </button>
        <button
          onClick={() => navigate("/login")}
          type="button"
          className="Login btn"
        >
          Login
        </button>
      </div>
      <h1 className="title">
        Discover the power of <span className="colorEffect">URL</span>{" "}
        shortening.
      </h1>
      <div className="subtext">
        Enter your long URL to make it short and sweet.
      </div>
      <form onSubmit={(e) => createURL(e)} className="form">
        <div className="searchbar input-group mb-3">
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
        <div className="success p-2 d-flex justify-content-center">
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
        <div className="invisible success p-2 d-flex justify-content-center">
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
      <div className="text-center mt-5 desc">
        Want more features?{" "}
        <a href="/createaccount" className="anchor">
          Sign up!
        </a>
      </div>
      <div className="bfix d-flex justify-content-center">
        <div className="bentoinfo d-flex justify-content-evenly p-4">
          <div className="item1 position-relative">
            <BsFillLightningChargeFill className="fast p-2" />
            <div className="fs-3 subtitle">Get links quickly</div>
            <div className="subdesc sub1">
              Experience blazing-fast response times to upscale your business.
            </div>
          </div>
          <div className="item2 position-relative">
            <FaLock className="lock p-2" />
            <div className="fs-3 subtitle">Password protection</div>
            <div className="subdesc sub2">
              Keep your links secure. Add a password to your short links to
              ensure that only the people you want to access them can.
            </div>
          </div>
          <div className="item3 position-relative">
            <FaInfinity className="infinity p-2" />
            <div className="fs-3 subtitle sublink">Link analytics</div>
            <div className="subdesc sub3">
              Get insights into your audience. See where your clicks are coming
              from and which links are performing best.{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="faq">
        <div className="ftitle">FAQ</div>
        <div className="faqsection d-flex flex-wrap justify-content-center">
          <div className="f1">
            <button
              id="faq-btn-0"
              aria-controls="faq-0"
              aria-expanded="true"
              className="fbutton"
              type="button"
              onClick={() => setMinus1(!minus1)}
            >
              Is this safe?{" "}
              <span className="plus">{minus1 ? <FaMinus /> : <FaPlus />}</span>
            </button>
            <div
              aria-hidden="true"
              id="faq-0"
              aria-labelledby="faq-btn-0"
              className="fdesc"
            >
              <p className="wow">
                URL shorteners use redirection techniques to forward users from
                the shortened URL to the original destination. This process
                allows them to track and analyze the traffic, helping to
                identify and mitigate potential security risks.
              </p>
            </div>
          </div>
          <div className="f2">
            <button
              onClick={() => setMinus2(!minus2)}
              className="fbutton"
              type="button"
            >
              Will my URL stay forever?{" "}
              <span className="plus plus2">
                {minus2 ? <FaMinus /> : <FaPlus />}
              </span>
            </button>
            <div
              aria-hidden="true"
              id="faq-0"
              aria-labelledby="faq-btn-0"
              className="fdesc"
            >
              <p className="wow">
                Yes! Your URL will stay in our database forever and ever,
                allowing you to access your short URLS anytime, anywhere
              </p>
            </div>
          </div>
          <div className="f3">
            <button
              onClick={() => setMinus3(!minus3)}
              className="fbutton"
              type="button"
            >
              What is a URL Hider?{" "}
              <span className="plus plus3">
                {minus3 ? <FaMinus /> : <FaPlus />}
              </span>
            </button>
            <div
              aria-hidden="true"
              id="faq-0"
              aria-labelledby="faq-btn-0"
              className="fdesc"
            >
              <p className="wow">
                A URL shortener is a tool or service that takes a long and
                complex URL (Uniform Resource Locator) and creates a shorter,
                condensed version of it. This shortened URL redirects users to
                the original long URL when clicked. URL shorteners are commonly
                used to make long URLs more manageable, shareable, and easier to
                remember or type. They are often used in situations where
                character limitations or aesthetic considerations are important,
                such as social media posts, email communications, or messaging
                platforms.
              </p>
            </div>
          </div>
          <div className="f4">
            <button
              onClick={() => setMinus4(!minus4)}
              className="fbutton"
              type="button"
            >
              What are the benefits?{" "}
              <span className="plus plus4">
                {minus4 ? <FaMinus /> : <FaPlus />}
              </span>
            </button>
            <div
              aria-hidden="true"
              id="faq-0"
              aria-labelledby="faq-btn-0"
              className="fdesc"
            >
              <p className="wow">
                Overall, short URLs simplify link sharing, enhance user
                experience, provide tracking capabilities, and offer branding
                opportunities while maintaining a clean and professional
                appearance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

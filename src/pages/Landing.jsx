import "./Landing.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";
import { RxEnter } from "react-icons/rx";
import { IoIosCheckmarkCircle, IoIosAlert } from "react-icons/io";
import { FaLock, FaInfinity, FaPlus, FaMinus } from "react-icons/fa";
import { BsFillLightningChargeFill } from "react-icons/bs";
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
          <span className="logName">URL</span>SPY
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
        Hide Your <span className="colorEffect">URL</span>
      </h1>
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
            placeholder="Paste or enter a URL here..."
          />
          <div className="submitting input-group-append">
            <button
              className={
                loading ? "actualbutton btn loading" : "actualbutton btn"
              }
              type="submit"
            >
              {loading ? (
                <div className="loader"></div>
              ) : (
                <RxEnter className="enter" />
              )}
            </button>
          </div>
        </div>
      </form>
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
          className="p-2 alert alert-success d-flex align-items-center justify-content-center"
          role="alert"
        >
          <div className="fontsizing">
            <IoIosCheckmarkCircle className="spacing" />
            Success! Your new link is:{" "}
            <a
              className="link-underline-primary"
              target="_blank"
              rel="noreferrer"
              href={`https://hidemyurl.vercel.app/${successMessage}`}
            >
              https://hidemyurl.vercel.app/{successMessage}
            </a>
          </div>
        </div>
      )}
      <div className="text-center mt-5 desc">Want more features? Sign up!</div>
      <div className="d-flex mt-2 justify-content-center">
        <div className="bentoinfo d-flex justify-content-evenly p-4">
          <div className="item1 position-relative">
            <BsFillLightningChargeFill className="fast p-2" />
            <div className="fs-3 subtitle">Faster than ever.</div>
            <div className="subdesc">
              Using the latest technology, getting a newer URL{" "}
            </div>
            <div className="subdesc">is now 30% faster.</div>
          </div>
          <div className="item2 position-relative">
            <FaLock className="lock p-2" />
            <div className="fs-3 subtitle">Enable Passwords.</div>
            <div className="subdesc">
              Simply login or signup to add a password to your URL{" "}
            </div>
            <div className="subdesc">
              to prevent malicious people from entering your website.
            </div>
          </div>
          <div className="item3 position-relative">
            <FaInfinity className="infinity p-2" />
            <div className="fs-3 subtitle">Completely Free.</div>
            <div className="subdesc">
              Free and Unlimited. Paste as many links as you{" "}
            </div>
            <div className="subdesc">need, or want.</div>
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

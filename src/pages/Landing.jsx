import "./Landing.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import moment from "moment";
import { RxEnter } from "react-icons/rx";
import { IoIosCheckmarkCircle, IoIosAlert } from "react-icons/io";
import { FaStop, FaLock, FaInfinity } from "react-icons/fa";
import { BsFillLightningChargeFill } from "react-icons/bs";
const Landing = () => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
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
  return (
    <div className="main">
      <div className="logging">
        <button type="button" className="sign btn btn-dark btn-lg">
          Sign Up
        </button>
        <button type="button" className="Login btn">
          Login
        </button>
      </div>
      <h1 className="title">Hide Your URL. For Free.</h1>
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
          />
          <div className="submitting input-group-append">
            <button
              className={
                loading
                  ? "actualbutton btn btn-primary loading"
                  : "actualbutton btn btn-primary"
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
      <div className="text-center mt-5 desc">
        Simply paste your URL, click the blue button
      </div>
      <div className="text-center desc">and get a hidden URL for free!</div>
      <div className="bentoinfo d-flex justify-content-evenly p-3">
        <div className="item1 position-relative">
          <FaStop className="box" />
          <BsFillLightningChargeFill className="fast" />
          <div className="fs-3 subtitle">Faster than ever.</div>
          <div className="subdesc">
            Using the latest technology, getting a newer URL{" "}
          </div>
          <div className="subdesc">is now 30% faster.</div>
        </div>
        <div className="item2 position-relative">
          <FaStop className="box" />
          <FaLock className="lock" />
          <div className="fs-3 subtitle">Enable Passwords.</div>
          <div className="subdesc">
            Simply login or signup to add a password to your URL{" "}
          </div>
          <div className="subdesc">
            to prevent malicious people from entering your website.
          </div>
        </div>
        <div className="item3 position-relative">
          <FaStop className="box" />
          <FaInfinity className="infinity" />
          <div className="fs-3 subtitle">Completely Free.</div>
          <div className="subdesc">
            Free and Unlimited. Paste as many links as you{" "}
          </div>
          <div className="subdesc">need, or want.</div>
        </div>
      </div>
      <div className="banner">
        <div className="btitle">Need to Save Your URL?</div>
        <div className="oned text-center">
          1.
          <button type="button" className="bsign btn btn-light btn-lg">
            Sign Up
          </button>
        </div>
        <div className="oned text-center">2. Create a URL</div>
        <div className="oned text-center">
          3. View your URLS at "Saved URLS"
        </div>
      </div>
    </div>
  );
};

export default Landing;

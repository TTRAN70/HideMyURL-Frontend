import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UseAuthContext } from "../AuthContext";
import { BsGoogle } from "react-icons/bs";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signin, googleSignin, getUserID, getEmail } = UseAuthContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signin(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.code);
      console.clear();
    }
  };
  const handleGoogle = async () => {
    try {
      await googleSignin();
      const UID = await getUserID();
      const newEmail = await getEmail();
      const signupInfo = { uid: UID, email: newEmail };
      const response = await fetch(
        "https://hmu-backend.vercel.app/api/urlshort/googleuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          referrerPolicy: "no-referrer",
          body: JSON.stringify(signupInfo),
        }
      );
      const result = await response.json();
      if (response.ok) {
        console.log(result.success);
        navigate("/home");
      }
    } catch (err) {
      setError(err.code);
      console.clear();
    }
  };
  return (
    <div className="main">
      <div className="logging">
        <div onClick={() => navigate("/")} className="logo">
          <span className="logName">URL</span>Hider
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
      <form onSubmit={(e) => handleSubmit(e)} className="form-signin m-auto">
        <h1 className="ltitle">Welcome Back!</h1>
        <div className="mb-4">All-In-One URL Tracking, just for you.</div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control signEmail"
            placeholder="Email"
            aria-label="Email"
            aria-describedby="basic-addon2"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control signPass"
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon2"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-100 btn btn-large signButton logButt moveEmail"
          type="submit"
        >
          <svg
            width="16"
            height="12"
            viewBox="0 0 16 12"
            xmlns="http://www.w3.org/2000/svg"
            className="emailLogo"
          >
            <path d="M14.5 0H1.5C0.671562 0 0 0.671562 0 1.5V10.5C0 11.3284 0.671562 12 1.5 12H14.5C15.3284 12 16 11.3284 16 10.5V1.5C16 0.671562 15.3284 0 14.5 0ZM14.5 1.5V2.77516C13.7993 3.34575 12.6823 4.233 10.2942 6.10297C9.76787 6.51694 8.72538 7.51147 8 7.49988C7.27475 7.51159 6.23191 6.51678 5.70584 6.10297C3.31813 4.23328 2.20078 3.34584 1.5 2.77516V1.5H14.5ZM1.5 10.5V4.69994C2.21606 5.27028 3.23153 6.07063 4.77931 7.28263C5.46234 7.82028 6.6585 9.00719 8 8.99997C9.33491 9.00719 10.5159 7.8375 11.2204 7.28288C12.7682 6.07091 13.7839 5.27034 14.5 4.69997V10.5H1.5Z"></path>
          </svg>
          Sign In
        </button>
        <button
          className="googleLogo w-100 btn btn-large signButton mt-3 logButt"
          type="submit"
          onClick={() => handleGoogle()}
        >
          <span>
            <svg
              width="19"
              height="19"
              viewBox="0 0 18 19"
              xmlns="http://www.w3.org/2000/svg"
              className="moveGoogle"
            >
              <path
                d="M9 7.844v3.463h4.844a4.107 4.107 0 0 1-1.795 2.7v2.246h2.907c1.704-1.558 2.685-3.85 2.685-6.575 0-.633-.056-1.246-.162-1.83H9v-.004Z"
                fill="#3E82F1"
              ></path>
              <path
                d="M9 14.861c-2.346 0-4.328-1.573-5.036-3.69H.956v2.323A9.008 9.008 0 0 0 9 18.42c2.432 0 4.47-.8 5.956-2.167l-2.907-2.247c-.804.538-1.835.855-3.049.855Z"
                fill="#32A753"
              ></path>
              <path
                d="M3.964 5.456H.956a8.928 8.928 0 0 0 0 8.033l3.008-2.318a5.3 5.3 0 0 1-.283-1.699 5.3 5.3 0 0 1 .283-1.699V5.456Z"
                fill="#F9BB00"
              ></path>
              <path
                d="m.956 5.456 3.008 2.317c.708-2.116 2.69-3.69 5.036-3.69 1.32 0 2.508.453 3.438 1.338l2.584-2.569C13.465 1.41 11.427.525 9 .525A9.003 9.003 0 0 0 .956 5.456Z"
                fill="#E74133"
              ></path>
            </svg>
          </span>
          Continue with Google
        </button>
        <div className="link pt-3">
          New?{" "}
          <a
            className="link-underline-primary"
            target="_blank"
            rel="noreferrer"
            onClick={() => navigate("/createaccount")}
          >
            Create an Account
          </a>
        </div>
        <div
          className={error === "" ? "" : "p-2 alert alert-danger"}
          role="alert"
        >
          {error}
        </div>
      </form>
    </div>
  );
};

export default Login;

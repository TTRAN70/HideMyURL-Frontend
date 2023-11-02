import "./Create.css";
import { useState } from "react";
import { UseAuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
const Create = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [hidePass, setPass] = useState(true);
  const { signup, getUserID } = UseAuthContext();
  const navigate = useNavigate();
  const createAccount = async (event) => {
    event.preventDefault();
    try {
      await signup(email, password);
      const UID = await getUserID();
      const signupInfo = { user: { userId: UID, email: email } };
      const response = await fetch(
        "https://hmu-backend.vercel.app/api/urlshort/makeuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          referrerPolicy: "no-referrer",
          body: JSON.stringify(signupInfo),
        }
      );
      if (response.ok) {
        navigate("/home");
      }
    } catch (err) {
      setError(err.code);
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
      <form onSubmit={(e) => createAccount(e)} className="form-signin m-auto">
        <h1 className="ltitle mb-2">Let's get Started!</h1>
        <div className="mb-4">Please provide the following information:</div>
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
        <div className="mb-1">
          <input
            type={hidePass ? "password" : "text"}
            className="form-control signPass"
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon2"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-check mt-4 mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            onClick={() => setPass((pass) => !pass)}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Show Password
          </label>
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
          Sign Up
        </button>
        <div
          className={error === "" ? "" : "mt-2 p-2 alert alert-danger"}
          role="alert"
        >
          {error}
        </div>
        <div className="mt-2 linkcreate">
          <a
            className="link-underline-primary"
            target="_blank"
            rel="noreferrer"
            onClick={() => navigate("/login")}
          >
            Sign in instead? or use Google
          </a>
        </div>
      </form>
    </div>
  );
};

export default Create;

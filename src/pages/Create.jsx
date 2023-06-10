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
      const response = await fetch("/make", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      if (response.ok) {
        console.log(result.success);
        navigate("/home");
      }
    } catch (err) {
      setError(err.code);
    }
  };
  return (
    <div className="container vertical">
      <form onSubmit={(e) => createAccount(e)} className="form-signin m-auto">
        <h1>Create an Account</h1>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email Address"
            aria-label="Email Address"
            aria-describedby="basic-addon2"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-1">
          <input
            type={hidePass ? "password" : "text"}
            className="form-control"
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon2"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-check mb-2">
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
        <button className="w-100 btn btn-primary btn-large" type="submit">
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
            onClick={() => navigate("/")}
          >
            Sign in instead?
          </a>
        </div>
      </form>
    </div>
  );
};

export default Create;

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
      const response = await fetch("/google", {
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
      console.clear();
    }
  };
  return (
    <div className="container vertical">
      <form onSubmit={(e) => handleSubmit(e)} className="form-signin m-auto">
        <h1 className="ltitle">Login</h1>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email Address"
            aria-label="Email"
            aria-describedby="basic-addon2"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon2"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-group d-flex justify-content-end">
          <button
            onClick={() => handleGoogle()}
            className="btn btn-outline-primary"
            type="button"
          >
            <BsGoogle className="google position-relative" />
          </button>
          <button className="btn btn-outline-primary" type="submit">
            Sign In
          </button>
        </div>
        <div className="link">
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

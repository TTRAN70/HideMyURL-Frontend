import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Redirect.css";
const Redirect = () => {
  const [attempt, setAttempt] = useState("");
  const [passwordLookup, setLookup] = useState("");
  const [loading, setLoading] = useState(true);
  const [url, setURL] = useState("");
  let { id } = useParams();
  const tryRedirect = async (e) => {
    e.preventDefault();
    try {
      if (attempt === passwordLookup) {
        window.location.href = url;
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    const redirectUser = async () => {
      try {
        const response = await fetch(
          `https://hmu-backend.vercel.app/api/urlshort/${id}`
        );
        const result = await response.json();
        if (response.ok) {
          if (result.link && result.pass == "") {
            window.location.href = result.link;
            return null;
          } else if (result.error) {
            return <div>{result.error}</div>;
          } else {
            setURL(result.link);
            setLookup(result.pass);
            setLoading(false);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    redirectUser();
  }, []);
  if (!loading) {
    return (
      <div className="C1">
        <form onSubmit={(e) => tryRedirect(e)} className="P-1">
          <h2>This is a Password Protected URL</h2>
          <input
            type="password"
            className="P-2"
            placeholder="Enter the password"
            value={attempt}
            onChange={(e) => setAttempt(e.target.value)}
          />
          <button type="submit" className="P-3">
            Submit
          </button>
        </form>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Redirect;

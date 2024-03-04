import { useState } from "react";
import "./Reveal.css";
const Reveal = (props) => {
  const [show, setShow] = useState(false);
  return !show ? (
    <button onClick={() => setShow(true)} className="revealButton">
      {" "}
      <span className="revealSpan">Reveal</span>
    </button>
  ) : (
    <div className="BOB">{props.password}</div>
  );
};

export default Reveal;

import { useState } from "react";
const Reveal = (props) => {
  const [show, setShow] = useState(false);
  return !show ? (
    <em>
      <a
        className="font-weight-normal text-secondary"
        onClick={() => setShow(true)}
      >
        Reveal
      </a>
    </em>
  ) : (
    <em>{props.password}</em>
  );
};

export default Reveal;

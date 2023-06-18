import "./Saved.css";
import Reveal from "./Reveal";
import { useParams } from "react-router-dom";
import { UseAuthContext } from "../AuthContext";
import { useEffect, useState } from "react";
import Navbar from "../navigation/Navbar";
import { RxTrash } from "react-icons/rx";

const Saved = () => {
  const [linkList, setList] = useState([]);
  const { isUserLoggedIn } = UseAuthContext();
  let { userID } = useParams();
  useEffect(() => {
    const subscribe = isUserLoggedIn();
    return subscribe;
  }, []);

  useEffect(() => {
    const savedUsers = async () => {
      try {
        const response = await fetch(`/getAllLinks/${userID}`);
        const result = await response.json();
        if (response.ok) {
          if (result.savedLinks) {
            const keys = Object.keys(result.savedLinks);
            const parseKeys = keys.filter((key) => {
              if (key !== "email") {
                return true;
              } else {
                return false;
              }
            });
            for (let i = 0; i < parseKeys.length; i++) {
              const body = [
                {
                  linkID: parseKeys[i],
                  createdAt: result.savedLinks[parseKeys[i]].createdAt,
                  password: result.savedLinks[parseKeys[i]].password,
                  originalURL: result.savedLinks[parseKeys[i]].originalURL,
                },
              ];
              setList((item) => [...item, body]);
            }
          } else if (result.error) {
            return <div>{result.error}</div>;
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    savedUsers();
  }, []);

  const handleDelete = async (e) => {
    const keyValue = e.currentTarget.dataset.item;
    const linkID = linkList[keyValue][0].linkID;
    try {
      const response = await fetch(`/deleteURL/${userID}/${linkID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
      });
      const result = await response.json();
      if (response.ok) {
        if (result.success) {
          setList((item) => {
            return item.splice(keyValue, 1);
          });
        } else {
          console.log(result.error);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="rounded-3 pt-2 size container-sm shadow-lg">
        {linkList.map((item, key) => {
          return (
            <div
              className="position-relative lh-lg links p-2 ps-3 ml-3 rounded-3 mt-3 mb-3 container-sm shadow"
              key={key}
            >
              <div className="arrow">
                <a target="_blank" rel="noreferrer" href={`/${item[0].linkID}`}>
                  <span className="right"></span>
                </a>
              </div>
              <button
                data-item={key}
                onClick={(e) => handleDelete(e)}
                className="trash-btn"
              >
                <RxTrash />
              </button>
              <div className="h5">https://localhost:5173/{item[0].linkID}</div>
              <div className="text-secondary">{item[0].originalURL}</div>
              <div className="text-secondary">
                {"password: "}
                <Reveal password={item[0].password} />
              </div>
              <div className="text-secondary">{item[0].createdAt}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Saved;

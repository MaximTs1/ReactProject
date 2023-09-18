import { useContext, useEffect, useState } from "react";
import "./Articles.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import moment from "moment";
import { UserContext } from "../App";

//check the code -- probably the whole file will be deleted.

export default function CardEdit() {
  const [userInfo, setuserInfo] = useState();
  const navigate = useNavigate();
  const { setLoading, snackbar } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);

    fetch(`https://api.shipap.co.il/clients/login`, {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text().then((x) => {
            throw new Error(x);
          });
        }
      })
      .then((res) => res.json())
      .then((data) => setuserInfo(data))
      .finally(() => setLoading(false));
    //   .catch(err => {
    //     console.log(err.message);});
  }, [userInfo.id, setLoading]);

  const handelInput = (ev) => {
    const { name, value } = ev.target;

    setuserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const updateCard = (ev) => {
    ev.preventDefault();
    setLoading(true);

    fetch("https://api.shipap.co.il/clients/login", {
      credentials: "include",
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(userInfo),
    })
      .then(() => {
        snackbar("הפרטים נשמרו בהצלחה");
        navigate("/");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="ArticlesEdit">
      <button className="returnLink">
        <Link to="/">
          <AiOutlineRight /> חזרה לרשימת הכתבות
        </Link>
      </button>

      {userInfo && (
        <>
          <h2>עריכת כרטיס</h2>

          <form onSubmit={updateCard}>
            <label>
              כותרת:
              <input
                type="text"
                name="headline"
                value={userInfo.headline}
                onChange={handelInput}
              />
            </label>

            <label>
              קישור לתמונה:
              <input
                type="text"
                name="imgUrl"
                value={userInfo.imgUrl}
                onChange={handelInput}
              />
            </label>

            <label>
              תאריך פרסום:
              <input
                type="date"
                name="publishDate"
                value={userInfo.publishDate}
                onChange={handelInput}
              />
            </label>

            <label>
              תיאור:
              <textarea
                name="description"
                cols="30"
                rows="5"
                value={userInfo.description}
                onChange={handelInput}
              ></textarea>
            </label>

            <label>
              תוכן:
              <textarea
                name="content"
                cols="30"
                rows="10"
                value={userInfo.content}
                onChange={handelInput}
              ></textarea>
            </label>

            <button>{userInfo.id ? "שמירה" : "הוספה"}</button>
          </form>
        </>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import EditAccount from "../pages/EditAccount";

export default function Account() {
  const [info, setInfo] = useState([]);
  const [editedItem, setEditedItem] = useState(null);

  useEffect(() => {
    fetch("https://api.shipap.co.il/clients/login", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setInfo(data);
        } else {
          setInfo([data]);
        }

        setEditedItem(data);
      });
  }, []);

  const update = (field) => {
    if (field) {
      const arr = [...info];
      const i = arr.findIndex((p) => p.id === field.id);
      arr.splice(i, 1, field);
      setInfo(arr);
    }
  };

  return (
    <div className="Account">
      <EditAccount item={editedItem} itemChange={update} />
      {info.length > 0 ? (
        <div className="grid">
          {info.map((p, i) => (
            <React.Fragment key={p.id}></React.Fragment>
          ))}
        </div>
      ) : (
        <h3 className="noData">אין נתונים</h3>
      )}
    </div>
  );
}

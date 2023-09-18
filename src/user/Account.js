import { GeneralContext } from "../App";
import React, { useContext, useEffect, useState } from "react";
import EditAccount from "../pages/EditAccount";

export default function Account() {
  const [info, setInfo] = useState([]);
  const [editedItem, setEditedItem] = useState(null); // Initialize with null
  const { user } = useContext(GeneralContext);

  useEffect(() => {
    fetch("https://api.shipap.co.il/clients/login", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setInfo(data); // If data is already an array, set it as is
        } else {
          setInfo([data]); // If data is an object, wrap it in an array
        }
      });
  }, []);

  const update = (field) => {
    if (field) {
      const arr = [...info];
      const i = arr.findIndex((p) => p.id === field.id);
      arr.splice(i, 1, field);
      setInfo(arr);
    }
    setEditedItem(null); // Reset editedItem
  };

  return (
    <div className="Account">
      <EditAccount item={editedItem} itemChange={update} />
      {info.length > 0 ? (
        <div className="grid">
          <div>Actions</div>
          {info.map((p, i) => (
            <React.Fragment key={p.id}>
              <div>
                <button className="remove" onClick={() => setEditedItem(p)}>
                  ✏️ Edit
                </button>
              </div>
            </React.Fragment>
          ))}
        </div>
      ) : (
        <h3 className="noData">אין נתונים</h3>
      )}
    </div>
  );
}

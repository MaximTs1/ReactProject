import { useEffect, useState } from "react";
import Joi from "joi";

export default function EditAccount({ item, itemChange }) {
  const [formData, setFormData] = useState({
    id: 0, // Initialize id with 0 or an appropriate default value
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    imgUrl: "",
    imgAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: 0, // Initialize numeric fields with 0 or appropriate values
    zip: 0,
    business: false, // Use a checkbox for boolean values
    fullName: "",
  });
  const [errors, setErrors] = useState({});

  const accountSchema = Joi.object({
    id: Joi.number().required(),
    firstName: Joi.string().min(3).required(),
    middleName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    phone: Joi.string().min(3).required(),
    email: Joi.string().min(3).required(),
    imgUrl: Joi.string().min(3).required(),
    imgAlt: Joi.string().min(3).required(),
    state: Joi.string().min(3).required(),
    country: Joi.string().min(3).required(),
    city: Joi.string().min(3).required(),
    street: Joi.string().min(3).required(),
    houseNumber: Joi.number().required(),
    zip: Joi.number().required(),
    business: Joi.boolean().required(),
    fullName: Joi.string().min(3).required(),
  });

  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  const handleInputChange = (ev) => {
    const { id, value } = ev.target;

    const obj = {
      ...formData,
      [id]: value,
    };

    const schema = accountSchema.validate(obj, {
      abortEarly: false,
      messages: {},
      errors: { language: "english" },
    });
    const err = { ...errors, [id]: undefined };

    if (schema.error) {
      const error = schema.error.details.find((e) => e.context.key === id);

      if (error) {
        err[id] = error.message;
      }
    }

    setFormData(obj);
    setErrors(err);
  };

  function save(ev) {
    ev.preventDefault();

    fetch(
      `https://api.shipap.co.il/clients/update?token=9e7d1125-5381-11ee-becb-14dda9d4a5f0`,
      {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data if needed
        console.log("Data saved successfully:", data);
        itemChange(formData);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  }

  return (
    <>
      {item && (
        <div className="modal-frame">
          <div className="modal">
            <header>
              <button className="close" onClick={() => itemChange()}>
                x
              </button>
              <h2>עריכת משתמש</h2>
            </header>

            <form onSubmit={save}>
              <label>
                firstName:
                <input
                  type="text"
                  value={formData.firstName}
                  id="firstName"
                  onChange={handleInputChange}
                />
              </label>
              <label>
                middleName:
                <input
                  type="text"
                  value={formData.middleName}
                  id="middleName"
                  onChange={handleInputChange}
                />
              </label>
              <label>
                lastName:
                <input
                  type="text"
                  value={formData.lastName}
                  id="lastName"
                  onChange={handleInputChange}
                />
              </label>
              <label>
                phone:
                <input
                  type="text"
                  value={formData.phone}
                  id="phone"
                  onChange={handleInputChange}
                />
              </label>
              <label>
                email:
                <input
                  type="text"
                  value={formData.email}
                  id="email"
                  onChange={handleInputChange}
                />
              </label>
              <label>
                imgUrl:
                <input
                  type="text"
                  value={formData.imgUrl}
                  id="imgUrl"
                  onChange={handleInputChange}
                />
              </label>
              <label>
                imgAlt:
                <input
                  type="text"
                  value={formData.imgAlt}
                  id="imgAlt"
                  onChange={handleInputChange}
                />
              </label>
              <label>
                state:
                <input
                  type="text"
                  value={formData.state}
                  id="state"
                  onChange={handleInputChange}
                />
              </label>
              <label>
                country:
                <input
                  type="text"
                  value={formData.country}
                  id="country"
                  onChange={handleInputChange}
                />
              </label>
              <label>
                city:
                <input
                  type="text"
                  value={formData.city}
                  id="city"
                  onChange={handleInputChange}
                />
              </label>
              <label>
                street:
                <input
                  type="text"
                  value={formData.street}
                  id="street"
                  onChange={handleInputChange}
                />
              </label>
              <label>
                houseNumber:
                <input
                  type="text"
                  value={formData.houseNumber}
                  id="houseNumber"
                  onChange={handleInputChange}
                />
              </label>
              <label>
                zip:
                <input
                  type="text"
                  value={formData.zip}
                  id="zip"
                  onChange={handleInputChange}
                />
              </label>
              <label>
                business:
                <input
                  type="checkbox"
                  checked={formData.business}
                  id="business"
                  onChange={handleInputChange}
                />
              </label>
              <label>
                fullName:
                <input
                  type="text"
                  value={formData.fullName}
                  id="fullName"
                  onChange={handleInputChange}
                />
              </label>
              <button>שמור</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

import Joi from "joi";


export const structure = [
    {
      name: "title",
      type: "text",
      label: "title",
      required: true,
      block: false,
    },
    {
      name: "subtitle",
      type: "text",
      label: "subtitle",
      required: true,
      block: false,
    },
    {
      name: "description",
      type: "text",
      label: "description",
      required: true,
      block: false,
    },
    {
      name: "phone",
      type: "tel",
      label: "phone",
      required: true,
      block: false,
    },
    {
      name: "email",
      type: "email",
      label: "email",
      required: true,
      block: false,
    },
    {
      name: "web",
      type: "string",
      label: "web",
      required: true,
      block: false,
    },
    {
      name: "imgUrl",
      type: "sring",
      label: "imgUrl",
      required: true,
      block: true,
    },
    {
      name: "imgAlt",
      type: "text",
      label: "imgAlt",
      required: true,
      block: false,
    },
    {
      name: "state",
      type: "text",
      label: "state",
      required: true,
      block: false,
    },
    {
      name: "country",
      type: "text",
      label: "country",
      required: true,
      block: false,
    },
    { name: "city",
     type: "text",
      label: "city", 
      required: true,
       block: false
       },
    {
      name: "street",
      type: "text",
      label: "street",
      required: true,
      block: false,
    },
    {
      name: "houseNumber",
      type: "number",
      label: "houseNumber",
      required: true,
      block: false,
    },
    {
      name: "zip",
      type: "number",
      label: "zip",
      required: true,
      block: false,
    },

  ];


 export const cardSchema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    subtitle: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(10).max(200).required(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    web: Joi.string().min(3).required(),
    email: Joi.string().email({ tlds: { allow: false } }),
    imgUrl: Joi.string().min(3).required(),
    imgAlt: Joi.string().min(3).required(),
    state: Joi.string().min(3).required(),
    country: Joi.string().min(3).required(),
    city: Joi.string().min(3).required(),
    street: Joi.string().min(3).required(),
    houseNumber: Joi.number().required(),
    zip: Joi.number().required(),
    // Add validation rules for other fields here
  });
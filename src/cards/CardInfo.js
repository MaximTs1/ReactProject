import React, { useContext, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { GeneralContext } from "../App";
import { useLocation } from "react-router-dom";
import Map from "../components/Map";
import "./CardInfo.css";

const API_ENDPOINT = "https://api.shipap.co.il/cards";
const API_TOKEN = "9e7d1125-5381-11ee-becb-14dda9d4a5f0";
const GEOCODING_API_KEY = "AIzaSyD9rvyGxhBbxjiKDfAJ6Uy4_A0Px6T9SWE";

export default function CardInfo() {
  const [item, setItem] = useState({
    title: "",
    description: "",
    subtitle: "",
    phone: "",
    email: "",
    web: "",
    imgUrl: "",
    imgAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: 0,
    zip: "",
    userName: "",
    favorite: false,
  });

  const { setLoader } = useContext(GeneralContext);
  const location = useLocation();
  const cardId = location.state && location.state.idd;

  useEffect(() => {
    setLoader(true);

    fetch(`${API_ENDPOINT}/${cardId}?token=${API_TOKEN}`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.status}`);
        }
        return res.json();
      })
      .then(async (data) => {
        // Convert address to latitude and longitude using geocoding
        const address = `${data.houseNumber} ${data.street}, ${data.city}, ${data.state}, ${data.country} ${data.zip}`;
        const locationData = await geocodeAddress(address);
        data.location = locationData;
        setItem(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoader(false));
  }, [cardId, setLoader]);

  // Function to geocode an address using the Google Geocoding API
  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${GEOCODING_API_KEY}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        return {
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng,
        };
      }
    } catch (error) {
      console.error("Error geocoding address:", error);
    }
    return null;
  };

  return (
    <div className="Cards">
      <header>
        <Typography variant="h2" className="title">
          {item.title}
        </Typography>
        <Typography variant="h4" className="subtitle">
          {item.subtitle}
        </Typography>
      </header>
      {item && (
        <Container maxWidth="md" className="container">
          <CssBaseline />
          <Box sx={{ mt: 4 }}>
            <img src={item.imgUrl} alt={item.imgAlt} className="picture" />
            <Typography variant="body1" className="description">
              {item.description}
            </Typography>
            <div className="space"></div>
            <Typography variant="body1" className="info-label">
              Email:
            </Typography>
            <Typography variant="body1" className="info-value">
              {item.email}
            </Typography>
            <Typography variant="body1" className="info-label">
              Phone:
            </Typography>
            <Typography variant="body1" className="info-value">
              {item.phone}
            </Typography>
            <div className="space"></div>
            <div>
              <Typography variant="body1" className="small-info">
                Country: {item.country}
              </Typography>
              <Typography variant="body1" className="small-info">
                City: {item.city}
              </Typography>
              <Typography variant="body1" className="small-info">
                Street: {item.street}
              </Typography>
              <Typography variant="body1" className="small-info">
                House Number: {item.houseNumber}
              </Typography>
              <Typography variant="body1" className="small-info">
                Zip: {item.zip}
              </Typography>
              <Typography variant="body1" className="small-info">
                State: {item.state}
              </Typography>
            </div>
          </Box>
        </Container>
      )}
      {item.location && <Map className="map" location={item.location} />}
    </div>
  );
}

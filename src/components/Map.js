import React, { useEffect, useRef } from "react";
import "../cards/CardInfo.css";

function Map({ location }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (location && location.latitude && location.longitude) {
      const mapOptions = {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        },
        zoom: 15,
      };

      const map = new window.google.maps.Map(mapRef.current, mapOptions);

      // Create a marker for the location
      new window.google.maps.Marker({
        position: mapOptions.center,
        map: map,
      });
    }
  }, [location]);

  return (
    <div ref={mapRef} className="map">
      {(!location || !location.latitude || !location.longitude) && (
        <div>No location information available</div>
      )}
    </div>
  );
}

export default Map;

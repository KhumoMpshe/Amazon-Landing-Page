import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

function LocationDisplay() {
  const [location, setLocation] = useState("Set Location");
  const [mapLink, setMapLink] = useState("#");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLocation(
          `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`
        );

        setMapLink(
          `https://www.google.com/maps?q=${latitude},${longitude}`
        );
      },
      () => {
        setLocation("Location unavailable");
      }
    );
  }, []);

  return (
    <a
      href={mapLink}
      target="_blank"
      rel="noopener noreferrer"
      className="location-link"
    >
      <FaMapMarkerAlt />
      <div>
        <small>Deliver to</small>
        <p>{location}</p>
      </div>
    </a>
  );
}

export default LocationDisplay;
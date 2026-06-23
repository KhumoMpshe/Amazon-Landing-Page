import { FaMapMarkerAlt } from "react-icons/fa";

function LocationDisplay() {
  return (
    <a
      href="https://www.google.com/maps/search/Brakpan+1540"
      target="_blank"
      rel="noopener noreferrer"
      className="location-link"
    >
      <FaMapMarkerAlt className="location-icon" />
      <div className="location-text">
        <small>Deliver to Khumo</small>
        <p>Brakpan 1540</p>
      </div>
    </a>
  );
}

export default LocationDisplay;

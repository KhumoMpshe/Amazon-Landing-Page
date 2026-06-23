import { useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaTruck, FaShoppingBag, FaMapMarkerAlt, FaCalendarAlt, FaCertificate, FaComments, FaCreditCard } from "react-icons/fa";
import "./trustBadge.css";

const BADGES = [
  { id: 1, icon: <FaTruck />, label: "Free delivery on your first order*" },
  { id: 2, icon: <FaShoppingBag />, label: "Delivery to pickup locations" },
  { id: 3, icon: <FaMapMarkerAlt />, label: "Order Tracking" },
  { id: 4, icon: <FaCalendarAlt />, label: "Easy Returns" },
  { id: 5, icon: <FaCertificate />, label: "A-Z Guarantee" },
  { id: 6, icon: <FaComments />, label: "24/7 Customer Support" },
  { id: 7, icon: <FaCreditCard />, label: "Payment Options" }
];

function TrustBadges() {
  const trackRef = useRef(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const track = trackRef.current;
      if (!track || pausedRef.current) return;

      // Loop back to the start once we've scrolled past the end.
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 1) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: 1, behavior: "auto" });
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const scrollByAmount = (amount) => {
    trackRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="trust-badges">
      <h2>Welcome to Amazon</h2>

      <div
        className="trust-badges-wrapper"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
      >
        <button
          className="trust-arrow left"
          onClick={() => scrollByAmount(-300)}
          aria-label="Scroll left"
        >
          <FaChevronLeft />
        </button>

        <div className="trust-badges-track" ref={trackRef}>
          {BADGES.map((badge) => (
            <div className="trust-badge" key={badge.id}>
              <div className="trust-badge-icon">{badge.icon}</div>
              <p>{badge.label}</p>
            </div>
          ))}
        </div>

        <button
          className="trust-arrow right"
          onClick={() => scrollByAmount(300)}
          aria-label="Scroll right"
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}

export default TrustBadges;

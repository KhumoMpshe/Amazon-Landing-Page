import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./browseCategories.css";

const BROWSE_CATEGORIES = [
  { id: 1, label: "Deals", bg: "rgb(3 106 243)", image: "https://images-eu.ssl-images-amazon.com/images/G/53/RBSxFELA/2025/BuzzDeals/Steal_deals0.5x._SY304_CB759706798_.jpg" },
  { id: 2, label: "Books", bg: "rgb(247 245 248)", image: "https://m.media-amazon.com/images/I/718fM6JMrcL._SY342_.jpg" },
  { id: 3, label: "Electronics", bg: "#8e1f1f", image: "https://m.media-amazon.com/images/I/719d5u53OdL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 4, label: "Health & Personal Care", bg: "rgb(255 255 255)", image: "https://m.media-amazon.com/images/I/51Opcf5o80L._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 5, label: "Jewellery", bg: "rgb(255 255 255)", image: "https://m.media-amazon.com/images/I/61-B26GgSdL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 6, label: "Toys & Games", bg: "rgb(255 255 255)", image: "https://m.media-amazon.com/images/I/71jFm4ucTxL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 7, label: "Baby", bg: "rgb(255 255 255)", image: "https://m.media-amazon.com/images/I/41uZGVpGVbL._AC_UL480_FMwebp_QL65_.jpg" }
];

function BrowseCategories() {
  const scrollToProducts = () => {
    document.getElementById("product-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const rowRef = useRef(null);

  const scrollRow = (direction) => {
    if (!rowRef.current) return;
    const scrollAmount = rowRef.current.clientWidth * 0.75;
    rowRef.current.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="browse-categories">
      <h2>Shop our Categories</h2>

      <div className="browse-row-wrapper">
        <button
          className="browse-nav browse-nav-left"
          onClick={() => scrollRow(-1)}
          aria-label="Scroll categories left"
        >
          <FaChevronLeft />
        </button>

        <div className="browse-row" ref={rowRef}>
          {BROWSE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className="browse-item"
              onClick={scrollToProducts}
            >
              <span className="browse-circle" style={{ background: cat.bg }}>
                <img src={cat.image} alt={cat.label} />
              </span>
              <span className="browse-label">{cat.label}</span>
            </button>
          ))}
        </div>

        <button
          className="browse-nav browse-nav-right"
          onClick={() => scrollRow(1)}
          aria-label="Scroll categories right"
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}

export default BrowseCategories;

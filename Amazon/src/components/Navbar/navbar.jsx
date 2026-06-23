import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingBasket,
  FaBars,
  FaSearch,
  FaChevronDown
} from "react-icons/fa";
import LocationDisplay from "../LocationDisplay";
import { useCart } from "../../context/cartContext";
import logo from "../../assets/logo.svg";
import "./navbar.css";

const SUB_LINKS = [
  "Customer Service",
  "Prime",
  "Today's Deals",
  "Keep Shopping for",
  "Everyday Essentials",
  "Best Sellers",
  "Shop Mzansi",
  "Gift Cards",
  "Buy Again"
];

function Navbar() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <header className="navbar">
      <div className="navbar-top">
        <Link to="/" className="logo">
          <img src={logo} alt="Amazon" className="logo-img" />
          <span className="logo-domain">.co.za</span>
        </Link>

        <LocationDisplay />

        <form className="search-form" onSubmit={handleSearchSubmit}>
          <select
            className="search-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Search category"
          >
            <option value="All">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
            <option value="Books">Books</option>
          </select>
          <input
            type="text"
            placeholder="Search Amazon.co.za"
            className="search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="search-btn" aria-label="Search">
            <FaSearch />
          </button>
        </form>

        <div className="navbar-top-right">
          <button type="button" className="nav-item nav-account">
            <span className="nav-item-line">Hello, Khumo</span>
            <span className="nav-item-main">
              Account &amp; Lists
              <FaChevronDown className="nav-chevron" />
            </span>
          </button>

          <button type="button" className="nav-item nav-orders">
            <span className="nav-item-line">Returns</span>
            <span className="nav-item-main">&amp; Orders</span>
          </button>

          <Link to="/cart" className="nav-item nav-basket">
            <span className="nav-basket-icon-wrap">
              <span className="nav-basket-count">{cartCount}</span>
              <FaShoppingBasket className="nav-basket-icon" />
            </span>
            <span className="nav-basket-label">Basket</span>
          </Link>
        </div>
      </div>

      <div className="navbar-sub">
        <div className="navbar-sub-left">
          <button type="button" className="sub-all-btn">
            <FaBars />
            <span>All</span>
          </button>

          <nav className="sub-links" aria-label="Quick links">
            {SUB_LINKS.map((link) => (
              <button key={link} type="button" className="sub-link">
                {link}
                {link === "Prime" && <FaChevronDown className="sub-chevron" />}
              </button>
            ))}
          </nav>
        </div>

        <div className="navbar-sub-right">
          <span className="prime-logo">
              <img src="https://m.media-amazon.com/images/G/53/RBSxFELA/2025/payday/Fast_free_delivery_swm_motion_primex02._CB760254565_.jpg" alt="Amazon" />
          </span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

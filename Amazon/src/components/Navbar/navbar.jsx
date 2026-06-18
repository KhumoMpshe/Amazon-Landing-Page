import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import LocationDisplay from "../LocationDisplay";
import "./navbar.css";

function Navbar() {
  const [search, setSearch] = useState("");

  const filteredProducts =
  products.filter(product =>
    product.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  <input
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
/>


  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img
          src="./assets/logo.svg"
          alt="Amazon Logo"
          className="logo-img"
        />
        <span className="zip">.co.za</span>
      </Link>

      <LocationDisplay />

      
      <input
        type="text"
        placeholder="Search Amazon"
        className="search-bar"
      />
      
      <div className="account">
        Hello, Sign In
        <br />
        <strong>Account & Lists</strong>
        <span className="dropdown-arrow">▼</span>
      </div>

      <div className="orders">
        Returns 
        <strong>& Orders</strong>
      </div>

      <Link to="/cart" className="cart">
        <FaShoppingCart />
        <span className="cart-count">0</span>
      </Link>
    </nav>
  );
}

export default Navbar;
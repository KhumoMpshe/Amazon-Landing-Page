import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard/productCard";
import CategoryCard from "../components/CategoryCard/CategoryCard";
import { products, categories } from "../data/products";
import "./products.css";
import CartSidebar from "../components/CartSidebar/cartSidebar";
import { useCart } from "../context/cartContext";

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under R500", min: 0, max: 500 },
  { label: "R500 – R1500", min: 500, max: 1500 },
  { label: "Over R1500", min: 1500, max: Infinity }
];

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "priceLowHigh", label: "Price: Low to High" },
  { value: "priceHighLow", label: "Price: High to Low" },
  { value: "newest", label: "Newest" }
];

function Products() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") || "";
    const { cart, drawerOpen } = useCart();

  const [activeCategory, setActiveCategory] = useState("All");
  const [activeRange, setActiveRange] = useState(PRICE_RANGES[0]);
  const [sortOption, setSortOption] = useState("relevance");

  const handleCategorySelect = (category) => {
    setActiveCategory((prev) => (prev === category ? "All" : category));
  };

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;

      const matchesPrice =
        product.price >= activeRange.min && product.price < activeRange.max;

      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesPrice && matchesSearch;
    });

    const sorted = [...filtered];
    switch (sortOption) {
      case "priceLowHigh":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "priceHighLow":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        sorted.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return sorted;
  }, [activeCategory, activeRange, searchTerm, sortOption]);

    const hasCart = drawerOpen && cart.length > 0;

    return (
        <main className="products-page">
                <div className={`products-layout ${hasCart ? "has-cart" : ""}`}>
            <aside className="products-sidebar">
                <h2>Refine your search</h2>

                <div className="sidebar-section">
                    <h3>Eligible for Free Delivery</h3>
                    <label className="free-delivery-label">
                        <input type="checkbox" /> Free Delivery by Amazon<br />
                        Get FREE Delivery on eligible orders shipped by Amazon
                    </label>
                </div>

                <div className="sidebar-section">
                    <h3>Department</h3>
                    <ul className="department-list">
                        <li>Arts & Crafts</li>
                        <li>Baby Products</li>
                        <li>Beauty</li>
                        <li>Books</li>
                        <li>Electronics</li>
                        <li>Fashion</li>
                        <li>Home & Kitchen</li>
                        <li>Sports & Outdoors</li>
                    </ul>
                </div>

                <div className="sidebar-section">
                    <h3>Fulfilled by Amazon</h3>
                    <label className="Fulfill">
                        <input type="checkbox" /> Fulfilled by Amazon
                    </label>
                </div>

                <div className="sidebar-section">
                    <h3>Customer Reviews</h3>
                    <ul className="review-list">
                    <li>★★★★☆ & Up</li>
                    <li>★★★☆☆ & Up</li>
                    </ul>
                </div>

                <div className="sidebar-section">
                    <h3>Availability</h3>
                    <label className="in-stock-label">
                        In Stock only
                    </label>
                    <label className="out-of-stock-label">
                    Include Out of Stock
                    </label>
                </div>
            </aside>

            <section className="products-main">
                <section className="category-row">
                    {categories.map((category) => (
                    <CategoryCard
                        key={category}
                        category={category}
                        active={activeCategory === category}
                        onSelect={handleCategorySelect}
                    />
                    ))}
                </section>

                <section className="filter-bar">
                    <div className="price-filter">
                        <span className="filter-label">Price:</span>
                        {PRICE_RANGES.map((range) => (
                        <button
                            key={range.label}
                            className={`price-pill ${activeRange.label === range.label ? "active" : ""}`}
                            onClick={() => setActiveRange(range)}
                        >
                            {range.label}
                        </button>
                        ))}
                    </div>

                    <div className="sort-control">
                        <label htmlFor="sort-select" className="sort-label">Sort by:</label>
                        <select
                            id="sort-select"
                            className="sort-select"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            {SORT_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </section>

                {searchTerm && (
                    <p className="search-status">
                        Showing results for <strong>&ldquo;{searchTerm}&rdquo;</strong>
                    </p>
                )}

                {visibleProducts.length > 0 ? (
                <section className="product-grid">
                {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                </section>
                ) : (
                <p className="no-results">
                No products match your filters. Try widening your search.
                </p>
                )}
            </section>
                        {/** Show the inline cart sidebar only when the drawer is open and there are items. */}
                        {hasCart && <CartSidebar />}
        </div>
    </main>
  );
}

export default Products;

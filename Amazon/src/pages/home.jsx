import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import HomeHero from "../components/HomeHero/homeHero";
import TrustBadges from "../components/TrustBadges/trustBadge";
import BrandStrip from "../components/BrandStrip/brandStrip";
import { DiscoverRowOne, DiscoverRowTwo } from "../components/DiscoverSection/discoverSection";
import BrowseCategories from "../components/BrowseCategories/browseCategories";
import CategoryCard from "../components/CategoryCard/CategoryCard";
import ProductCard from "../components/ProductCard/productCard";
import { products, categories } from "../data/products";
import "./home.css";

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under R500", min: 0, max: 500 },
  { label: "R500 – R1500", min: 500, max: 1500 },
  { label: "Over R1500", min: 1500, max: Infinity }
];

function Home() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") || "";

  const [activeCategory, setActiveCategory] = useState("All");
  const [activeRange, setActiveRange] = useState(PRICE_RANGES[0]);

  
  const handleCategorySelect = (category) => {
    setActiveCategory((prev) => (prev === category ? "All" : category));
  };

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;

      const matchesPrice =
        product.price >= activeRange.min && product.price < activeRange.max;

      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesPrice && matchesSearch;
    });
  }, [activeCategory, activeRange, searchTerm]);

  return (
    <>
      <HomeHero />
      <TrustBadges />
      <BrandStrip />
      <DiscoverRowOne />
      <BrowseCategories />
      <DiscoverRowTwo />

      <main className="home" id="product-section">
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
      </main>
    </>
  );
}

export default Home;
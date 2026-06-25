import { Link } from "react-router-dom";
import HomeHero from "../components/HomeHero/homeHero";
import TrustBadges from "../components/TrustBadges/trustBadge";
import BrandStrip from "../components/BrandStrip/brandStrip";
import { DiscoverRowOne, DiscoverRowTwo } from "../components/DiscoverSection/discoverSection";
import BrowseCategories from "../components/BrowseCategories/browseCategories";
import "./home.css";

function Home() {
  return (
    <>
      <HomeHero />
      <TrustBadges />
      <BrandStrip />
      <DiscoverRowOne />
      <BrowseCategories />
      <DiscoverRowTwo />

      <section className="home-cta-section">
        <div className="home-cta-card">
          <h2>Find all deals on our products page</h2>
          <p>Click through to browse the full collection on a dedicated page.</p>
          <Link to="/products" className="home-cta-button">
            Go to products
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;

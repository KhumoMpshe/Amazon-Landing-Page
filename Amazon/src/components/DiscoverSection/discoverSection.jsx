import { Link } from "react-router-dom";
import PromoRow from "../PromoRow/promoRow";
import "./discoverSection.css";

const ROW_ONE = [
  {
    id: "computers",
    title: "Shop Computers & Accessories",
    cta: "Discover more",
    subImages: [
      { label: "Accessories", image: "https://m.media-amazon.com/images/I/71BdtmQDA2L._AC_UL480_FMwebp_QL65_.jpg" },
      { label: "Laptops", image: "https://m.media-amazon.com/images/I/71APX2UPTVL._AC_SR480,440_.jpg" },
      { label: "Components", image: "https://m.media-amazon.com/images/I/61c+5YEBcAL._AC_UL480_FMwebp_QL65_.jpg" },
      { label: "Monitors", image: "https://m.media-amazon.com/images/I/71xZJNua6OL._AC_UL480_FMwebp_QL65_.jpg" }
    ]
  },
  {
    id: "tv",
    title: "Shop TV & Home Entertainment",
    cta: "Discover More",
    image: "https://m.media-amazon.com/images/I/61+DcQQftBL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    id: "toystory",
    title: "Toy Story merch",
    cta: "Shop now",
    image: "https://m.media-amazon.com/images/I/61n3J9uJ8WL._AC_SR480,440_.jpg"
  },
  {
    id: "belkin-deals",
    title: "Deals that sound great - Belkin",
    cta: "Shop now",
    image: "https://m.media-amazon.com/images/I/61cvDrkg+7L._AC_UL480_FMwebp_QL65_.jpg"
  }
];

const ROW_TWO = [
  {
    id: "books-under",
    title: "Books under R250",
    cta: "Shop now",
    image: "https://m.media-amazon.com/images/I/81gC3mdNi5L._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    id: "headphones",
    title: "Shop Headphones & Speakers",
    cta: "Discover more",
    subImages: [
      { label: "Headphones", image: "https://m.media-amazon.com/images/I/71Fe59nUQOL._AC_UL480_FMwebp_QL65_.jpg" },
      { label: "Portable Speakers", image: "https://m.media-amazon.com/images/I/81ppVTO6kJL._AC_UL480_FMwebp_QL65_.jpg" },
      { label: "Soundbars", image: "https://m.media-amazon.com/images/I/41SJhbXuwPL._AC_UL480_FMwebp_QL65_.jpg" },
      { label: "Earbuds", image: "https://m.media-amazon.com/images/I/51VRW+4dYgL._AC_UL480_FMwebp_QL65_.jpg" }
    ]
  },
  {
    id: "home-improvement",
    title: "Shop Home Improvement",
    cta: "Shop Now",
    image: "https://m.media-amazon.com/images/I/71I7uft-KAL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    id: "cosmetics",
    title: "Deals on Skin Functional",
    cta: "Shop more",
    image: "https://images-eu.ssl-images-amazon.com/images/G/53/RBSxFELA/2025/SKin_Functional_0.5x._SY304_CB759721253_.jpg"
  }
];

function scrollToProducts() {
  document.getElementById("product-section")?.scrollIntoView({ behavior: "smooth" });
}

export function DiscoverRowOne() {
  return (
    <section className="discover-section">
      <PromoRow cards={ROW_ONE} onCardClick={scrollToProducts} />
    </section>
  );
}

export function DiscoverRowTwo() {
  return (
    <section className="discover-section">
      <PromoRow cards={ROW_TWO} onCardClick={scrollToProducts} />

      <p className="browsing-history-note">
        After viewing product detail pages, look here to find an easy way to
        navigate back to pages you are interested in.{" "}
        <Link to="/" className="browsing-history-link">
          View or edit your browsing history
        </Link>
      </p>
    </section>
  );
}
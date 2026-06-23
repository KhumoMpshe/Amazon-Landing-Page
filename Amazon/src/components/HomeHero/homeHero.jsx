import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from "react-icons/fa";
import PromoRow from "../PromoRow/promoRow";
import "./homeHero.css";

// Carousel slides. Each one mirrors the layout of the real Amazon hero:
// a bold heading, a short line, a sub-line, and a background colour.
const SLIDES = [
  {
    id: 1,
    backgroundImage:
      "https://m.media-amazon.com/images/I/71Hene8PeZL._SR3000,600_.jpg",
    bg: "#0076ff",
    imageOnly: true
  },
  {
    id: 2,
    backgroundImage:
      "https://m.media-amazon.com/images/I/61KNtN4L4pL._SR3000,600_.jpg",
    bg: "#0f1111",
    imageOnly: true
  },
  {
    id: 3,
    backgroundImage:
      "https://m.media-amazon.com/images/I/61WH4lrlVrL._SX3000_.jpg",
    bg: "#e8743b",
    imageOnly: true
  }
];

// Second-row promo cards (the smaller 4-up + 4-up grid below the carousel).
// Each one scrolls down to the product grid when clicked, per the brief.
const PROMO_CARDS = [
  {
    id: "prime",
    title: "Meet Amazon Prime",
    cta: "Start your 30 day free trial",
    image: "https://placehold.co/400x300/1f5fd6/ffffff?text=Amazon+Prime"
  },
  {
    id: "home",
    title: "Up to 35% of Home & Kitchen",
    cta: "Shop Now",
    image: "https://images-eu.ssl-images-amazon.com/images/G/53/RBSxFELA/2026/Primeday/Home_and_kitchen0.5x._SY304_CB759895011_.jpg"
  },
  {
    id: "deals",
    title: "Steal deals",
    cta: "Shop Now",
    image: "https://images-eu.ssl-images-amazon.com/images/G/53/RBSxFELA/2025/BuzzDeals/Steal_deals0.5x._SY304_CB759706798_.jpg"
  },
  {
    id: "cosmetics",
    title: "Enjoy up to 45% off on Nivea",
    cta: "Shop Now",
    image: "https://images-eu.ssl-images-amazon.com/images/G/53/RBSxFELA/2025/Raeesa/NIVEA_AMAZON_RSA_HVE_PLATINUM_PACKAGE_BANNER_02_379x304_1._SY304_CB759913199_.jpg"
  },
  {
    id: "fathersday",
    title: "Shop the perfect gift this Fathers Day",
    cta: "Shop now",
    image: "https://images-eu.ssl-images-amazon.com/images/G/53/RBSxFELA/2026/Primeday/Frame_2._SY304_CB759693611_.jpg"
  },
  {
    id: "primevideo",
    title: "Prime Day Deals",
    cta: "Shop Now",
    image: "https://images-eu.ssl-images-amazon.com/images/G/53/RBSxFELA/2025/BuzzDeals/PRime_day_deals0.5x._SY304_CB759706798_.jpg"
  },
  {
    id: "shoes",
    title: "Up to 30% off Shoes",
    cta: "Shop now",
    image: "https://images-eu.ssl-images-amazon.com/images/G/53/RBSxFELA/2025/BuzzDeals/Shoes_0.5x._SY304_CB759706798_.jpg"
  },
  {
    id: "baby",
    title: "Shop Baby Deals",
    cta: "Shop Now",
    image: "https://images-eu.ssl-images-amazon.com/images/G/53/RBSxFELA/2025/Baby0.5x_2_1._SY304_CB759943858_.jpg"
  }
];

function HomeHero() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  // Auto-advance every 5s unless paused. Cleaning up the interval on every
  // dependency change is what stops multiple timers stacking up.
  useEffect(() => {
    if (paused) return;

    timerRef.current = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5000);

    return () => clearInterval(timerRef.current);
  }, [paused]);

  const goToSlide = (index) => {
    setSlideIndex((index + SLIDES.length) % SLIDES.length);
  };

  const scrollToProducts = () => {
    document.getElementById("product-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const slide = SLIDES[slideIndex];
  const carouselStyle = slide.imageOnly
    ? { backgroundColor: slide.bg }
    : {
        backgroundColor: slide.bg,
        backgroundImage: `url(${slide.backgroundImage})`
      };

  return (
    <div className="home-hero">
      <div
        className={`carousel${slide.imageOnly ? " carousel-image-only" : ""}`}
        style={carouselStyle}
      >
        <button
          className="carousel-arrow left"
          onClick={() => goToSlide(slideIndex - 1)}
          aria-label="Previous slide"
        >
          <FaChevronLeft />
        </button>

        {slide.imageOnly ? (
          <img
            src={slide.backgroundImage}
            alt="Amazon hero"
            className="carousel-image-only-img"
          />
        ) : (
          <div className="carousel-content">
            <div className="carousel-text">
              <h1>{slide.heading}</h1>
              <p className="carousel-subheading">{slide.subheading}</p>
              <p className="carousel-note">{slide.note}</p>
            </div>
            <img src={slide.image} alt={slide.heading} className="carousel-img" />
          </div>
        )}

        <button
          className="carousel-arrow right"
          onClick={() => goToSlide(slideIndex + 1)}
          aria-label="Next slide"
        >
          <FaChevronRight />
        </button>

        <button
          className="carousel-pause"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play carousel" : "Pause carousel"}
        >
          {paused ? <FaPlay /> : <FaPause />}
        </button>

        <div className="carousel-dots">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              className={`carousel-dot ${i === slideIndex ? "active" : ""}`}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="hero-promo-overlap">
        <PromoRow cards={PROMO_CARDS} onCardClick={scrollToProducts} />
      </div>
    </div>
  );
}

export default HomeHero;
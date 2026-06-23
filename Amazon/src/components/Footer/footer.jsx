import logo from "../../assets/logo.svg";
import "./footer.css";

const FOOTER_COLUMNS = [
  {
    title: "Get to Know Us",
    links: ["Careers", "Legal Notice", "Welcome to Amazon.co.za"]
  },
  {
    title: "Make Money with Us",
    links: ["Advertise Your Products", "Sell on Amazon", "Supply to Amazon"]
  },
  {
    title: "Amazon Payment Methods",
    links: ["Payment Methods Help"]
  },
  {
    title: "Let Us Help You",
    links: [
      "Track Packages or View Orders",
      "Shipping & Delivery",
      "Returns & Replacements",
      "Recalls and Product Safety Alerts",
      "Customer Service",
      "Amazon Mobile App"
    ]
  }
];

const FOOTER_SERVICES = [
  {
    title: "Amazon Advertising",
    description: "Find, attract, and engage customers"
  },
  {
    title: "Kindle Direct Publishing",
    description: "Indie Digital & Print Publishing Made Easy"
  },
  {
    title: "IMDb",
    description: "Movies, TV & Celebrities"
  },
  {
    title: "Goodreads",
    description: "Book reviews & recommendations"
  },
  {
    title: "Amazon Web Services",
    description: "Scalable Cloud Computing Services"
  }
];

const LEGAL_LINKS = [
  "Conditions of Use & Sale",
  "Privacy Notice",
  "Cookies Notice",
  "Legal Notice",
  "Interest-Based Ads Notice"
];

function Footer() {
  return (
    <footer className="footer">
      <button
        type="button"
        className="footer-back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back to top
      </button>

      <div className="footer-main">
        <div className="footer-links">
          {FOOTER_COLUMNS.map((column) => (
            <div className="footer-col" key={column.title}>
              <h4>{column.title}</h4>
              <ul>
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-region">
          <img src={logo} alt="Amazon" className="footer-logo" />
          <button type="button" className="footer-locale">
            <span className="footer-flag" aria-hidden="true">
              <img src="https://img.icons8.com/?size=100&id=60230&format=png&color=000000" alt="South Africa" />
            </span>
            South Africa
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-services">
          {FOOTER_SERVICES.map((service) => (
            <div className="footer-service-col" key={service.title}>
              <h5>{service.title}</h5>
              <p>{service.description}</p>
            </div>
          ))}
        </div>

        <div className="footer-legal">
          <p className="footer-legal-links">
            {LEGAL_LINKS.map((link) => (
              <a key={link} href="#">
                {link}
              </a>
            ))}
          </p>
          <p className="footer-copyright">
            © 1996-2026, Amazon.com, Inc. or its affiliates
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

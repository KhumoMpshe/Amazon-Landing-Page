import { Link } from "react-router-dom";
import "./checkoutProgress.css";

const steps = [
  { id: "ship", label: "Shipping", path: "/checkout" },
  { id: "pay", label: "Payment", path: "/checkout/payment" },
  { id: "done", label: "Confirmation", path: "/checkout/confirmation" },
];

export default function CheckoutProgress({ activeId, disableStepLinks = false }) {
  const activeIndex = steps.findIndex((s) => s.id === activeId);

  return (
    <nav className="checkout-progress" aria-label="Checkout steps">
      <ol className="checkout-progress__list">
        {steps.map((step, index) => {
          const state =
            index < activeIndex ? "done" : index === activeIndex ? "current" : "upcoming";
          const isClickable = !disableStepLinks && index <= activeIndex && step.id !== "done";

          return (
            <li
              key={step.id}
              className={`checkout-progress__item checkout-progress__item--${state}`}
            >
              {isClickable && step.path ? (
                <Link to={step.path} className="checkout-progress__link">
                  <span className="checkout-progress__index">{index + 1}</span>
                  {step.label}
                </Link>
              ) : (
                <span className="checkout-progress__static">
                  <span className="checkout-progress__index">{index + 1}</span>
                  {step.label}
                </span>
              )}
              {index < steps.length - 1 && (
                <span className="checkout-progress__chev" aria-hidden>
                  ›
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

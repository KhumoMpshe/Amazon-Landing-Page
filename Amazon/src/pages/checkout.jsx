import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";
import "./checkout.css";

const DELIVERY_OPTIONS = [
  { id: "standard", label: "Standard Delivery", detail: "3–5 business days", cost: 0 },
  { id: "express", label: "Express Delivery", detail: "1–2 business days", cost: 99 }
];

function Checkout() {
  const { cart, subtotal, clearCart } = useCart();

  const [form, setForm] = useState({ name: "", address: "", city: "", postalCode: "" });
  const [delivery, setDelivery] = useState(DELIVERY_OPTIONS[0]);
  const [placed, setPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    setOrderNumber(`AMZ-${Math.floor(100000 + Math.random() * 900000)}`);
    setPlaced(true);
    clearCart();
  };

  const total = subtotal + delivery.cost;

  if (cart.length === 0 && !placed) {
    return (
      <main className="checkout-page">
        <p>Your cart is empty — nothing to check out yet.</p>
        <Link to="/" className="continue-link">Continue shopping</Link>
      </main>
    );
  }

  if (placed) {
    return (
      <main className="checkout-page confirmation">
        <h1>Order placed! 🎉</h1>
        <p>Thanks, {form.name || "shopper"} — your order is confirmed.</p>
        <p className="order-number">Order number: <strong>{orderNumber}</strong></p>
        <p className="delivery-note">
          {delivery.label} — arriving in {delivery.detail}.
        </p>
        <Link to="/" className="continue-link">Back to home</Link>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          <h2>Shipping address</h2>

          <label>
            Full name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Street address
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </label>

          <div className="form-row">
            <label>
              City
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Postal code
              <input
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <h2>Delivery option</h2>

          <div className="delivery-options">
            {DELIVERY_OPTIONS.map((option) => (
              <label key={option.id} className="delivery-option">
                <input
                  type="radio"
                  name="delivery"
                  checked={delivery.id === option.id}
                  onChange={() => setDelivery(option)}
                />
                <span>
                  <strong>{option.label}</strong> — {option.detail}
                  {option.cost > 0 ? ` (R${option.cost})` : " (Free)"}
                </span>
              </label>
            ))}
          </div>

          <button type="submit" className="place-order-btn">
            Place order
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Order summary</h2>
          <p className="summary-row">
            <span>Subtotal</span> <span>R{subtotal.toLocaleString()}</span>
          </p>
          <p className="summary-row">
            <span>Delivery</span>
            <span>{delivery.cost > 0 ? `R${delivery.cost}` : "Free"}</span>
          </p>
          <p className="summary-row total">
            <span>Total</span> <span>R{total.toLocaleString()}</span>
          </p>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;

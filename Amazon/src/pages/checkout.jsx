import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { useAccount } from "../context/accountContext";
import CheckoutProgress from "../components/CheckoutProgress/checkoutProgress";
import "./checkout.css";

const DELIVERY_OPTIONS = [
  { id: "standard", label: "Standard Delivery", detail: "3–5 business days", cost: 0 },
  { id: "express", label: "Express Delivery", detail: "1–2 business days", cost: 99 }
];

function ShippingStage({ form, handleChange, delivery, setDelivery, onContinue }) {
  return (
    <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
      <h2>Shipping address</h2>

      <label>
        Full name
        <input name="name" value={form.name} onChange={handleChange} required />
      </label>

      <label>
        Street address
        <input name="address" value={form.address} onChange={handleChange} required />
      </label>

      <div className="form-row">
        <label>
          City
          <input name="city" value={form.city} onChange={handleChange} required />
        </label>

        <label>
          Postal code
          <input name="postalCode" value={form.postalCode} onChange={handleChange} required />
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

      <button type="button" className="place-order-btn" onClick={onContinue}>
        Continue to payment
      </button>
    </form>
  );
}

function PaymentStage({ paymentMethod, setPaymentMethod, cardNumber, setCardNumber, expiryDate, setExpiryDate, cvv, setCvv, onBack, onPay }) {
  return (
    <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
      <h2>Payment details</h2>

      <label>
        Payment method
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="card">Credit / debit card</option>
          <option value="paypal">PayPal</option>
        </select>
      </label>

      {paymentMethod === "card" && (
        <>
          <label>
            Card number
            <input
              name="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </label>

          <div className="form-row">
            <label>
              Expiry date
              <input
                name="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                required
              />
            </label>

            <label>
              CVV
              <input name="cvv" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
            </label>
          </div>
        </>
      )}

      <div className="checkout-buttons">
        <button type="button" className="secondary-btn" onClick={onBack}>
          Back to shipping
        </button>
        <button type="button" className="place-order-btn" onClick={onPay}>
          Pay now
        </button>
      </div>
    </form>
  );
}

function ReviewStage() {
  return null;
}

function Checkout() {
  const { cart, subtotal, clearCart } = useCart();
  const { user, addOrder } = useAccount();

  const [form, setForm] = useState({ name: "", address: "", city: "", postalCode: "" });
  const [delivery, setDelivery] = useState(DELIVERY_OPTIONS[0]);
  const [step, setStep] = useState("shipping");
  const [placed, setPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const [paidAt, setPaidAt] = useState(null);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const orderId = `AMZ-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderItems = cart.map((item) => ({ ...item }));
    const order = {
      id: orderId,
      name: form.name,
      email: user?.email || "guest",
      items: orderItems,
      subtotal,
      delivery,
      paymentMethod,
      total: subtotal + delivery.cost,
      placedAt: new Date().toLocaleString(),
      status: "Order placed"
    };

    setOrderNumber(orderId);
    setPaidAt(order.placedAt);
    setPurchasedItems(orderItems);
    setPlaced(true);
    if (addOrder) {
      addOrder(order);
    }
    clearCart();
  };

  const total = subtotal + delivery.cost;
  const activeStep = step === "payment" ? "pay" : step === "confirmation" ? "done" : "ship";

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
        <CheckoutProgress activeId="done" disableStepLinks={true} />
        <h1>Order placed! 🎉</h1>
        <p>Thanks, {form.name || "shopper"} — your order is confirmed.</p>
        <p className="order-number">
          Order number: <strong>{orderNumber}</strong>
        </p>
        <p className="delivery-note">
          {delivery.label} — arriving in {delivery.detail}.
        </p>
        <p className="payment-note">
          Paid on {paidAt} via {paymentMethod === "card" ? "card" : "PayPal"}.
        </p>

        <section className="confirmation-items">
          <h2>Items paid for</h2>
          <div className="confirmation-item-list">
            {purchasedItems.map((item) => (
              <div key={item.id} className="confirmation-item-row">
                <img src={item.image} alt={item.title} />
                <div>
                  <p className="confirmation-item-title">{item.title}</p>
                  <p className="confirmation-item-meta">Qty: {item.quantity}</p>
                </div>
                <p className="confirmation-item-price">R{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="order-tracking">
          <h2>Track your order</h2>
          <p>Your order is being processed. Use the order number below to track delivery status.</p>
          <p className="tracking-number">
            Tracking number: <strong>{orderNumber}</strong>
          </p>
          <ul className="tracking-steps">
            <li>Order placed</li>
            <li>Processing</li>
            <li>Shipped</li>
            <li>Out for delivery</li>
            <li>Delivered</li>
          </ul>
        </section>

        <Link to="/" className="continue-link">Back to home</Link>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <CheckoutProgress activeId={activeStep} />
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <div>
          {step === "shipping" && (
            <ShippingStage
              form={form}
              handleChange={handleChange}
              delivery={delivery}
              setDelivery={setDelivery}
              onContinue={() => setStep("payment")}
            />
          )}

          {step === "payment" && (
            <PaymentStage
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              cardNumber={cardNumber}
              setCardNumber={setCardNumber}
              expiryDate={expiryDate}
              setExpiryDate={setExpiryDate}
              cvv={cvv}
              setCvv={setCvv}
              onBack={() => setStep("shipping")}
              onPay={handlePlaceOrder}
            />
          )}
        </div>

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

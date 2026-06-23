import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";
import CartItem from "../components/CartItem/CartItem";
import RecommendedProducts from "../components/RecommendedProducts/recommendedProducts";
import "./cart.css";

function Cart() {
  const { cart, subtotal } = useCart();

  return (
    <main className="cart-page">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/" className="continue-link">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <section className="cart-items">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </section>

          <aside className="cart-summary">
            <p className="summary-line">
              Subtotal ({cart.reduce((n, item) => n + item.quantity, 0)} items):
              <strong> R{subtotal.toLocaleString()}</strong>
            </p>
            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      )}

      <RecommendedProducts cart={cart} />
    </main>
  );
}

export default Cart;
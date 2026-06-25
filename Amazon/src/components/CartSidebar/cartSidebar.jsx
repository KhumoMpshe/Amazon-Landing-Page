import { Link } from "react-router-dom";
import { useCart } from "../../context/cartContext";
import "./cartSidebar.css";

function CartSidebar() {
  const { cart, subtotal, closeCart, updateQuantity, removeFromCart, removeWithZero } = useCart();

  return (
    <aside className="cart-sidebar">
      <div className="cart-sidebar-header">
        <h3>Your basket</h3>
      </div>

      {cart.length === 0 ? (
        <div className="cart-sidebar-empty">Your basket is empty.</div>
      ) : (
        <>
          <div className="cart-sidebar-body">
            {cart.map((item) => (
              <div className="cart-sidebar-item" key={item.id}>
                <img src={item.image} alt={item.title} />

                <div className="cart-sidebar-item-main">
                  <p className="cart-sidebar-item-title">{item.title}</p>
                  <p className="cart-sidebar-item-meta">R{(item.price || 0).toLocaleString()}</p>

                  <div className="qty-control-pill">
                    <button
                      aria-label="Decrease quantity"
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                      disabled={item.quantity <= 1}
                      className="qty-icon"
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() => updateQuantity(item.id, (item.quantity || 0) + 1)}
                      className="qty-icon"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-sidebar-item-actions">
                  <button className="remove-btn" onClick={() => removeWithZero(item.id)} aria-label="Remove item">🗑</button>
                  <div className="cart-sidebar-item-price">R{((item.price || 0) * (item.quantity || 0)).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-sidebar-footer">
            <p className="cart-sidebar-subtotal">
              Subtotal ({cart.reduce((sum, item) => sum + (item.quantity || 0), 0)} items):
              <strong> R{(subtotal || 0).toLocaleString()}</strong>
            </p>

            <div className="cart-sidebar-actions">
                
                <Link to="/cart" className="cart-sidebar-view" onClick={closeCart}>
                Go to basket
              </Link>
              <Link to="/checkout" className="cart-sidebar-checkout" onClick={closeCart}>
                Proceed to checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </aside>
  );
}

export default CartSidebar;

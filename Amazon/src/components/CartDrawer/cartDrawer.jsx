import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../context/cartContext";
import { createPortal } from "react-dom";
import "./cartDrawer.css";

function CartDrawer() {
  const { drawerOpen, closeCart, cart, subtotal } = useCart();

  if (!drawerOpen) {
    return null;
  }

  const location = useLocation();

  // When on the products page we show the inline CartSidebar instead of the global drawer
  if (location.pathname && location.pathname.startsWith("/products")) {
    return null;
  }

  const drawer = (
    <div className="cart-drawer-backdrop" onClick={closeCart}>
      <aside className="cart-drawer" onClick={(event) => event.stopPropagation()}>
        <div className="cart-drawer-header">
          <h2>Your basket</h2>
          <button className="drawer-close" onClick={closeCart} aria-label="Close cart drawer">
            ×
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-drawer-empty">Your basket is empty.</div>
        ) : (
          <>
            <div className="cart-drawer-body">
              {(() => {
                try {
                  return cart.map((item) => (
                    <div className="cart-drawer-item" key={item.id}>
                      <img src={item.image} alt={item.title} />
                      <div className="cart-drawer-item-main">
                        <p className="cart-drawer-item-title">{item.title}</p>
                        <p className="cart-drawer-item-meta">
                          {item.quantity} × R{(item.price || 0).toLocaleString()}
                        </p>
                      </div>
                      <div className="cart-drawer-item-price">R{((item.price || 0) * (item.quantity || 0)).toLocaleString()}</div>
                    </div>
                  ));
                } catch (err) {
                  console.error("Error rendering cart items:", err, cart);
                  return <div className="cart-drawer-error">Could not render cart items.</div>;
                }
              })()}
            </div>

            <div className="cart-drawer-footer">
              <p className="cart-drawer-subtotal">
                Subtotal ({cart.reduce((sum, item) => sum + (item.quantity || 0), 0)} items):
                <strong> R{(subtotal || 0).toLocaleString()}</strong>
              </p>

              <div className="cart-drawer-actions">
                <Link to="/cart" className="drawer-view-cart" onClick={closeCart}>
                  View basket
                </Link>

                <Link to="/checkout" className="drawer-checkout" onClick={closeCart}>
                  Proceed to checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(drawer, document.body) : drawer;
}

export default CartDrawer;

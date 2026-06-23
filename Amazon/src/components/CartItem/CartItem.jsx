import { useCart } from "../../context/cartContext";
import "./cartItem.css";

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} className="cart-item-img" />

      <div className="cart-item-details">
        <h3 className="cart-item-title">{item.title}</h3>
        <p className="cart-item-price">R{item.price.toLocaleString()}</p>

        <div className="cart-item-actions">
          <div className="qty-control">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="qty-value">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            className="remove-btn"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      </div>

      <p className="cart-item-line-total">
        R{(item.price * item.quantity).toLocaleString()}
      </p>
    </div>
  );
}

export default CartItem;

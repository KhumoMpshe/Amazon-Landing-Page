import { useCart } from "../../context/cartContext";
import "./productCard.css";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-img" />

      <h3 className="product-title">{product.title}</h3>

      <p className="product-rating">
        {"⭐".repeat(Math.round(product.rating))}{" "}
        <span className="rating-number">{product.rating}</span>
      </p>

      <p className="product-price">R{product.price.toLocaleString()}</p>

      <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
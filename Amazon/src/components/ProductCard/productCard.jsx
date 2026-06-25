import { useCart } from "../../context/cartContext";
import "./productCard.css";

function ProductCard({ product }) {
  const { addToCartAndOpen } = useCart();
  const oldPrice = Math.round(product.price * 1.18);

  return (
    <div className="product-card">
      <div className="product-img-wrap">
        <img src={product.image} alt={product.title} className="product-img" />
      </div>
      <div className="product-details">
        <h3 className="product-title">{product.title}</h3>

        <div className="product-rating-row">
          <span className="product-rating">
            {"⭐".repeat(Math.round(product.rating))}
          </span>
          <span className="rating-number">{product.rating.toFixed(1)}</span>
          <span className="product-sales">50+ bought in past month</span>
        </div>

        <div className="product-pricing-row">
          <p className="product-price">R{product.price.toLocaleString()}</p>
          <p className="product-old-price">Was: R{oldPrice.toLocaleString()}</p>
        </div>

        <p className="product-promo">15% off promotion available</p>
        <p className="product-delivery">
          FREE delivery Fri, 26 Jun on your first order shipped by Amazon.
        </p>
        <p className="product-delivery product-delivery-fastest">
          Or fastest delivery Tomorrow, 25 Jun
        </p>
        <p className="product-stock">Only 14 left in stock.</p>
      </div>

      <button
        className="add-to-cart-btn"
        onClick={() => addToCartAndOpen(product)}
      >
        Add to basket
      </button>
    </div>
  );
}

export default ProductCard;
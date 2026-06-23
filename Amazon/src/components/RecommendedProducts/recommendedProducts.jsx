import { products } from "../../data/products";
import ProductCard from "../ProductCard/productCard";
import "./recommendedProducts.css";

function RecommendedProducts({ cart }) {
  const cartIds = new Set(cart.map((item) => item.id));
  const cartCategories = new Set(cart.map((item) => item.category));

  const recommended = products
    .filter((product) => !cartIds.has(product.id))
    .filter((product) => cartCategories.size === 0 || cartCategories.has(product.category))
    .slice(0, 4);

  if (recommended.length === 0) return null;

  return (
    <section className="recommended">
      <h2 className="recommended-title">You may also like</h2>
      <div className="recommended-grid">
        {recommended.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default RecommendedProducts;
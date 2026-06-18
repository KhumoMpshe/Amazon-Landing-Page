function ProductCard({ product }) {
  return (
    <div>
      <img src={product.image} />

      <h3>{product.title}</h3>

      <p>R{product.price}</p>

      <p>⭐ {product.rating}</p>

      <button>
        Add to Cart
      </button>
    </div>
  );
}
import "./categoryCard.css";

function CategoryCard({ category, active, onSelect }) {
  return (
    <button
      className={`category-card ${active ? "active" : ""}`}
      onClick={() => onSelect(category)}
    >
      {category}
    </button>
  );
}

export default CategoryCard;

import "./promoRow.css";

function PromoRow({ cards, onCardClick }) {
  return (
    <div className="promo-grid">
      {cards.map((card) => (
        <div key={card.id} className="promo-card">
          <h3>{card.title}</h3>

          {card.subImages ? (
            <div className="promo-subgrid">
              {card.subImages.map((sub) => (
                <div className="promo-subitem" key={sub.label}>
                  <img src={sub.image} alt={sub.label} />
                  <span>{sub.label}</span>
                </div>
              ))}
            </div>
          ) : (
            <img src={card.image} alt={card.title} className="promo-img" />
          )}

          <button className="promo-cta" onClick={onCardClick}>
            {card.cta}
          </button>
        </div>
      ))}
    </div>
  );
}

export default PromoRow;

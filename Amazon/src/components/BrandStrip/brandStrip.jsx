import "./brandStrip.css";

const BRANDS = [
  { id: 1, name: "Authorised Reseller", sub: true },
  { id: 2, name: "WEBER", style: "boxed" },
  { id: 3, name: "belkin", style: "plain" },
  { id: 4, name: "smeg", style: "dotted" },
  { id: 5, name: "Instant", style: "plain" },
  { id: 6, name: "JBL", style: "tile-red" },
  { id: 7, name: "LEGO", style: "tile-red-border" }
];

function BrandStrip() {
  return (
    <section className="brand-strip">
      <h2>Shop by Brand</h2>

      <div className="brand-row">
        {BRANDS.map((brand) => (
          <div key={brand.id} className={`brand-item brand-${brand.style || "plain"}`}>
            {brand.name}
          </div>
        ))}
      </div>
    </section>
  );
}

export default BrandStrip;

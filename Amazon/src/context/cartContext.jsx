import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Load cart from localStorage once, on first render.
  const [cart, setCart] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("cart"));
      return Array.isArray(stored) ? stored : [];
    } catch {
      return [];
    }
  });

  // Keep localStorage in sync whenever the cart changes.
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add a product to the cart. If it's already in there, bump the quantity
  // instead of creating a duplicate row.
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Set an exact quantity. Used by the +/- controls in the cart page.
  // Quantity can never drop below 1 here — use removeFromCart to delete a line.
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;

    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  // Total number of items in the cart, counting quantity (for the navbar badge).
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Sum of price * quantity across the whole cart.
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook so components just call useCart() instead of importing
// CartContext + useContext everywhere.
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside a <CartProvider>");
  }

  return context;
}

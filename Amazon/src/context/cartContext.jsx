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
    try {
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
      console.debug("Cart: added product", product && product.id, product && product.title);
    } catch (err) {
      console.error("Error in addToCart:", err, product);
    }
  };

  const addToCartAndOpen = (product) => {
    try {
      addToCart(product);
      setDrawerOpen(true);
      console.debug("Cart drawer opened after add", product && product.id);
    } catch (err) {
      console.error("Error in addToCartAndOpen:", err, product);
    }
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const next = prev.filter((item) => item.id !== id);

      // If removing this item leaves the cart empty, close the drawer.
      if (next.length === 0) {
        setDrawerOpen(false);
      }

      return next;
    });
  };

  // Animate removal: set quantity to 0 so the UI shows `0`, then remove
  // the item after a short delay. This gives a visible feedback before
  // the line disappears (and the drawer may close if cart becomes empty).
  const removeWithZero = (id, delay = 600) => {
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: 0 } : item)));

    // Schedule actual removal after the delay.
    setTimeout(() => {
      setCart((prev) => {
        const next = prev.filter((item) => item.id !== id);
        if (next.length === 0) setDrawerOpen(false);
        return next;
      });
    }, delay);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  const openCart = () => setDrawerOpen(true);
  const closeCart = () => setDrawerOpen(false);

  const updateQuantity = (id, quantity) => {
    if (quantity < 0) return;

    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  // Ensure the drawer closes automatically whenever the cart becomes empty.
  useEffect(() => {
    if (cart.length === 0 && drawerOpen) {
      setDrawerOpen(false);
    }
  }, [cart, drawerOpen]);

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
        addToCartAndOpen,
        removeFromCart,
        removeWithZero,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        drawerOpen,
        openCart,
        closeCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside a <CartProvider>");
  }

  return context;
}

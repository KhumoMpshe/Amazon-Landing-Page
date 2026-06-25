import { createContext, useContext, useState, useEffect } from "react";

const AccountContext = createContext(null);

export function AccountProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("accountUser"));
      return stored && stored.name ? stored : null;
    } catch {
      return null;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("accountOrders"));
      return Array.isArray(stored) ? stored : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("accountUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("accountUser");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("accountOrders", JSON.stringify(orders));
  }, [orders]);

  const signIn = ({ name, email }) => {
    setUser({ name, email });
  };

  const signOut = () => {
    setUser(null);
  };

  const addOrder = (order) => {
    setOrders((prev) => [...prev, order]);
  };

  const removeOrder = (orderId) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  const currentOrders = user ? orders.filter((order) => order.email === user.email) : [];

  return (
    <AccountContext.Provider value={{ user, signIn, signOut, addOrder, removeOrder, currentOrders }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);

  if (!context) {
    throw new Error("useAccount must be used inside an <AccountProvider>");
  }

  return context;
}

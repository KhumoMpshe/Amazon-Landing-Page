const [cart, setCart] = useState([]);

useEffect(() => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );
}, [cart]);

useEffect(() => {
  const stored =
    JSON.parse(localStorage.getItem("cart"));

  if (stored) {
    setCart(stored);
  }
}, []);

const addToCart = (product) => {
  setCart([...cart, product]);
};

const removeFromCart = (id) => {
  setCart(
    cart.filter(item => item.id !== id)
  );
};
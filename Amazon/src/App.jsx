import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Footer from "./components/Footer/footer";
import CartDrawer from "./components/CartDrawer/cartDrawer";
import Home from "./pages/home";
import Products from "./pages/products";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import Orders from "./pages/orders";
import SignIn from "./pages/signIn";
import { CartProvider } from "./context/cartContext";
import { AccountProvider } from "./context/accountContext";
import { ThemeProvider } from "./context/themeContext";

function App() {
  return (
    <ThemeProvider>
      <AccountProvider>
        <CartProvider>
          <BrowserRouter>
            <Navbar />
            <CartDrawer />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout/*" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/signin" element={<SignIn />} />
            </Routes>

            <Footer />
          </BrowserRouter>
        </CartProvider>
      </AccountProvider>
    </ThemeProvider>
  );
}

export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Footer from "./components/Footer/footer";
import Home from "./pages/home";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import { CartProvider } from "./context/cartContext";
import { ThemeProvider } from "./context/themeContext";

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;


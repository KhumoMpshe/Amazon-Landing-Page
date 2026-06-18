import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Home from "./pages/home";
import Cart from "./pages/cart";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />
      </Routes>
    </BrowserRouter>
  );

  const [darkMode, setDarkMode] =
  useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
  localStorage.setItem(
    "theme",
    darkMode ? "dark" : "light"
  );
}, [darkMode]);
}

<button
  onClick={() =>
    setDarkMode(!darkMode)
  }
>
  Toggle Theme
</button>

export default App;


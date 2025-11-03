import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import NewArrival from "./pages/NewArrival";
import Collections from "./pages/Collections";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import CartPage from "./pages/CartPage";
import AuthPage from "./pages/AuthPage";
import { SearchProvider } from "./context/SearchContext"; // ✅ Added context

function App() {
  return (
    <SearchProvider>
      <Router>
        <Navbar />
        <div style={{ marginTop: "90px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/new-arrivals" element={<NewArrival />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </Router>
    </SearchProvider>
  );
}

export default App;



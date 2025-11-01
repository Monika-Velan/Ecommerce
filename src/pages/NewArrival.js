import React, { useState, useEffect } from "react";
import "../style/newarrival.css";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

// ✅ Image imports
import bridal from "../assets/Bridal Jewellery.jpeg";
import choker from "../assets/BRIDAL CHOKER 1.jpeg";
import earring1 from "../assets/EARRING 1.jpeg";
import ring1 from "../assets/RING 1.jpeg";
import pendant1 from "../assets/PENDANT 1.jpeg";
import goldset from "../assets/GOLD JEWELLERY SET 1.jpeg";
import neckpiece from "../assets/NECKPIECE NEW ARRIVAL.jpeg";
import fashion from "../assets/Fashion Jewellery.jpeg";

const products = [
  { id: 1, name: "Bridal Jewellery Set", image: bridal, price: "₹5,499", offer: "15% OFF" },
  { id: 2, name: "Choker Necklace", image: choker, price: "₹2,299", offer: "10% OFF" },
  { id: 3, name: "Earring Collection", image: earring1, price: "₹1,099", offer: "New Arrival" },
  { id: 4, name: "Ring Collection", image: ring1, price: "₹999", offer: "Limited Offer" },
  { id: 5, name: "Neckpiece Charm", image: neckpiece, price: "₹2,799", offer: "Buy 1 Get 1" },
  { id: 6, name: "Gold Jewellery Set", image: goldset, price: "₹3,499", offer: "20% OFF" },
  { id: 7, name: "Elegant Pendant", image: pendant1, price: "₹1,599", offer: "10% OFF" },
  { id: 8, name: "Fashion Jewellery", image: fashion, price: "₹1,899", offer: "Special Offer" },
];

const NewArrival = () => {
  const [wishlist, setWishlist] = useState(() =>
    JSON.parse(localStorage.getItem("newarrival_wishlist")) || []
  );
  const [cart, setCart] = useState(() =>
    JSON.parse(localStorage.getItem("newarrival_cart")) || []
  );

  useEffect(() => {
    localStorage.setItem("newarrival_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("newarrival_cart", JSON.stringify(cart));
  }, [cart]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleCart = (id) => {
    setCart((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="new-arrivals-container">
      <h1 className="new-arrivals-title">✨ New Arrivals ✨</h1>
      <p className="subtitle">Explore our latest handcrafted jewellery collection</p>

      <div className="product-grid">
        {products.map((item) => (
          <div key={item.id} className="product-card">
            <div className="image-container">
              <img src={item.image} alt={item.name} />
              <span className="offer-tag">{item.offer}</span>
            </div>

            <div className="product-info">
              <div className="name-wishlist">
                <h3>{item.name}</h3>
                <FaHeart
                  className={`wishlist-icon ${
                    wishlist.includes(item.id) ? "active" : ""
                  }`}
                  onClick={() => toggleWishlist(item.id)}
                />
              </div>

              <p className="price">{item.price}</p>
              <p className="desc">Beautifully designed to match every occasion.</p>

              <button
                className={`cart-btn ${cart.includes(item.id) ? "added" : ""}`}
                onClick={() => toggleCart(item.id)}
              >
                <FaShoppingCart className="cart-icon" />
                {cart.includes(item.id) ? "Added" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrival;

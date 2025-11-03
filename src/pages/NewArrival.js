import React, { useState, useEffect } from "react";
import "../style/newarrival.css";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { allProducts } from "../data/allProducts";
import { useNavigate } from "react-router-dom";

const NewArrival = () => {
  const navigate = useNavigate();

  // Filter products belonging to "new-arrival" category
  const products = allProducts.filter((p) => p.category === "new-arrival");

  // Wishlist state - synced globally using "wishlist"
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  // Cart state (only for NewArrival)
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );

  // Update wishlist in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Update cart in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Toggle wishlist item
  const toggleWishlist = (id, e) => {
    e.stopPropagation(); // Prevent navigation when clicking heart
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Toggle cart item
  const toggleCart = (id, e) => {
    e.stopPropagation(); // Prevent navigation when clicking cart
    setCart((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Navigate to product details page
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="new-arrivals-container">
      <h1 className="new-arrivals-title">✨ New Arrivals ✨</h1>
      <p className="subtitle">
        Explore our latest handcrafted jewellery collection
      </p>

      <div className="product-grid">
        {products.map((item) => (
          <div
            key={item.id}
            className="product-card"
            onClick={() => handleProductClick(item.id)}
            style={{ cursor: "pointer" }}
          >
            <div className="image-container">
              <img src={item.image} alt={item.name} />
              {item.offer && <span className="offer-tag">{item.offer}</span>}
            </div>

            <div className="product-info">
              <div className="name-wishlist">
                <h3>{item.name}</h3>
                <FaHeart
                  className="wishlist-icon"
                  style={{
                    color: wishlist.includes(item.id) ? "red" : "#999",
                    transition: "color 0.3s ease",
                  }}
                  onClick={(e) => toggleWishlist(item.id, e)}
                />
              </div>
              <p className="price">{item.price}</p>
              <p className="desc">
                Beautifully designed to match every occasion.
              </p>
              <button
                className={`cart-btn ${cart.includes(item.id) ? "added" : ""}`}
                onClick={(e) => toggleCart(item.id, e)}
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

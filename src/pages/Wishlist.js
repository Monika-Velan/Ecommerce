import React, { useState, useEffect } from "react";
import "../style/wishlist.css";
import { useNavigate } from "react-router-dom";
import { allProducts } from "../data/allProducts";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(() =>
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  // Filter the products that are in wishlist
  const likedProducts = allProducts.filter((item) => wishlist.includes(item.id));

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((itemId) => itemId !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const goToProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-title">💖 My Wishlist</h1>

      {likedProducts.length === 0 ? (
        <p className="empty-msg">You haven't liked any products yet.</p>
      ) : (
        <div className="wishlist-grid">
          {likedProducts.map((item) => (
            <div key={item.id} className="wishlist-card">
              <img
                src={item.image}
                alt={item.name}
                className="wishlist-image"
                onClick={() => goToProduct(item.id)}
              />
              <div className="wishlist-info">
                <h3>{item.name}</h3>
                <p>{item.price}</p>
                <div className="wishlist-actions">
                  <button
                    className="remove-btn"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <FaHeart /> Remove
                  </button>
                  <button
                    className="view-btn"
                    onClick={() => goToProduct(item.id)}
                  >
                    <FaShoppingCart /> View Product
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;

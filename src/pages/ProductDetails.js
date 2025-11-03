// src/pages/ProductDetails.js
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import "../style/productdetails.css";
import { allProducts } from "../data/allProducts"; // We'll create this next

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = allProducts.find((p) => p.id === parseInt(id));

  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [cart, setCart] = useState(false);

  if (!product) return <p>Product not found!</p>;

  const handleAddToCart = () => {
    setCart(!cart);
  };

  const handleWishlist = () => {
    setWishlist(!wishlist);
  };

  return (
    <div className="product-details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <div className="product-details">
        <div className="image-section">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="info-section">
          <h4 className="category">Jewellery Collection</h4>
          <h2>{product.name}</h2>

          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={i < 4 ? "star filled" : "star"}
              />
            ))}
            <span className="reviews">(112 reviews)</span>
          </div>

          <div className="price-section">
            <h3 className="price">{product.price}</h3>
            <span className="offer">{product.offer}</span>
          </div>

          <p className="desc">
            Exquisite handcrafted jewellery that blends tradition and style.
            Perfect for weddings, parties, and festive occasions.
          </p>

          <p className="stock">In Stock (35 available)</p>

          <div className="quantity-section">
            <label>Quantity:</label>
            <div className="quantity-control">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          <div className="actions">
            <button
              className={`cart-btn ${cart ? "added" : ""}`}
              onClick={handleAddToCart}
            >
              <FaShoppingCart /> {cart ? "Added" : "Add to Cart"}
            </button>

            <button
              className={`wishlist-btn ${wishlist ? "active" : ""}`}
              onClick={handleWishlist}
            >
              <FaHeart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

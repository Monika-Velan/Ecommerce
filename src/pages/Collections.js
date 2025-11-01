
import React, { useState, useEffect } from "react";
import "../style/collections.css";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

// ✅ Import all images
import bangle1 from "../assets/BANGLE 1 COLLECTION.jpeg";
import bangle2 from "../assets/BANGLE 2 COLLECTION.jpeg";
import bangle3 from "../assets/BANGLE 3 COLLECTION.jpeg";
import bracelet1 from "../assets/bracelet_1_collection.jpeg";
import bracelet2 from "../assets/bracelet_2_collection.jpeg";
import bracelet3 from "../assets/bracelet_3_collection.jpeg";
import miniEarring2 from "../assets/mini_earring_2_collection.jpeg";
import bridalChoker1 from "../assets/BRIDAL CHOKER 1 COLLECTION.jpeg";
import bridalChoker2 from "../assets/BRIDAL CHOKER 2 COLLECTION.jpeg";
import bridalChoker3 from "../assets/BRIDAL CHOKER 3 COLLECTION.jpeg";
import bridalChoker4 from "../assets/BRIDAL CHOKER 4 COLLECTION.jpeg";
import bridal1 from "../assets/BRIDAL JEWELLRY 1 COLLECTION.jpeg";
import bridal2 from "../assets/BRIDAL JEWELLRY 2 COLLECTION.jpeg";
import choker1 from "../assets/CHOKER 1 COLLECTION.jpeg";
import choker3 from "../assets/CHOKER 3 COLLECTION.jpeg";
import choker4 from "../assets/CHOKER 4 COLLECTION.jpeg";
import choker5 from "../assets/CHOKER 5 COLLECTION.jpeg";
import choker6 from "../assets/CHOKER 6 COLLECTION.jpeg";
import earring1 from "../assets/EARRING 1 COLLECTION.jpeg";
import earring2 from "../assets/EARRING 2 COLLECTION.jpeg";
import earring3 from "../assets/EARRING 3 COLLECTION.jpeg";
import earring4 from "../assets/EARRING 4 COLLECTION.jpeg";
import fashionEarring1 from "../assets/FASHION EARRING 1 COLLECTION.jpeg";
import goldEarring1 from "../assets/GOLD EARRING 1 COLLECTION.jpeg";
import goldSet1 from "../assets/GOLD JEWELLRY SET 1 COLLECTION.jpeg";
import miniEarring1 from "../assets/MINI EARRING 1 COLLECTION.jpeg";
import necklace1 from "../assets/NECKLACE 1 COLLECTION.jpeg";
import necklace2 from "../assets/NECKLACE 2 COLLECTION.jpeg";
import pendant1 from "../assets/PENDANT 1 COLLECTION.jpeg";
import pendant2 from "../assets/PENDANT 2 COLLECTION.jpeg";
import pendant3 from "../assets/PENDANT 3 COLLECTION.jpeg";
import ring1 from "../assets/RING 1 COLLECTION.jpeg";
import ring2 from "../assets/RING 2 COLLECTION.jpeg";
import ring3 from "../assets/RING 3 COLLECTION.jpeg";
import ring4 from "../assets/RING 4 COLLECTION.jpeg";
import ring5 from "../assets/RING 5 COLLECTION.jpeg";
import silverSet1 from "../assets/SILVER JEWELLRY SET 1 COLLECTION.jpeg";
import silverSet2 from "../assets/SILVER JEWELLRY SET 2 COLLECTION.jpeg";
import silverSet3 from "../assets/SILVER JEWELLRY SET 3 COLLECTION.jpeg";
import silverSet4 from "../assets/SILVER JEWELLRY SET 4 COLLECTION.jpeg";
import stylishBangle1 from "../assets/STYLISH BANGLE 1 COLLECTION.jpeg";
import stylishBangle2 from "../assets/STYLISH BANGLE 2 COLLECTION.jpeg";
import stylishPendant1 from "../assets/STYLISH PENDENT 1 COLLECTION.jpeg";

// ✅ Product Array
const products = [
  { id: 1, name: "Bangle Beauty", image: bangle1, price: "₹1,999", offer: "15% OFF" },
  { id: 2, name: "Elegant Bangle", image: bangle2, price: "₹2,199", offer: "10% OFF" },
  { id: 3, name: "Royal Bangle", image: bangle3, price: "₹1,899", offer: "New Arrival" },
  { id: 4, name: "Bracelet Charm", image: bracelet1, price: "₹1,499", offer: "20% OFF" },
  { id: 5, name: "Graceful Bracelet", image: bracelet2, price: "₹1,599", offer: "Buy 1 Get 1" },
  { id: 6, name: "Trendy Bracelet", image: bracelet3, price: "₹1,799", offer: "Limited Offer" },
  { id: 7, name: "Bridal Choker", image: bridalChoker1, price: "₹3,999", offer: "New Arrival" },
  { id: 8, name: "Royal Bridal Choker", image: bridalChoker2, price: "₹4,299", offer: "20% OFF" },
  { id: 9, name: "Pearl Bridal Choker", image: bridalChoker3, price: "₹4,499", offer: "15% OFF" },
  { id: 10, name: "Crystal Bridal Choker", image: bridalChoker4, price: "₹3,899", offer: "Special Offer" },
  { id: 11, name: "Bridal Jewellery Set", image: bridal1, price: "₹5,999", offer: "25% OFF" },
  { id: 12, name: "Queen Bridal Set", image: bridal2, price: "₹6,199", offer: "10% OFF" },
  { id: 13, name: "Classic Choker", image: choker1, price: "₹2,299", offer: "New Arrival" },
  { id: 14, name: "Gold Choker", image: choker3, price: "₹2,499", offer: "20% OFF" },
  { id: 15, name: "Silver Choker", image: choker4, price: "₹2,099", offer: "Limited Offer" },
  { id: 16, name: "Stone Choker", image: choker5, price: "₹2,899", offer: "10% OFF" },
  { id: 17, name: "Ruby Choker", image: choker6, price: "₹2,799", offer: "Buy 1 Get 1" },
  { id: 18, name: "Earring Collection", image: earring1, price: "₹999", offer: "15% OFF" },
  { id: 19, name: "Trendy Earrings", image: earring2, price: "₹1,099", offer: "New Arrival" },
  { id: 20, name: "Elegant Earrings", image: earring3, price: "₹1,299", offer: "10% OFF" },
  { id: 21, name: "Luxury Earrings", image: earring4, price: "₹1,499", offer: "Limited Offer" },
  { id: 22, name: "Fashion Earrings", image: fashionEarring1, price: "₹1,399", offer: "Special Offer" },
  { id: 23, name: "Gold Earrings", image: goldEarring1, price: "₹1,599", offer: "20% OFF" },
  { id: 24, name: "Gold Jewellery Set", image: goldSet1, price: "₹3,999", offer: "New Arrival" },
  { id: 25, name: "Mini Earrings", image: miniEarring1, price: "₹799", offer: "15% OFF" },
  { id: 26, name: "Tiny Earrings", image: miniEarring2, price: "₹899", offer: "10% OFF" },
  { id: 27, name: "Necklace Charm", image: necklace1, price: "₹2,599", offer: "20% OFF" },
  { id: 28, name: "Elegant Necklace", image: necklace2, price: "₹2,899", offer: "New Arrival" },
  { id: 29, name: "Grace Pendant", image: pendant1, price: "₹1,499", offer: "10% OFF" },
  { id: 30, name: "Heart Pendant", image: pendant2, price: "₹1,599", offer: "15% OFF" },
  { id: 31, name: "Shiny Pendant", image: pendant3, price: "₹1,699", offer: "20% OFF" },
  { id: 32, name: "Classic Ring", image: ring1, price: "₹999", offer: "10% OFF" },
  { id: 33, name: "Gold Ring", image: ring2, price: "₹1,199", offer: "New Arrival" },
  { id: 34, name: "Silver Ring", image: ring3, price: "₹1,099", offer: "15% OFF" },
  { id: 35, name: "Stylish Ring", image: ring4, price: "₹1,299", offer: "Special Offer" },
  { id: 36, name: "Stone Ring", image: ring5, price: "₹1,399", offer: "Limited Offer" },
  { id: 37, name: "Silver Jewellery Set", image: silverSet1, price: "₹3,499", offer: "10% OFF" },
  { id: 38, name: "Royal Silver Set", image: silverSet2, price: "₹3,599", offer: "20% OFF" },
  { id: 39, name: "Charming Silver Set", image: silverSet3, price: "₹3,699", offer: "15% OFF" },
  { id: 40, name: "Graceful Silver Set", image: silverSet4, price: "₹3,799", offer: "Buy 1 Get 1" },
  { id: 41, name: "Stylish Bangle", image: stylishBangle1, price: "₹2,099", offer: "New Arrival" },
  { id: 42, name: "Trendy Bangle", image: stylishBangle2, price: "₹2,299", offer: "15% OFF" },
  { id: 43, name: "Stylish Pendant", image: stylishPendant1, price: "₹1,499", offer: "Special Offer" },
];

const Collections = () => {
  const [wishlist, setWishlist] = useState(() =>
    JSON.parse(localStorage.getItem("wishlist")) || []
  );
  const [cart, setCart] = useState(() =>
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
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
    <div className="collections-container">
      <h1 className="collections-title">✨ Collections ✨</h1>
      <p className="subtitle">Discover timeless craftsmanship and modern designs</p>

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
                className={`cart-btn ${
                  cart.includes(item.id) ? "added" : ""
                }`}
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

export default Collections;

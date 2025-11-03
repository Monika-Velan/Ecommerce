
import React, { useState, useEffect } from "react";
import "../style/collections.css";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { allProducts } from "../data/allProducts";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext"; // ✅ Import search context

const Collections = () => {
  const navigate = useNavigate();
  const { searchQuery } = useSearch(); // ✅ Get current search query

  const allCollectionProducts = allProducts.filter(
    (p) => p.category === "collection"
  );

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const [filteredProducts, setFilteredProducts] = useState(allCollectionProducts);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("none");

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 🔹 Handle Filter, Sort, and Search
  useEffect(() => {
    let updated = [...allCollectionProducts];

    // Filter by jewellery type
    if (selectedCategory !== "all") {
      updated = updated.filter((p) => p.type === selectedCategory);
    }

    // 🔍 Filter by search term
    if (searchQuery.trim() !== "") {
      updated = updated.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery) ||
          p.type.toLowerCase().includes(searchQuery)
      );
    }

    // Sort by price
    if (sortOption === "lowToHigh") {
      updated.sort(
        (a, b) =>
          parseFloat(a.price.replace(/[^\d.-]/g, "")) -
          parseFloat(b.price.replace(/[^\d.-]/g, ""))
      );
    } else if (sortOption === "highToLow") {
      updated.sort(
        (a, b) =>
          parseFloat(b.price.replace(/[^\d.-]/g, "")) -
          parseFloat(a.price.replace(/[^\d.-]/g, ""))
      );
    }

    setFilteredProducts(updated);
  }, [selectedCategory, sortOption, searchQuery]);

  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleCart = (id, e) => {
    e.stopPropagation();
    setCart((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="collections-wrapper">
      <aside className="filter-sidebar">
        <h3>Filters</h3>

        <div className="filter-section">
          <h4>Jewellery Type</h4>
          <ul>
            {[
              "all",
              "bangle",
              "earring",
              "bracelet",
              "ring",
              "choker",
              "necklace",
              "pendant",
              "set",
              "bridal",
            ].map((cat) => (
              <li key={cat}>
                <label>
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={selectedCategory === cat}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="filter-section">
          <h4>Sort by Price</h4>
          <select
            className="sort-dropdown"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="none">Default</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>
      </aside>

      <div className="collections-container">
        <h1 className="collections-title">✨ Collections ✨</h1>
        <p className="subtitle">
          Discover timeless craftsmanship and modern designs
        </p>

        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <div
                key={item.id}
                className="product-card"
                onClick={() => handleProductClick(item.id)}
              >
                <div className="image-container">
                  <img src={item.image} alt={item.name} />
                  {item.offer && (
                    <span className="offer-tag">{item.offer}</span>
                  )}
                </div>

                <div className="product-info">
                  <div className="name-wishlist">
                    <h3>{item.name}</h3>
                    <FaHeart
                      className="wishlist-icon"
                      style={{
                        color: wishlist.includes(item.id) ? "red" : "#999",
                      }}
                      onClick={(e) => toggleWishlist(item.id, e)}
                    />
                  </div>
                  <p className="price">{item.price}</p>
                  <p className="desc">
                    Beautifully designed to match every occasion.
                  </p>
                  <button
                    className={`cart-btn ${
                      cart.includes(item.id) ? "added" : ""
                    }`}
                    onClick={(e) => toggleCart(item.id, e)}
                  >
                    <FaShoppingCart className="cart-icon" />
                    {cart.includes(item.id) ? "Added" : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No matching products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collections;

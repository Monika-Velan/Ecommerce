// import React, { useState, useEffect } from "react";
// import "../style/collections.css";
// import { FaHeart, FaShoppingCart, FaTimes, FaFilter } from "react-icons/fa";
// import { allProducts } from "../data/allProducts";
// import { useNavigate } from "react-router-dom";
// import { useSearch } from "../context/SearchContext";
// import axios from "axios";

// const Collections = () => {
//   const navigate = useNavigate();
//   const { searchQuery } = useSearch();
//   const user = JSON.parse(localStorage.getItem("currentUser"));

//   const allCollectionProducts = allProducts.filter(
//     (p) => p.category === "collection"
//   );

//   const [wishlist, setWishlist] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState(allCollectionProducts);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [sortOption, setSortOption] = useState("none");
//   const [showFilters, setShowFilters] = useState(true);

//   // 🟢 Fetch user wishlist & cart
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (user) {
//           const res = await axios.get(`http://localhost:5000/api/user/${user._id}`);
//           setWishlist(res.data.wishlist || []);
//           setCart(res.data.cart || []);
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };
//     fetchData();
//   }, [user]);

//   // 🔹 Filter, Sort, Search logic
//   useEffect(() => {
//     let updated = [...allCollectionProducts];

//     if (selectedCategory !== "all") {
//       updated = updated.filter((p) => p.type === selectedCategory);
//     }

//     if (searchQuery.trim() !== "") {
//       updated = updated.filter(
//         (p) =>
//           p.name.toLowerCase().includes(searchQuery) ||
//           p.type?.toLowerCase().includes(searchQuery)
//       );
//     }

//     if (sortOption === "lowToHigh") {
//       updated.sort(
//         (a, b) =>
//           parseFloat(a.price.replace(/[^\d.-]/g, "")) -
//           parseFloat(b.price.replace(/[^\d.-]/g, ""))
//       );
//     } else if (sortOption === "highToLow") {
//       updated.sort(
//         (a, b) =>
//           parseFloat(b.price.replace(/[^\d.-]/g, "")) -
//           parseFloat(a.price.replace(/[^\d.-]/g, ""))
//       );
//     }

//     setFilteredProducts(updated);
//   }, [selectedCategory, sortOption, searchQuery]);

//   // 🟢 Wishlist Toggle
//   const toggleWishlist = async (id, e) => {
//     e.stopPropagation();
//     if (!user) {
//       alert("Please login to manage your wishlist.");
//       navigate("/auth");
//       return;
//     }

//     const stringId = id.toString();
//     const updatedWishlist = wishlist.includes(stringId)
//       ? wishlist.filter((item) => item !== stringId)
//       : [...wishlist, stringId];
//     setWishlist(updatedWishlist);

//     await axios.put(`http://localhost:5000/api/user/${user._id}/wishlist`, {
//       wishlist: updatedWishlist,
//     });
//   };

//   // 🟢 Add/Update Cart
//   const toggleCart = async (id, e) => {
//     e.stopPropagation();
//     if (!user) {
//       alert("Please login to manage your cart.");
//       navigate("/auth");
//       return;
//     }

//     const stringId = id.toString();
//     const existingItem = cart.find((item) => item.id === stringId);

//     const updatedCart = existingItem
//       ? cart.map((item) =>
//           item.id === stringId
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       : [...cart, { id: stringId, quantity: 1 }];

//     setCart(updatedCart);

//     await axios.post(`http://localhost:5000/api/user/${user._id}/cart`, {
//       id: stringId,
//       quantity: 1,
//     });
//   };

//   const handleProductClick = (id) => navigate(`/product/${id}`);

//   return (
//     <div className="collections-wrapper">
//       {showFilters && (
//         <aside className="filter-sidebar">
//           <div className="filter-header">
//             <h3>Filters</h3>
//             <button
//               className="filter-toggle-btn"
//               onClick={() => setShowFilters(false)}
//             >
//               <FaTimes /> Close Filters
//             </button>
//           </div>

//           <div className="filter-section">
//             <h4>Jewellery Type</h4>
//             <ul>
//               {[
//                 "all",
//                 "bangle",
//                 "earring",
//                 "bracelet",
//                 "ring",
//                 "choker",
//                 "necklace",
//                 "pendant",
//                 "set",
//                 "bridal",
//               ].map((cat) => (
//                 <li key={cat}>
//                   <label>
//                     <input
//                       type="radio"
//                       name="category"
//                       value={cat}
//                       checked={selectedCategory === cat}
//                       onChange={(e) => setSelectedCategory(e.target.value)}
//                     />
//                     {cat.charAt(0).toUpperCase() + cat.slice(1)}
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="filter-section">
//             <h4>Sort by Price</h4>
//             <select
//               className="sort-dropdown"
//               value={sortOption}
//               onChange={(e) => setSortOption(e.target.value)}
//             >
//               <option value="none">Default</option>
//               <option value="lowToHigh">Low to High</option>
//               <option value="highToLow">High to Low</option>
//             </select>
//           </div>
//         </aside>
//       )}

//       {!showFilters && (
//         <button
//           className="filter-toggle-btn"
//           onClick={() => setShowFilters(true)}
//         >
//           <FaFilter /> Show Filters
//         </button>
//       )}

//       <div className="collections-container">
//         <h1 className="collections-title">✨ Collections ✨</h1>
//         <p className="subtitle">Discover timeless craftsmanship and modern designs</p>

//         <div className="product-grid">
//           {filteredProducts.map((item) => {
//             const stringId = item.id.toString();
//             const inCart = cart.find((c) => c.id === stringId);
//             const isLiked = wishlist.includes(stringId);

//             return (
//               <div
//                 key={item.id}
//                 className="product-card"
//                 onClick={() => handleProductClick(item.id)}
//               >
//                 <div className="image-container">
//                   <img src={item.image} alt={item.name} />
//                   {item.offer && <span className="offer-tag">{item.offer}</span>}
//                 </div>

//                 <div className="product-info">
//                   <div className="name-wishlist">
//                     <h3>{item.name}</h3>
//                     <FaHeart
//                       className="wishlist-icon"
//                       style={{ color: isLiked ? "red" : "#999" }}
//                       onClick={(e) => toggleWishlist(item.id, e)}
//                     />
//                   </div>
//                   <p className="price">{item.price}</p>
//                   <p className="desc">
//                     Beautifully designed to match every occasion.
//                   </p>
//                   <button
//                     className={`cart-btn ${inCart ? "added" : ""}`}
//                     onClick={(e) => toggleCart(item.id, e)}
//                   >
//                     <FaShoppingCart className="cart-icon" />
//                     {inCart ? `Added (${inCart.quantity})` : "Add to Cart"}
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Collections;


















import React, { useState, useEffect } from "react";
import "../style/collections.css";
import { FaHeart, FaShoppingCart, FaTimes, FaFilter } from "react-icons/fa";
import { allProducts } from "../data/allProducts";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import axios from "axios";

// 🔹 Your Render backend base URL
const BASE_URL = "https://ecommerce-backend-zkqa.onrender.com";

const Collections = () => {
  const navigate = useNavigate();
  const { searchQuery } = useSearch();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const token = localStorage.getItem("token");

  const allCollectionProducts = allProducts.filter(
    (p) => p.category === "collection"
  );

  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(allCollectionProducts);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("none");
  const [showFilters, setShowFilters] = useState(true);

  // 🟢 Fetch user wishlist & cart
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const res = await axios.get(`${BASE_URL}/api/user/${user._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setWishlist(res.data.wishlist || []);
          setCart(res.data.cart || []);
        }
      } catch (error) {
        console.error("❌ Error fetching user data:", error);
      }
    };
    fetchData();
  }, [user, token]);

  // 🔹 Filter, Sort, Search logic
  useEffect(() => {
    let updated = [...allCollectionProducts];

    if (selectedCategory !== "all") {
      updated = updated.filter((p) => p.type === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      updated = updated.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.type?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

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

  // 🟢 Wishlist Toggle
  const toggleWishlist = async (id, e) => {
    e.stopPropagation();
    if (!user) {
      alert("Please login to manage your wishlist.");
      navigate("/auth");
      return;
    }

    const stringId = id.toString();
    const updatedWishlist = wishlist.includes(stringId)
      ? wishlist.filter((item) => item !== stringId)
      : [...wishlist, stringId];
    setWishlist(updatedWishlist);

    try {
      await axios.put(
        `${BASE_URL}/api/user/${user._id}/wishlist`,
        { wishlist: updatedWishlist },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("❌ Error updating wishlist:", error);
    }
  };

  // 🟢 Add/Update Cart
  const toggleCart = async (id, e) => {
    e.stopPropagation();
    if (!user) {
      alert("Please login to manage your cart.");
      navigate("/auth");
      return;
    }

    const stringId = id.toString();
    const existingItem = cart.find((item) => item.id === stringId);

    const updatedCart = existingItem
      ? cart.map((item) =>
          item.id === stringId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, { id: stringId, quantity: 1 }];

    setCart(updatedCart);

    try {
      await axios.post(
        `${BASE_URL}/api/user/${user._id}/cart`,
        { id: stringId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("❌ Error updating cart:", error);
    }
  };

  const handleProductClick = (id) => navigate(`/product/${id}`);

  return (
    <div className="collections-wrapper">
      {showFilters && (
        <aside className="filter-sidebar">
          <div className="filter-header">
            <h3>Filters</h3>
            <button
              className="filter-toggle-btn"
              onClick={() => setShowFilters(false)}
            >
              <FaTimes /> Close Filters
            </button>
          </div>

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
      )}

      {!showFilters && (
        <button
          className="filter-toggle-btn"
          onClick={() => setShowFilters(true)}
        >
          <FaFilter /> Show Filters
        </button>
      )}

      <div className="collections-container">
        <h1 className="collections-title">✨ Collections ✨</h1>
        <p className="subtitle">
          Discover timeless craftsmanship and modern designs
        </p>

        <div className="product-grid">
          {filteredProducts.map((item) => {
            const stringId = item.id.toString();
            const inCart = cart.find((c) => c.id === stringId);
            const isLiked = wishlist.includes(stringId);

            return (
              <div
                key={item.id}
                className="product-card"
                onClick={() => handleProductClick(item.id)}
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
                      style={{ color: isLiked ? "red" : "#999" }}
                      onClick={(e) => toggleWishlist(item.id, e)}
                    />
                  </div>
                  <p className="price">{item.price}</p>
                  <p className="desc">
                    Beautifully designed to match every occasion.
                  </p>
                  <button
                    className={`cart-btn ${inCart ? "added" : ""}`}
                    onClick={(e) => toggleCart(item.id, e)}
                  >
                    <FaShoppingCart className="cart-icon" />
                    {inCart ? `Added (${inCart.quantity})` : "Add to Cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Collections;

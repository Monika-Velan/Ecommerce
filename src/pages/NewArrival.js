// import React, { useState, useEffect } from "react";
// import "../style/newarrival.css";
// import { FaHeart, FaShoppingCart } from "react-icons/fa";
// import { allProducts } from "../data/allProducts";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const NewArrival = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("currentUser"));
//   const products = allProducts.filter((p) => p.category === "new-arrival");

//   const [wishlist, setWishlist] = useState([]);
//   const [cart, setCart] = useState([]);

//   // 🟢 Fetch Wishlist and Cart
//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!user) return;
//       try {
//         const res = await axios.get(`http://localhost:5000/api/user/${user._id}`);
//         setWishlist(res.data.wishlist || []);
//         setCart(res.data.cart || []);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };
//     fetchUserData();
//   }, [user]);

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
//       ? wishlist.filter((itemId) => itemId !== stringId)
//       : [...wishlist, stringId];

//     setWishlist(updatedWishlist);

//     await axios.put(`http://localhost:5000/api/user/${user._id}/wishlist`, {
//       wishlist: updatedWishlist,
//     });
//   };

//   // 🛒 Add/Update Cart
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
//     <div className="new-arrivals-container">
//       <h1 className="new-arrivals-title">✨ New Arrivals ✨</h1>
//       <p className="subtitle">Explore our latest handcrafted jewellery collection</p>

//       <div className="product-grid">
//         {products.map((item) => {
//           const stringId = item.id.toString();
//           const inCart = cart.find((c) => c.id === stringId);
//           const isLiked = wishlist.includes(stringId);

//           return (
//             <div
//               key={item.id}
//               className="product-card"
//               onClick={() => handleProductClick(item.id)}
//               style={{ cursor: "pointer" }}
//             >
//               <div className="image-container">
//                 <img src={item.image} alt={item.name} />
//                 {item.offer && <span className="offer-tag">{item.offer}</span>}
//               </div>

//               <div className="product-info">
//                 <div className="name-wishlist">
//                   <h3>{item.name}</h3>
//                   <FaHeart
//                     className="wishlist-icon"
//                     style={{ color: isLiked ? "red" : "#999" }}
//                     onClick={(e) => toggleWishlist(item.id, e)}
//                   />
//                 </div>
//                 <p className="price">{item.price}</p>
//                 <p className="desc">
//                   Beautifully designed to match every occasion.
//                 </p>
//                 <button
//                   className={`cart-btn ${inCart ? "added" : ""}`}
//                   onClick={(e) => toggleCart(item.id, e)}
//                 >
//                   <FaShoppingCart className="cart-icon" />
//                   {inCart ? `Added (${inCart.quantity})` : "Add to Cart"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default NewArrival;



















import React, { useState, useEffect } from "react";
import "../style/newarrival.css";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { allProducts } from "../data/allProducts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 🔹 Backend Base URL (your Render backend)
const BASE_URL = "https://ecommerce-backend-zkqa.onrender.com";

const NewArrival = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const token = localStorage.getItem("token");

  const products = allProducts.filter((p) => p.category === "new-arrival");
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  // 🟢 Fetch Wishlist and Cart from backend
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      try {
        const res = await axios.get(`${BASE_URL}/api/user/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWishlist(res.data.wishlist || []);
        setCart(res.data.cart || []);
      } catch (error) {
        console.error("❌ Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [user, token]);

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
      ? wishlist.filter((itemId) => itemId !== stringId)
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
      alert("Failed to update wishlist. Please try again.");
    }
  };

  // 🛒 Add or Update Cart
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
      alert("Failed to update cart. Please try again.");
    }
  };

  const handleProductClick = (id) => navigate(`/product/${id}`);

  return (
    <div className="new-arrivals-container">
      <h1 className="new-arrivals-title">✨ New Arrivals ✨</h1>
      <p className="subtitle">
        Explore our latest handcrafted jewellery collection
      </p>

      <div className="product-grid">
        {products.map((item) => {
          const stringId = item.id.toString();
          const inCart = cart.find((c) => c.id === stringId);
          const isLiked = wishlist.includes(stringId);

          return (
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
  );
};

export default NewArrival;

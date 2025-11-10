// import React, { useState, useEffect } from "react";
// import "../style/wishlist.css";
// import { useNavigate } from "react-router-dom";
// import { allProducts } from "../data/allProducts";
// import { FaHeart, FaShoppingCart } from "react-icons/fa";
// import axios from "axios";

// const Wishlist = () => {
//   const navigate = useNavigate();
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const user = JSON.parse(localStorage.getItem("currentUser"));
//   const token = localStorage.getItem("token");

//   // 🟢 Redirect if not logged in
//   useEffect(() => {
//     if (!user || !token) {
//       alert("Please login to view your wishlist.");
//       navigate("/auth");
//     }
//   }, [user, token, navigate]);

//   // 🟢 Fetch wishlist from backend
//   useEffect(() => {
//     const fetchWishlist = async () => {
//       try {
//         if (user) {
//           const res = await axios.get(`http://localhost:5000/api/user/${user._id}`);
//           const userWishlist = res.data.wishlist || [];
//           setWishlist(userWishlist.map(String)); // convert all to strings
//         }
//       } catch (err) {
//         console.error("Error fetching wishlist:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchWishlist();
//   }, [user]);

//   // 🟢 Remove from wishlist (update backend + local)
//   const removeFromWishlist = async (id) => {
//     try {
//       const stringId = id.toString();
//       const updated = wishlist.filter((itemId) => itemId !== stringId);
//       setWishlist(updated);

//       if (user) {
//         await axios.put(`http://localhost:5000/api/user/${user._id}/wishlist`, {
//           wishlist: updated,
//         });
//       }
//     } catch (err) {
//       console.error("Error updating wishlist:", err);
//     }
//   };

//   // 🟢 Filter liked products
//   const likedProducts = allProducts.filter((item) =>
//     wishlist.includes(item.id.toString())
//   );

//   const goToProduct = (id) => {
//     navigate(`/product/${id}`);
//   };

//   if (loading) {
//     return (
//       <p style={{ textAlign: "center", marginTop: "50px" }}>
//         Loading your wishlist...
//       </p>
//     );
//   }

//   return (
//     <div className="wishlist-container">
//       <h1 className="wishlist-title">💖 My Wishlist</h1>

//       {likedProducts.length === 0 ? (
//         <p className="empty-msg">You haven't liked any products yet.</p>
//       ) : (
//         <div className="wishlist-grid">
//           {likedProducts.map((item) => (
//             <div key={item.id} className="wishlist-card">
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="wishlist-image"
//                 onClick={() => goToProduct(item.id)}
//               />
//               <div className="wishlist-info">
//                 <h3>{item.name}</h3>
//                 <p>{item.price}</p>
//                 <div className="wishlist-actions">
//                   <button
//                     className="remove-btn"
//                     onClick={() => removeFromWishlist(item.id)}
//                   >
//                     <FaHeart /> Remove
//                   </button>
//                   <button
//                     className="view-btn"
//                     onClick={() => goToProduct(item.id)}
//                   >
//                     <FaShoppingCart /> View Product
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Wishlist;






















import React, { useState, useEffect } from "react";
import "../style/wishlist.css";
import { useNavigate } from "react-router-dom";
import { allProducts } from "../data/allProducts";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import axios from "axios";

// 🔹 Backend Base URL (change only this if backend moves)
const BASE_URL = "https://ecommerce-backend-zkqa.onrender.com";

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const token = localStorage.getItem("token");

  // 🟢 Redirect if not logged in
  useEffect(() => {
    if (!user || !token) {
      alert("Please login to view your wishlist.");
      navigate("/auth");
    }
  }, [user, token, navigate]);

  // 🟢 Fetch wishlist from backend
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        if (user) {
          const res = await axios.get(`${BASE_URL}/api/user/${user._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const userWishlist = res.data.wishlist || [];
          setWishlist(userWishlist.map(String)); // ensure all IDs are strings
        }
      } catch (err) {
        console.error("❌ Error fetching wishlist:", err);
        alert("Failed to load wishlist. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [user, token]);

  // 🟢 Remove from wishlist (update backend + local)
  const removeFromWishlist = async (id) => {
    try {
      const stringId = id.toString();
      const updated = wishlist.filter((itemId) => itemId !== stringId);
      setWishlist(updated);

      if (user) {
        await axios.put(
          `${BASE_URL}/api/user/${user._id}/wishlist`,
          { wishlist: updated },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (err) {
      console.error("❌ Error updating wishlist:", err);
      alert("Could not update wishlist. Please try again.");
    }
  };

  // 🟢 Filter liked products
  const likedProducts = allProducts.filter((item) =>
    wishlist.includes(item.id.toString())
  );

  const goToProduct = (id) => {
    navigate(`/product/${id}`);
  };

  if (loading) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Loading your wishlist...
      </p>
    );
  }

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

// import React, { useState, useEffect } from "react";
// import "../style/cart.css";
// import { allProducts } from "../data/allProducts";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const CartPage = () => {
//   const navigate = useNavigate();
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const user = JSON.parse(localStorage.getItem("currentUser"));

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         if (user) {
//           const res = await axios.get(`http://localhost:5000/api/user/${user._id}`);
//           setCart(res.data.cart || []);
//         }
//       } catch (error) {
//         console.error("Error fetching cart:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCart();
//   }, [user]);

//   const updateQuantity = async (id, change) => {
//     const updatedCart = cart.map((item) =>
//       item.id === id
//         ? { ...item, quantity: Math.max(1, item.quantity + change) }
//         : item
//     );
//     setCart(updatedCart);

//     await axios.post(`http://localhost:5000/api/user/${user._id}/cart`, {
//       id,
//       quantity: change,
//     });
//   };

//   const removeFromCart = async (id) => {
//     const updatedCart = cart.filter((item) => item.id !== id);
//     setCart(updatedCart);
//     await axios.delete(`http://localhost:5000/api/user/${user._id}/cart/${id}`);
//   };

//   const getNumericPrice = (price) => Number(price.replace(/[₹,]/g, "")) || 0;

//   const cartProducts = cart
//     .map((cartItem) => {
//       const product = allProducts.find((p) => p.id.toString() === cartItem.id);
//       return product ? { ...product, quantity: cartItem.quantity } : null;
//     })
//     .filter(Boolean);

//   const totalMRP = cartProducts.reduce(
//     (sum, p) => sum + getNumericPrice(p.price) * p.quantity,
//     0
//   );

//   const getDiscountPercent = (offer) => {
//     const match = offer?.match(/(\d+)%/);
//     return match ? parseInt(match[1]) : 0;
//   };

//   const totalDiscount = cartProducts.reduce((sum, p) => {
//     const price = getNumericPrice(p.price);
//     const discountPercent = getDiscountPercent(p.offer);
//     return sum + ((price * discountPercent) / 100) * p.quantity;
//   }, 0);

//   const shippingFee = cartProducts.length > 0 ? 50 : 0;
//   const totalAmount = totalMRP - totalDiscount + shippingFee;

//   if (loading) return <p className="loading">Loading your cart...</p>;

//   return (
//     <div className="cart-container">
//       <h2 className="cart-title">🛍️ My Shopping Bag ({cartProducts.length})</h2>

//       {cartProducts.length === 0 ? (
//         <p className="empty-msg">Your cart is empty. Continue shopping!</p>
//       ) : (
//         <div className="cart-box">
//           <div className="cart-items">
//             {cartProducts.map((item) => {
//               const price = getNumericPrice(item.price);
//               const discountPercent = getDiscountPercent(item.offer);
//               const discountedPrice = Math.round(
//                 price - (price * discountPercent) / 100
//               );

//               return (
//                 <div className="cart-item" key={item.id}>
//                   <img src={item.image} alt={item.name} className="cart-img" />
//                   <div className="cart-info">
//                     <h3>{item.name}</h3>
//                     <p className="price">
//                       ₹{discountedPrice} x {item.quantity}{" "}
//                       <span className="mrp">₹{price}</span>
//                     </p>

//                     <div className="qty-controls">
//                       <button onClick={() => updateQuantity(item.id, -1)}>-</button>
//                       <span>{item.quantity}</span>
//                       <button onClick={() => updateQuantity(item.id, 1)}>+</button>
//                     </div>

//                     <button
//                       className="remove-btn"
//                       onClick={() => removeFromCart(item.id)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="price-details">
//             <h3>PRICE DETAILS ({cartProducts.length} Item)</h3>
//             <div className="price-row">
//               <span>Total MRP</span>
//               <span>₹{totalMRP.toFixed(2)}</span>
//             </div>
//             <div className="price-row">
//               <span>Discount on MRP</span>
//               <span className="discount-text">-₹{totalDiscount.toFixed(2)}</span>
//             </div>
//             <div className="price-row">
//               <span>Shipping Fee</span>
//               <span>₹{shippingFee}</span>
//             </div>
//             <hr />
//             <div className="price-row total">
//               <span>Total Amount</span>
//               <span>₹{totalAmount.toFixed(2)}</span>
//             </div>

//             <button
//               className="checkout-btn"
//               onClick={() => {
//                 localStorage.setItem("cartTotal", JSON.stringify(totalAmount));
//                 navigate("/address");
//               }}
//             >
//               Proceed to Checkout
//             </button>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;


















import React, { useState, useEffect } from "react";
import "../style/cart.css";
import { allProducts } from "../data/allProducts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 🔹 Backend Base URL
const BASE_URL = "https://ecommerce-backend-zkqa.onrender.com";

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const token = localStorage.getItem("token");

  // 🟢 Fetch Cart Data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (user) {
          const res = await axios.get(`${BASE_URL}/api/user/${user._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCart(res.data.cart || []);
        }
      } catch (error) {
        console.error("❌ Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [user, token]);

  // 🛒 Update Quantity
  const updateQuantity = async (id, change) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    setCart(updatedCart);

    try {
      await axios.post(
        `${BASE_URL}/api/user/${user._id}/cart`,
        { id, quantity: change },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("❌ Error updating quantity:", error);
    }
  };

  // 🗑️ Remove from Cart
  const removeFromCart = async (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);

    try {
      await axios.delete(`${BASE_URL}/api/user/${user._id}/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("❌ Error removing from cart:", error);
    }
  };

  // 💰 Utility functions
  const getNumericPrice = (price) => Number(price.replace(/[₹,]/g, "")) || 0;

  const cartProducts = cart
    .map((cartItem) => {
      const product = allProducts.find((p) => p.id.toString() === cartItem.id);
      return product ? { ...product, quantity: cartItem.quantity } : null;
    })
    .filter(Boolean);

  const totalMRP = cartProducts.reduce(
    (sum, p) => sum + getNumericPrice(p.price) * p.quantity,
    0
  );

  const getDiscountPercent = (offer) => {
    const match = offer?.match(/(\d+)%/);
    return match ? parseInt(match[1]) : 0;
  };

  const totalDiscount = cartProducts.reduce((sum, p) => {
    const price = getNumericPrice(p.price);
    const discountPercent = getDiscountPercent(p.offer);
    return sum + ((price * discountPercent) / 100) * p.quantity;
  }, 0);

  const shippingFee = cartProducts.length > 0 ? 50 : 0;
  const totalAmount = totalMRP - totalDiscount + shippingFee;

  if (loading) return <p className="loading">Loading your cart...</p>;

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛍️ My Shopping Bag ({cartProducts.length})</h2>

      {cartProducts.length === 0 ? (
        <p className="empty-msg">Your cart is empty. Continue shopping!</p>
      ) : (
        <div className="cart-box">
          {/* 🛒 Cart Items Section */}
          <div className="cart-items">
            {cartProducts.map((item) => {
              const price = getNumericPrice(item.price);
              const discountPercent = getDiscountPercent(item.offer);
              const discountedPrice = Math.round(
                price - (price * discountPercent) / 100
              );

              return (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} className="cart-img" />
                  <div className="cart-info">
                    <h3>{item.name}</h3>
                    <p className="price">
                      ₹{discountedPrice} x {item.quantity}{" "}
                      <span className="mrp">₹{price}</span>
                    </p>

                    <div className="qty-controls">
                      <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 💰 Price Details Section */}
          <div className="price-details">
            <h3>PRICE DETAILS ({cartProducts.length} Item)</h3>
            <div className="price-row">
              <span>Total MRP</span>
              <span>₹{totalMRP.toFixed(2)}</span>
            </div>
            <div className="price-row">
              <span>Discount on MRP</span>
              <span className="discount-text">-₹{totalDiscount.toFixed(2)}</span>
            </div>
            <div className="price-row">
              <span>Shipping Fee</span>
              <span>₹{shippingFee}</span>
            </div>
            <hr />
            <div className="price-row total">
              <span>Total Amount</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={() => {
                localStorage.setItem("cartTotal", JSON.stringify(totalAmount));
                navigate("/address");
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

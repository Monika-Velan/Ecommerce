


import React, { useState } from "react";
import "../style/cart.css";
import { allProducts } from "../data/allProducts";

const CartPage = () => {
  const [cart, setCart] = useState(() =>
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // Filter selected products from allProducts
  const cartProducts = allProducts.filter((p) => cart.includes(p.id));

  // Remove from cart
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ✅ Convert price strings like "₹2,299" to numeric values
  const getNumericPrice = (price) =>
    Number(price.replace(/[₹,]/g, "")) || 0;

  // ✅ Calculate totals
  const totalMRP = cartProducts.reduce(
    (sum, p) => sum + getNumericPrice(p.price),
    0
  );

  // Approximate discount percentage if available
  const getDiscountPercent = (offer) => {
    const match = offer?.match(/(\d+)%/);
    return match ? parseInt(match[1]) : 0;
  };

  const totalDiscount = cartProducts.reduce((sum, p) => {
    const price = getNumericPrice(p.price);
    const discountPercent = getDiscountPercent(p.offer);
    return sum + (price * discountPercent) / 100;
  }, 0);

  const shippingFee = cartProducts.length > 0 ? 50 : 0;
  const totalAmount = totalMRP - totalDiscount + shippingFee;

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛍️ My Shopping Bag ({cartProducts.length})</h2>

      {cartProducts.length === 0 ? (
        <p className="empty-msg">Your cart is empty. Continue shopping!</p>
      ) : (
        <div className="cart-box">
          {/* 🛒 Left side - Cart items */}
          <div className="cart-items">
            {cartProducts.map((item) => {
              const price = getNumericPrice(item.price);
              const discountPercent = getDiscountPercent(item.offer);
              const discountedPrice = Math.round(
                price - (price * discountPercent) / 100
              );

              return (
                <div className="cart-item" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-img"
                  />

                  <div className="cart-info">
                    <h3>{item.name}</h3>
                    <p className="brand">{item.category}</p>
                    <p className="price">
                      ₹{discountedPrice}{" "}
                      <span className="mrp">₹{price}</span>{" "}
                      <span className="discount">({discountPercent}% OFF)</span>
                    </p>
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

          {/* 💰 Right side - Price details */}
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
              className="place-order-btn"
              onClick={() => alert("Order placed successfully!")}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;











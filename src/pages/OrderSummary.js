import React, { useEffect, useState } from "react";
import "../style/orderSummary.css";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Retrieve from localStorage
    const savedOrder = JSON.parse(localStorage.getItem("orderDetails"));
    if (savedOrder) {
      setOrderData(savedOrder);
    }
  }, []);

  if (!orderData) {
    return (
      <div className="order-summary-page">
        <div className="order-summary-card">
          <h2>⚠️ No Order Found</h2>
          <p>Your order details are missing. Please complete checkout again.</p>
          <button onClick={() => navigate("/cart")} className="back-btn">
            Go to Cart
          </button>
        </div>
      </div>
    );
  }

  const { address, paymentMethod, totalAmount } = orderData;

  // Generate random order ID
  const orderId = Math.floor(Math.random() * 1000000000)
    .toString()
    .padStart(8, "0");

  return (
    <div className="order-summary-page">
      <div className="order-summary-card">
        <div className="success-icon">✅</div>
        <h2>Order Confirmed!</h2>
        <p className="thank-you">
          Thank you, <strong>{address.fullName}</strong>! 🎉 <br />
          Your order has been placed successfully.
        </p>

        <div className="order-info">
          <div>
            <h4>Order ID</h4>
            <p>#{orderId}</p>
          </div>
          <div>
            <h4>Payment Method</h4>
            <p>{paymentMethod === "COD" ? "Cash on Delivery" : paymentMethod}</p>
          </div>
          <div>
            <h4>Total Amount</h4>
            <p>₹{totalAmount}</p>
          </div>
        </div>

        <div className="shipping-details">
          <h3>Shipping Address</h3>
          <p>
            {address.street}, {address.city}, {address.state} -{" "}
            {address.pincode}, {address.country}
          </p>
        </div>

        <div className="summary-buttons">
          <button className="home-btn" onClick={() => navigate("/")}>
            🏠 Back to Home
          </button>
          <button className="orders-btn" onClick={() => navigate("/orders")}>
            📦 View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

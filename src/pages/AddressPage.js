// import React, { useState } from "react";
// import "../style/address.css";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// // 🔹 Load Stripe (replace with your actual publishable key)
// const stripePromise = loadStripe("pk_test_your_publishable_key_here");

// // ------------------------
// // 🟢 Payment Form (Stripe)
// // ------------------------
// const StripePaymentForm = ({ amount }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Create payment intent dynamically based on total
//       const { data } = await axios.post(
//         "http://localhost:5000/api/create-payment-intent",
//         {
//           amount: amount * 100, // convert ₹ to paise
//         }
//       );

//       const cardElement = elements.getElement(CardElement);

//       const { paymentIntent, error } = await stripe.confirmCardPayment(
//         data.clientSecret,
//         {
//           payment_method: {
//             card: cardElement,
//             billing_details: { name: "Test User" },
//           },
//         }
//       );

//       if (error) {
//         alert(error.message);
//       } else if (paymentIntent.status === "succeeded") {
//         setSuccess(true);
//         alert("Payment Successful 🎉");
//       }
//     } catch (err) {
//       alert("Payment failed");
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="stripe-form">
//       <CardElement className="card-element" />
//       <button disabled={!stripe || loading} className="pay-btn">
//         {loading ? "Processing..." : `Pay ₹${amount}`}
//       </button>
//       {success && <p className="success-msg">Payment Successful 🎉</p>}
//     </form>
//   );
// };

// // ------------------------
// // 🟣 Main Address Page
// // ------------------------
// const AddressPage = () => {
//   const navigate = useNavigate();

//   const [user] = useState(() =>
//     JSON.parse(localStorage.getItem("currentUser")) || null
//   );

//   // ✅ Fetch total from cart
//   const cartTotal = JSON.parse(localStorage.getItem("cartTotal")) || 0;

//   const [address, setAddress] = useState({
//     fullName: "",
//     street: "",
//     city: "",
//     state: "",
//     pincode: "",
//     country: "",
//   });

//   const [paymentMethod, setPaymentMethod] = useState("COD");
//   const [upiDetails, setUpiDetails] = useState({ upiId: "", app: "" });

//   // ✅ Unified order confirmation (with navigation)
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validate UPI fields if chosen
//     if (paymentMethod === "UPI" && (!upiDetails.upiId || !upiDetails.app)) {
//       alert("Please enter your UPI details!");
//       return;
//     }

//     // 🌸 Save order summary to localStorage
//     const orderDetails = {
//       address,
//       paymentMethod,
//       totalAmount: cartTotal,
//     };
//     localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

//     // For demo UPI redirection
//     if (paymentMethod === "UPI") {
//       const upiUrl = `upi://pay?pa=receiver@okaxis&pn=NuveaJewels&am=${cartTotal}&cu=INR`;
//       window.location.href = upiUrl;
//       alert("Redirecting to your UPI app...");
//     }

//     // Confirmation alert and redirect
//     alert("Order confirmed successfully 🎉");
//     navigate("/order-summary");
//   };

//   return (
//     <div className="address-page">
//       <div className="address-container">
//         <div className="address-card">
//           <h2>Checkout</h2>

//           {user ? (
//             <form onSubmit={handleSubmit}>
//               {/* ====== Shipping Address ====== */}
//               <h3 className="section-title">Shipping Address</h3>
//               <div className="form-grid">
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   value={address.fullName}
//                   onChange={(e) =>
//                     setAddress({ ...address, fullName: e.target.value })
//                   }
//                   required
//                 />
//                 <input
//                   type="text"
//                   placeholder="Street Address"
//                   value={address.street}
//                   onChange={(e) =>
//                     setAddress({ ...address, street: e.target.value })
//                   }
//                   required
//                 />
//                 <input
//                   type="text"
//                   placeholder="City"
//                   value={address.city}
//                   onChange={(e) =>
//                     setAddress({ ...address, city: e.target.value })
//                   }
//                   required
//                 />
//                 <input
//                   type="text"
//                   placeholder="State"
//                   value={address.state}
//                   onChange={(e) =>
//                     setAddress({ ...address, state: e.target.value })
//                   }
//                   required
//                 />
//                 <input
//                   type="text"
//                   placeholder="Pincode"
//                   value={address.pincode}
//                   onChange={(e) =>
//                     setAddress({ ...address, pincode: e.target.value })
//                   }
//                   required
//                 />
//                 <input
//                   type="text"
//                   placeholder="Country"
//                   value={address.country}
//                   onChange={(e) =>
//                     setAddress({ ...address, country: e.target.value })
//                   }
//                   required
//                 />
//               </div>

//               {/* ====== Payment Method ====== */}
//               <h3 className="section-title">Payment Method</h3>
//               <div className="payment-options">
//                 {/* COD */}
//                 <label
//                   className={`payment-option ${
//                     paymentMethod === "COD" ? "active" : ""
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="COD"
//                     checked={paymentMethod === "COD"}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                   />
//                   <span>💵 Cash on Delivery</span>
//                   {paymentMethod === "COD" && (
//                     <p className="option-desc">
//                       Pay directly when your order arrives.
//                     </p>
//                   )}
//                 </label>

//                 {/* UPI */}
//                 <label
//                   className={`payment-option ${
//                     paymentMethod === "UPI" ? "active" : ""
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="UPI"
//                     checked={paymentMethod === "UPI"}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                   />
//                   <span>📱 UPI Payment</span>
//                   {paymentMethod === "UPI" && (
//                     <div className="upi-fields">
//                       <input
//                         type="text"
//                         placeholder="UPI ID (e.g. name@upi)"
//                         value={upiDetails.upiId}
//                         onChange={(e) =>
//                           setUpiDetails({
//                             ...upiDetails,
//                             upiId: e.target.value,
//                           })
//                         }
//                         required
//                       />
//                       <select
//                         value={upiDetails.app}
//                         onChange={(e) =>
//                           setUpiDetails({ ...upiDetails, app: e.target.value })
//                         }
//                         required
//                       >
//                         <option value="">Select UPI App</option>
//                         <option value="GooglePay">Google Pay</option>
//                         <option value="PhonePe">PhonePe</option>
//                         <option value="Paytm">Paytm</option>
//                       </select>
//                     </div>
//                   )}
//                 </label>

//                 {/* Credit / Debit Card */}
//                 <label
//                   className={`payment-option ${
//                     paymentMethod === "CARD" ? "active" : ""
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="CARD"
//                     checked={paymentMethod === "CARD"}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                   />
//                   <span>💳 Credit / Debit Card</span>
//                   {paymentMethod === "CARD" && (
//                     <Elements stripe={stripePromise}>
//                       <StripePaymentForm amount={cartTotal} />
//                     </Elements>
//                   )}
//                 </label>
//               </div>

//               <button type="submit" className="order-btn">
//                 Confirm Order
//               </button>
//             </form>
//           ) : (
//             <p>Please login first!</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddressPage;



















import React, { useState } from "react";
import "../style/address.css";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 🔹 Load Stripe (Replace with your actual publishable key from Stripe Dashboard)
const stripePromise = loadStripe("pk_test_your_publishable_key_here");

// 🔹 Backend Base URL (Render)
const BASE_URL = "https://ecommerce-backend-zkqa.onrender.com";

// ------------------------
// 🟢 Payment Form (Stripe)
// ------------------------
const StripePaymentForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create Payment Intent dynamically from backend
      const { data } = await axios.post(`${BASE_URL}/api/create-payment-intent`, {
        amount: amount * 100, // convert ₹ to paise
      });

      const cardElement = elements.getElement(CardElement);

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: { name: "Test User" },
          },
        }
      );

      if (error) {
        alert(error.message);
      } else if (paymentIntent.status === "succeeded") {
        setSuccess(true);
        alert("✅ Payment Successful 🎉");
      }
    } catch (err) {
      console.error("❌ Payment Error:", err);
      alert("Payment failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-form">
      <CardElement className="card-element" />
      <button disabled={!stripe || loading} className="pay-btn">
        {loading ? "Processing..." : `Pay ₹${amount}`}
      </button>
      {success && <p className="success-msg">Payment Successful 🎉</p>}
    </form>
  );
};

// ------------------------
// 🟣 Main Address Page
// ------------------------
const AddressPage = () => {
  const navigate = useNavigate();

  const [user] = useState(() =>
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  // ✅ Fetch total from cart
  const cartTotal = JSON.parse(localStorage.getItem("cartTotal")) || 0;

  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [upiDetails, setUpiDetails] = useState({ upiId: "", app: "" });

  // ✅ Confirm Order (and navigate)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate UPI fields
    if (paymentMethod === "UPI" && (!upiDetails.upiId || !upiDetails.app)) {
      alert("Please enter your UPI details!");
      return;
    }

    // 🌸 Save order summary to localStorage
    const orderDetails = {
      address,
      paymentMethod,
      totalAmount: cartTotal,
    };
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

    // 🌸 Handle UPI Payment
    if (paymentMethod === "UPI") {
      const upiUrl = `upi://pay?pa=receiver@okaxis&pn=NuveaJewels&am=${cartTotal}&cu=INR`;
      window.location.href = upiUrl;
      alert("Redirecting to your UPI app...");
    }

    // 🌸 Confirm and redirect
    alert("Order confirmed successfully 🎉");
    navigate("/order-summary");
  };

  return (
    <div className="address-page">
      <div className="address-container">
        <div className="address-card">
          <h2>Checkout</h2>

          {user ? (
            <form onSubmit={handleSubmit}>
              {/* ====== Shipping Address ====== */}
              <h3 className="section-title">Shipping Address</h3>
              <div className="form-grid">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={address.fullName}
                  onChange={(e) =>
                    setAddress({ ...address, fullName: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Street Address"
                  value={address.street}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="City"
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="State"
                  value={address.state}
                  onChange={(e) =>
                    setAddress({ ...address, state: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  value={address.pincode}
                  onChange={(e) =>
                    setAddress({ ...address, pincode: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={address.country}
                  onChange={(e) =>
                    setAddress({ ...address, country: e.target.value })
                  }
                  required
                />
              </div>

              {/* ====== Payment Method ====== */}
              <h3 className="section-title">Payment Method</h3>
              <div className="payment-options">
                {/* COD */}
                <label
                  className={`payment-option ${
                    paymentMethod === "COD" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>💵 Cash on Delivery</span>
                  {paymentMethod === "COD" && (
                    <p className="option-desc">
                      Pay directly when your order arrives.
                    </p>
                  )}
                </label>

                {/* UPI */}
                <label
                  className={`payment-option ${
                    paymentMethod === "UPI" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    checked={paymentMethod === "UPI"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>📱 UPI Payment</span>
                  {paymentMethod === "UPI" && (
                    <div className="upi-fields">
                      <input
                        type="text"
                        placeholder="UPI ID (e.g. name@upi)"
                        value={upiDetails.upiId}
                        onChange={(e) =>
                          setUpiDetails({
                            ...upiDetails,
                            upiId: e.target.value,
                          })
                        }
                        required
                      />
                      <select
                        value={upiDetails.app}
                        onChange={(e) =>
                          setUpiDetails({ ...upiDetails, app: e.target.value })
                        }
                        required
                      >
                        <option value="">Select UPI App</option>
                        <option value="GooglePay">Google Pay</option>
                        <option value="PhonePe">PhonePe</option>
                        <option value="Paytm">Paytm</option>
                      </select>
                    </div>
                  )}
                </label>

                {/* Credit / Debit Card */}
                <label
                  className={`payment-option ${
                    paymentMethod === "CARD" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="CARD"
                    checked={paymentMethod === "CARD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>💳 Credit / Debit Card</span>
                  {paymentMethod === "CARD" && (
                    <Elements stripe={stripePromise}>
                      <StripePaymentForm amount={cartTotal} />
                    </Elements>
                  )}
                </label>
              </div>

              <button type="submit" className="order-btn">
                Confirm Order
              </button>
            </form>
          ) : (
            <p>Please login first!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressPage;

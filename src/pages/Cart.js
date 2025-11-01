import React from "react";
import "../style/cart.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";

function Cart() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty 🛒</p>
      ) : (
        cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div>
              <h4>{item.name}</h4>
              <p>${item.price}</p>
            </div>
            <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;

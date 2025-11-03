
// pages/AuthPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/authpage.css";


const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState(() =>
    JSON.parse(localStorage.getItem("users")) || []
  );
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      const existingUser = users.find((u) => u.email === email);
      if (existingUser) {
        alert("Email already exists!");
      } else {
        const newUser = { email, password };
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        alert("Signup successful! Please log in.");
        setIsSignup(false);
      }
    } else {
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        alert("Login successful!");
        navigate("/");
      } else {
        alert("Invalid email or password!");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
        </form>
        <p className="toggle-text">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login here" : "Sign up here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/profilepage.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("currentUser")) || null
  );
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!user) navigate("/auth");
  }, [user, navigate]);

  const handleSave = () => {
    const updatedUser = { ...user, name, phone };
    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/auth");
  };

  return (
    <div className="profile-container">
      <h2>👋 Welcome, {name || user?.email?.split("@")[0]}!</h2>
      <div className="profile-card">
        <p><strong>Email:</strong> {user?.email}</p>
        {isEditing ? (
          <>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button onClick={handleSave}>💾 Save</button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {name || "Not set"}</p>
            <p><strong>Phone:</strong> {phone || "Not set"}</p>
            <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
          </>
        )}
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        🚪 Logout
      </button>
    </div>
  );
};

export default ProfilePage;

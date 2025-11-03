
// // components/Navbar.js
// import React, { useState } from "react";
// import {
//   FaShoppingCart,
//   FaHeart,
//   FaBars,
//   FaTimes,
//   FaSearch,
//   FaUser,
// } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import "../style/navbar.css";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   return (
//     <header className="navbar">
//       {/* ===== Top Section ===== */}
//       <div className="navbar-top">
//         {/* Logo */}
//         <div className="logo">
//           <h1 className="brand-name">Nuvéa</h1>
//           <p className="tagline">Elegance in Every Detail</p>
//         </div>

//         {/* Search Bar */}
//         <div className="search-box">
//           <input type="text" placeholder="Search jewellery..." />
//           <FaSearch className="search-icon" />
//         </div>

//         {/* Icons */}
//         <div className="nav-actions">
//           <FaHeart
//             className="icon"
//             title="Wishlist"
//             onClick={() => navigate("/wishlist")}
//           />
//           <FaShoppingCart
//             className="icon"
//             title="Cart"
//             onClick={() => navigate("/cart")}
//           />
//           <FaUser
//             className="icon"
//             title="Profile"
//             onClick={() => navigate("/auth")} // ✅ Navigate to login/signup
//           />

//           <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </div>
//         </div>
//       </div>

//       {/* ===== Bottom Navigation Links ===== */}
//       <div className={`navbar-bottom ${menuOpen ? "active" : ""}`}>
//         <Link to="/">Home</Link>
//         <Link to="/new-arrivals">New Arrivals</Link>
//         <Link to="/collections">Collections</Link>
//         <Link to="/about">About</Link>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

























import React, { useState } from "react";
import {
  FaShoppingCart,
  FaHeart,
  FaBars,
  FaTimes,
  FaSearch,
  FaUser,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../style/navbar.css";
import { useSearch } from "../context/SearchContext"; // ✅ Import context

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { setSearchQuery } = useSearch(); // ✅ Hook for shared search

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  return (
    <header className="navbar">
      {/* ===== Top Section ===== */}
      <div className="navbar-top">
        {/* Logo */}
        <div className="logo">
          <h1 className="brand-name">Nuvéa</h1>
          <p className="tagline">Elegance in Every Detail</p>
        </div>

        {/* Search Bar */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search jewellery..."
            onChange={handleSearchChange}
          />
          <FaSearch className="search-icon" />
        </div>

        {/* Icons */}
        <div className="nav-actions">
          <FaHeart
            className="icon"
            title="Wishlist"
            onClick={() => navigate("/wishlist")}
          />
          <FaShoppingCart
            className="icon"
            title="Cart"
            onClick={() => navigate("/cart")}
          />
          <FaUser
            className="icon"
            title="Profile"
            onClick={() => navigate("/auth")}
          />

          <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>

      {/* ===== Bottom Navigation Links ===== */}
      <div className={`navbar-bottom ${menuOpen ? "active" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/new-arrivals">New Arrivals</Link>
        <Link to="/collections">Collections</Link>
        <Link to="/about">About</Link>
      </div>
    </header>
  );
};

export default Navbar;

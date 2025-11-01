// import React, { useState } from "react";
// import { FaShoppingCart, FaHeart, FaBars, FaTimes, FaSearch, FaUser } from "react-icons/fa";
// import "../style/navbar.css";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

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
//           <FaHeart className="icon" title="Wishlist" />
//           <FaShoppingCart className="icon" title="Cart" />
//           <FaUser className="icon" title="Profile" />
//           <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </div>
//         </div>
//       </div>

//       {/* ===== Bottom Navigation Links ===== */}
//       <div className={`navbar-bottom ${menuOpen ? "active" : ""}`}>
//         <a href="/">Home</a>
//         <a href="/new-arrivals">New Arrivals</a>
//         <a href="/products">Collections</a>
//         <a href="/about">About</a>
//       </div>
//     </header>
//   );
// };

// export default Navbar;











import React, { useState } from "react";
import { FaShoppingCart, FaHeart, FaBars, FaTimes, FaSearch, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom"; // ✅ Import Link from react-router-dom
import "../style/navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
          <input type="text" placeholder="Search jewellery..." />
          <FaSearch className="search-icon" />
        </div>

        {/* Icons */}
        <div className="nav-actions">
          <FaHeart className="icon" title="Wishlist" />
          <FaShoppingCart className="icon" title="Cart" />
          <FaUser className="icon" title="Profile" />
          <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>

      {/* ===== Bottom Navigation Links ===== */}
      <div className={`navbar-bottom ${menuOpen ? "active" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/new-arrivals">New Arrivals</Link>
        <Link to="/collections">Collections</Link> {/* ✅ Corrected path */}
        <Link to="/about">About</Link>
      </div>
    </header>
  );
};

export default Navbar;

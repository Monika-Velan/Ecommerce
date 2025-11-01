import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import NewArrivals from "./pages/NewArrival";
import Collections from "./pages/Collections";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ marginTop: "90px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/collections" element={<Collections />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

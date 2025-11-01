
import React from "react";
import "../style/home.css";
import "../style/navbar.css"; // ✅ new navbar CSS
import ElegantModel from "../assets/Elegant Model.jpeg";
import JewelleryModel from "../assets/Jewellery Model.jpeg";
import BridalJewellery from "../assets/Bridal Jewellery.jpeg";
import AntiqueJewellery from "../assets/Antique Jewellery.jpeg";
import FashionJewellery from "../assets/Fashion Jewellery.jpeg";
import Earrings from "../assets/Earrings.jpeg";
import Pendant from "../assets/Pendant.jpeg";
import RingNew from "../assets/RING NEW ARRIVAL.jpeg";
import ChokerNew from "../assets/Choker NEW ARRIVAL.jpeg";
import BraceletNew from "../assets/BRACELETS NEW ARRIVAL.jpeg";
import NeckpieceNew from "../assets/NECKPIECE NEW ARRIVAL.jpeg";
import EarringNew from "../assets/EARING NEW ARRIVAL.jpeg";

const Home = () => {
  return (
    <>
      
      {/* ===== Main Home Content ===== */}
      <div className="home-container">
        {/* ===== Hero Section ===== */}
        <section className="hero-section">
          <div className="hero-text">
            <h1>Fabulous Daily Wear Jewellery</h1>
            <p>
              Discover handcrafted elegance and timeless pieces that bring out the
              best in you. Explore our latest collection designed for every
              occasion.
            </p>
            <button className="shop-btn">Shop Now</button>
          </div>
          <div className="hero-image">
            <img src={ElegantModel} alt="Jewellery Model" />
          </div>
        </section>

        {/* ===== Featured Section ===== */}
        <section className="featured-section">
          <div className="featured-left">
            <img src={JewelleryModel} alt="Elegant Woman" />
          </div>
          <div className="featured-right">
            <h3>New Design</h3>
            <h2>Extraordinary Designs</h2>
            <p>
              Our latest jewellery collection features fine craftsmanship and
              intricate artistry. Each piece is designed to make you shine with
              sophistication and grace.
            </p>
            <p className="highlight">Best Gift For Your Loved One</p>
            <button className="shop-btn small">Shop Now</button>
          </div>
        </section>

        {/* ===== Category Section ===== */}
        <section className="category-section">
          <div className="category-card">
            <img src={BridalJewellery} alt="Bridal Jewellery" />
            <h3>Traditional Bridal Jewellery</h3>
            <button className="shop-btn small">Shop Now</button>
          </div>

          <div className="category-card">
            <img src={AntiqueJewellery} alt="Antique Jewellery" />
            <h3>Trending Antique Jewellery</h3>
            <button className="shop-btn small">Shop Now</button>
          </div>

          <div className="category-card">
            <img src={FashionJewellery} alt="Fashion Jewellery" />
            <h3>Modern Fashion Jewellery</h3>
            <button className="shop-btn small">Shop Now</button>
          </div>
        </section>

        {/* ===== Offer Section ===== */}
        <section className="offer-section">
          <div className="offer-box">
            <img src={Earrings} alt="Earrings Offer" />
            <div className="offer-text">
              <h2>Get 20% Flat Offer on Earrings</h2>
              <button className="shop-btn small">Shop Now</button>
            </div>
          </div>

          <div className="offer-box">
            <img src={Pendant} alt="Pendant Offer" />
            <div className="offer-text">
              <h2>Well Designed Pendant - 23% Flat</h2>
              <button className="shop-btn small">Shop Now</button>
            </div>
          </div>
        </section>

        {/* ===== New Arrivals ===== */}
        <section className="new-arrivals" id="new-arrivals">
          <h2>New Arrival Jewels</h2>
          <p>
            Explore our latest arrivals crafted with perfection and luxury.
            Designed to add charm and beauty to every special moment.
          </p>

          <div className="arrival-grid">
        
            <div className="arrival-item">
              <img src={ChokerNew} alt="New Arrival Choker" />
              <h4>Golden Choker</h4>
            </div>

            <div className="arrival-item">
              <img src={BraceletNew} alt="New Arrival Bracelet" />
              <h4>Bracelet Collection</h4>
            </div>

            <div className="arrival-item">
              <img src={NeckpieceNew} alt="New Arrival Neckpiece" />
              <h4>Stylish Neckpiece</h4>
            </div>

            <div className="arrival-item">
              <img src={EarringNew} alt="New Arrival Earrings" />
              <h4>New Earrings</h4>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;

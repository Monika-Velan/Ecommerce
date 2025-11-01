import React from "react";
import "../style/about.css";

const About = () => {
  return (
    <div className="about-container">
      <section className="about-intro">
        <h1>About Nuvéa Jewellery</h1>
        <p>
          At <strong>Nuvéa</strong>, we believe jewellery is more than just an
          accessory — it’s a reflection of elegance, individuality, and timeless
          beauty. Each piece is handcrafted with precision and passion to bring
          out your inner radiance.
        </p>
      </section>

      <section className="about-services">
        <h2>Our Services</h2>
        <ul>
          <li>Custom-made jewellery crafted to perfection</li>
          <li>Gold, silver, and diamond collection with certification</li>
          <li>Personalized engraving and gift packaging</li>
          <li>Lifetime cleaning and maintenance services</li>
        </ul>
      </section>

      <section className="about-terms">
        <h2>Terms of Service</h2>
        <p>
          All purchases made through Nuvéa are governed by our terms of service.
          We ensure transparency in pricing, authenticity in every product, and
          secure transactions. Customers are requested to verify details before
          confirming their orders.
        </p>
      </section>

      <section className="about-delivery">
        <h2>Delivery Information</h2>
        <p>
          We deliver across India within <strong>5–7 working days</strong> from
          the date of order confirmation. Our working hours are{" "}
          <strong>Monday to Saturday, 9:00 AM – 6:00 PM</strong>. Orders placed
          on Sundays or public holidays will be processed the next working day.
        </p>
      </section>

      <section className="about-policy">
        <h2>Exchange & Return Policy</h2>
        <p>
          We accept exchanges and returns within <strong>7 days</strong> of
          delivery, provided the item is unused and in its original packaging.
          Customized pieces are not eligible for return. Refunds are processed
          within <strong>5–10 business days</strong> after inspection.
        </p>
      </section>

      <section className="about-contact">
        <h2>Contact Us</h2>
        <p>
          <strong>Email:</strong> support@nuvéa.com <br />
          <strong>Office Location:</strong> 23B, Crescent Plaza, MG Road,
          Chennai, India – 600041
        </p>
      </section>
    </div>
  );
};

export default About;

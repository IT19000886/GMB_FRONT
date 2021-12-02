import React from "react";
import MultiplePizzas from "../assets/about.png";
import "../styles/About.css";
import Navbar from '../Navbar'
import Footer from "../Footer";
function About() {
  return (
    <>
    <nav>
      <Navbar />
    </nav>
    <div className="ab">
      <div
        className="abTop"
        style={{ backgroundImage: `url(${MultiplePizzas})` }}
      ></div>
      <div className="abBottom">
        <h1> ABOUT US</h1>
        <p>
        Welcome to GMB Blinds and Curtains. We are a Blinds, Curtains, and window furnishing manufacturer, sales and installations supplier in Melbourne, and your one-stop-shop for all window and home furnishing needs. GMB Blinds & Curtains was established in early 2000 and since then we have grown in leaps and bounds. With 13 years of experience in window furnishings, we are solely motivated by ensuring that our customers are supplied with uniquely designed window furnishings of high quality, to accommodate the style of your home.We incredibly pride ourselves to cover over 3 million windows in AUSTRALIA since we started. For either a traditional, modern, or contemporary look, our consultants are dedicated to ensuring that you are informed on all options available to you, keeping in mind your style of home, decor, and required look. We supply an extensive range of fabrics that are constantly updated with the latest trends, colours, patterns, and texture.


        </p>
      </div>
    </div>
    <Footer/>
       
       </>
  );
}

export default About;

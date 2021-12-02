import React from "react";
import PizzaLeft from "../assets/contact.jpg";
import "../styles/Contact.css";
import Navbar from '../Navbar'
import Footer from "../Footer";
function Contact() {
  
  return (
    <>
    <nav>
      <Navbar />
    </nav>
    <div className="contact">

      <div className="leftSide" style={{ backgroundImage: `url(${PizzaLeft})` }}></div>
      <div className="rightSide">
        <h1> Contact Us</h1>

        <form id="contact-form" method="POST">
          <label htmlFor="name">Full Name</label>
          <input name="name" placeholder="" type="text" />
          <label htmlFor="email">Email</label>
          <input name="email" placeholder="" type="email" />
          <label htmlFor="message">Message</label>
          <textarea
            rows="6"
            placeholder=""
            name="message"
            required
          ></textarea>
          <button type="submit"> Send Message</button>
        </form>
      </div>
      
    </div>
    <Footer/>
    </>
  );
}

export default Contact;

import React from "react";
import { BrowserRouter as Router, Switch, Route,Link } from 'react-router-dom';
import BannerImage from "../assets/home.jpg";
import "../styles/Home.css";
import Navbar from '../Navbar'
import Footer from "../Footer";
import Sidebar from "../Sidebar/comp/Sidebar";

function Home() {
  return (
    <>
    <nav>
<Navbar />
<Sidebar />
    </nav>
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer">
        <h1> GMB WINDOW COVERINGS </h1>
        <br /> <br />
        <p> Made To Measure;
        At Your Convenience;
        We Do It All For You.
        </p>
        <Link to="/loginpage">
          <button> ORDER NOW </button>
        </Link>
      </div>
    </div>
 <Footer/>
       
            </>
  );
}

export default Home;

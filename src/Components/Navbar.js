import React, { useState } from "react";
import Logo from "./assets/logo.png";
import { Link, Switch } from "react-router-dom";
import ReorderIcon from "@material-ui/icons/Reorder";
import "./styles/Navbar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img src={Logo} />
      </div>
      {
        sessionStorage.getItem('tokenTime') === '7200' ?
        (
          <div className="rightSide">
           
              <Link to="/"> Home </Link>
              <Link to="/about"> About </Link>
              <Link to="/quote"> Free Measure + Quote </Link>
              <Link to="/contact"> Contact </Link>
              <Link to="/logout"> Log out </Link>    
              <button onClick={toggleNavbar}>
                <ReorderIcon />
              </button>
            
          </div>
        )
        : sessionStorage.getItem('tokenTime') === null ?
        (
          <div className="rightSide">
           
              <Link to="/"> Home </Link>
              <Link to="/about"> About </Link>
              <Link to="/quote"> Free Measure + Quote </Link>
              <Link to="/contact"> Contact </Link>
              <Link to="/loginpage"> Login </Link>   
              <button onClick={toggleNavbar}>
                <ReorderIcon />
              </button>
            
          </div>
        )
        : null  
      }
    </div>
  );
}

export default Navbar

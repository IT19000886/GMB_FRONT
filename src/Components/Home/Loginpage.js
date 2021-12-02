import React from "react";
import Login from "../Login/login";
import "../styles/login.scss"
import Navbar from '../Navbar'


class Loginpage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {  
    return (
      <>
      <nav>
        <Navbar />
      </nav>
      <div className="loginpage">
        <div className="login">
          <div className="container" ref={ref => (this.container = ref)}>
            {(
              <Login containerRef={ref => (this.current = ref)} />
            )}
            
          </div>
          
        </div>
      </div>
      {/* <Footer/> */}
    </>
    );
  }
}



export default Loginpage;
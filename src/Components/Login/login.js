import React, { Component } from "react";
import axios from 'axios';
import { withRouter } from "react-router-dom";
import loginImg from "../login.svg";
import "./style.scss";
import Swal from 'sweetalert2';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible:false,
      email:'',
      password:''
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss(){
    this.setState({
        visible : false
    })
  }
  
    onValueChange(e){
        this.setState({
          [e.target.name] : e.target.value
        })
    }
    
    onFormSubmit(e){
      e.preventDefault();
      const email = this.state.email;
      const password = this.state.password;

      const user = {email,password};

        axios.post('http://localhost:4000/api/auth/login', user)
                    .then(response => {
                      
                        if (response.status == 200) {
                            Swal.fire({
                                title: 'Login Successful',
                                type: 'success',
                                confirmButtonText: 'OK!',
                            }).then((result) => {

                                if (result.value) {
                                    sessionStorage.setItem('userToken', response.data.token);
                                    sessionStorage.setItem('tokenTime', response.data.tokenLifeInSeconds);
                                    window.location.assign('/order');
                                }
                            });
                        } else {
                            Swal.fire('Oops...', 'Invalid Password or User Id', 'error');
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    });

  }

  render() {
    return (
      <form id="login" onSubmit={this.onFormSubmit}>
      <div className="base-container" >
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="enter your email" className="form-control form-control-lg" 
              onChange={this.onValueChange}
              value={this.state.email}
              required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="enter your password" className="form-control form-control-lg" 
              onChange={this.onValueChange}
              value={this.state.password}
              required
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="submit" className="btn btn-dark">
            Login
          </button>
        </div>
      </div>
      </form>
     
    );
  }
}

export default withRouter(Login);

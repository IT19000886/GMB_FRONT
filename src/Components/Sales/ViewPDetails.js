import React, { Component } from 'react';
import axios from 'axios';
import { Alert, UncontrolledAlert, Button } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import { Container, Form, Row, Col } from 'react-bootstrap';
import { withRouter } from "react-router";
import { width } from '@mui/system';

class ViewPDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      show:false ,
      showCheckbox:false,
      visible:false,
      clientName:'',
      address:'',
      suburb:'',
      postalCode:'',
      contactNum:'',
      email:'',
      imageURL:'',
      measuredBy:''
    }
    this.onDismiss = this.onDismiss.bind(this);
    this.onValueChange = this.onValueChange.bind(this);

  }

  componentDidMount(){
    console.log(this.props)
    axios.get('http://localhost:4000/api/client/tempClient/'+this.props.match.params.id)
        .then(
            user =>{
                this.setState({
                  clientName:user.data.ClientName,
                  address:user.data.Address,
                  suburb:user.data.Suburb,
                  postalCode:user.data.PostalCode,
                  contactNum:user.data.ContactNum,
                  email:user.data.Email,
                  imageURL:user.data.ImageURL,
                  measuredBy:user.data.MeasuredBy
                })
            }
        )
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
  
  render() {
    return (
      <>
     
      <div className="container py-4">
        <div className={"pt-5"}>
          <h5>Personal Details</h5>
          <hr></hr>
         <form  className="form-inline p-0 pb-4" >
      <div className="row">
        <div className="form-group col-md-4">
          <label htmlFor="clientName">Client Name: </label>
          <input 
          type="text" 
          className="form-control" 
          name="clientName"
          disabled={true}
          onChange={this.onValueChange}
          value={this.state.clientName}
          />
      </div>
      <div className="form-group col-md-4">
      <label htmlFor="contactNumber" >Contact No: </label>
          <input 
          type="text" 
          className="form-control" 
          name="contactNum"
          disabled={true}
          onChange={this.onValueChange}
          value={this.state.contactNum}
          />
      </div>
      <div className="form-group col-md-4">
      <label>Email: </label>
          <input 
          type="email" 
          className="form-control form-control-lg" 
          name="email"
          disabled={true}
          onChange={this.onValueChange}
          value={this.state.email}  
          />
      </div >
      </div>
      <div className="row">
      <div className="form-group col-md-4">
      <label htmlFor="address1">Address: </label>
          <input 
          type="text" 
          className="form-control form-control-lg" 
          name="address"
          disabled={true}
          onChange={this.onValueChange}
          value={this.state.address}
          />
      </div>
      <div className="form-group col-md-4">
      <label htmlFor="address1">Suburb: </label>
          <input 
          type="text" 
          className="form-control form-control-lg" 
          name="suburb"
          disabled={true}
          onChange={this.onValueChange}
          value={this.state.suburb}
          />
      </div>
      <div className="form-group col-md-4">
      <label>Postcode: </label>
          <input 
          type="text" 
          className="form-control form-control-lg" 
          name="postalCode"
          disabled={true}
          onChange={this.onValueChange}
          value={this.state.postalCode}
          />
      </div>
     </div>
          
      <label for="measure"><strong>Measured By: </strong></label>
              {['radio'].map((type) => (
                <div key={`inline-${type}`} className="mb-3" id="measuredBy">
                  <Form.Check
                    inline
                    label="Client"
                    name="measuredBy"
                    type={type}
                    id={`inline-${type}-1`}
                    disabled
                    checked = {this.state.measuredBy=="Client"}
                   
                  />
                  <Form.Check
                    inline
                    label="GMB team"
                    name="measuredBy"
                    type={type}
                    id={`inline-${type}-2`}
                    disabled
                    checked = {this.state.measuredBy=="GMB team"}
                   
                  />
                  <Form.Check
                    inline
                    label="Floor plan"
                    name="measuredBy"
                    type={type}
                    id={`inline-${type}-3`}
                    disabled
                    checked = {this.state.measuredBy=="Floor plan"}
                    
                  />
                </div>
              ))}
               
              <Link to={'/personal/'+this.props.match.params.id}><Button style={{float:'right'}} color="info">Edit</Button></Link>
              
              </form>
              </div>
              </div>
              </>
              )
             
            }
              
  
}

export default withRouter(ViewPDetails);
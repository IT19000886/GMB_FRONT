import axios from 'axios';
import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom';
import FileUploadComponent from './FileUploadComponent';
import { withRouter } from "react-router";
import Swal from 'sweetalert2';
import { Container, Form, Row, Col } from 'react-bootstrap';

class EditPersonalDetail extends Component{

  constructor(props){
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
          date: null,
          status: '',
          measuredBy: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.onCheckbox = this.onCheckbox.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
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
                  date:user.data.Date,
                  status:user.data.Status,
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

    onFormSubmit(e){
        e.preventDefault();

        const clientName = this.state.clientName;
        const address = this.state.address;
        const suburb = this.state.suburb;
        const postalCode = this.state.postalCode;
        const contactNum = this.state.contactNum;
        const email = this.state.email;
        const imageURL = this.state.imageURL;
        const tempClientID = this.props.match.params.id;
        const date = this.state.date;
        const status = this.state.status;
        const measuredBy = this.state.measuredBy;

        const user = {tempClientID,clientName,address,suburb,postalCode,contactNum,email,imageURL,date,status,measuredBy};

        axios.put('http://localhost:4000/api/client/tempClient/'+this.props.match.params.id, user)
        .then(res =>{
          this.setState({
            visible:true,
            clientName:'',
            address:'',
            suburb:'',
            postalCode:'',
            contactNum:'',
            email:'',
            imageURL:'',
            measuredBy:''

          });
          Swal.fire(
            'Done',
            'User Details Updated!',
            'success'
            ) 
          this.props.history.push('/ordersummary/'+this.props.match.params.id);
        })
    }

    handleChange(){
      this.setState({show: !this.state.show})
    }

    onCheckbox(){
        this.setState({showCheckbox: !this.state.showCheckbox})
    }
    
    
render(){
    return (
      <div className="container">
      <div className="text-right shadow py-4">
      <h1 className="text-center mb-4" >Personal Details</h1>
      <form id="personal-details" onSubmit={this.onFormSubmit}>
      <Row >
    <Col md ="4">
      <div className="form-group">
          <label>Client Name: </label>
          <input 
          type="text" 
          className="form-control form-control-lg" 
          name="clientName"
          onChange={this.onValueChange}
          value={this.state.clientName}
          required
          />
      </div>
      </Col>
    <Col md ="8">
      <div className="form-group">
      <label>Address: </label>
          <input 
          type="text" 
          className="form-control form-control-lg" 
          name="address"
          onChange={this.onValueChange}
          value={this.state.address}
          required
          />
      </div>
      </Col>
    </Row>
    <Row>
    <Col>
      <div className="form-group">
      <label>Suburb: </label>
          <input 
          type="text" 
          className="form-control form-control-lg" 
          name="suburb"
          onChange={this.onValueChange}
          value={this.state.suburb}
          required
          />
      </div>
      </Col>
    <Col>
      <div className="form-group">
      <label>Postcode: </label>
          <input 
          type="text" 
          className="form-control form-control-lg" 
          name="postalCode"
          onChange={this.onValueChange}
          value={this.state.postalCode}
          required
          />
      </div>
      </Col>
    <Col>
      <div className="form-group">
      <label>Contact No: </label>
          <input 
          type="text" 
          className="form-control form-control-lg" 
          name="contactNum"
          onChange={this.onValueChange}
          value={this.state.contactNum}
          required
          />
      </div>
      </Col>
    </Row>
    <Col>
      <div className="form-group">
      <label>Email: </label>
          <input 
          type="email" 
          className="form-control form-control-lg" 
          name="email"
          onChange={this.onValueChange}
          value={this.state.email}  
          required
          />
      </div >
      </Col>
    <Row>
    <Col>

      <Form.Label for="type3"><strong>Measured by:</strong></Form.Label>
                <div className="mb-3" id="measuredBy">
                  <Form.Check
                    inline
                    label="Client"
                    name="measuredBy"
                    type="radio"
                    onChange={this.onValueChange} 
                    value="Client"
                    checked = {this.state.measuredBy=="Client"}
                  />
                  <Form.Check
                    inline
                    label="GMB team"
                    name="measuredBy"
                    type="radio"
                    onChange={this.onValueChange} 
                    value="GMB team"
                    checked = {this.state.measuredBy=="GMB team"}
                  />
                  <Form.Check
                    inline
                    label="Floor plan"
                    name="measuredBy"
                    type="radio"
                    onChange={this.onValueChange} 
                    value="Floor plan"
                    checked = {this.state.measuredBy=="Floor plan"}
                  />
                </div>
        </Col>
            </Row> 

      <div className="form-group text-right ">
    
      <label>Upload Image</label>
  
      <div className="Image text-right">
      <Form.Check
                    inline
                    label="Upload"
                    name="image"
                    type="checkbox"
                    value="upload" onChange={this.onCheckbox}
                  />
      </div>
      </div>
        <div>
        {
            this.state.showCheckbox ? <FileUploadComponent /> : null
        }
         
      </div >
     
      <button type="submit">Add Details</button>
      </form>
      </div>
  </div>
    )
  }
}

export default withRouter(EditPersonalDetail);
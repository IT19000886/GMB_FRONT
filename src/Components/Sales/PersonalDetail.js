import axios from 'axios';
import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom';
import FileUploadComponent from './FileUploadComponent';
import { Container, Form, Row, Col } from 'react-bootstrap';


class PersonalDetail extends Component{

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
          measuredBy:''
          
    }

    this.handleChange = this.handleChange.bind(this);
    this.onCheckbox = this.onCheckbox.bind(this);
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
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
    
         var date = mm + '/' + dd + '/' + yyyy;
         var status = 'New';

        const clientName = this.state.clientName;
        const address = this.state.address;
        const suburb = this.state.suburb;
        const postalCode = this.state.postalCode;
        const contactNum = this.state.contactNum;
        const email = this.state.email;
        const imageURL = this.state.imageURL;
        const measuredBy = this.state.measuredBy;

        const user = {clientName,address,suburb,postalCode,contactNum,email,imageURL,date,status,measuredBy};

        console.log(user,'###')
        axios.post('http://localhost:4000/api/client/tempClient', user)
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

          this.props.history.push('/order');
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
        <div className="text-right shadow py-5">
        <h1 className="text-center mb-4" >Personal Details</h1>
        <form id="personal-details" onSubmit={this.onFormSubmit}>
        <Row >
      <Col md ="4">
        <div className="form-group">
            <label>Client Name: </label>
            <input 
            type="text" 
            className="form-control form-control-lg" 
            placeholder="Enter Client Name" 
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
            placeholder="Enter Address" 
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
            placeholder="Enter Suburb" 
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
            placeholder="Enter Postcode" 
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
            placeholder="Enter Contact No" 
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
            placeholder="Enter Email" 
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
                  <div className="mb-3" id="measure">
                    <Form.Check
                      inline
                      label="Client"
                      name="measuredBy"
                      type="radio"
                      onChange={this.onValueChange} 
                      value="Client"
                    />
                    <Form.Check
                      inline
                      label="GMB team"
                      name="measuredBy"
                      type="radio"
                      onChange={this.onValueChange} 
                      value="GMB team"
                    />
                    <Form.Check
                      inline
                      label="Floor plan"
                      name="measuredBy"
                      type="radio"
                      onChange={this.onValueChange} 
                      value="Floor plan"
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
       
        <div className="text-center m-2" >
        <button type="submit" class="btn btn-primary">Add Details</button>
        </div>
    
        </form>
        </div>
    </div>
    )
        }
}

export default PersonalDetail

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { Container, Form, Row, Col } from 'react-bootstrap';
import { Component } from 'react';
import { Button } from 'reactstrap';
import AdditionalCharges from './modal/AdditionalCharges';
import Swal from 'sweetalert2';



class EditSales extends Component {
  constructor(props){
    super(props);

    this.state = {
      showAddCharge: false,
      visible : false,
      tempClientID : 0,
      location: "",
      locationCode : "",
      SOM:"",
      coveringType1:"",
      coveringType2:"",
      coveringType3:"", 
      measurment:"",
      width:0,
      drop:0,
      quantity:0,
      openingWay:"",
      controll:"",
      contollSide:"",
      fabricRange:0,
      fabricWidth:0,
      mountPoint:0,        
      fabricDetails:"",
      description:"",
      specification:"",
      coveringType1ID:0,
      CT1:[],
      CT2Names:[],
      CT3Names:[],

  };
  this.onDismiss = this.onDismiss.bind(this);
  this.onValueChange = this.onValueChange.bind(this);
  this.onFormSubmit = this.onFormSubmit.bind(this);
  this.openAddCharge  = this.openAddCharge.bind(this);
  }

  onDismiss(){
    this.setState({
        visible : false
    })
}

openAddCharge(){
  this.setState({
      showAddCharge:!this.state.showAddCharge
  })
}


onValueChange(e){
  this.setState({
      [e.target.name] : e.target.value
  })
}

componentDidMount(){
  // this.setState({
  //   CT1:[
  //     {name:'SRB', CT2:[ 'Front Roll', 'Back Roll'], CT3:[]},
  //     {name:'BRB', CT2:[ 'Front Roll', 'Back Roll'], CT3:[]},
  //     {name:'TRB', CT2:[ 'Front Roll', 'Back Roll'], CT3:[]},
  //     {name:'Curtain', CT2:['Add Lining', 'Coated Fabric', 'Translucent'], CT3:['Wave Fold','S Fold', 'Pinch Pleat','Pocket','Pencil', 'Eyelet']},
  //     {name:'Sheer-Curtain', CT2:['See Through', 'Translucent'], CT3:['Wave','S Fold', 'Pinched','Pocket','Pencil']},
  //     {name:'Plantation Shutter', CT2:['Powder Coat Timber', 'Stain on Timber','Aluminium','PVC with Amuminium Insert'], CT3:['SLATS 89mm', 'SLATS 63mm', 'SLATS 114mm']},
      
  //   ],
  // })
  console.log(this.props)
    
  axios.get('http://localhost:4000/api/order/orderByID/'+this.props.match.params.id)
    .then(
    user =>{
    this.setState({
      tempClientID:user.data.TempClientID,
      location: user.data.Location,
      locationCode : user.data.LocationCode,
      SOM:user.data.SOM,
      coveringType1:user.data.CoveringType1,
      coveringType2:user.data.CoveringType2,
      coveringType3:user.data.CoveringType3, 
      measurment:user.data.Measurment,
      width:user.data.Width,
      drop:user.data.Drop,
      quantity:user.data.Quantity,
      openingWay:user.data.OpeningWay,
      controll:user.data.Controll,
      contollSide:user.data.ContollSide,
      fabricRange:user.data.FabricRange,
      fabricWidth:user.data.FabricWidth,
      mountPoint:user.data.MountPoint,        
      fabricDetails:user.data.FabricDetails,
      description:user.data.Description,
      specification:user.data.Specification
      
    })
  }
)

axios.get('http://localhost:4000/api/setting/coveringType')
  .then(
          user =>{
                this.setState({
                  CT1:user.data,
                })
                this.state.CT1.map(x => {
                  if(x.CoveringName == this.state.coveringType1){
                    this.setState({
                      coveringType1ID: x.CoveringTypeID
                    })
                  }
                })
              }
        )
      
axios.get('http://localhost:4000/api/setting/coveringSubType1/'+this.state.coveringType1ID)
 .then(
        user =>{
             this.setState({
               CT2Names:user.data
             })
           }
    )
      
axios.get('http://localhost:4000/api/setting/coveringSubType2/'+this.state.coveringType1ID)
  .then(
         user =>{
              this.setState({
                CT3Names:user.data
               })
            }
       )   

}

componentDidUpdate(prevProps, prevState){
  axios.get('http://localhost:4000/api/setting/coveringType/'+this.state.coveringType1ID)
  .then(
          user =>{
                this.setState({
                  coveringType1:user.data.CoveringName,
                })
              }
        )

  if (this.state.coveringType1ID !== prevState.coveringType1ID) {
  axios.get('http://localhost:4000/api/setting/coveringSubType1/'+this.state.coveringType1ID)
 .then(
          user =>{
                this.setState({
                  CT2Names:user.data
                })
              }
        )

axios.get('http://localhost:4000/api/setting/coveringSubType2/'+this.state.coveringType1ID)
  .then(
           user =>{
                  this.setState({
                    CT3Names:user.data
                  })
              }
        )   

  }           
}
    
onFormSubmit(e){
  e.preventDefault();
  const orderID = this.props.match.params.id;
  const tempClientID = this.state.tempClientID;
  const location = this.state.location;
  const locationCode = this.state.locationCode;
  const SOM = this.state.SOM;
  const coveringType1 = this.state.coveringType1;
  const coveringType2 = this.state.coveringType2;
  const coveringType3 = this.state.coveringType3;
  const measurment = this.state.measurment;
  const width = this.state.width;
  const drop = this.state.drop;
  const quantity = this.state.quantity;
  const openingWay = this.state.openingWay;
  const controll = this.state.controll;
  const contollSide = this.state.contollSide;
  const fabricRange = this.state.fabricRange;
  const fabricWidth = this.state.fabricWidth;
  const mountPoint = this.state.mountPoint;
  const fabricDetails = this.state.fabricDetails;
  const specification = this.state.specification;
  const description = this.state.description;

  const addorders = {orderID,location, locationCode, SOM, coveringType1, coveringType2, coveringType3,
    measurment, width, drop, quantity, openingWay, controll, contollSide, fabricRange, 
    fabricWidth, mountPoint, fabricDetails, description, specification}

    axios.put('http://localhost:4000/api/order/order/'+this.props.match.params.id, addorders)
      .then(res => {
          this.setState({
              visible : true,
              tempClientID:0,
              location: "",
              locationCode : "",
              SOM:"",
              coveringType1:"",
              coveringType2:"",
              coveringType3:"", 
              measurment:"",
              width:0,
              drop:0,
              quantity:0,
              openingWay:"",
              controll:"",
              controllSide:"",
              fabricRange:0,
              fabricWidth:0,
              mountPoint:0,        
              fabricDetails:"",
              description:"",
              specification:"",
          });
          Swal.fire(
            'Done',
            'Order Details Updated!',
            'success'
            ) 
          this.props.history.push('/ordersummary/'+tempClientID)
      })
}

render(){
  return (
    <>
    {this.state.showAddCharge ? <AdditionalCharges open={this.openAddCharge} /> : null}

    <div className="container fluid py-2">
          <h1 className="text-center">Edit Order</h1>
          <form onSubmit={this.onFormSubmit}>
          
          <Row >
          <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label for="location"><strong>Location</strong></Form.Label>
            <Form.Control
                id = "location"
                name="location"
                type="text"
                placeholder="Enter the location" 
                onChange={this.onValueChange} 
                value={this.state.location}
                required/>
              </Form.Group>
            </Col>

            <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label for="locationCode"><strong>Location Code</strong></Form.Label>
            <Form.Control
                id = "locationCode"
                name="locationCode"
                type="text"
                placeholder="Enter the location Code" 
                onChange={this.onValueChange} 
                value={this.state.locationCode}
                required/>
              </Form.Group>
            </Col>

            <Col>
            <Form.Label for="SOM"><strong>Source of Measurement</strong></Form.Label>
            <Form.Select 
            id="SOM"
            name="SOM"
            onChange={this.onValueChange} 
            required
            value={this.state.SOM}>
            <option value=""></option>
            <option value="Floor Plan">Floor Plan</option>
            <option value="By GMB Team"> By GMB Team</option>
            <option value="By Client">By Client</option>
            </Form.Select>
            </Col>
            </Row>

            <Row>
            <Col>
            <Form.Label for="coveringType1ID"><strong>Covering Type 1</strong></Form.Label>
            <Form.Select 
            id="coveringType1ID"
            name="coveringType1ID"
            onChange={this.onValueChange}
            required 
            value={this.state.coveringType1ID}  >
                <option value='0'></option>
                {this.state.CT1.map(x=> {
                 return <option value={x.CoveringTypeID} >{x.CoveringName}</option>
            })}
            
            </Form.Select>
            </Col>

            <Col>
            <Form.Label for="coveringType2"><strong>Covering Type 2</strong></Form.Label>
            <Form.Select 
            id="coveringType2" 
            name="coveringType2"
            onChange={this.onValueChange} 
            required
            value={this.state.coveringType2} >
                <option ></option>
                {this.state.CT2Names.map(x=> {
                 return <option value={x.CoveringSubType1} >{x.CoveringSubType1}</option>
            })}
            </Form.Select>
            </Col>

            <Col>
            <Form.Label for="coveringType3"><strong>Covering Type 3</strong></Form.Label>
            <Form.Select 
            id="coveringType3" 
            name="coveringType3"
            onChange={this.onValueChange} 
            required
            value={this.state.coveringType3}>
              <option ></option>
                {this.state.CT3Names.map(x=> {
                 return <option value={x.CoveringSubType2} >{x.CoveringSubType2}</option>
            })}
            </Form.Select>
            </Col>
            </Row>

            
            <Form.Label for="measurment"><strong>Measurement</strong></Form.Label>
              {['radio'].map((type) => (
                <div key={`inline-${type}`} className="mb-3" id="measurment ">
                  <Form.Check
                    inline
                    label="Actual size"
                    name="measurment"
                    type={type}
                    id={`inline-${type}-1`}
                    onChange={this.onValueChange} 
                    value="Actual"
                    checked = {this.state.measurment=="Actual"}
                  />
                  <Form.Check
                    inline
                    label="Wall to wall"
                    name="measurment"
                    type={type}                     
                    id={`inline-${type}-2`}
                    onChange={this.onValueChange} 
                    value="WallToWall"
                    checked = {this.state.measurment=="WallToWall"}
                  />
                  <Form.Check
                    inline
                    label="In to out"
                    name="measurment"
                    type={type}
                    id={`inline-${type}-3`}
                    onChange={this.onValueChange} 
                    value="InToOut"
                    checked = {this.state.measurment=="InToOut"}
                  />
                </div>
              ))}

              <Row>
              <Col>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label for="width"><strong>Width</strong></Form.Label>
                <Form.Control
                id = "width"
                type="text"
                name="width"
                placeholder="Enter the Width" 
                onChange={this.onValueChange} 
                required
                value={this.state.width}/>
              </Form.Group>
              </Col>
              
              <Col>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label for="drop"><strong>Drop</strong></Form.Label>
                <Form.Control
                id = "drop"
                name="drop"
                type="text"
                placeholder="Enter the Drop" 
                onChange={this.onValueChange} 
                required
                value={this.state.drop}/>
              </Form.Group>
              </Col>
              <Col>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label for="quantity"><strong>Quantity</strong></Form.Label>
                <Form.Control
                id = "quantity"
                name="quantity"
                type="text"
                placeholder="Enter the Quantity" 
                onChange={this.onValueChange} 
                required
                value={this.state.quantity}/>
              </Form.Group>
              </Col>
              </Row>

              <Row>
              <Col>
              <Form.Label for="openingWay"><strong>Opening Way</strong></Form.Label>
              <Form.Select 
              id="openingWay"
              name="openingWay"
              onChange={this.onValueChange} 
              required
              value={this.state.openingWay}>
              <option value=""></option>
              <option value="Middle">In Middle</option>
              <option value="Left Bunch">Left Bunch</option>
              <option value="Right Bunch">Right Bunch</option>
              <option value="Bunch both side">Bunch both side</option>
              <option value="Up and Down">Up and Down</option>
              
              </Form.Select>
              </Col>

              <Col>
              <Form.Label for="controll"><strong>Control</strong></Form.Label>
              <Form.Select 
              id="controll" 
              name="controll"
              onChange={this.onValueChange}
              required 
              value={this.state.controll}>
              <option value=""></option>
              <option value="By Chain">By Chain</option>
              <option value="By Motorized">By Motorized</option>
              <option value="By Hand">By Hand</option>
              <option value="By Cord">By Cord</option>
              <option value="By Wand">By Wand</option>
              <option value="By Clutch">By Clutch</option>
              </Form.Select>
              </Col>

              <Col>
              <Form.Label for="contollSide"><strong>Control Side</strong></Form.Label>
              <Form.Select 
              id="contollSide" 
              name="contollSide"
              onChange={this.onValueChange} 
              required
              value={this.state.contollSide}>
              <option value=""></option>
              <option value="Left">Left</option>
              <option value="Right">Right</option>
              <option value="Left & Right">Left & Right</option>
              <option value="Fixed">Fixed</option>
              <option value="L-DR">L-DR</option>
              <option value="LD-R">LD-R</option>
              <option value="LTL-DR">LTL-DR</option>
              <option value="LTLD-DR">LTLD-DR</option>
              <option value="LTLTR">LTLTR</option>
              </Form.Select>
              </Col>
              </Row>

              <Row>
              <Col>
              <Form.Label for="fabricRange"><strong>Fabric Range</strong></Form.Label>
              <Form.Select 
              id="fabricRange"
              name="fabricRange"
              onChange={this.onValueChange} 
              required
              value={this.state.fabricRange}>
              <option value=""></option>
              <option value="15">Basic</option>
              <option value="25">Budget</option>
              <option value="35">Mid Range</option>
              <option value="45">Economy</option>
              <option value="60">High Range</option>
              </Form.Select>
              </Col>

              <Col>
              <Form.Label for="fabricWidth"><strong>Fabric Width</strong></Form.Label>
              <Form.Select 
              id="fabricWidth" 
              name="fabricWidth"
              onChange={this.onValueChange} 
              required
              value={this.state.fabricWidth}>
              <option value="0"></option>
                <option value="2000">2000</option>
                <option value="2500">2500</option>
                <option value="2800">2800</option>
                <option value="3000">3000</option>
                <option value="3200">3200</option>
                <option value="3600">3600</option>
                <option value="4200">4200</option>
              </Form.Select>
              </Col>

              <Col>
              <Form.Label for="mountPoint"><strong>Mount Point</strong></Form.Label>
              <Form.Select 
              id="mountPoint" 
              name="mountPoint"
              onChange={this.onValueChange} 
              required
              value={this.state.mountPoint}>
              <option value=""></option>
              <option value="100">IN FRAME</option>
              <option value="200">OUT FRAME</option>
              <option value="300">ABOVE FRAME</option>
              <option value="400">UNDER CORNICE</option>
              <option value="500">CEILINGt</option>
              <option value="600">UNDER CORNICE WALL TO WALL</option>
              <option value="700">CEILING WALL TO WALL</option>
              </Form.Select>
              </Col>
              </Row>

              <Row>
              <Col md ="8">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label for="fabricDetails"><strong>Fabric Details</strong></Form.Label>
                <Form.Control
                id = "fabricDetails"
                name="fabricDetails"
                type="text"
                as="textarea"
                style={{ height: '100px' }}
                placeholder="Enter the Fabric details" 
                onChange={this.onValueChange}
                required 
                value={this.state.fabricDetails}/>
              </Form.Group>
              </Col>

              <Col md ="4">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label for="description"><strong>Description</strong></Form.Label>
                <Form.Control
                md = "6"
                id = "description"
                name="description"
                as="textarea"
                style={{ height: '100px' }}
                type="text"
                placeholder="Enter the Describtion" 
                onChange={this.onValueChange} 
                required
                value={this.state.description}/>
              </Form.Group>
              </Col>
              </Row>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label for="specification"><strong>Specification</strong></Form.Label>
                <Form.Control
                id = "specification"
                name="specification"
                type="text"
                placeholder="Enter the Specification" 
                onChange={this.onValueChange}
                required 
                value={this.state.specification}/>
              </Form.Group>

       <div className='form-group col-sm-6 mt-4 offset-3 text-center'>
      <button class="btn btn-dark" onClick={this.openAddCharge}>Charges</button>
      </div>    
              <div className='form-group col-sm-6 mt-4 offset-3 text-center'>
      <button type="submit" class="btn btn-primary float-left">Edit Order</button>
      </div>
      </form> 
      
      
      </div>
  </>
  );
  }
}

  export default EditSales
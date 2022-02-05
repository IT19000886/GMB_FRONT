import React, { Component, useEffect, useState } from 'react'
import Modal from 'react-modal';
import { Container, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router';
import ChargeRow from './ChargeRow';
import { withRouter } from "react-router";
class AdditionalCharges extends Component{
    constructor(props) {
        super(props);

        this.state = {
            visible:false,
            tempClientID:'',
            addchargetype:'',
            priceperone:'',
            quantity:'',
            price:'',
            additionalchargeType:0,
            addcharges:[],
            chargetype:[],
            pricepone:[],
        }
        this.onDismiss = this.onDismiss.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.fillTable = this.fillTable.bind(this);
        
    }
    handleClick = () => {
        this.props.open();
    };
    
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

    componentDidMount() {
       
        console.log(this.props)
        axios.get('http://localhost:4000/api/client/tempClient/'+this.props.match.params.id)
            .then(
                user =>{
                    this.setState({
                      tempClientID:user.data.TempClientID,
                    })
                  }
              )
              
        
        axios.get('http://localhost:4000/api/setting/additionalcharges')
        .then(
            user=>{
                this.setState({
                    chargetype:user.data,
                    pricepone:user.data,
                   
                })
            }
        )
    
        axios.get('http://localhost:4000/api/charges/charges/'+this.props.match.params.id)
      .then(
        addcharges => {
          this.setState({ addcharges:addcharges.data })
        }
      )
    
}

    componentDidUpdate(prevProps, prevState){
        axios.get('http://localhost:4000/api/setting/additionalcharges'+this.state.additionalchargeType)
        .then(
            user=>{
                this.setState({
                    addchargetype:user.data.AdditionalChargeType, 
                    priceperone:user.data.PricePerOne 
                })
            }
        )
    }
  

    onFormSubmit(e){
        e.preventDefault();
        const tempClientID = this.state.tempClientID;
        const addchargetype = this.state.addchargetype;
        const priceperone = this.state.priceperone;
        const quantity = this.state.quantity;
        const price = this.state.quantity;

        const addcharges = {tempClientID,addchargetype,priceperone,quantity,price}

        console.log(tempClientID);
        axios.post('http://localhost:4000/api/charges/charges',addcharges)
        .then(res => {
            this.setState({
                visible:true,
                tempClientID:"",
                addchargetype:"",
                priceperone:"",
                quantity:"",
                price:"",

            });
            
        })
    }
    fillTable(){
        return this.state.addcharges.map(addcharge =>{
            return <ChargeRow key={addcharge.TempClientID} 
            addcharge1={addcharge.AddChargeType} addcharge2={addcharge.PricePerOne} 
            addcharge3={addcharge.Quantity} addcharge4={addcharge.Price}/>
        })
    }

    render(){

    return (
        <Modal 
        isOpen={true} 
        shouldCloseOnOverlayClick={false}
        style={{
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.75)'
            },
            content: {
              position: 'absolute',
              top: '100px',
              left: '300px',
              right: '300px',
              bottom: '100px',
              border: '1px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '20px'
            }
          }}
        >
        
            <div className="container ">
                <div className="py-2">
                    <h2 className="text-center">Additional Charges </h2>
                    <form className="form-horizontal" id="charges" onSubmit={this.onFormSubmit}  >
                    <Row>
                <Col md ="6">
        
                    <Form.Label for="addchargetype"><strong>Additional Charge: </strong></Form.Label>
                        <Form.Select 
                        id="addchargetype"
                        name="addchargetype"
                        onChange={this.onValueChange}
                        required
                        value ={this.state.addchargetype} >
                            <option value='0'></option>
                        {this.state.chargetype.map(x =>{
                            return<option value ={x.AdditionalChargeType}>{x.AdditionalChargeType}</option>

                        })}
                       
                     </Form.Select>
                     </Col>
                     <Col md ="3">
                     <Form.Label for="priceperone"><strong>Price Per One: </strong></Form.Label>
                        <Form.Select 
                        id="priceperone"
                        name="priceperone"
                        onChange={this.onValueChange}
                        required
                        value ={this.state.priceperone} >
                            <option value=""></option>
                            <option value='5'>5</option>
                            <option value='15'>15</option>
                            <option value='20'>20</option>
                            <option value='30'>30</option>
                            <option value='50'>50</option>
                            <option value='100'>100</option>
                            <option value='150'>150</option>
                            <option value='200'>200</option>
                        
                       
                     </Form.Select>
                     </Col>
                     <Col md ="3">
                     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label for="Quantity"><strong>Quantity</strong></Form.Label>
                        <Form.Control
                        id = "quantity"
                        type="text"
                        name="quantity"
                        placeholder="Enter the Quantity"
                        onChange={this.onValueChange} 
                        value ={this.state.quantity}
                        />
                        </Form.Group>
                        </Col>
                        </Row>
                        <div className="form-group text-right">        
                            <div className="col-sm-offset-2 col-sm-10 ">
                                <button type="submit" className="btn btn-dark m-2  text-right">ADD</button>
                            </div>
                        </div>  
                    </form>
                </div >

                <div className="py-2">
               
                    <table className="table border">
                        <thead className="thead-dark border text-center"> 
                            <th scope="col"></th>
                            <th scope="col">Additional Charge type</th>
                            <th scope="col" >Price per one</th>
                            <th scope="col" >Quantity</th>
                            <th scope="col" >Price</th>
                            <th scope="col" >Action</th>
                        </thead>
                        
                            <tbody className="text-center">
                        
                            {this.fillTable()}
                            </tbody> 
                            
                    </table>
                    
                </div>

                <button  className="btn btn-dark m-2  text-right">Save</button>
                <button className="btn btn-danger m-2  text-right" onClick={this.handleClick}>Close</button> 
            </div>
              
        
         </Modal>
        
        
    )
        
    }

}

export default withRouter(AdditionalCharges);
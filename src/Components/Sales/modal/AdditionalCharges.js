import React, { Component, useEffect, useState } from 'react'
import Modal from 'react-modal';
import { Container, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router';
import ChargeRow from './ChargeRow';

class AdditionalCharges extends Component{
    constructor(props) {
        super(props);

        this.state = {
            visible:false,
            orderID:'',
            addchargetype:'',
            priceperone:'',
            quantity:'',
            price:'',
            additionalChargeType:0,
            addcharges:[],
            chargetype:[],
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
        
        if(this.props.match && this.props.match.params.id){
            console.log(this.props)
            const orderID = this.props.match.params.id
        axios.get(`http://localhost:4000/api/order/order/${orderID}`)
        .then(
            user=>{
                this.setState({
                    orderID:user.data.OrderID,
                })
            }
        )
    }
        
        axios.get('http://localhost:4000/api/setting/additonalcharges')
        .then(
            user=>{
                this.setState({
                    chargetype:user.data
                    
                })
            }
        )
    
    
}

    componentDidUpdate(prevProps, prevState){
        axios.get('http://localhost:4000/api/setting/additonalcharges'+this.state.additionalChargeType)
        .then(
            user=>{
                this.setState({
                    addchargetype:user.data.AdditionalChargeType,
                    priceperone:user.data.PricePerOne,
                    
                })
            }
        )
    }
  

    onFormSubmit(e){
        e.preventDefault();
        const orderID = this.state.orderID;
        const addchargetype = this.state.addchargetype;
        const priceperone = this.state.priceperone;
        const quantity = this.state.quantity;
        const price = this.state.quantity;

        const addcharges = {orderID,addchargetype,priceperone,quantity,price}

        console.log(orderID);
        axios.post('http://localhost:4000/api/charges/charges',addcharges)
        .then(res => {
            this.setState({
                visible:true,
                orderID:"",
                addchargetype:"",
                priceperone:"",
                quantity:"",
                price:"",

            });
            this.props.history.push('/pricesummary/'+this.props.match.params.id)
        })
    }
    fillTable(){
        return this.state.addcharges.map(addcharge =>{
            return <ChargeRow key={addcharge.AddChargeID} addcharge={addcharge}/>
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
                        {this.state.chargetype.map(x =>{
                            return<option value ={x.AdditionalChargeID}>{x.AdditionalChargeType}</option>

                        })}
                       
                     </Form.Select>
                     </Col>
                     <Col md ="3">
                     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label for="Quantity"><strong>Quantity</strong></Form.Label>
                        <Form.Control
                        id = "quantity"
                        type="text"
                        name="quantity"
                        placeholder="" 
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
                <button  className="btn btn-dark m-2  text-right">Save</button>
                <button className="btn btn-danger m-2  text-right" onClick={this.handleClick}>Close</button> 
            </div>
              
        
         </Modal>
        
        
    )
        
    }

}

export default AdditionalCharges;

import React, { Component, useEffect, useState } from 'react'
import Modal from 'react-modal';
import { Container, Form, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';
import axios from 'axios';
import { Button } from 'reactstrap';
import { withRouter } from "react-router";
class Discount extends Component{
    constructor(props) {
        super(props);
        this.state={
            visible : false,
            tempClientID:'',
            discount:"",
        }
        this.onDismiss = this.onDismiss.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    onDismiss(){
        this.setState({
            visible : false
        })
    }
     handleClick = () => {
        this.props.open();
    };
    onValueChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
      }
    
    componentDidMount() {
        console.log(this.props)
        axios.get('http://localhost:4000/api/order/order/'+this.props.match.params.id)
      .then(
          user =>{
              this.setState({
                tempClientID:user.data.TempClientID,
              })
            }
        )
    }
    onFormSubmit(e){
        e.preventDefault();
        const tempClientID = this.state.tempClientID;
        const discount = this.state.discount;

        const adddiscount = {tempClientID,discount}

        console.log(tempClientID)
        axios.post('http://localhost:4000/api/discount/discount',adddiscount)
        .then(res=>{
            this.setState({
                visible:true,
                tempClientID:"",
                discount:"",
            });
           
        })
    }
    handleClick = () => {
        this.setState({
            visible : false
        })
    };

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
              top: '200px',
              left: '500px',
              right: '500px',
              bottom: '200px',
              border: '1px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '0px'
            }
          }}
        >
        
            <div className="container ">
                <div className="py-2">
                    <h2 className="text-center dark">Discount </h2>
                    <form className="form-horizontal" id="discount" onSubmit={this.onFormSubmit}  >
                    <Row>
                <Col md ="6">
        
                    <Form.Label for="discount"><strong>Add Discount: </strong></Form.Label>
                        <Form.Select 
                        id="discount"
                        name="discount"
                        onChange={this.onValueChange} 
                        value ={this.state.discount}>
                        <option value=""></option>
                        <option value="0">0%</option>
                        <option value="0.05">5%</option>
                        <option value="0.1">10%</option>
                        <option value="0.15">15%</option>
                        <option value="0.20">20%</option>
                        <option value="0.25">25%</option>
                        <option value="0.30">30%</option>
                        <option value="0.35">35%</option>
                        <option value="0.40">40%</option>
                        <option value="0.45">45%</option>
                        <option value="0.50">50%</option>
                     </Form.Select>
                     </Col>

                        </Row>
                        <div className="form-group text-right">        
                            <div className="col-sm-offset-2 col-sm-10 ">
                                <button type="submit" className="btn btn-dark m-2  text-right">ADD</button>
                            </div>
                        </div>  
                    </form>
                </div >
                <div className="form-group text-center">
                <button className="btn btn-danger m-2 text-center" onClick={this.handleClick}>Close</button> 
                </div>
            </div>
         
         </Modal>
        
         
    )
        
    }
}

export default Discount;

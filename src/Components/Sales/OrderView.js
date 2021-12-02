import React, { Component } from 'react'
import axios from 'axios';
import PriceSummary from './PriceSummary';
import ViewPDetails from './ViewPDetails';
import Tabs from 'react-bootstrap/Tabs';
import { Tab } from 'react-bootstrap';
import OrderSummary from './OrderSummary';

class OrderView extends Component{
    render(){
        return(
            
            <Tabs defaultActiveKey="personal">
            <Tab eventKey="personal" title="Personal Details">
               <ViewPDetails/>
            </Tab> 
            <Tab eventKey="order" title="Order Summary">
              
            </Tab> 
            <Tab eventKey="price" title="Price Summary">
               <PriceSummary/>
            </Tab> 
            </Tabs>
        )
    }
}
export default OrderView;
import React, { Component } from 'react'
import axios from 'axios';
import { Link} from 'react-router-dom';
import { Alert, UncontrolledAlert, Button } from 'reactstrap';
import { useHistory, useLocation } from 'react-router';
import PriceSummary from './PriceSummary';
import Preview_PriceSummary from "./Preview_PriceSummary";
import UserRow from './UserRow';
import ViewPDetails from './ViewPDetails';
import Tabs from 'react-bootstrap/Tabs';
import { Tab } from 'react-bootstrap';
import Navbar from '../Navbar'

class OrderSummary extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          addorders: []
        }
    this.fillTable = this.fillTable.bind(this);
    this.checkData = this.checkData.bind(this);
  }


  componentDidMount() {
    axios.get('http://localhost:4000/api/order/order/'+this.props.match.params.id)
      .then(
        addorders => {
          this.setState({ addorders:addorders.data })
        }
      )
      
  }

  componentDidUpdate() {
    axios.get('http://localhost:4000/api/order/order/'+this.props.match.params.id)
      .then(
        addorders => this.setState({ addorders:addorders.data })
      )
  }
  fillTable() {

    return this.state.addorders.map(addorder => {
      return <UserRow key={addorder.OrderID} addorder={addorder} />
    })
  }
  checkData() {
    return (
      <>
      <nav>
      <Navbar />
      </nav>  
        <div>
        <div className="container ">
        <ViewPDetails/>
            <div className="text-right py-4">
                <Link to={"/addorder/"+this.props.match.params.id} className="btn btn-dark" style={{float:'right'}}>Add Order</Link>
            </div>
            <div className="container py-4">
            <h5>Order Summary</h5>
            <hr></hr>
            <table  className="table border shadow ">
                <thead className="table-dark text-center">
                <tr>
                    <th scope="col">Location</th>
                    <th scope="col">Location Code</th>
                    <th scope="col">Covering Type</th>
                    <th scope="col">Width</th>
                    <th scope="col">Drop</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Fabric Range</th>
                    <th scope="col">Fabric Details</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody className="text-center"> 
                    
                {this.fillTable()}

                </tbody>
            </table>
        </div>
        <div className="text-center m-2">
   
        </div>
        
        <PriceSummary/> 
       
        </div>
        </div>
        </>
    )
    
}
render() {
    return this.checkData()
  }
}

export default OrderSummary;

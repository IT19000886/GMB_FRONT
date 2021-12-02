import { Component } from "react";
import {Table} from 'react-bootstrap';
import axios from "axios";
import Preview_PriceSummaryRow from "./Preview_PriceSummaryRow";
import { withRouter } from "react-router";

class Preview_PriceSummary extends Component{
    constructor(props){
        super(props);

        this.state = {
            coveringType:[],
        }
       
        this.fillTable = this.fillTable.bind(this);
    }


    
    
    componentDidMount(){
        axios.get('http://localhost:4000/api/order/calculation/'+this.props.match.params.id)
        .then(
            coveringType=>{
                this.setState({coveringType:coveringType.data})
            }
        )
    }

    componentDidUpdate(){
        axios.get('http://localhost:4000/api/order/calculation/'+this.props.match.params.id)
        .then(
            coveringType=>{
                this.setState({coveringType:coveringType.data})
            }
        )
        
    }


    fillTable(){
        return this.state.coveringType.map(summary=>{
            return <Preview_PriceSummaryRow summary1={summary.CoveringType} summary2={summary.Quantity} summary3={summary.AvgTotal} summary4={summary.Total} />
        })

    }



    render(){
        return(
<div className="container">
    <h1 className="text-center m-3">Price Summary</h1>
    <Table striped bordered hover >
  <thead className="table-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Covering Type</th>
      <th scope="col">Quantity</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
      {this.fillTable()}
    <tr>
        <td>1</td>
        <td>See- through Roller Blinds (SRB)</td>
        <td>4</td>
        <td>$13 000</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Blockout Roller Blinds (BRB)</td>
        <td>2</td>
        <td>$10 000</td>
        </tr>
  </tbody>
  <tfoot style={{borderTop: "2px solid black" , textAlign:"right", fontWeight:"bold"}}>
      <tr>
          <td colSpan="3" > Total Price</td>
          <td >$23 000</td>
      </tr>
      <tr>
          <td colSpan="3">Total Discount</td>
          <td >$3 000</td>
      </tr>
      <tr>
          <td colSpan="3">Grand Total</td>
          <td >$20 000</td>
      </tr>
  </tfoot>
</Table>
</div>
        )
    }
}

export default withRouter(Preview_PriceSummary);
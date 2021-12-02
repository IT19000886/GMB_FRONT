import { Component, useEffect, useState } from "react";
import axios from 'axios';
import { Link} from 'react-router-dom';
import { useHistory, useLocation, useParams } from 'react-router';
import SummaryRow from './SummaryRow'
import { withRouter } from "react-router";

class PriceSummary extends Component {

    constructor(props){
        super(props);

        this.state = {
            summaries:[]
        }
        this.fillTable = this.fillTable.bind(this);
        this.checkData = this.checkData.bind(this);
    }
componentDidMount(){
    axios.get('http://localhost:4000/api/order/cal/'+this.props.match.params.id)
    .then(
        summaries=> this.setState({summaries: summaries.data})
    )
}
componentDidUpdate(){
    axios.get('http://localhost:4000/api/order/cal/'+this.props.match.params.id)
    .then (
        summaries => this.setState({ summaries: summaries.data})
    )
}

fillTable(){
    return this.state.summaries.map(summary => {
        return <SummaryRow  summary1={summary.CoveringType} summary2={summary.Quantity} summary3={summary.AvgTotal} summary4={summary.Total}
        summary5={summary.TotalMaterial} summary6={summary.MaterialPrice} summary7={summary.LabourCost} summary8={summary.AditionalCharges}/>
    })
}

checkData(){
return(

    <div className="container">
    
    <div className="py-4">
    <h2 className="text-center">Price Summary</h2>
    <table className="table border shadow">
        <thead className="table-light text-center">
        <tr>
            
            <th scope="col">Covering Type</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total Material </th>
            <th scope="col">Total Fabric Price</th>
            <th scope="col">Lab & Com Cost</th>
            <th scope="col">Additional</th>
            <th scope="col">Average/W</th>
            <th scope="col">Total(no GST)</th>
            <th scope="col">Discount</th>
            <th scope="col">Total(with GST)</th>
        </tr>
        </thead>
        <tbody> 
            {
               this.fillTable()
            }
            </tbody>
            </table>
            </div>
            <div className="container xs-lg-2">
                <h4>Grant Total</h4>
                <div>
                    {this.summaries}
                </div>
            
            </div>
             <div className="float-md-right m-2">  
             <Link to="/" className="btn btn-dark ">Cancel</Link>
             <Link to="/" className="btn btn-primary btn-block ">Save</Link>
            
             </div>
             </div>
)
   

}
 render(){
     return this.checkData()
 }
}
export default withRouter(PriceSummary);
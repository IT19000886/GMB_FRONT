import React,{Component} from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2'
import { render } from '@testing-library/react';
import AdditionalCharges from './modal/AdditionalCharges';
import Discount from './modal/Discount'
import { withRouter } from "react-router";
import { Link, useParams } from 'react-router-dom';
class SummaryRow extends Component {
    constructor(props){
        super(props);

        this.state={
            showAddCharge: false,
            showDiscount:false,
            visible : false,
            summary1:props.summary1,
            summary2:props.summary2,
            summary3:props.summary3,
            summary4:props.summary4,
            summary5:props.summary5,
            summary6:props.summary6,
            summary7:props.summary7,
            summary8:props.summary8,
            summary:props.summary
            
        };
        this.openAddCharge  = this.openAddCharge.bind(this);
        this.openDiscount = this.openDiscount.bind(this);
        
    }
    openAddCharge(){
        this.setState({
            showAddCharge:!this.state.showAddCharge
            
        })
      }
      openDiscount(){
          this.setState({
              showDiscount:!this.state.showDiscount
          })
          
      }

render(){
    return(
        <>
        {this.state.showAddCharge ? <AdditionalCharges open={this.openAddCharge} /> : null}
        
        <tr className = 'text-center'>
            <td> {this.state.summary1}</td>
            <td> {this.state.summary2}</td>
            <td> {this.state.summary5}</td>
            <td> {this.state.summary6}</td>
            <td> {this.state.summary7}</td>
            <td> <button className="btn btn-primary btn-block" onClick={this.openAddCharge} > ADD </button></td>
            <td> {this.state.summary3}</td>
            <td> {this.state.summary4}</td>
            <td><Link to={'/discount/'+this.props.match.params.id}  onClick={this.openDiscount}><Button color="info">ADD</Button></Link> </td>
            <td> </td>
            

        </tr>
        </>
    )
}
}
export default withRouter(SummaryRow);
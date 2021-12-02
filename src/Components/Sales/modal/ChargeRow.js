import React,{Component} from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import { withRouter } from "react-router";

class ChargeRow extends Component{
    constructor(props){
        super(props);

        this.state = {
            addcharge : props.addcharge
        }

        this.onDelete = this.onDelete.bind(this);
    }
    onDelete(){
        axios.delete('http://localhost:4000/api/charges/charges'+this.state.addcharge.AddChargeID)
        .then(
            res=> {
                Swal.fire(
                    'Done',
                    'Charge Removed !',
                    'success'
                    )
            }
        )
}

render(){
    return(
        <tr className='text-center'>
        <td>{this.state.addcharge.AddChargeType}</td>
        <td>{this.state.addcharge.PricePerOne}</td>
        <td>{this.state.addcharge.Quantity}</td>
        <td>{this.state.addcharge.Price}</td>

        <td><Link to={'/editorder/'+this.state.addcharge.AddChargeID}><Button color="info">Edit</Button></Link></td>   
        <td><Button color='danger' onClick={this.onDelete}>Delete</Button></td>       
</tr>
    )
}
}
export default withRouter(ChargeRow);
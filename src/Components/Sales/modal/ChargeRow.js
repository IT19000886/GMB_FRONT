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
            visible : false,
            addcharge1:props.addcharge1,
            addcharge2:props.addcharge2,
            addcharge3:props.addcharge3,
            addcharge4:props.addcharge4,
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
        <td></td>
        <td>{this.state.addcharge1}</td>
        <td>{this.state.addcharge2}</td>
        <td>{this.state.addcharge3}</td>
        <td>{this.state.addcharge4}</td>
        
        <td><Button color='danger' onClick={this.onDelete}>Delete</Button></td>       
</tr>
    )
}
}
export default withRouter(ChargeRow);
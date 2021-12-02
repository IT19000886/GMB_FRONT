import React,{Component} from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import { withRouter } from "react-router";

class UserRow extends Component{

    constructor(props){
        super(props);

        this.state={
            addorder :props.addorder
        }

        this.onDelete=this.onDelete.bind(this);
    }

    onDelete(){
        axios.delete('http://localhost:4000/api/order/order/'+this.state.addorder.OrderID)
            .then(
                
                res => {
                    Swal.fire(
                        'Done',
                        'Order Removed !',
                        'success'
                        )
                }
            )
    }

    render(){
        return(
            <tr className='text-center'>
                  	<td>{this.state.addorder.Location}</td>
                    <td>{this.state.addorder.LocationCode}</td>
                    <td>{this.state.addorder.CoveringType1}</td>
                    <td>{this.state.addorder.Width}</td>
                    <td>{this.state.addorder.Drop}</td>
                    <td>{this.state.addorder.Quantity}</td>
                    <td>{this.state.addorder.FabricRange}</td>
                    <td>{this.state.addorder.FabricDetails}</td>
                    <td><Link to={'/editorder/'+this.state.addorder.OrderID}><Button color="info">Edit</Button></Link></td>   
                    <td><Button color='danger' onClick={this.onDelete}>Delete</Button></td>       
        	</tr>
        )
    }

}

export default withRouter(UserRow);
import React,{Component} from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'

class UserRow extends Component{

    constructor(props){
        super(props);

        this.state={
            user:props.user
        }

        this.onDelete=this.onDelete.bind(this);
    }

    // onDelete(){
    //     axios.delete('http://localhost:4000/api/client/tempClient/'+this.state.user.TempClientID)
    //         .then(
                
    //             res => {
    //                 Swal.fire(
    //                     'Done',
    //                     'User Removed !',
    //                     'success'
    //                     )
    //             }
    //         )
    // }

    render(){
        return(
            <tr className='text-center'>
                <tr> 
                  	<th>{this.state.user.ClientName}</th>
                      </tr> <tr> 
                    <th>{this.state.user.Address}</th>
                    </tr>  <tr> 
                    <th>{this.state.user.Email}</th>	
                    </tr> <tr> 	
                    <th>{this.state.user.Suburb}</th>
                    </tr> <tr> 
                    <th>{this.state.user.PostalCode}</th>
                    </tr><tr> 
                    <th>{this.state.user.ContactNum}</th>
                    </tr> <tr> 
                    <th>{this.state.user.Email}</th>
                    </tr> <tr> 
                    <th>{this.state.user.measure}</th>
                    </tr> <tr> 
                   <td><Link to={'/edituser'+this.state.user._id}><Button color="info">Edit</Button></Link></td>       
                    </tr>
        	</tr>
            
        )        
    }

}

export default UserRow;
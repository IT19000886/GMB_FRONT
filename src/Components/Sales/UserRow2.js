import { Component } from "react";
import { Link } from "react-router-dom";
import { FaPenFancy } from "react-icons/fa";
import { GrAddCircle } from "react-icons/gr";
import { BsFillEyeFill } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import Status from "./modal/Status";
import UpdateInformation from './modal/UpdateInformation';
import { Button } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2'
import Discount from "./modal/Discount";

class UserRow2 extends Component{
    constructor(props){
        super(props);

        this.state={
            showUpdate: false,
            showStatus: false,
            user : props.user
        }

        this.openStatus = this.openStatus.bind(this);
        this.openUpdate  = this.openUpdate.bind(this);
        this.onDelete=this.onDelete.bind(this);
    }

    openStatus(){
        this.setState({
            showStatus:!this.state.showStatus
        })
        
    }

    openUpdate(){
        this.setState({
            showUpdate:!this.state.showUpdate
        })
    }

    onDelete(){
        axios.delete('http://localhost:4000/api/client/tempClient/'+this.state.user.TempClientID)
            .then(
                
                res => {
                    Swal.fire(
                        'Done',
                        'User Removed !',
                        'success'
                        )
                }
            )
    }

    
    render(){
        return(
            <>
            {this.state.showStatus ? <Status open={this.openStatus} /> : null}
            {this.state.showUpdate ? <UpdateInformation open={this.openUpdate} /> : null}
            
            <tr>
            <td style={{ textAlign: "center" }}>{this.state.user.Date}</td>
            <th className="text-center" scope="row">{this.state.user.TempClientID}</th>
            <td className="text-left">{this.state.user.ClientName}</td>
            <td className="text-center">{this.state.user.ContactNum}</td>
            <td className="text-left">{this.state.user.Email}</td>
            <td className="text-center">
            <Button
              to=""
              style={{
                color: "black",
                cursor: "pointer",
              }}
              onClick={this.openUpdate}
            >
              Update
            </Button>
          </td>
            <td className="text-left">{this.state.user.Status} </td>
            <td className="text-center">
                <span 
                className="m-1" 
                onClick={this.openStatus}>
                    <FaPenFancy style={{cursor: 'pointer'}}/>
                </span>
              
            </td>
            <td className="text-center">
            <Link to={'/addorder/'+this.state.user.TempClientID} className="btn btn-secondary btn-sm">
              <GrAddCircle />
            </Link>
            <Link to={'/ordersummary/'+this.state.user.TempClientID} className="btn btn-primary btn-sm m-2">
              <BsFillEyeFill />
            </Link>
            <Button
              className="btn btn-danger btn-sm"
              onClick={this.onDelete}
            >
              <AiOutlineDelete />
            </Button>
          </td>
        </tr>
        </>
        )
    }
}

export default UserRow2
import { Component, useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserRow2 from './UserRow2';
import Navbar from '../Navbar'

class Order extends Component {
    constructor(props){
        super(props);

        this.state = {
            users:[],
            searchTerm : {
                ClientName:"",
                Date:"",
                TempClientID:"",
                Status:""
            }
        }
       

        this.fillTable = this.fillTable.bind(this);
        this.checkData = this.checkData.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }


    
    
    componentDidMount(){
        axios.get('http://localhost:4000/api/client/tempClient')
        .then(
            users=>{
                this.setState({users:users.data})
            }
        )
    }

    componentDidUpdate(){
        axios.get('http://localhost:4000/api/client/tempClient')
        .then(
            users=>{
                this.setState({users:users.data})
            }
        )
        
    }

    onSearch(e){
        this.setState({
            searchTerm:{
                [e.target.name]:e.target.value
            }
        })
    }

    fillTable(){
        const {ClientName,Date,TempClientID,Status} = this.state.searchTerm;

        return this.state.users.filter((user)=>{
            if(!ClientName && !TempClientID && !Date && !Status){
                return user
            }else {
                if(ClientName){
                    if(user.ClientName.toLowerCase().includes(ClientName.toLowerCase())){
                        return user
                    }
                }
                else if(TempClientID){
                    if(user.TempClientID.toString().includes(TempClientID)){
                        return user
                    }
                }
                else if(Date){
                    if(user.Date.toString().includes(Date)){
                        return user
                    }
                }
                else if(Status){
                    if(user.Status.toLowerCase().includes(Status.toLowerCase())){
                        return user
                    }
                }
            }
            switch(user)
{
case ClientName && TempClientID && Date && Status:
	if(user.ClientName.toLowerCase().includes(ClientName.toLowerCase())&& user.TempClientID.toString().includes(TempClientID) && user.Date.toString().includes(Date) && user.Status.toLowerCase().includes(Status.toLowerCase()))
	return user;
break;
case ClientName && TempClientID && Date : 
	if(user.ClientName.toLowerCase().includes(ClientName.toLowerCase())&& user.TempClientID.toString().includes(TempClientID) && user.Date.toString().includes(Date))
	return user;
break;

case ClientName && TempClientID:
	if(user.ClientName.toLowerCase().includes(ClientName.toLowerCase())&& user.TempClientID.toString().includes(TempClientID))
	return user;
break;

case ClientName:
	if(user.ClientName.toLowerCase().includes(ClientName.toLowerCase()))
	return user;
break;
}
        }
        ).map(user=>{
                return <UserRow2 key={user.TempClientID} user={user} />
            })

    }


   
    checkData(){
    return (
      <>
      <nav>
            <Navbar />
      </nav>
        <div className="m-3">
            <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                <Link to="/personal" className="btn btn-dark m-3">Add Customer </Link>
            </div>
            
            
            <div className="container">
            <div className="row">
                <div className="col-sm">
                    <div className="form-outline">
                    <input
                        className="form-control" 
                        type="text" 
                        placeholder="Search by Customer Id"
                        aria-label="Search"
                        name="TempClientID"
                        value={this.state.searchTerm.TempClientID}
                        onChange = {this.onSearch}
                    />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="form-outline">
                    <input
                        className="form-control" 
                        type="date" 
                        placeholder="Search by Customer Date"
                        aria-label="Search"
                        name="Date"
                        value={this.state.searchTerm.Date}
                        onChange = {this.onSearch}
                    />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="form-outline">
                    <input
                        className="form-control" 
                        type="text" 
                        placeholder="Search by Customer Name"
                        aria-label="Search"
                        name="ClientName"
                        value={this.state.searchTerm.ClientName}
                        onChange = {this.onSearch}
                    />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="form-outline">
                    <select 
                        className="form-control"
                        onChange={this.onSearch} 
                        name="Status"
                        value={this.state.searchTerm.Status} >
                        <option value=""> Filter by Status</option>
                        <option value="New"> New </option>
                        <option value="Rejected"> Rejected </option>
                        <option value="Pending"> Pending </option>
                    </select>
                    </div>
                </div>
            </div>
            </div>

            <div className="py-4">
            <h1 className="text-center m-2">Customers</h1>
            <table className="table border shadow">
                <thead className="table-dark text-center">
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Customer Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Contact No</th>
                    <th scope="col">Email</th>
                    <th >Update</th>
                    <th scope="col">Status</th>
                    <th></th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {this.fillTable()}
                   
                </tbody>
            </table>
        </div>
        </div>
      </>
    )

    }
    render(){
        return this.checkData()
    }    
}

export default Order

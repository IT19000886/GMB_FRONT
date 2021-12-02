import React, { Component, useEffect, useState } from 'react'
import Modal from 'react-modal';
import axios from 'axios';


class New extends Component{
    constructor(props) {
        super(props);

        this.state = {
            visible : false,
            Status : ''
            
        };

        this.handleClick = this.handleClick.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onDismiss(){
        this.setState({
            visible : false
        })
    }

    onValueChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    componentDidMount() {
        document.body.style.overflow = 'hidden';

        // axios.get('http://localhost:4000/api/client/tempClient/'+this.props.match.params.TempClientID)
        //     .then(
        //         user =>{
        //             this.setState({
        //                 Status: user.data.Status,
                        
        //             })
        //         }
        //     )
    }
    
    componentWillUnmount() {
        document.body.style.overflow = 'unset';
    }

    onFormSubmit(e){
        e.preventDefault();
        
        const Status = this.state.Status;

        const user = {
            Status
        }

        axios.put('http://localhost:4000/api/client/tempClient/'+this.props.match.params.TempClientID ,user)
            .then(res => {
                this.setState({
                    visible : true,
                    Status : ''
                    
                });
            })
    }

    handleClick = () => {
        this.props.open();
    };


    render(){
        
    return (
        <Modal 
        isOpen={true} 
        shouldCloseOnOverlayClick={false}
        style={{
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.75)'
            },
            content: {
              position: 'absolute',
              top: '150px',
              left: '400px',
              right: '400px',
              bottom: '250px',
              border: '1px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '20px'
            }
          }}
        >
        
            <div className="container ">
                <div className="py-2">
                    <h2 className="text-center"> Edit Status</h2>
                    <form className="form-horizontal" id="editStatus" onSubmit={this.onFormSubmit} >
                        <div className="form-group">
                            <label className="control-label m-1">Status:</label>
                            <div className="col-sm-10">
                            <select class="form-select" aria-label="Default select example" >
                                <option selected>Select Status</option>
                                <option value="New" onChange={this.onValueChange} name="Status">New </option>
                                <option value="Pending" onChange={this.onValueChange} name="Status" >Pending</option>
                                <option value="Rejected" onChange={this.onValueChange} name="Status" >Rejected</option>
                            </select>
                                
                            </div>
                        </div>
    
                        <div className="form-group text-right">        
                            <div className="col-sm-offset-2 col-sm-10 ">
                                <button type="submit" className="btn btn-dark m-2  text-right">Save</button>
                                <button className="btn btn-danger m-2 text-right" onClick={this.handleClick}>Close</button> 
                            </div>
                        </div>
                    
                    </form>
                </div >
            </div>
    
         </Modal>
        
        
    )
        
    }
}

export default New

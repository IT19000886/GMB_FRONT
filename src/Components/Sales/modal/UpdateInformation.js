import React, { Component, useEffect, useState } from 'react'
import Modal from 'react-modal';



class UpdateInformation extends Component{
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount() {
        document.body.style.overflow = 'hidden';
    }
    
    componentWillUnmount() {
        document.body.style.overflow = 'unset';
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
              top: '100px',
              left: '300px',
              right: '300px',
              bottom: '100px',
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
                    <h2 className="text-center"> Update Today </h2>
                    <form className="form-horizontal"  >
                        <div className="form-group">
                            <label className="control-label m-1">Information:</label>
                            <div className="col-sm-10">
                                <textarea 
                                className="md-textarea form-control"
                                rows="5"
                                />
                                
                            </div>
                        </div>
    
                        <div className="form-group text-right">        
                            <div className="col-sm-offset-2 col-sm-10 ">
                                <button type="submit" className="btn btn-dark m-2  text-right">ADD</button>
                            </div>
                        </div>
                    
                    </form>
                </div >
            
                
                <div className="py-2">
               
                    <table className="table border">
                        <thead className="thead-dark border"> 
                            <th scope="col"></th>
                            <th scope="col">Date</th>
                            <th scope="col" >Updated By</th>
                            <th scope="col" >Information</th>
                        </thead>
                        
                            <tbody>
                        
                            {/* {
                                status.map((status, index) => (
                                    <tr>
                                        <th scope="row">{index+1}</th>
                                        <td>{status.name}</td>
                                        <Link className="btn btn-outline-danger m-2 btn-sm" to="" onClick={() => deleteStatus(status.id)} >Delete</Link>
                                    </tr>
                                ))
                            }
                             */}
                            </tbody> 
                            
                    </table>
                    
                </div>
                <button  className="btn btn-dark m-2  text-right">Save</button>
                <button className="btn btn-danger m-2  text-right" onClick={this.handleClick}>Close</button> 
            </div>
         
         
         </Modal>
        
        
    )
        
    }
}

export default UpdateInformation

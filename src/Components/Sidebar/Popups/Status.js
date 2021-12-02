import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Scrollbars from 'react-custom-scrollbars';

const Background = styled.div`
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.8);
position: fixed;
display: flex;
justify-content: center;
align-items: center;
`;


const ModalWrapper = styled.div`
width: 800px;
height: 500px;
box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
background: #fff;
color: #000;
display: grid;
position: relative;
z-index: 10;
border-radius: 10px;
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
 
`;


const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;



const Status = ({showPopup, setShowPopup}) => {
    const [status, setStatus] = useState([]);
    const [newStatus, setNewStatus] = useState({
        name: ""
    });

    //Add Status
    const {name} = status;
    
    const onInputChange = e => {
        setNewStatus({...newStatus,[e.target.name]: e.target.value});
    };

    const onSubmit = async e => {
        e.preventDefault();

        if(!newStatus) {
            alert('Please Add Status')
            return
        }

        const res = await axios.post('http://localhost:3005/status', newStatus);

        const data = await res.data ;
        setStatus([...status, data]);

        setNewStatus({name:""});

    };



    // View Status
    useEffect(() => {
        loadStatus();
    }, []);

    const loadStatus = async () => {
        const result = await axios.get('http://localhost:3005/status');
        setStatus(result.data);
    };

    const deleteStatus = async (id) => {
        await axios.delete(`http://localhost:3005/status/${id}`);
        loadStatus();
    };


    return (
        <>
         {showPopup ? (
             
         <Background>
            <ModalWrapper showPopup={showPopup}>
            <Scrollbars style={{width:"100%", height: "100%"}} > 
            <div className="container ">
                <div className="py-2">
                    <h2>Status</h2>
                    <form className="form-horizontal" onSubmit={e=>onSubmit(e)} >
                        <div className="form-group">
                            <label className="control-label m-1">Status Name:</label>
                            <div className="col-sm-10">
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Enter new status" 
                                name="name"
                                value={name}
                                onChange={e => onInputChange(e)}
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
                            <th scope="col">#</th>
                            <th scope="col">Status Name</th>
                            <th scope="col" >Action</th>
                        </thead>
                        
                            <tbody>
                        
                            {
                                status.map((status, index) => (
                                    <tr>
                                        <th scope="row">{index+1}</th>
                                        <td>{status.name}</td>
                                        <Link className="btn btn-outline-danger m-2 btn-sm" to="" onClick={() => deleteStatus(status.id)} >Delete</Link>
                                    </tr>
                                ))
                            }
                            
                            </tbody> 
                            
                    </table>
                    
                </div>
               
            </div>
            
                
             <CloseModalButton aria-label="Close Modal" onClick={()=>setShowPopup(prev => !prev)}/>
             </Scrollbars>
             </ModalWrapper>
         </Background> 
         ): null}   
        </>
    )
}

export default Status

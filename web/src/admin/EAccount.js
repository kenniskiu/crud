import React,{useState,useEffect} from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import _, { map } from 'lodash'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
export default function EAccount(props){
    const axios = require('axios')
    const [updateID,setUpdateID] = useState('')
    const [list,setList] = useState([]);
    const [companyName,setCompanyName] = useState('');
    const [ownerName,setOwnerName] = useState('');
    function submitEmoney(){
        axios.post('http://localhost:3001/createTShipping',{
            companyName:companyName,
            ownerName:ownerName,
        })
        .then(function(response){
            console.log(response)
            if(response.data == "error"){
                console.log("error occured")
            }
            else{
                toast('Data sent')
                reFetch()
            }
        })
        .catch(function(error){
            console.log(error)
        }) 
    }
    useEffect(() => {
        axios.get(`http://localhost:3001/getEWallet`) 
        .then((response)=>{
            setList(response.data)
            console.log(response.data)
        })
    },[]);
    function reFetch(){
        axios.get(`http://localhost:3001/getEWallet`)
        .then((response)=>{
            setList(response.data)
        })
    }
    function remove(id){
        axios.delete(`http://localhost:3001/deleteAcc/${id}`)
        .then(function(response){
            reFetch()
            if(response.data == "error"){
                console.log("error occured")
            }
            else{
                toast('Data deleted')
            }
        })
        .catch(function(error){
            console.log(error)
        })      
    }
  return (
    <div className='container p-5'>
        <div className="card">
            <div className="card-header">
                <div className='d-flex justify-content-between '>
                    <div className='h2'>
                        E Account
                    </div>
                    <div className='h2'>
                        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            New E Account
                        </button>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Register</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className='d-flex flex-column'>
                        <div>
                            Account Code
                        </div>
                        <input onChange={(e)=>setCompanyName(e.target.value)}/>
                        <div>
                            UserName
                        </div>
                        <input onChange={(e)=>setOwnerName(e.target.value)}/>
                        <div>
                            PIN
                        </div>
                        <input onChange={(e)=>setOwnerName(e.target.value)}/>
                        <div>
                            Address
                        </div>
                        <input onChange={(e)=>setOwnerName(e.target.value)}/>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" onClick={submitEmoney} className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                </div>
                </div>
            </div>
            </div>
            <div className="card-body d-flex flex-column px-4">
                <div className='mt-3'>
                    <div className='d-flex flex-row'>
                        <a className="text-dark" href='/TEmoney'>EMoneyWallet</a>
                        <div className='ps-4'>
                        <a className="text-dark" href='/TAccount'>EAccount</a>
                        </div>
                    </div>
                </div>
                <div className='mt-4 '> 
                    <table className="table text-center">
            <thead>
                <tr className='bg-dark text-white '>
                    <th scope="col">Account ID</th>
                    <th scope="col">Account Code</th>
                    <th scope="col">UserName</th>
                    <th scope="col">PIN</th>
                    <th scope="col">Address</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
        <tbody>
            {list.map((list)=>
                <tr key={list.accountID}>
                    <td>
                        {list.accountID}
                    </td>
                    <td>
                        {list.accountCode}
                    </td>
                    <td>
                        {list.userName}
                    </td>
                    <td>
                        {list.PIN}
                    </td>
                    <td>
                        {list.address}
                    </td>
                    <td className='d-flex justify-content-evenly px-2'>
                        <button type="button" className="btn btn-primary text-white btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={()=>setUpdateID(list.company_id)}>
                            Edit
                        </button>
                        <div className="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit (26)</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body text-start">
                    <div className='d-flex flex-column'>
                        <div>
                            Account Code
                        </div>
                        <input onChange={(e)=>setCompanyName(e.target.value)} placeholder="asd"/>
                        <div>
                            UserName
                        </div>
                        <input onChange={(e)=>setOwnerName(e.target.value)} placeholder="asd"/>
                        <div>
                            PIN
                        </div>
                        <input onChange={(e)=>setCompanyName(e.target.value)} placeholder="asd"/>
                        <div>
                            Address
                        </div>
                        <input onChange={(e)=>setCompanyName(e.target.value)} placeholder="asd"/>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" onClick={submitEmoney} className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                </div>
                </div>
            </div>
            </div>
                        <button type="button" className="btn btn-danger text-danger btn-outline-danger text-white" onClick={()=>remove(list.accountID)}>
                            Delete
                        </button>
                    </td>
                </tr>
            )}
        </tbody>
    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

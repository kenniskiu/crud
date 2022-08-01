import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
export default function Table(props){
    const axios = require('axios')
    let navigate = useNavigate()
    const [list,setList] = useState([]);
    const tableName = props.table + "s"
    const table = props.table.charAt(0).toUpperCase()+props.table.slice(1)
    useEffect(() => {
        axios.get(`http://localhost:3001/${tableName}`) 
        .then((response)=>{
            setList(response)
        })
    },[]);
    function reFetch(){
        axios.get(`http://localhost:3001/${tableName}`)
        .then((response)=>{
            setList(response)
        })
    }
    function remove(id){
        axios.delete(`http://localhost:3001/delete/${id}` ,
            { 
                data: { table : props.table } 
            })
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
    function update(id){
        navigate(`/edit/${id}`)
    }
  return (
    <div>
        <table className="table text-center">
            <thead>
                <tr className='bg-dark text-white '>
                    <th scope="col">{table} ID</th>
                    <th scope="col">{table} Name</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
        <tbody>
            {_.map(list.data, (product)=>(
                <tr key={product.ID}>
                    <td>{product.ID}</td>
                    <td>{product.name}</td>
                    <td className='d-flex justify-content-evenly px-2'>
                        <button type="button" className="btn btn-primary text-white btn-outline-primary" onClick={()=>update(product.ID)}>
                            Edit
                        </button>
                        <button type="button" className="btn btn-danger text-danger btn-outline-danger text-white" onClick={()=>remove(product.ID)}>
                            Delete
                        </button>
                    </td>
                </tr>
                ))}
        </tbody>
    </table>
  </div>
  )
}

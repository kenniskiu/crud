import axios from 'axios';
import React, { useEffect, useState } from 'react'
import _ from 'lodash'

export default function SupplierDetailTable() {
    const [list,setList] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/supplierDetails')
        .then((response)=>{
            setList(response)
        })
    },[]);
    return (
        <div>
            <table className="table text-center container-fluid table-hover">
                <thead>
                    <tr className='bg-dark text-white'>
                        <th scope="col">supplier ID</th>
                        <th scope="col">supplier address</th>
                        <th scope="col">name</th>
                        <th scope="col">product supplied</th>
                        <th scope="col">number supplied</th>
                    </tr>
                </thead>
            <tbody>
                {_.map(list.data, (supplierDetail)=>(
                    <tr key={supplierDetail.ID}>
                        <td>{supplierDetail.ID}</td>
                        <td>{supplierDetail.address}</td>
                        <td>{supplierDetail.name}</td>
                        <td>{supplierDetail.productSupplied}</td>
                        <td>{supplierDetail.numberSupplied}</td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}

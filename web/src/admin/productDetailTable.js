import axios from 'axios';
import React, { useEffect, useState } from 'react'
import _ from 'lodash'

export default function ProductDetailTable(props) {
    const [list,setList] = useState([]);
    const [attribute,setAttribute] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/products')
        .then((response)=>{
            setList(response.data)
            const key = Object.keys(response.data[0])
            setAttribute(key)
            console.log(response.data[0])
        })
    },[]);
    return (
        <div>
            <table className="table text-center container-fluid table-hover">
                <thead>
                    <tr>
                        {_.map(attribute,(attribute)=>(
                            <th>{attribute}</th>
                        ))}
                    </tr>
                </thead>
            <tbody>
                {_.map(list, (productDetail)=>(
                    <tr key={productDetail.ID}>
                        <td>{productDetail.ID}</td>
                        <td>{productDetail.stock}</td>
                        <td>{productDetail.price}</td>
                        <td>{productDetail.color}</td>
                        <td>{productDetail.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}

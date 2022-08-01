import React from 'react'
import { useNavigate, useParams} from "react-router-dom";
import ProductDetailTable from './productDetailTable'

export default function ProductDetails() {
let navigate = useNavigate()
let {id} = useParams()
const tableName = id.charAt(0).toUpperCase()+id.slice(1)
  return (
    <div className='container p-5'>
        <div className="card">
            <div className="card-header">
                <div className='d-flex flex-row'>
                    <div className='me-2 mt-2'>
                        <button className='btn' onClick={()=>{navigate(`/main/${id}`)}}>
                            <i className="fa fa-arrow-left"/>
                        </button>
                    </div>
                    <div className='h2 mt-2'>
                        {tableName} Details
                    </div>
                </div>
            </div>
            <div className="card-body d-flex flex-column px-4">
                <div className='mt-4 '>
                    <ProductDetailTable/>
                </div>
            </div>
        </div>
    </div>
  )
}

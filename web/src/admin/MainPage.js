import React from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import Table from './Table'

export default function MainPage() {
    let navigate = useNavigate()
    function product(){
        navigate('/createProduct')
    }
    const {id} = useParams()
    const tableName = id.charAt(0).toUpperCase()+id.slice(1)
  return (
    <div className='container p-5'>
        <div className="card">
            <div className="card-header">
                <div className='d-flex justify-content-between '>
                    <div className='h2'>
                        {tableName}
                    </div>
                    <div className='h2'>
                        <button type="button" className="btn btn-secondary me-4" onClick={()=>{navigate(`/details/${id}`)}}>
                            {tableName} Details
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={product}>
                            New {tableName}
                        </button>
                    </div>
                </div>
            </div>
            <div className="card-body d-flex flex-column px-4">
                <div className='mt-3'>
                    {tableName}
                </div>
                <div className='mt-4 '> 
                    <Table table={id}/>
                </div>
            </div>
        </div>
    </div>
  )
}

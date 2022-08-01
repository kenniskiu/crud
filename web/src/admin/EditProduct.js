import React, {useState,useEffect} from 'react'
import {useNavigate,useParams} from "react-router-dom";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import _ from 'lodash'

toast.configure()
export default function UpdateProduct() {
    let navigate = useNavigate()
    const {id} = useParams()
    const axios = require('axios')
    const [productName,setProductName] = useState('')
    const [stock,setStock] = useState('')
    const [color,setColor] = useState('')
    const [price,setPrice] = useState('')
    const [list,setList] = useState([]);
    function back(){
        navigate("/product")
    }
    function handleProductName(e){
        e.preventDefault()
        setProductName(e.target.value)
    }
    function handleStock(e){
        e.preventDefault()
        setStock(e.target.value)
    }
    function submit(id){
        axios.put(`http://localhost:3001/update/${id}`,{
            productName:productName,
            stock:stock,
            color:color,
            price:price,
        })
        .then(function(response){
            console.log(response)
            if(response.data == "error"){
                console.log("error occured")
            }
            else{
                toast('Data Updated')
                navigate('/main/product')
            }
        })
        .catch(function(error){
            console.log(error)
        })      
    }
    function priceHandler(e){
        e.preventDefault()
        setPrice(e.target.value)
    }
    useEffect(() => {
        axios.get(`http://localhost:3001/productsFiltered/${id}`)
        .then((response)=>{
            setList(response)
            setProductName(response.data[0].name)
            setStock(response.data[0].stock)
            setColor(response.data[0].color)
            setPrice(response.data[0].price)
        })
    },[id]);
    return (
        <div className='container p-5'>
            {_.map(list.data, (productDetail)=>(
            <div className="card"  key={productDetail.ID}>
                <div className="card-header px-4">
                    <div className='d-flex justify-content-between '>
                        <div className='h2'>
                            Update Product
                        </div>
                        <div className='h2'>
                            <button type="button" className="btn btn-secondary" onClick={back}>
                                Return
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-body d-flex flex-column px-4">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                Product Name
                                <input onChange={handleProductName} className="form-control me-2 mt-3 flex" placeholder={productDetail.name}/>
                            </div>
                            <div className="col">
                                Stock
                                <div onChange={handleStock}>
                                    <input type="number" className="form-control me-2 mt-3" placeholder={productDetail.stock} />
                                </div>
                            </div>
                        </div>
                        <div className='pt-4'>
                            Color
                            <select className="form-select me-2 mt-3 flex" 
                                id="inputGroupSelect03" 
                                aria-label="Example select with button addon"
                                onChange={(e)=>{
                                    const selectedcolor = e.target.value;
                                    setColor(selectedcolor)
                                }}>
                                    <option selected>{productDetail.color}</option>
                                    <option value='Dark red'>Dark red</option>
                                    <option value='Sky blue'>Sky blue</option>
                                    <option value='Barbie Pink'>Barbie Pink</option>
                                </select>
                        </div>
                        <div className='pt-4 w-50' onChange={priceHandler}>
                            Price
                            <input type="range" className="form-range mt-2" min="50000" max="250000" step="1000" id="customRange3"/>
                            Rp {price}
                        </div>
                        <button className='btn btn-primary mt-4' onClick={()=>submit(id)}>
                            Update
                        </button>
                    </div>
                </div>
            </div>
                ))}
        </div>
    )
}

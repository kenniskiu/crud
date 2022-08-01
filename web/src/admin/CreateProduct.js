import React, {useState,useEffect} from 'react'
import { useNavigate} from "react-router-dom";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
export default function CreateProduct() {
    let navigate = useNavigate()
    const axios = require('axios')
    const [productName,setProductName] = useState('')
    const [stock,setStock] = useState('')
    const [color,setColor] = useState('')
    const [price,setPrice] = useState('')
    const [disable,setDisable] = useState(true)
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
    function setDisabled(){
        if((stock==0||productName==['']||color==['']||price==[''])==true){
            setDisable(true)
        }
        else{
            setDisable(false)
        }
    }
    function submit(){
        axios.post('http://localhost:3001/createProduct',{
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
                toast('Data sent')
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
        setDisabled()
      });
    return (
        <div className='container p-5'>
            <div className="card">
                <div className="card-header px-4">
                    <div className='d-flex justify-content-between '>
                        <div className='h2'>
                            New Product
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
                                <input onChange={handleProductName} className="form-control me-2 mt-3 flex" placeholder="Product Name"/>
                            </div>
                            <div className="col">
                                Stock
                                <div onChange={handleStock}>
                                    <input type="number" className="form-control me-2 mt-3 " placeholder='0' min='0'/>
                                </div>
                            </div>
                        </div>
                        <div className='pt-4'>
                            Color
                            <select className="form-select me-2 mt-3 flex" 
                                id="inputGroupSelect03" 
                                aria-label="Example select with button addon"
                                placeholder="Select Status"
                                onChange={(e)=>{
                                    const selectedcolor = e.target.value;
                                    setColor(selectedcolor)
                                }}>
                                    <option value='Dark red'>Dark red</option>
                                    <option value='Sky blue'>Sky blue</option>
                                    <option value='Barbie Pink'>Barbie Pink</option>
                                </select>
                        </div>
                        <div className='pt-4 w-50' onChange={priceHandler}>
                            Price
                            <input type="range" className="form-range mt-2" min="0" max="250000" step="1000" id="customRange3"/>
                            Rp {price}
                        </div>
                        <button disabled={disable} className='btn btn-primary mt-4' onClick={submit}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

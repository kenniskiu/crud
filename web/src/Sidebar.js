import { AiOutlineDashboard,AiOutlineShop,AiOutlineShoppingCart,AiFillDollarCircle,AiOutlineMenuFold,AiOutlineMenuUnfold} from "react-icons/ai";
import { useState,useEffect } from "react";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarHeader
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import styled from "styled-components";
import "./App.css"
import LineChart from "./LineChart";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWrench, faX} from '@fortawesome/free-solid-svg-icons'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'

const Menuitem = styled(MenuItem)`
  :hover {
    background-color: #2FCCA1;
    padding: 2px;
    border-radius: 10px;
  }`;
const fileTypes = ["JPG", "PNG"];

const SideNavigation = () => {
  const [type,setProductType] = useState('')
  const [render,setRender] = useState('1')
  const [file, setFile] = useState(null);
  const [active,setActive] = useState(false)
  const [collapsed, setCollapsed] = useState(false);
  const [productName,setProductName] = useState('')
  const [stock,setStock] = useState('')
  const [price,setPrice] = useState('')
  const [description,setProductDescription] = useState('')
  const [list,setList] = useState([])
  const [updateList,setUpdateList] = useState([])
  const [transactionList,setTransaction] = useState([])
  const styles = {
    sideBarHeight: {
      minHeight: "100vh"
    }
  };
  function updateTransactionList(){
    const id = Cookies.get('userID')
    axios.get(`http://localhost:3001/pending/${id}`)
        .then((response)=>{
            setTransaction(response.data)
            console.log(response.data)
        })
  }
  function updateFunc(test){
    setRender('4')
    fetchUpdateList(test)
  }
  function pending(){
    setRender('5')
  }
  function update(id){
    axios.put(`http://localhost:3001/update/${id}`,{
            productName:productName,
            stock:stock,
            type:type,
            price:price,
            description:description,
            product_id:id
        })
        .then(function(response){
            console.log(response)
            if(response.data == "error"){
                console.log("error occured")
            }
            else{
                toast('Data Updated')
                setRender('2')
            }
        })
        .catch(function(error){
            console.log(error)
        })    
  }
  function fetchUpdateList(id){
    axios.get(`http://localhost:3001/editProduct/${id}`)
        .then((response)=>{
            setUpdateList(response.data)
            console.log(response.data)
            setProductName(response.data[0].name)
            setStock(response.data[0].stock)
            setProductDescription(response.data[0].description)
            setPrice(response.data[0].price)
            setProductType(response.data[0].type)
        })
  }
  function confirmed(test){
    if(test==1){
      return("Confirm")
    }
    else{
      return("Denied")
    }
  }
  function confirm(test,id){
    axios.put(`http://localhost:3001/confirm/${id}`,{
            confirmStatus : test
        })
        .then(function(response){
            console.log(response)
            if(response.data == "error"){
                console.log("error occured")
            }
            else{
                toast('Data Updated')
                updateTransactionList()
            }
        })
        .catch(function(error){
            console.log(error)
        })      
  }
  function remove(id){
    axios.delete(`http://localhost:3001/delete/${id}`)
    .then(function(response){
      const id = Cookies.get('userID')
      axios.get(`http://localhost:3001/products/${id}`)
      .then((response)=>{
        setList(response.data)
        console.log(response.data)
    })
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
  const onClickMenuIcon = () => {
    setCollapsed(!collapsed);
    setActive(!active)
  };
  const handleChange = (file) => {
    setFile(file);
  };
  function submit(){
    const id = Cookies.get('userID')
    axios.post('http://localhost:3001/createProduct',{
            productName:productName,
            stock:stock,
            description:description,
            price:price,
            id:id,
            type:type,
            file:file
        })
        .then(function(response){
            console.log(response)
            if(response.data == "error"){
                console.log("error occured")
            }
            else{
              const id = Cookies.get('userID')
              axios.get(`http://localhost:3001/products/${id}`)
              .then((response)=>{
                  setList(response.data)
                  console.log(response.data)
              })
                toast('Data sent')
                setRender('2')

            }
        })
        .catch(function(error){
            console.log(error)
        })     
  }
  useEffect(() => {
    const id = Cookies.get('userID')
    axios.get(`http://localhost:3001/products/${id}`)
    .then((response)=>{
        setList(response.data)
        console.log(response.data)
    })
    updateTransactionList()
},[]);
  
  return (
    <div className="d-flex flex-row h-100">
      <ProSidebar collapsed={collapsed} style={styles.sideBarHeight} className="text-black border">
        <div style={styles.menuIcon} onClick={onClickMenuIcon}>
          <SidebarHeader>
            <div className="">
              {active === true && <AiOutlineMenuFold size="30px" className="my-3 mx-auto"/>}
            </div>
            <div className="text-end me-4">
              {active === false && <AiOutlineMenuUnfold size="30px" className="my-3 ms-2"/>}
            </div>
          </SidebarHeader>
        </div>
        <Menu className="mt-4">
          <Menuitem icon={<AiOutlineDashboard size="30px" />} onClick={()=>setRender('1')}>
              Dashboard
          </Menuitem>
          <Menuitem icon={<AiOutlineShop size="30px" />} onClick={()=>setRender('2')}>
              My Shop
          </Menuitem>
        </Menu>
      </ProSidebar>
      <div className="text-black container-fluid background" style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100%",minHeight:"100vh", overflowY:"hidden"}}>
        <div style={{height:"100%"}}>
        <div style={{height:"calc(100% - 20px)"}}>
          {render === '1' && 
            <div>
              <div className="d-flex flex-row justify-content-between mx-2 pt-4 mb-4">
                <div className="card border-0" style={{width:'23%'}}>
                  <div className="card-body">
                    <div className="d-flex flex-row justify-content-between">
                      <div>
                        <h5 className="card-title">Total Revenue</h5>
                        <h6 className="card-subtitle mb-2 text-muted">(Last 30 days)</h6>
                      </div>
                      <div className="ms-3">
                      <i className="fa fa-money-bill fa-2x" style={{color:"#087a59"}}></i>
                      </div>
                    </div>
                    <div className="h4 ms-1 my-3">
                     0
                    </div>
                  </div>
                </div>
                <div className="card border-0" style={{width:'23%'}} >
                  <div className="card-body">
                    <div className="d-flex flex-row justify-content-between">
                      <div>
                        <h5 className="card-title">Total Order</h5>
                        <h6 className="card-subtitle mb-2 text-muted">(Last 30 days)</h6>
                      </div>
                      <div className="ms-3">
                      <AiOutlineShoppingCart size="40px"/>
                      </div>
                    </div>
                    <div className="h4 ms-1 my-3">
                     0
                    </div>
                  </div>
                </div>
                <div className="card border-0" style={{width:'23%'}} >
                  <div className="card-body">
                    <div className="d-flex flex-row justify-content-between" >
                      <div>
                        <h5 className="card-title">Todays</h5>
                        <h5>revenue</h5>
                      </div>
                      <div className="ms-3">
                      <AiFillDollarCircle size="40px" color="yellow"/>
                      </div>
                    </div>
                    <div className="h4 ms-1 my-3">
                     0
                    </div>
                  </div>
                </div>
                <div className="card border-0"style={{width:'23%'}} >
                  <div className="card-body">
                    <div className="d-flex flex-row justify-content-between">
                      <div>
                        <h5 className="card-title">Todays</h5>
                        <h5>Order</h5>
                      </div>
                      <div className="ms-3">
                        <AiOutlineShop size="40px" color="blue"/>
                      </div>
                    </div>
                    <div className="h4 ms-1 my-3">
                     0
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-2">
                <div className="card">
                  <LineChart/>
                </div>
              </div>
            </div>
          }
          {render === '2' && 
            <div className="d-flex flex-column">
              <div className="pt-4 mb-4">
                <div className="card border-1 shadow rounded" style={{width:'100%'}}>
                  <div className="card-body">
                    <div className="d-flex flex-row justify-content-between px-5 py-4">
                      <div className="card-title h3">
                        Your Products
                      </div>
                      <div className="ms-3">
                      <button className="btn btn-success" onClick={()=>setRender('3')}>
                        Add Product
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 bg-white shadow border rounded">
                  <div className="text-center">
                    <div className="row mb-4 pt-3 bg-secondary rounded m-0 pb-2">
                      <div className="col">
                        Image
                      </div>
                      <div className="col-4">
                        Name
                      </div>
                      <div className="col">
                        Stock
                      </div>
                      <div className="col">
                        In Order
                      </div>
                      <div className="col">
                        Action
                      </div>
                    </div>
                    {list.map((product)=>
                    <div className="row">
                      <div className="col mt-1">
                      </div>
                      <div className="col-4 mt-1">
                        {product.name}
                      </div>
                      <div className="col mt-1">
                        {product.stock}
                      </div>
                      <div className="col mt-1">
                        0
                      </div>
                      <div className="col mb-2">
                        <div className="d-flex flex-row justify-content-center">
                          <button className="btn btn-primary mx-2" onClick={()=>updateFunc(product.product_ID)}>
                            <FontAwesomeIcon icon={faWrench}/>
                          </button>
                          <button className="btn btn-danger mx-2" onClick={()=>remove(product.product_ID)}>
                            <FontAwesomeIcon icon={faX}/>
                          </button>
                        </div>
                      </div>
                    </div>)}
                      </div>
                  </div>
                  <div className="btn btn-link text-black text-start" onClick={pending}>
                    1 Order Pending 
                  </div>
                </div>
          }
           {render === '3' && 
           <div className="px-5 pt-5">
            <div className="h3">
              Add Product
            </div>
            <hr/>
            <div className="container p-0">
                <div className="row">
                  <div className="col-4">
                    <div className="h5 pt-2">Upload Product Image</div>
                    <div className="h6 text-muted">
                      Upload the image of your product
                    </div>
                  </div>
                  <div className="col">
                    <div className="card mt-4 px-5 pt-5" style={{width:"100%",height:""}}>
                    <FileUploader handleChange={handleChange} name="file" types={fileTypes}/>
                    <div className="mt-5 pb-5 h6">
                      Image Added:
                    </div>
                  </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-4">
                    <div className="h5">Description</div>
                    <div className="h6 text-muted">
                    Add your product description and necessary information from here                    
                    </div>
                  </div>
                  <div className="col">
                    <div className="card mt-4 px-5 pt-4" style={{width:"100%"}}>
                      <div className="container">
                        <div className="row" onChange={(e)=>setProductName(e.target.value)} >
                          Name
                          <input type="text" className="form-control mt-1"/>
                        </div>
                        <div className="row pt-2 mt-3" onChange={(e)=>setProductDescription(e.target.value)}>
                          Description
                          <textarea className="form-control" rows="5" id="comment" name="text"></textarea>
                        </div>
                        <div className="row pt-2 mt-3 mb-5" onChange={(e)=>setProductType(e.target.value)}>
                          Type
                          <select className="form-select me-2 mt-3 flex" 
                                id="inputGroupSelect03" 
                                aria-label="Example select with button addon"
                                onChange={(e)=>{
                                    const selectedType = e.target.value;
                                    setProductType(selectedType)
                                }}>
                                    <option value='Vegetable'>Vegetable</option>
                                    <option value='Fruits'>Fruits</option>
                                    <option value='Gym Equipments'>Gym Equipments</option>
                            </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
                <div className="row mt-4">
                  <div className="col-4">
                    <div className="h5">Product Information</div>
                    <div className="h6 text-muted">
                    Add your simple product description and necessary information from here                    </div>
                  </div>
                  <div className="col">
                    <div className="card mt-4 px-5 pt-4" style={{width:"100%"}}>
                      <div className="container pb-5">
                        <div className="row" onChange={(e)=>setPrice(e.target.value)}>
                          Price (Rp)
                          <input type="range"  min="0" max="250000" step="1000" id="customRange3" className="form-range mt-1"/>
                          Rp {price}
                        </div>
                        <div className="row pt-2 mt-3" onChange={(e)=>setStock(e.target.value)}>
                          Unit
                          <input type="number" className="form-control mt-1" placeholder='0' min='0'/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-end my-5"> 
                <button className="btn btn-success px-4 py-3" onClick={submit}>
                  Add Product
                </button>
              </div>
            </div>
          }
          {render === '4' && 
           <div className="px-5 pt-5">
            <div className="h3">
              Update Product
            </div>
            <hr/>
            <div className="container p-0">
                <div className="row">
                  <div className="col-4">
                    <div className="h5 pt-2">Upload Product Image</div>
                    <div className="h6 text-muted">
                      Upload the image of your product
                    </div>
                  </div>
                  <div className="col">
                    <div className="card mt-4 px-5 pt-5" style={{width:"100%",height:""}}>
                    <FileUploader handleChange={handleChange} name="file" types={fileTypes}/>
                    <div className="mt-5 pb-5 h6">
                      Image Added:
                    </div>
                  </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-4">
                    <div className="h5">Description</div>
                    <div className="h6 text-muted">
                    Add your product description and necessary information from here                    
                    </div>
                  </div>
                  <div className="col">
                    <div className="card mt-4 px-5 pt-4" style={{width:"100%"}}>
                      <div className="container">
                        <div className="row" onChange={(e)=>setProductName(e.target.value)} >
                          Name
                          <input type="text" className="form-control mt-1" placeholder={productName}/>
                        </div>
                        <div className="row pt-2 mt-3" onChange={(e)=>setProductDescription(e.target.value)}>
                          Description
                          <textarea className="form-control" rows="5" id="comment" name="text"
                          placeholder={description}></textarea>
                        </div>
                        <div className="row pt-2 mt-3 mb-5" onChange={(e)=>setProductType(e.target.value)}>
                          Type
                          <select className="form-select me-2 mt-3 flex" 
                                id="inputGroupSelect03" 
                                aria-label="Example select with button addon"
                                onChange={(e)=>{
                                    const selectedType = e.target.value;
                                    setProductType(selectedType)
                                }}>
                                    <option selected>{type}</option>
                                    <option value='Vegetable'>Vegetable</option>
                                    <option value='Fruits'>Fruits</option>
                                    <option value='Gym Equipments'>Gym Equipments</option>
                            </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
                <div className="row mt-4">
                  <div className="col-4">
                    <div className="h5">Product Information</div>
                    <div className="h6 text-muted">
                    Add your simple product description and necessary information from here                    </div>
                  </div>
                  <div className="col">
                    <div className="card mt-4 px-5 pt-4" style={{width:"100%"}}>
                      <div className="container pb-5">
                        <div className="row" onChange={(e)=>setPrice(e.target.value)}>
                          Price (Rp)
                          <input type="range"  min="0" max="250000" step="1000" id="customRange3" className="form-range mt-1"/>
                          Rp {price}
                        </div>
                        <div className="row pt-2 mt-3" onChange={(e)=>setStock(e.target.value)}>
                          Unit
                          <input type="number" className="form-control mt-1" placeholder={stock} min='0'/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-end my-5"> 
                <button className="btn btn-success px-4 py-3" onClick={()=>update(updateList[0].product_ID)}>
                  Update Product
                </button>
              </div>
            </div>
          }
          {
            render == '5' && 
            <div className="container p-5 text-center">
        <div className='row bg-secondary'>
            <div className='col-3 border py-2'>
                Date of Transaction
            </div>
            <div className='col border p-2'>
                Item Bought
            </div>
            <div className='col border p-2'>
                Quantity
            </div>
            <div className='col border p-2'>
                Total Price
            </div>
            <div className='col border p-2'>
                Delivery Status
            </div>
        </div>
        {transactionList.map((transaction)=>
            <div className='row'>
                <div className='col-3 p-2 border'>
                    {transaction.date}
                </div>
                <div className='col border'>
                    {transaction.name}
                </div>
                <div className='col border'>
                    {transaction.amount}
                </div>
                <div className='col border'>
                    Rp. {transaction.amount*transaction.price}
                </div>
                <div className='col border'>
                    <div className="d-flex flex-row justify-content-evenly">
                      {transaction.delivery_status==0 &&
                      <>
                        <div className="btn btn-success p-0 my-2" onClick={()=>confirm(1,transaction.transaction_id)}>
                          Confirm
                        </div>
                        <div className="btn btn-danger p-0 my-2" onClick={()=>confirm(2,transaction.transaction_id)}>
                          Deny
                        </div>
                      </>
                      }
                      {transaction.delivery_status!=0 &&
                      <>
                        {confirmed(transaction.delivery_status)}
                      </>
                      }
                    </div>
                </div>
            </div>
        )}
    </div>
          }
          </div>
        </div>
      </div>
    </div>
  );
};
export default SideNavigation;

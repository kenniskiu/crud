import React, {useEffect, useState} from 'react'
import { AiOutlineMenuFold,AiOutlineMenuUnfold} from "react-icons/ai";
import { faAppleAlt, faCarrot,faDrumstickBite} from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import {
    Menu,
    MenuItem,
    ProSidebar,
    SidebarFooter,
    SidebarHeader
  } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css'
import Cart from './components/Cart';
import List from './List';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router-dom";
import { BsSearch } from 'react-icons/bs';

const Menuitem = styled(MenuItem)`
  :hover {
    background-color: #2FCCA1;
    padding: 2px;
    border-radius: 10px;
  }`;

export default function Products() {
const navigate = useNavigate()
const [active,setActive] = useState(false)
const [collapsed, setCollapsed] = useState(false);
const [list,setList] = useState([])
const {id} = useParams()
const [cart,setCart] = useState([])
const [product,setProduct] = useState('')
function clearBasket(){
  setCart([])
}
function test(type){
  navigate(`/products/${type}`)
}
function putInCart(product){
    const exist = cart.find((x)=>x.product_id === product.product_id);
    console.log(product.product_id)
    if (exist){
      setCart(cart.map((x)=>
      x.product_id === product.product_id ? {... exist, qty:exist.qty +1} : x))
    }
    else{ 
      setCart([...cart,{...product,qty:1}])
      toast.success("Item Added",{
        className:"custom-toast",
        draggable:true,
        position:toast.POSITION.BOTTOM_LEFT
      })  
    }
}
function reduceFromCart(product){
  const exist = cart.find((x)=>x.product_id === product.product_id);
  if (exist.qty===1){
    setCart(cart.filter((x)=>
    x.product_id != product.product_id))
  }
  else{
    setCart(cart.map((x)=>
      x.product_id === product.product_id ? {... exist, qty:exist.qty -1} : x))
  }
}
function removeFromCart(product){
  const exist = cart.find((x)=>x.product_id === product.product_id);
  if (exist){
    setCart(cart.filter((x)=>
    x.product_id != product.product_id))
  }
}
const styles = {
    sideBarHeight: {
      minHeight: "100vh"
    }
  };
  const onClickMenuIcon = () => {
    setCollapsed(!collapsed);
    setActive(!active)
  };

useEffect(() => {
    axios.get(`http://localhost:3001/productsFiltered/${id}`)
    .then((response)=>{
        setList(response.data)
        console.log(response.data)
    })
},[id]);
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
          <Menuitem icon={<FontAwesomeIcon className="fa-2x" icon={faCarrot}/>} onClick={()=>test("vegetables")}>
              Vegetable
          </Menuitem>
          <Menuitem icon={<FontAwesomeIcon className="fa-2x" icon={faAppleAlt}/>} onClick={()=>test("fruit")}>
              Fruits
          </Menuitem>
          <Menuitem icon={<FontAwesomeIcon className="fa-2x" icon={faDrumstickBite}/>} onClick={()=>test("meat")}>
              Meat
          </Menuitem>
        </Menu>
        <SidebarFooter className='px-3 pt-2'>
          {active === false && 
          <>
            Search for a product
            <div class="input-group mb-3">
              <input type="text" class="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e)=>setProduct(e.target.value)}/>
              <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={()=>test(product)}>
              <BsSearch/>
              </button>
            </div>
          </>
          }
        </SidebarFooter>
      </ProSidebar>
    <List listItems={list} putInCart={putInCart}/>
    <Cart 
      cartItems={cart} 
      putInCart={putInCart} 
      reduceFromCart={reduceFromCart} 
      removeFromCart={removeFromCart}
      clearBasket={clearBasket}/>
      </div>
  )
}

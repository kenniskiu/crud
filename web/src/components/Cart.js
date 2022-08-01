import { faCartShopping, faShoppingBag, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import '../App.css'
import axios from 'axios'
import Cookies from 'js-cookie'
import math from 'math'
import { useNavigate } from "react-router-dom";
export default function Cart(props) {
  const navigate = useNavigate()
  const {putInCart,reduceFromCart,cartItems,removeFromCart,clearBasket} = props
  const itemPrice = math.round(cartItems.reduce((a,c) => a + c.price * c.qty,0))
  const itemQuantity = cartItems.reduce((a,c) => a + c.qty,0)
  function checkOut(){
    const id = Cookies.get('userID')
    axios.post('http://localhost:3001/checkout',{
        id: id,
        cart : cartItems
    })
    .then(function(response){
        console.log(response)
        navigate("/thanks")
        clearBasket()
    })
    .catch(function(error){
        console.log(error)
    })      
}
function stockMaximum(qty,stock){
  if(qty>=stock){
    return true
  }
  else{
    return false
  }
}
  return (
    <>
    <div className="position-absolute top-50 end-0  bg-success p-2 rounded btn"
    data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
        <div className='d-flex flex-column text-white fw-bolder'>
            <div>
                <FontAwesomeIcon icon={faShoppingBag}/> {itemQuantity} item
            </div>
            <div className='btn bg-white m-1'>
                Rp {itemPrice}
            </div>
        </div>
    </div>
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div className="offcanvas-header ps-3 py-0 pt-4">
        <div className="d-flex flex-row">
          <FontAwesomeIcon icon={faShoppingBag} color="green"/>
          <div className='h7 ms-2 text-success fw-bold'> {itemQuantity} item </div>
        </div>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        {cartItems.length === 0 && 
        <div className=" d-flex flex-column text-center mt-5 pt-5"> 
          <FontAwesomeIcon icon={faCartShopping} color="grey" size="6x"/>
          <div className='text-muted mt-3'>
            Cart is Empty 
          </div>
        </div>}
        {cartItems.map((item)=>(
          <div key={item.product_id} className="row border-top border-bottom">
            <div className='d-flex flex-row py-3  justify-content-between'>
              <div className='d-flex flex-row'>
                <div className="d-flex flex-column text-center">
                  <button className='buttonPillTop px-2' disabled={stockMaximum(item.qty,item.stock)} onClick={()=>{putInCart(item)}}>+</button>
                  <div className='buttonColor'>
                    {item.qty}
                  </div>
                  <button className='buttonPillBottom' onClick={()=>{reduceFromCart(item)}}>-</button>
                </div>
                <div className='my-auto ms-4'>
                  <img src/>
                </div>
                <div className="d-flex flex-column my-auto">
                  <div className='fw-bold'>
                    {item.name} (Stock : {item.stock})
                  </div>
                  <div className='text-secondary'>
                    Rp. {item.price}
                  </div>
                </div>
              </div>
              <div className="d-flex flex-row"> 
                <div className='text-muted my-auto mx-2'>
                  Rp. {math.round(item.qty * item.price)}
                </div>
                <div className='btn my-auto p-0' onClick={()=>removeFromCart(item)}>
                  <FontAwesomeIcon icon={faX} color="black" size="xs"/>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="offcanvas-footer text-center mb-4 mx-3">
        {cartItems.length != 0 && 
        <button className='btn btn-success w-100 rounded-pill py-3 px-4' onClick={checkOut}
        data-bs-dismiss="offcanvas" aria-label="Close">
          <div className='d-flex flex-row justify-content-between'>
            <div className='py-3 ps-3'>
              Checkout
            </div>
            <div className='rounded-pill bg-white text-black px-3 py-3'>
              Rp. {itemPrice}
            </div>
          </div>
        </button>}
      </div>
  </div>
    </>
  )
}

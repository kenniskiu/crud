import React from 'react'
import Modal from './Modal'
import img1 from './apple.jpg'

export default function List(props) {
const {listItems,putInCart} = props
  return (
    <div className="container-fluid background py-5">
         <div className="row">
        {listItems.map((product)=>
         <div className="col-4 mb-4" key={product.product_id}>
             <div className='card'>
                 <div className='card-body d-flex flex-column'>
                     <img src={img1}></img>
                     <Modal product={product}/>
                     <div className="d-flex flex-row justify-content-center">
                     <button className='btn w-75 btn-primary' onClick={()=>{putInCart(product)}}>Add to cart</button>
                     </div>
                 </div>
             </div>
         </div>
     )}
     </div>
    </div>
    
  )
}

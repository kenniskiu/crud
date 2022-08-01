import React from 'react'
import ProductImage from './ProductImage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX} from '@fortawesome/free-solid-svg-icons';

export default function Modal(props) {
const {product} = props
  return (
    <div>
        <div>Rp {product.price}</div>
        <div className='mb-4 btn text-start p-0' data-bs-toggle="modal" data-bs-target="#exampleModal">{product.name}</div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">                                          
            <div className="modal-content p-5">
                <div className='text-end'>
                <FontAwesomeIcon icon={faX} color="black" size="xs"/>
                </div>                                            
                <div className="modal-body p-5">
                <div className='container'>
                    <div className='row'>
                    <div className='col-6'>                               
                        <ProductImage/>
                    </div>
                    <div className='col px-5'>
                        <div className='h3'>
                            {product.name}
                        </div>
                        <div className='subtitle text-muted'>
                            Stock : {product.stock}
                        </div>
                        <div className='mt-4 text-muted'>
                            Description:
                        </div>
                        <div className='text-muted'>
                        {product.description}
                        <span className="text-decoration-underline btn p-0 text-success">Read More</span>
                        </div>
                        <div className='mt-5 h4'>
                        Rp. {product.price}
                        </div>
                        <div className='mt-4' style={{fontSize:"14px"}}>
                        Categories <div className='btn p-1 ms-2 btn-secondary' style={{fontSize:"12px"}}>{product.type}</div>
                        </div>
                        <div className='mt-4' style={{fontSize:"14px"}}>
                        Seller_id : {product.seller_ID}
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

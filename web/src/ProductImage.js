import React from 'react'
import {Carousel} from 'react-bootstrap'
import jpg1 from './apple-fruit.jpg'
import jpg2 from './apple.jpg'
import jpg3 from './apple1.jpg'

export default function ProductImage() {
  return (
    <div className='container'>
      <div className='row'>
      <Carousel slide>
        <Carousel.Item>
        <img
          className="img-fluid"
          src={jpg1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="img-fluid"
          src={jpg2}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="img-fluid"
          src={jpg3}
          alt="First slide"
        />
      </Carousel.Item>
    </Carousel>
    </div>
      <div className='row mt-5'>
        <div className='col'>
          <img src={jpg1} className="img-fluid border"></img>
        </div>
        <div className='col'>
          <img src={jpg2} className="img-fluid border"></img>
        </div>
        <div className='col'> 
          <img src={jpg3} className="img-fluid border"></img>
        </div>
      </div>
    </div>
  )
}

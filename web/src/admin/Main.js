import React from 'react'
import { FaWheelchair } from 'react-icons/fa'
import { Nav } from './hey'

export default function Main() {
  return (   
    <div>
      <Nav></Nav>
        <div className='text-center h1 pt-5 mt-5'>
            Welcome, This is the Homepage  
            <div className='justify-content-center pt-5 text-center align-items-center'>
                <FaWheelchair size={70}/>
            </div>     
        </div>
    </div>
  )
}

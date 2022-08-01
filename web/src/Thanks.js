import React from 'react'

export default function Thanks() {
  return (
    <div className='text-center h2 m-auto p-5 my-5'>
        <div className='mt-5'>
            Thanks for purchasing with <span className='text-success'>Pick</span>Veggies
        </div>
        <div className='h5 my-2'>
            Click <a href='/transaction' className='text-black text-decoration-underline mb-5'>Here</a> To Check your Transactions
        </div>
    </div>
  )
}

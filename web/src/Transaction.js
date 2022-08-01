import React,{useEffect,useState} from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Transaction() {
    const [list,setList] = useState([])
    const id = Cookies.get('userID')
    function confirmed(test){
        if(test==0){
            return("Pending")
        }
        if(test==1){
          return("Confirm")
        }
        else{
          return("Denied")
        }
      }
    useEffect(() => {
        axios.get(`http://localhost:3001/transaction/${id}`)
        .then((response)=>{
            setList(response.data)
            console.log(response.data)
        })
    },[]);
  return (
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
        {list.map((transaction)=>
            <div className='row'>
                <div className='col-3 p-2 border'>
                    {transaction.CURRENT_DATE}
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
                    {confirmed(transaction.delivery_status)}
                </div>
            </div>
        )}
    </div>
  )
}

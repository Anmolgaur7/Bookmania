import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useFirebase } from '../context/Firebase';
import { SiGmail } from "react-icons/si";


function Orderdetailpage() {
    const params = useParams()
    const id = params.bookid
    const firebase = useFirebase()
    const [orders, setorder] = useState([])

    useEffect(() => {
        firebase.getorders(id).then((order) => setorder(order.docs))
    }, [])
    console.log(orders);
    if (!orders) {
     return <h1>You dont have any orders</h1>
    }
    return (
        <div className='m-2'>
            <h1 className='text-3xl  m-2  font-semibold text-center font-mono  '>Orders Details</h1>
            {
                orders.map((order) => {
                    const data = order.data()
                    const mail= `https://mail.google.com/mail/?view=cm&fs=1&to=${orders.userEmail}`
                    return (
                        <div className=' border-2 m-2 p-2  border-black'>
                            <h1>Order by: <a href={mail} className='text-lg font-semibold hover:text-blue-500'><p className='flex'><SiGmail className='mt-1'/>{data.userEmail}</p></a> </h1>
                            <h1>Qty:{data.quantity}</h1>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Orderdetailpage

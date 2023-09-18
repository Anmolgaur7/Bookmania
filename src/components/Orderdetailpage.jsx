import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useFirebase } from '../context/Firebase';


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
        <div>
            <h1>Orders Details</h1>
            {
                orders.map((order) => {
                    const data = order.data()
                    return (
                        <div className=' border-2 m-2  border-black'>
                            <h1>Order by:{data.userEmail}</h1>
                            <h1>Qty:{data.quantity }</h1>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Orderdetailpage

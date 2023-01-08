import React from 'react'
import { useParams } from 'react-router-dom'

const OrderDetails = () => {
    const { id } = useParams()
    return (
        <div>
            <h1>Order Details</h1>
            <h2>{id}</h2>
        </div>
    )
}

export default OrderDetails
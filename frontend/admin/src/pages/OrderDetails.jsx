import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const OrderDetails = () => {
    const navigate = useNavigate()
    const { authState, getSingleOrder } = useAuthContext()
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const { id } = useParams()
    useEffect(() => {
        if (id) {
            getSingleOrder(id)
        }
    }, [])

    console.log(status)
    const order = authState.orderDetails;

    const userId = order?.user?._id
    console.log(order)

    const getUser = async (uId) => {
        const response = await axios.get(`/api/v1/admin/users/${uId}`)
        setUser(response.data.user)
    }

    useEffect(() => {
        if (userId) {
            getUser(userId)
        }
    }, [userId])

    const onOrderUpdate = async () => {
        const myForm = new FormData()
        myForm.set("status", status)
        setLoading(true)
        try {
            const res = await axios.put(`/api/v1/admin/order/${id}`, myForm)
            console.log(res)
            if (res.data.success) {
                navigate('/orders')
            }
            setLoading(false)
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

    if (authState.loading) return <h1>Loading...</h1>
    if (loading) return <h1>Loading...</h1>

    return (
        <>
            {order && (
                <div className="m-2 md:m-10 p2 md:p-10 bg-white rounded-3xl">
                    <h1 className="text-2xl font-bold">Order Details</h1>
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold">Shipping Address</h1>
                            <p>{order.shippingInfo?.address}</p>
                            <p>{order.shippingInfo?.city}</p>
                            <p>{order.shippingInfo?.postalCode}</p>
                            <p>{order.shippingInfo?.country}</p>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold">User Info</h1>
                            {user && (
                                <>
                                    <p>Name: {user.name}</p>
                                    <p>Email: {user.email}</p>
                                </>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold">Payment</h1>
                            <p>Is Paid: {order.paymentInfo?.status === 'succeeded' ? "Yes" : "No"}</p>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold">Order Status</h1>
                            {/* Edit order status */}
                            <p>
                                <span className="font-bold">Status: </span>
                                {order.orderStatus}
                            </p>
                            <select className="border border-gray-300 p-2 rounded-md"
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">Choose Category</option>
                                {order.orderStatus === "Processing" && (
                                    <option value="Shipped">Shipped</option>
                                )}

                                {order.orderStatus === "Shipped" && (
                                    <option value="Delivered">Delivered</option>
                                )}
                            </select>
                            <button className="bg-blue-500 text-white p-2 rounded-md"
                                onClick={onOrderUpdate}
                                disabled={loading ? true : false || status === "" ? true : false}
                            >Update</button>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold">Order Items</h1>
                        <div className="flex flex-col">
                            {order && order.orderItems?.map((item, index) => (
                                <div key={index} className="flex flex-row justify-between">
                                    <p>{item.name}</p>
                                    <p>{item.quantity} x ${item.price} = ${item.quantity * item.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold">Order Summary</h1>
                        <div className="flex flex-row justify-between">
                            <p>Items Price:</p>
                            <p>${order.itemsPrice}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Tax Price:</p>
                            <p>${order.taxPrice}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Shipping Price:</p>
                            <p>${order.shippingPrice}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>Total Price:</p>
                            <p>${order.totalPrice}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default OrderDetails
import { Box, Button, Card, CardContent, Grid, Typography, Dialog, TextField, DialogActions, DialogContent, DialogTitle, Rating } from '@mui/material'
import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { useAlert } from 'react-alert'
const OrderDetails = () => {
    const [open, setOpen] = useState(false);
    const alert = useAlert()
    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState("");
    const [productId, setProductId] = useState(null)

    const { getOrderDetails, orderDetails, newReview, authState } = useAuthContext()
    const { id } = useParams()
    useEffect(() => {
        getOrderDetails(id)
    }, [])

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true)
    }


    const reviewSubmitHandler = () => {
        const myForm = new FormData()
        myForm.set('rating', rating)
        myForm.set('comment', comment)
        myForm.set("productId", productId)

        newReview(myForm)
        setOpen(false)
        if (authState.successMessage === true) {
            alert.success("Review submitted!")
        }
    }

    if (!orderDetails) return (
        <div>
            <Typography variant="h4" component="h1" gutterBottom sx={{
                textAlign: "center",
                my: 2,
            }}
                color={"#e7e7e7e7"}
            >
                Order Details - {id}
            </Typography>
            <Typography variant="h6" component="h1" gutterBottom>
                No order found
            </Typography>
        </div>
    )

    if (authState.loading) return (
        <div>Loading...</div>
    )

    return (
        <div>
            <Typography variant="h4" component="h1" gutterBottom sx={{
                textAlign: "center",
                my: 2,

            }} >
                Order Details - {id}
            </Typography>
            {orderDetails && (
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box
                            sx={{
                                mx: 5,
                                my: 2,
                                backgroundColor: "white",
                                borderRadius: "1rem",
                                padding: "2rem",
                                border: "1px solid #e0e0e0",
                                flex: 1 / 3,
                            }}
                        >
                            <div
                                style={{
                                    alignItems: "center",
                                    marginBottom: "2rem",
                                }}
                            >
                                <h1>Order Items</h1>
                            </div>
                            {orderDetails && orderDetails?.orderItems?.map((item) => (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: "1rem",
                                    }}
                                    key={item._id}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <img
                                            src={item.images[0].url}
                                            alt={item.name}
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                objectFit: "cover",
                                                marginRight: "1rem",
                                            }}
                                        />
                                        <div>
                                            <h3>Product Name: {item.name}</h3>
                                            <p>Quantity: {item.quantity}</p>
                                            <Box>
                                                {orderDetails?.orderStatus === "Shipped" ? (
                                                    <Button variant='contained' sx={{
                                                        mt: 2,
                                                    }}
                                                        size={"small"}
                                                        onClick={function (event) {
                                                            setProductId(item._id);
                                                            submitReviewToggle()
                                                        }}
                                                    >
                                                        Post Review
                                                    </Button>
                                                ) : (
                                                    <div></div>
                                                )}
                                            </Box>
                                        </div>

                                    </div>
                                    <div>
                                        <h3>Product Cost: ${item.price}</h3>
                                    </div>

                                </div>
                            )

                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                mt: 5,
                                flexDirection: "column"
                            }}
                        >
                            {orderDetails && (
                                // <></>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardContent>
                                        <Typography
                                            sx={{ fontSize: 14 }}
                                            color="text.secondary"
                                            gutterBottom
                                        >
                                            Paid Amount: ${orderDetails?.itemsPrice}/=
                                        </Typography>
                                        <Typography
                                            sx={{ fontSize: 14 }}
                                            color="text.secondary"
                                            gutterBottom
                                        >
                                            Shipping Cost: ${orderDetails?.shippingPrice}/=
                                        </Typography>
                                        <Typography
                                            sx={{ fontSize: 14 }}
                                            color="text.secondary"
                                            gutterBottom
                                        >
                                            Tax: ${orderDetails?.taxPrice}/=
                                        </Typography>
                                        <Typography
                                            sx={{ fontSize: 14 }}
                                            color="text.secondary"
                                            gutterBottom
                                        >
                                            Total Amount: ${orderDetails?.totalPrice}/=
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            Order Status: {orderDetails?.orderStatus}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            {orderDetails?.shippingInfo?.address}
                                        </Typography>
                                        <Typography variant="body2">
                                            {orderDetails?.shippingInfo?.city},
                                        </Typography>
                                        <Typography variant="body2">
                                            {orderDetails?.shippingInfo?.pinCode}
                                        </Typography>
                                        <Typography variant="body2">
                                            {orderDetails?.shippingInfo?.country}
                                        </Typography>

                                    </CardContent>
                                </Card>

                            )}


                        </Box>

                    </Grid>

                </Grid>

            )}
            <Dialog open={open} onClose={submitReviewToggle}>
                <DialogTitle>Post Review</DialogTitle>
                <DialogContent>
                    <Rating
                        size={"large"}
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="review"
                        label="Review"
                        type="text"
                        fullWidth
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={submitReviewToggle}>Cancel</Button>
                    <Button onClick={reviewSubmitHandler}>Submit</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default OrderDetails
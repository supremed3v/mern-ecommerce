import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useProductContext } from "../context/ProductContext";
import {useAuthContext} from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Checkout from "../pages/Checkout";

export default function ConfirmOrder() {
  const {authState} = useAuthContext();
  const navigate = useNavigate();
  const {shippingInfo, totalPrice, cart} = useProductContext();

  const shippingCharges = totalPrice > 500 ? 0 : 50;

  const tax = totalPrice * 0.18;

  const total = totalPrice + shippingCharges + tax;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      totalPrice,
      shippingCharges,
      tax,
      total,
    }
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  }

  return (
    <React.Fragment>
      <Checkout activeStep={1} />
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography>Name:</Typography>
          <Typography>{authState.user.name}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>Phone:</Typography>
          <Typography>{shippingInfo.phoneNo}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>Address:</Typography>
          <Typography>{address}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>Your Cart Items:</Typography>
          {cart && cart.map((item) => (
            <Typography key={item._id}>{item.name} x {item.quantity}</Typography>
          ))}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>Order Summary:</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>Total Price:</Typography>
          <Typography>{totalPrice}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>Shipping Charges:</Typography>
          <Typography>{shippingCharges}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>Tax:</Typography>
          <Typography>{tax}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>Total:</Typography>
          <Typography>{total}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button variant="contained" color="primary" onClick={proceedToPayment}>Proceed to Payment</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

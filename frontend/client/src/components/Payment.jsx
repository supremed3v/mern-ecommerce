import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useProductContext } from "../context/ProductContext";
import {CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements, Elements} from '@stripe/react-stripe-js';


import { useAlert } from "react-alert";

import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import Checkout from "../pages/Checkout";
import { Button } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";

function FormFunction() {
  const alert = useAlert();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const stripe = useStripe();
  const elements = useElements();
  const payBtn = React.useRef(null)

  const {cart, shippingInfo, createOrder} = useProductContext();
  const {authState} = useAuthContext();
  console.log(authState.user.name)

  const paymentData = {
    amount: orderInfo.totalPrice * 100,
  }

  const order = {
    shippingInfo,
    orderItems: cart,
    itemsPrice: orderInfo.total,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const {data} = await axios.post("/api/v1/payment/process", paymentData, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      const clientSecret = data.client_secret;

      if(!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(clientSecret,{
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: authState.user.name,
            email: authState.user.email,
            address:{
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              country: "PK",
              postal_code: shippingInfo.pinCode,
            }
          }
        }
      })
      if(result.error){
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if(result.paymentIntent.status === "succeeded"){
          order.paymentInfo ={
            id: result.paymentIntent.id,
            status: result.paymentIntent.status
          }
          createOrder(order);
          alert.success("Your order has been placed successfully");

        }
      }

    } catch (error) {
      payBtn.current.disabled = false;
      console.log(error);
    }
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <Checkout activeStep={2} />
      <div>
        <Typography variant="h6" gutterBottom>
          Card Info
        </Typography>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CardNumberElement />
      </Grid>
      <Grid item xs={12} md={6}>
        <CardExpiryElement />
      </Grid>
      <Grid item xs={12} md={6}>
        <CardCvcElement />
      </Grid>
      <Grid item xs={12} md={6}>
        <Button
          variant="contained"
          color="primary"
          onClick={submitHandler}
          ref={payBtn}
        >
          Pay
        </Button>
      </Grid>
      </Grid>
      
    </React.Fragment>
  );
}

export default function Payment () {
  return (
    <Elements stripe={loadStripe(process.env.REACT_APP_STRIPE_API_KEY)}>
      <FormFunction />
    </Elements>
  );
}
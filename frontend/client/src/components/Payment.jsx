import * as React from "react";
import Typography from "@mui/material/Typography";
import { useProductContext } from "../context/ProductContext";
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';


import { useAlert } from "react-alert";

import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import Checkout from "../pages/Checkout";
import { Box } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";

function FormFunction() {
  const alert = useAlert();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const stripe = useStripe();
  const elements = useElements();
  const payBtn = React.useRef(null)

  const { cart, shippingInfo, createOrder, } = useProductContext();
  const { authState } = useAuthContext();
  console.log(orderInfo)

  const paymentData = {
    amount: orderInfo?.totalPrice * 100,
  }

  const order = {
    shippingInfo,
    orderItems: cart,
    itemsPrice: orderInfo?.total,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  }


  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const { data } = await axios.post("/api/v1/payment/process", paymentData, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      const clientSecret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: authState.user.name,
            email: authState.user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              country: "PK",
              postal_code: shippingInfo.pinCode,
            }
          }
        }
      })
      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status
          }
          createOrder(order);
          alert.success("Your order has been placed successfully");
          sessionStorage.removeItem("cartItems");
          sessionStorage.removeItem("shippingInfo");
          localStorage.removeItem("cartItems");


        }
      }

    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  }

  return (
    <React.Fragment>
      <Box sx={{
        mt: 3,
        mb: 2,
      }}>

        <Checkout activeStep={2} />
      </Box>
      <div>
        <Typography variant="h4" gutterBottom sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#3f51b5",
          marginTop: "1rem",
          marginBottom: "1rem"
        }}>
          Card Info
        </Typography>
      </div>
      <div id="payment-form" className="form">
        <CardElement id="card-element" options={cardStyle} />
        <button
          onClick={submitHandler}
          ref={payBtn}
          className="button"
        >
          Pay Now
        </button>
      </div>

    </React.Fragment>
  );
}

export default function Payment() {
  const appearance = {
    theme: "stripe"
  }
  const options = {
    appearance,
  }
  return (
    <Elements stripe={loadStripe(`${process.env.REACT_APP_STRIPE_API_KEY}`)}
      options={options}
    >
      <FormFunction />
    </Elements>
  );
}
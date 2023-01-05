import React from "react";
import { Helmet } from "react-helmet";
import { useProductContext } from "../context/ProductContext";
import { Box, Grid, Typography, Button } from "@mui/material";

const Cart = () => {
  const { cart, addQuantity, reduceQuantity } = useProductContext();
  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <div>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 3,
          my: 6,
          mx: 2,
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h4">Cart</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Total Items: {cart.length}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Total Price: ${totalPrice}</Typography>
        </Grid>
      </Box>
      {cart.length === 0 ? (
        <Typography variant="h6">No items in cart</Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 3,
            my: 6,
            mx: 2,
          }}
        >
          {cart.map((item) => (
            <div key={item._id}>
              <Typography variant="h6">Name: {item.name}</Typography>
              <Typography variant="h6">Quantity: {item.quantity}</Typography>
              <Button
                variant="contained"
                onClick={() => reduceQuantity(item._id)}
              >
                -
              </Button>
              <Button variant="contained" onClick={() => addQuantity(item._id)}>
                +
              </Button>
              <Typography variant="h6">Price: ${item.price}</Typography>
              <img
                src={item.images[0].url}
                alt=""
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </Box>
      )}
    </div>
  );
};

export default Cart;

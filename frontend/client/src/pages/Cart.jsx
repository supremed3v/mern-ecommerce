import React from "react";
import { Helmet } from "react-helmet";
import { useProductContext } from "../context/ProductContext";
import { Box, Grid, Typography, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, addQuantity, reduceQuantity, totalPrice } = useProductContext();

  return (
    <div>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <Box
        sx={{
          mt: 5,
        }}
      >
        <Typography textAlign={"center"} variant="h2">
          Cart
        </Typography>
      </Box>
      {cart.length === 0 ? (
        <Typography variant="h6" textAlign={"center"}>
          No items in cart
        </Typography>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item._id}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(6, 1fr)",
                  gap: 2,
                  my: 6,
                  mx: 2,
                }}
              >
                <img
                  src={item.images[0].url}
                  alt={item.name}
                  style={{ width: "100px", height: "100px" }}
                />
                <Grid item xs={12}>
                  <Typography variant="h6">{item.name}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6">Price: ${item.price}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6">
                    Quantity: {item.quantity}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    onClick={() => addQuantity(item._id)}
                    size="small"
                  >
                    +
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => reduceQuantity(item._id)}
                    size="small"
                  >
                    -
                  </Button>
                </Grid>
              </Box>
            </div>
          ))}
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              my: 6,
              mx: 45,
            }}
          >
            <Grid item xs={12}>
              <Typography variant="h4">Total Price: ${totalPrice}</Typography>
            </Grid>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </Button>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Cart;

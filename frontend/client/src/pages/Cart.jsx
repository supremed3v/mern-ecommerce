import React from "react";
import { Helmet } from "react-helmet";
import { useProductContext } from "../context/ProductContext";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useAlert } from "react-alert";
const Cart = () => {
  const navigate = useNavigate();
  const { addQuantity, reduceQuantity, totalPrice } = useProductContext();
  const { authState } = useAuthContext();
  const alert = useAlert();
  const cart = JSON.parse(localStorage.getItem("cart"));
  return (
    <div>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {cart.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            Your cart is empty
          </Typography>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((item) => (
                <TableRow
                  key={item._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="center">
                    {item.description.substring(0, 30)}...
                  </TableCell>
                  <TableCell align="center">
                    <img
                      src={item.images[0].url}
                      alt={item.name}
                      style={{ width: "100px" }}
                    />
                  </TableCell>
                  <TableCell align="center">{item.price}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => reduceQuantity(item._id)}
                    >
                      -
                    </Button>
                    <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => addQuantity(item._id)}
                    >
                      +
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={8} />
                <TableCell colSpan={2}>
                  <Typography variant="h6">Total</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h6">${totalPrice}/=</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 2,
          mr: 10,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            if (authState.isAuthenticated === false) {
              alert.show("Please login to checkout");
              setTimeout(() => {
                navigate("/login-signup");
              }, 1000);
            } else {
              navigate("/checkout");
            }
          }}
        >
          Checkout
        </Button>
      </Box>
    </div>
  );
};

export default Cart;

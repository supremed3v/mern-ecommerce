import * as React from "react";
import Typography from "@mui/material/Typography";
import { useProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import Checkout from "../pages/Checkout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function ConfirmOrder() {
  const navigate = useNavigate();
  const { shippingInfo, totalPrice, cart } = useProductContext();

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
      <Box sx={{
        mt: "50px",
      }}>

        <Checkout activeStep={1} />
      </Box>
      <Typography variant="h4" gutterBottom sx={{
        textAlign: "center",
        marginTop: "50px",
      }} >
        Order summary
      </Typography>
      <TableContainer component={Paper} sx={{
        width: "80%",
        margin: "auto",
      }}>
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
                <TableCell align="center">{item.description}</TableCell>
                <TableCell align="center">
                  <img
                    src={item.images[0].url}
                    alt={item.name}
                    style={{ width: "50px", height: "50px" }}
                  />
                </TableCell>
                <TableCell align="center">${item.price}/=</TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
              </TableRow>
            ))}
            <TableHead>
              <TableRow>
                <TableCell>Shipping Address</TableCell>
                <TableCell align="left">{address}</TableCell>
              </TableRow>
            </TableHead>
            <TableRow>
              <TableCell>Shipping Charges</TableCell>
              <TableCell align="left">${shippingCharges}/=</TableCell>
            </TableRow>
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">${totalPrice}/=</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} >Tax</TableCell>
              <TableCell align="right">${tax}/=</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">${total}/=</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} align="right">
                <Button variant="contained" color="primary" sx={{
                  marginTop: "20px",
                  marginBottom: "20px",
                }} onClick={proceedToPayment}>
                  Proceed to Payment
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

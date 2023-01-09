
import { Typography, Box, TextField, Button } from "@mui/material";
import { useAuthContext } from "../context/AuthContext";
import { useAlert } from 'react-alert'
import OrderCard from "../components/OrderCard";
import { useEffect } from "react";
const Orders = () => {
  const { userOrders, getUserOrder } = useAuthContext();
  useEffect(() => {
    getUserOrder()
  }, [])
  return (
    <>
      <Typography variant="h1" component="h1" gutterBottom
        sx={{
          textAlign: "center",
          my: 2,
          color: "#e7e7e7e7"
        }}
      >
        Orders
      </Typography>
      {userOrders !== null ? (
        <OrderCard orders={userOrders} />
      ) : (
        <Typography variant="h6" component="h1" gutterBottom>
          No orders found

        </Typography>
      )}
    </>
  );
};

export default Orders;

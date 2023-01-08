
import { Typography, Box, TextField, Button } from "@mui/material";
import { useAuthContext } from "../context/AuthContext";
import { useAlert } from 'react-alert'
import OrderCard from "../components/OrderCard";
const Orders = () => {
  const { userOrders } = useAuthContext();
  console.log(userOrders);
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Orders
      </Typography>

      <OrderCard orders={userOrders} />
    </>
  );
};

export default Orders;

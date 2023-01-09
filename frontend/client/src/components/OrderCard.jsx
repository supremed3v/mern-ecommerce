import React from "react";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Divider,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const OrderCard = ({ orders }) => {
    const navigate = useNavigate();



    return (
        <div>
            {/* Create Product Card in grid */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 3,
                    my: 6,
                    mx: 15,

                }}
            >
                {orders &&
                    orders.map((order) => (
                        <Card sx={{ maxWidth: 300, mb: 4 }} key={order._id}>
                            <CardActionArea
                                onClick={() => {
                                    navigate(`/order/${order._id}`);
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={order.orderItems[0].images[0].url}
                                    alt={order._id}
                                    sx={{ objectFit: "cover" }}
                                />
                                <CardContent>
                                    <Divider />
                                    <Typography gutterBottom variant="h5" component="div">
                                        {order.orderItems[0].name}
                                    </Typography>
                                    <Divider />
                                    <Typography variant="h6" color="text.secondary">
                                        ${order.totalPrice}
                                    </Typography>
                                    <Divider />
                                    <Typography variant="body2" color="text.secondary">
                                        {order.createdAt}
                                    </Typography>
                                    <Divider />
                                    <Typography variant="body2" color="text.secondary">
                                        {order.orderStatus}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
            </Box>
        </div>
    );
};

export default OrderCard;

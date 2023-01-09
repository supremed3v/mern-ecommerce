import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Rating,
  Divider,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import { useAlert } from "react-alert";

const ProductCard = ({ products }) => {
  const navigate = useNavigate();
  const { addToCart, cart } = useProductContext();
  const alert = useAlert();

  const addToCartHandler = (product) => {
    const isProductInCart = cart.find((item) => item._id === product._id);
    if (isProductInCart) {
      alert.error("Product already in cart");
      return;
    }
    addToCart(product);
    alert.success("Product added to cart");
  };

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
        {products &&
          products.map((product) => (
            <Card sx={{
              maxWidth: 300, mb: 4,
              transition: "1s",
              "&:hover": {
                transform: "scale3d(0.85, 0.85, 1)",
              },
            }} key={product._id} >
              <CardActionArea
                onClick={() => {
                  navigate(`/product/${product._id}`);
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={product.images[0].url}
                  alt={product.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Divider />
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Divider />
                  <Typography variant="body2" color="text.secondary">
                    {`${product.description.slice(0, 70)}...`}
                  </Typography>
                  <Divider />
                  <Typography variant="h6" color="text.secondary">
                    ${product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.stock} in stock
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.numReviews} reviews
                  </Typography>
                  <Rating name="read-only" value={product.rating} readOnly />
                </CardContent>
              </CardActionArea>
              <Button
                size="small"
                color="primary"
                variant="contained"
                sx={{
                  backgroundColor: "#f50057",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#f50057",
                    color: "#fff",
                  },
                  mb: 2,
                  mx: 2,
                }}
                onClick={() => addToCartHandler(product)}
              >
                Add to Cart
              </Button>
            </Card>
          ))}
      </Box>
    </div>
  );
};

export default ProductCard;

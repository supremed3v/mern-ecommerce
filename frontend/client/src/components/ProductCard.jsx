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
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 3,
          my: 6,
          mx: 2,
        }}
      >
        {products &&
          products.map((product) => (
            <Card sx={{ maxWidth: 345 }} key={product._id}>
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
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    ${product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.countInStock} in stock
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

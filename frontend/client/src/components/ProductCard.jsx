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

const ProductCard = ({ products }) => {
  const navigate = useNavigate();

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
        {products.map((product) => (
          <Card
            sx={{ maxWidth: 345 }}
            onClick={() => {
              navigate(`/product/${product._id}`);
            }}
            key={product._id}
          >
            <CardActionArea>
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

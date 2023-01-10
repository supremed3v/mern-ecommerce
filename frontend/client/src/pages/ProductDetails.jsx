import {
  Typography,
  Card,
  CardContent,
  Rating,
  Grid,
  Button,
  Box,
} from "@mui/material";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import { useAlert } from "react-alert";
import Carousel from 'react-material-ui-carousel'
import ReviewCard from "../components/ReviewCard";

const ProductDetails = () => {
  const { getProductDetails, product, addToCart, cart } = useProductContext();
  const { id } = useParams();
  useEffect(() => {
    getProductDetails(id);
  }, []);
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
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
      <Helmet>
        <title>{`Product Details - ${id}`}</title>
      </Helmet>
      {product !== null ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  mx: 5,
                  my: 2,
                  padding: "2rem",
                  height: 500
                }}
              >
                <div
                >
                  <Carousel>
                    {product.images &&
                      product.images.map((image, i) => (
                        <img
                          key={i}
                          src={image.url}
                          alt={product.name}
                          style={{
                            objectFit: "contain",
                            height: 500,
                          }}
                        />
                      ))}
                  </Carousel>
                </div>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  mt: 5,
                }}
              >
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {product.category}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {product.description}
                    </Typography>
                    <Typography variant="body2">
                      <Rating {...options} />
                    </Typography>
                    <Typography variant="body2">
                      {product.numOfReviews} reviews
                    </Typography>
                    <Typography variant="body2">
                      {product.stock} in stock
                    </Typography>
                    <Typography variant="h5" component="div">
                      ${product.price}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#f50057",
                        color: "white",
                        marginTop: "1rem",
                      }}
                      onClick={() => addToCartHandler(product)}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
          <Typography variant="h1" textAlign={"center"} sx={{
            color: "#e7e7e7e7"
          }} >Reviews</Typography>
          {product && product.reviews ? (
             <Box
             sx={{
               display: "grid",
               gridTemplateColumns: "repeat(3, 1fr)",
               gap: 3,
               my: 6,
               mx: 15,
     
             }}
           >
           { product.reviews.map((review) => (
                <ReviewCard review={review} />
            ))}
              </Box>
          ) : (
            <Typography variant="h6" textAlign={"center"} sx={{
              color: "#e7e7e7e7"
            }}>
              No Reviews
            </Typography>
          )}
        </>
      ) : (
        <h1>Loading...</h1>
      )}

    </div>
  );
};

export default ProductDetails;

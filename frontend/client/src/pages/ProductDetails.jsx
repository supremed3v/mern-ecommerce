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
import { Swiper, SwiperSlide } from "swiper/react";
import { useProductContext } from "../context/ProductContext";
import { EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useAlert } from "react-alert";
import Carousel from 'react-material-ui-carousel'

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
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box
              sx={{
                mx: 5,
                my: 2,
                padding: "2rem",
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
      ) : (
        <h1>Loading...</h1>
      )}

      {product && product.reviews.map((review) => (
        <>
          <Typography>
            {review.name}
          </Typography>
          <Typography>
            {review.comment}
          </Typography>
          <Typography>
            {review.rating}
          </Typography>
        </>
      ))}
    </div>
  );
};

export default ProductDetails;

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

const ProductDetails = () => {
  const { getProductDetails, product, addToCart, cart } = useProductContext();
  const { id } = useParams();
  useEffect(() => {
    getProductDetails(id);
  }, []);
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
                backgroundColor: "white",
                borderRadius: "1rem",
                padding: "2rem",
                border: "1px solid #e0e0e0",
                flex: 1 / 3,
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  marginBottom: "2rem",
                }}
              >
                <Swiper
                  spaceBetween={50}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                  }}
                  modules={[EffectFade]}
                  loop={true}
                  lazy={true}
                >
                  {product.images &&
                    product.images.map((image) => (
                      <SwiperSlide key={image.public_id}>
                        <img
                          src={image.url}
                          alt={product.name}
                          style={{
                            width: "350px",
                            height: "350px",
                            objectFit: "contain",
                          }}
                          key={image.public_id}
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
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
                    <Rating name="read-only" value={product.rating} readOnly />
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
    </div>
  );
};

export default ProductDetails;

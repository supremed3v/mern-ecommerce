import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard";
import { useProductContext } from "../context/ProductContext";

const Home = () => {
  const { products, getProducts } = useProductContext();
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      <HeroSection />
      <Typography variant="h1" textAlign={"center"} sx={{
        mt: 10,
        mb: 10,
        color: "#ececec",
      }} >
        Products
      </Typography>
      <ProductCard products={products} />
    </div>
  );
};

export default Home;

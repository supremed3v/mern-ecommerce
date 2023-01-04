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
      <ProductCard products={products} />
    </div>
  );
};

export default Home;

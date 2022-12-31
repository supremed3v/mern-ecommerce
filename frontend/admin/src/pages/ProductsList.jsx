import React, { useEffect } from "react";
import { useProductContext } from "../contexts/ProductContext";
import { Header } from "../components";

const ProductsList = () => {
  const { productState, getAdminProducts } = useProductContext();
  useEffect(() => {
    getAdminProducts();
  }, []);
  return (
    <div>
      <Header title="Products" category="Page" />
    </div>
  );
};

export default ProductsList;

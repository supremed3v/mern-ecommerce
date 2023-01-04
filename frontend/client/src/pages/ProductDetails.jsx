import React from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <Helmet>
        <title>{`Product Details - ${id}`}</title>
      </Helmet>
      <h1>{id}</h1>
    </div>
  );
};

export default ProductDetails;

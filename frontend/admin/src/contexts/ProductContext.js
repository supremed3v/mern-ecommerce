import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { useAuthContext } from "./AuthContext";

const ProductContext = createContext();

const initialState = {
  products: [],
  adminProducts: [],
  loading: true,
  error: null,
};

export const ProductProvider = ({ children }) => {
  const [productState, setProductState] = useState(initialState);

  const getProducts = async () => {
    try {
      const response = await axios.get("/api/v1/products");
      if (response.data.success) {
        setProductState({
          ...productState,
          products: response.data.products,
          loading: false,
        });
      }
    } catch (error) {
      console.log(error.response.data.message);
      productState.error = error.response.data.message;
    }
  };

  const getAdminProducts = async () => {
    try {
      const response = await axios.get("/api/v1/admin/products");
      if (response.data.success) {
        setProductState({
          ...productState,
          adminProducts: response.data.products,
          loading: false,
        });
      }
    } catch (error) {
      console.log(error.response.data.message);
      productState.error = error.response.data.message;
    }
  };

  const createProduct = async (productData) => {
    try {
      const response = await axios.post(
        "http://localhost:3333/api/v1/admin/product/new",
        productData
      );
      if (response.data.success) {
        getAdminProducts(); // update the products
        getProducts(); // update the products
      }
    } catch (error) {
      console.log(error.response.data.message);
      productState.error = error.response.data.message;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const response = await axios.put(
        `http://localhost:3333/api/v1/admin/product/${id}`,
        productData
      );
      if (response.data.success) {
        getAdminProducts(); // update the products
        getProducts(); // update the products
      }
    } catch (error) {
      console.log(error.response.data.message);
      productState.error = error.response.data.message;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3333/api/v1/admin/product/${id}`
      );
      if (response.data.success) {
        getAdminProducts(); // update the products
        getProducts(); // update the products
      }
    } catch (error) {
      console.log(error.response.data.message);
      productState.error = error.response.data.message;
    }
  };
  const getProductDetails = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3333/api/v1/product/${id}`
      );
      if (response.data.success) {
        return response.data.product;
      }
    } catch (error) {
      console.log(error.response.data.message);
      productState.error = error.response.data.message;
    }
  };

  const createProductReview = async (id, reviewData) => {
    try {
      const response = await axios.put(
        `http://localhost:3333/api/v1/review`,
        reviewData
      );
      if (response.data.success) {
        return response.data.success;
      }
    } catch (error) {
      console.log(error.response.data.message);
      productState.error = error.response.data.message;
    }
  };

  const deleteProductReview = async (id, reviewId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3333/api/v1/reviews`,
        { data: { productId: id, reviewId } }
      );
      if (response.data.success) {
        return response.data.success;
      }
    } catch (error) {
      console.log(error.response.data.message);
      productState.error = error.response.data.message;
    }
  };

  //   useEffect(() => {
  //     getProducts();
  //   }, []);

  return (
    <ProductContext.Provider
      value={{
        productState,
        createProduct,
        updateProduct,
        deleteProduct,
        getProductDetails,
        createProductReview,
        deleteProductReview,
        getAdminProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);

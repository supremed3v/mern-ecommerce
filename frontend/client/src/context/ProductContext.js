import { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
export const ProductContext = createContext();

const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  cart: [],
  shippingInfo: {},
  totalPrice: 0,
};

export const ProductProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const getProducts = async (
    keyword = "",
    currentPage = 1,
    price = [0, 25000],
    category,
    ratings = 0
  ) => {
    try {
      setState({ ...state, loading: true });
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const { data } = await axios.get(link);
      setState({
        ...state,
        products: data.products,
        productCount: data.productCount,
        resPerPage: data.resPerPage,
        filteredProductsCount: data.filteredProductsCount,
        loading: false,
      });
      console.log(data);
    } catch (error) {
      setState({
        ...state,
        error: error.response.data.message,
        loading: false,
      });
    }
  };

  const getProductDetails = async (id) => {
    try {
      setState({ ...state, loading: true });
      const { data } = await axios.get(`/api/v1/product/${id}`);
      setState({
        ...state,
        product: data.product,
        loading: false,
      });
      console.log(data);
    } catch (error) {
      setState({
        ...state,
        error: error.response.data.message,
        loading: false,
      });
    }
  };

  const addToCart = (product) => {
    const { cart } = state;
    const check = cart.every((item) => {
      return item._id !== product._id;
    });
    if (check) {
      setState({ ...state, cart: [...cart, { ...product, quantity: 1 }] });
      toast.success("The product has been added to cart.", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else {
      toast.error("Product already in cart.", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } // TODO - add toastify
  };

  const removeProductFromCart = (id) => {
    const { cart } = state;
    cart.forEach((item, index) => {
      if (item._id === id) {
        cart.splice(index, 1);
      }
    });
  };

  const addQuantity = (id) => {
    const { cart } = state;
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });
    setState({ ...state, cart: cart });
  };

  const reduceQuantity = (id) => {
    const { cart } = state;
    cart.forEach((item) => {
      if (item._id === id) {
        // if item quantity is -1 then remove it from cart
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });
    setState({ ...state, cart: cart });
  };

  const saveShippingInfo = (data) => {
    setState({ ...state, shippingInfo: data });
  };

  return (
    <ProductContext.Provider
      value={{
        ...state,
        getProducts,
        getProductDetails,
        addToCart,
        removeProductFromCart,
        addQuantity,
        reduceQuantity,
        saveShippingInfo,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);

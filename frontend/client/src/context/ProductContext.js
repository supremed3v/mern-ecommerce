import { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";

export const ProductContext = createContext();

const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  cart: [],
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

  useEffect(() => {}, []);
  return (
    <ProductContext.Provider value={{ ...state, getProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);

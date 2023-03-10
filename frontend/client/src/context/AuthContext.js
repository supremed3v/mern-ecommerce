import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: false,
  userOrders: [],
  orderDetails: {},
  successMessage: null,
};

export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState(initialState);

  const login = async (userCredentials) => {
    setAuthState({ ...authState, loading: true, error: false });
    try {
      const res = await axios.post("/api/v1/login", userCredentials);
      setAuthState({
        ...authState,
        user: res.data.user,
        loading: false,
        error: false,
        isAuthenticated: true,
      });
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: error.response.data.message,
      });
    }
  };

  const logout = () => {
    axios.get("/api/v1/logout");
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: false,
      userOrders: [],
      orderDetails: {},
      successMessage: null,
    });
  };

  const loadUser = async () => {
    try {
      const res = await axios.get("/api/v1/me");
      setAuthState({
        ...authState,
        user: res.data.user,
        loading: false,
        error: false,
        isAuthenticated: true,
      });
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: error.response.data.message,
      });
    }
  };

  const register = async (userCredentials) => {
    try {
      const res = await axios.post("/api/v1/register", userCredentials);
      setAuthState({
        ...authState,
        user: res.data.user,
        loading: false,
        error: false,
        isAuthenticated: true,
      });
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: error.response.data.message,
      });
    }
  };

  const updateProfile = async (userCredentials) => {
    setAuthState({ ...authState, loading: true, error: false });
    try {
      const res = await axios.put(`/api/v1/me/update`, userCredentials);

      loadUser();
      setAuthState({
        ...authState,
        user: res.data.user,
        loading: false,
        error: false,
        isAuthenticated: true,
      });
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: error.response.data.message,
      });
    }
  };

  const updatePassword = async (userCredentials) => {
    setAuthState({ ...authState, loading: true, error: false });
    try {
      const res = await axios.put(`/api/v1/password/update`, userCredentials);
      loadUser();
      setAuthState({
        ...authState,
        user: res.data.user,
        loading: false,
        error: false,
        isAuthenticated: true,
      });
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: error.response.data.message,
      });
      console.log(error);
    }
  };

  const getUserOrder = async () => {
    try {
      const res = await axios.get(`/api/v1/orders/me`);
      setAuthState({
        ...authState,
        userOrders: res.data.orders,
        loading: false,
        error: false,
      });
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: error.response.data.message,
      });
    }
  };

  const getOrderDetails = async (id) => {
    try {
      const res = await axios.get(`/api/v1/order/${id}`);
      setAuthState({
        ...authState,
        orderDetails: res.data.order,
        loading: false,
        error: false,
      });
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: error.response.data.message,
      });
    }
  };

  const newReview = async (data) => {
    setAuthState({
      ...authState,
      loading: true,
    });
    try {
      const res = await axios.put("/api/v1/review", data);
      setAuthState({
        ...authState,
        loading: false,
        error: false,
        successMessage: res.data.success,
      });
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: error.response.data.message,
      });
    }
  };

  const forgotPassword = async (email) => {
    setAuthState({
      ...authState,
      loading: true,
    })
    try {
      const res = await axios.post("/api/v1/password/forgot", email);
      setAuthState({
        ...authState,
        loading: false,
        error: false,
        successMessage: res.data.message,
      });

    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: error.response.data.message,
      });

    }
  }

  const resetPassword = async (id, passwords) => {
    setAuthState({
      ...authState,
      loading: true,
    })
    try {
      const res = await axios.put(`/api/v1/password/reset/${id}`, passwords);
      setAuthState({
        ...authState,
        loading: false,
        error: false,
        successMessage: res.data.message,
      });

    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: error.response.data.message,
      });

    }
  }

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        logout,
        register,
        loadUser,
        updateProfile,
        updatePassword,
        getUserOrder,
        userOrders: authState.userOrders,
        getOrderDetails,
        orderDetails: authState.orderDetails,
        newReview,
        forgotPassword,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(initialState);

  // Login

  const loadUser = async () => {
    try {
      const response = await axios.get("http://localhost:3333/api/v1/me");
      if (response.data.success) {
        setAuthState({
          ...authState,
          isAuthenticated: true,
          user: response.data.user,
          loading: false,
        });
        setAuthState({
          ...authState,
          loading: false,
        });
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const loginUser = async (email, password) => {
    setAuthState({
      ...authState,
      loading: true,
    });
    try {
      const response = await axios.post("http://localhost:3333/api/v1/login", {
        email,
        password,
      });
      if (response.data.success) {
        setAuthState({
          ...authState,
          isAuthenticated: true,
          user: response.data.user,
          loading: false,
        });
      }
      return response.data;
    } catch (error) {
      if (error.response.data) {
        setAuthState({
          ...authState,
          loading: false,
          error: error.response.data.message,
        });
        return error.response.data;
      } else {
        return { success: false, message: error.message };
      }
    }
  };

  // Logout

  const logoutUser = async () => {
    setAuthState({
      ...authState,
      isAuthenticated: false,
      user: null,
    });
    await axios.get("http://localhost:3333/api/v1/logout");
  };

  // Register

  const registerUser = async (userForm) => {
    try {
      const response = await axios.post("/api/v1/register", userForm);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        await loadUser();
      }
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else {
        return { success: false, message: error.message };
      }
    }
  };

  // Forgot Password

  const forgotPassword = async (email) => {
    try {
      const response = await axios.post("/api/v1/password/forgot", email);
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else {
        return { success: false, message: error.message };
      }
    }
  };

  // Update Password

  const updatePassword = async (updatePasswordForm) => {
    try {
      const response = await axios.put(
        "/api/v1/password/update",
        updatePasswordForm
      );
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else {
        return { success: false, message: error.message };
      }
    }
  };

  const loadUserDetails = async () => {
    if (initialState.user !== null) {
      try {
        const response = await axios.get("/api/v1/me");
        if (response.data.success) {
          setAuthState({
            ...authState,
            user: response.data.user,
          });
        }
      } catch (error) {
        if (error.response.data) {
          return error.response.data;
        } else {
          return { success: false, message: error.message };
        }
      }
    }
  };

  const updateUserDetails = async (userForm) => {
    try {
      const response = await axios.put("/api/v1/me/update", userForm);
      if (response.data.success) {
        setAuthState({
          ...authState,
          user: response.data.user,
        });
      }
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else {
        return { success: false, message: error.message };
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        loginUser,
        logoutUser,
        registerUser,
        forgotPassword,
        updatePassword,
        loadUser,
        loadUserDetails,
        updateUserDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

import axios from "axios";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const initialState = {
  token: null,
  user: null,
  loading: false,
  error: false,
};

export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState(initialState);

  const login = async (userCredentials) => {
    try {
      const res = await axios.post("/api/v1/login", userCredentials);
      setAuthState({
        ...authState,
        user: res.data,
        loading: false,
        error: false,
      });
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: error.response.data,
      });
    }
  };

  const logout = () => {
    const res = axios.get("/api/v1/logout");
    if (res.status === 200) {
      setAuthState(initialState);
    }
  };

  const loadUser = async () => {
    try {
      const res = await axios.get("/api/v1/me");
      setAuthState({
        ...authState,
        user: res.data,
        loading: false,
        error: false,
      });
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: error.response.data,
      });
    }
  };

  const register = async (userCredentials) => {
    try {
      const res = await axios.post("/api/v1/register", userCredentials);
      setAuthState({
        ...authState,
        user: res.data,
        loading: false,
        error: false,
      });
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: error.response.data,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{ authState, login, logout, register, loadUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

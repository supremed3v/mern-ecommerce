import axios from "axios";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: false,
};

export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState(initialState);

  const login = async (userCredentials) => {
    setAuthState({ ...authState, loading: true, error: false });
    try {
      const res = await axios.post("/api/v1/login", userCredentials);
      setAuthState({
        ...authState,
        user: res.data,
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
    setAuthState(initialState);
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
        error: error.response.data.message,
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

  return (
    <AuthContext.Provider
      value={{ authState, login, logout, register, loadUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

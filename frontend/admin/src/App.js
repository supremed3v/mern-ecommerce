import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";

import { Login } from "./pages";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";
import { useAuthContext } from "./contexts/AuthContext";
import Home from "./Home";

const App = () => {
  const { currentMode } = useStateContext();
  const { authState, loadUser } = useAuthContext();

  useEffect(()=>{
    if(!authState.isAuthenticated){
      loadUser()
    }
  },[])

  

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <Routes>
          {authState.isAuthenticated ? (
            <Route path="*" element={<Home />} />
          ) : (
            <Route path="/" element={<Login />} />
          )}
          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import "./index.css";

import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";
import { AuthProvider } from "./contexts/AuthContext";
import { ProductProvider } from "./contexts/ProductContext";
Modal.setAppElement("#root");

ReactDOM.render(
  <ContextProvider>
    <AuthProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </AuthProvider>
  </ContextProvider>,
  document.getElementById("root")
);

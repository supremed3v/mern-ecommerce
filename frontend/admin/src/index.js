import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import "./index.css";

import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";
import { AuthProvider } from "./contexts/AuthContext";
Modal.setAppElement("#root");

ReactDOM.render(
  <ContextProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ContextProvider>,
  document.getElementById("root")
);

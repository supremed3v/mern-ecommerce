import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { useProductContext } from "./context/ProductContext";
function App() {
  const { getProducts } = useProductContext();
  useEffect(() => {
    getProducts();
  }, []);
  return <Navbar />;
}

export default App;

import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { useProductContext } from "./context/ProductContext";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
function App() {
  const { getProducts, state } = useProductContext();
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          {/* <Route path="/products/:id" element={<ProductDetails/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/wishlist" element={<Wishlist/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/address" element={<Address/>} />
          <Route path="/payment" element={<Payment/>} />
          <Route path="/order-success" element={<OrderSuccess/>} />
          <Route path="/404" element={<NotFound/>} />
          <Route path="*" element={<NotFound/>} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

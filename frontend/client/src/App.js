import "./App.css";
import Navbar from "./components/Navbar";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import { Helmet } from "react-helmet";
import Cart from "./pages/Cart";
import LoginSignup from "./pages/LoginSignup";
import Checkout from "./pages/Checkout";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Helmet>
          <title>MERN - Store</title>
          <meta name="description" content="MERN - Store" />
        </Helmet>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login-signup" element={<LoginSignup />} />
          <Route path="/checkout" element={<Checkout />} />
          {/*<Route path="/wishlist" element={<Wishlist/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/profile" element={<Profile/>} />
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

import "./App.css";
import Navbar from "./components/Navbar";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import { Helmet } from "react-helmet";
import Cart from "./pages/Cart";
import LoginSignup from "./pages/LoginSignup";
import AddressForm from "./components/AddressForm";
import ConfirmOrder from "./components/ConfirmOrder";
import { useAuthContext } from "./context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./components/Payment";
function App() {

  const {isAuthenticated, user, loadUser, authState} = useAuthContext()
  const [stripeKey, setStripeKey] = useState("")

  async function getStripeKey() {
    try {
      const {data} = await axios.get("/api/v1/stripeapi")
      setStripeKey(data.stripeApiKey)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadUser()
      getStripeKey()
  }, [isAuthenticated, user])


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
          <Route path="/checkout" element={<AddressForm/>} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/process/payment" element={<Payment/>} />
          

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

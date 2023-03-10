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
import { useEffect } from "react";
import Payment from "./components/Payment";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const {loadUser, authState, getUserOrder} = useAuthContext()

  useEffect(() => {
    loadUser()
    if(authState.isAuthenticated){
      getUserOrder()
    }
  }, [authState.isAuthenticated])



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
          <Route path="/profile" element={<Profile/>} />
          <Route path="/password/forgot" element={<ForgotPassword/>} />
          <Route path="/password/reset/:id" element={<ResetPassword/>} />
          

          <Route path="/orders" element={<Orders/>} />
          <Route path="/order/:id" element={<OrderDetails/>} />
          {/*<Route path="/wishlist" element={<Wishlist/>} />
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

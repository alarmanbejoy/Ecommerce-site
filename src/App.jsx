import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NoPage from "./pages/noPage/NoPage";
import HomePage from './pages/home/HomePage';
import ProductInfo from './pages/productInfo/ProductInfo';
import ScrollTop from "./components/scrollTop/ScrollTop";
import CartPage from "./pages/cart/CartPage";
import AllProduct from "./pages/allproduct/AllProduct";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";



function App() {
  return (
    <div>
      <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <ScrollTop/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/productinfo" element={ <ProductInfo/>} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
       
     
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;

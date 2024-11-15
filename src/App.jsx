import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NoPage from "./pages/noPage/NoPage";
import HomePage from './pages/home/HomePage';
import ProductInfo from './pages/productInfo/ProductInfo';
import ScrollTop from "./components/scrollTop/ScrollTop";
import CartPage from "./pages/cart/CartPage";
import AllProduct from "./pages/allproduct/AllProduct";

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.component";
import Footer from "./components/Footer.component";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

const App = () => {
  return (
    <>
      <Header />
      <Fragment>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart/:id?" element={<CartScreen />} />
        </Routes>
      </Fragment>
      <Footer />
    </>
  );
};

export default App;

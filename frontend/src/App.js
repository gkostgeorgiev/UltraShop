import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.component";
import Footer from "./components/Footer.component";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

const App = () => {
  return (
    <>
      <Header />
      <Fragment>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/page/:pageNumber" element={<HomeScreen />} />
          <Route path="/search/:keyword" element={<HomeScreen />} />
          <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/order/:id" element={<OrderScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart/:id?" element={<CartScreen />} />
          <Route path="/admin/userlist" element={<UserListScreen/>} />
          <Route path="/admin/users/:id/edit" element={<UserEditScreen/>} />
          <Route path="/admin/productlist" element={<ProductListScreen/>}  />
          <Route path="/admin/productlist/:pageNumber" element={<ProductListScreen/>} />
          <Route path="/admin/orderlist" element={<OrderListScreen/>} />
          <Route path="/admin/products/:id/edit" element={<ProductEditScreen/>} />
        </Routes>
      </Fragment>
      <Footer />
    </>
  );
};

export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";
import RestaurantDetail from "../components/Restaurant/RestaurantDetail";
import Cart from "../components/Cart/Cart";
import Profile from "../components/Profile/Profile";
import Auth from "../components/Auth/Auth";
import PaymentSuccess from "../components/Payment/PaymentSuccess";
import Search from "../components/Search/Search";

const WebRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/restaurant/:city/:restaurantName/:id"
          element={<RestaurantDetail />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-profile/*" element={<Profile />} />
        <Route path="/account/:register" element={<Auth />} />
        <Route path="/payment/success/:id" element={<PaymentSuccess />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  );
};

export default WebRouter;

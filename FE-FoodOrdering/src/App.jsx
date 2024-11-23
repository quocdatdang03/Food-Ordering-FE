import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "./Theme/DarkTheme";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home/Home";
import RestaurantDetail from "./components/Restaurant/RestaurantDetail";
import Cart from "./components/Cart/Cart";
import Profile from "./components/Profile/Profile";
import Auth from "./components/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "./Redux/Auth/Action";

function App() {
  const dispatch = useDispatch();
  const jwtToken = localStorage.getItem("jwtToken");
  const { authReducer } = useSelector((store) => store);

  useEffect(() => {
    if (authReducer.jwtToken || jwtToken)
      dispatch(getUserAction(authReducer.jwtToken || jwtToken));
  }, [authReducer.jwtToken]);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/restaurant/:city/:restaurantName/:id"
              element={<RestaurantDetail />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/my-profile/*" element={<Profile />} />
            <Route path="/account/:register" element={<Auth />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;

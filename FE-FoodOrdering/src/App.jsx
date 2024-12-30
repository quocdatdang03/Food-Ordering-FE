import { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "./Theme/DarkTheme";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "./Redux/Auth/Action";
import { getAllCartItemsAction } from "./Redux/Cart/Action";
import Routers from "./router/Routers";
import { getRestaurantByOwnerIdAction } from "./Redux/Restaurant/Action";
import { isTokenExpired, setupAxiosInterceptors } from "./config/api";

function App() {
  const dispatch = useDispatch();
  const { authReducer } = useSelector((store) => store);

  // useEffect(() => {
  //   if (authReducer.jwtToken || jwtToken) {
  //     dispatch(getUserAction(authReducer.jwtToken || jwtToken));

  //     // get all cart items
  //     dispatch(getAllCartItemsAction(authReducer.jwtToken || jwtToken));
  //   }
  // }, [authReducer.jwtToken]);

  // useEffect(() => {
  //   dispatch(getRestaurantByOwnerIdAction(authReducer.jwtToken || jwtToken));
  // }, [authReducer.user]);

  const jwtToken = localStorage.getItem("jwtToken");
  useEffect(() => {
    if (jwtToken) {
      // Setup axios với jwtToken hiện tại
      setupAxiosInterceptors(jwtToken);

      // Nếu jwtToken chưa hết hạn -> get user info
      if (!isTokenExpired(jwtToken)) {
        console.log("Token is: " + jwtToken);
        dispatch(getUserAction());

        if (authReducer.user?.role === "ROLE_CUSTOMER")
          dispatch(getAllCartItemsAction());
      }
    }
  }, [jwtToken]);

  useEffect(() => {
    if (authReducer.user?.role === "ROLE_RESTAURANT_OWNER")
      dispatch(getRestaurantByOwnerIdAction(jwtToken));
  }, [authReducer.user]);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Routers />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;

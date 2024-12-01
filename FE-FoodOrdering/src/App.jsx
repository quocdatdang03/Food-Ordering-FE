import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "./Theme/DarkTheme";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "./Redux/Auth/Action";
import { getAllCartItemsAction } from "./Redux/Cart/Action";
import Routers from "./router/Routers";

function App() {
  const dispatch = useDispatch();
  const jwtToken = localStorage.getItem("jwtToken");
  const { authReducer } = useSelector((store) => store);

  useEffect(() => {
    if (authReducer.jwtToken || jwtToken) {
      dispatch(getUserAction(authReducer.jwtToken || jwtToken));

      // get all cart items
      dispatch(getAllCartItemsAction(authReducer.jwtToken || jwtToken));
    }
  }, [authReducer.jwtToken]);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Navbar />
          <Routers />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;

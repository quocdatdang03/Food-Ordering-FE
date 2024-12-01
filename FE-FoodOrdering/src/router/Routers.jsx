import React from "react";
import { Route, Routes } from "react-router-dom";
import WebRouter from "./WebRouter";
import AdminRouter from "./AdminRouter";

const Routers = () => {
  return (
    <>
      <Routes>
        {/* Web routers */}
        <Route path="/*" element={<WebRouter />} />

        {/* Admin routers */}
        <Route path="/admin/restaurants/*" element={<AdminRouter />} />
      </Routes>
    </>
  );
};

export default Routers;

import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateRestaurantForm from "../adminComponents/CreateRestaurantForm";
import AdminPanel from "../adminComponents/AdminPanel";

const AdminRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="/*"
          element={true ? <CreateRestaurantForm /> : <AdminPanel />}
        />
      </Routes>
    </>
  );
};

export default AdminRouter;

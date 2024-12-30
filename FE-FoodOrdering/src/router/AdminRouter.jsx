import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateRestaurantForm from "../adminComponents/CreateRestaurantForm";
import AdminPanel from "../adminComponents/AdminPanel";
import { useSelector } from "react-redux";
import Loading from "../adminComponents/Loading/Loading";

const AdminRouter = () => {
  const { restaurantReducer } = useSelector((store) => store);

  return (
    <>
      <Routes>
        <Route
          path="/*"
          element={
            restaurantReducer?.ownerRestaurant ? (
              <AdminPanel />
            ) : (
              <CreateRestaurantForm />
            )
          }
        />
      </Routes>
    </>
  );
};

export default AdminRouter;

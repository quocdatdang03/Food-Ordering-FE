import React, { useEffect } from "react";
import AdminIngredientTable from "./AdminIngredientTable";
import AdminIngredientCategoryTable from "./AdminIngredientCategoryTable";
import { getIngredientCategoriesOfRestaurantAction } from "../../Redux/Ingredient/Action";
import { useDispatch, useSelector } from "react-redux";

const AdminIngredient = () => {
  const { restaurantReducer } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    const restaurantId = restaurantReducer.ownerRestaurant.id;
    dispatch(getIngredientCategoriesOfRestaurantAction(jwtToken, restaurantId));
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <AdminIngredientTable jwtToken={jwtToken} dispatch={dispatch} />
      <AdminIngredientCategoryTable jwtToken={jwtToken} dispatch={dispatch} />
    </div>
  );
};

export default AdminIngredient;

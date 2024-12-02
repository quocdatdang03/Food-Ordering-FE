import React from "react";
import AdminIngredientTable from "./AdminIngredientTable";
import AdminIngredientCategoryTable from "./AdminIngredientCategoryTable";

const AdminIngredient = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <AdminIngredientTable />
      <AdminIngredientCategoryTable />
    </div>
  );
};

export default AdminIngredient;

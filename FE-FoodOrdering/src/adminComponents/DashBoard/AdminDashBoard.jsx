import React from "react";
import RecentOrder from "./RecentOrder";
import RecentAddedMenu from "./RecentAddedMenu";

const AdminDashBoard = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      <RecentOrder />
      <RecentAddedMenu />
    </div>
  );
};

export default AdminDashBoard;

import { Card, CardHeader, IconButton } from "@mui/material";
import React, { useState } from "react";
import AdminMenuTable from "./AdminMenuTable";

import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const orderStatusDatas = [
  {
    name: "All",
    value: "ALL",
  },
  {
    name: "Pending",
    value: "PENDING",
  },
  {
    name: "Completed",
    value: "COMPLETED",
  },
  {
    name: "Delivered",
    value: "DELIVERED",
  },
];

const AdminMenu = () => {
  const [orderStatus, setOrderStatus] = useState("ALL");
  const navigate = useNavigate();

  const handleChangeOrderStatus = (e) => {
    setOrderStatus(e.target.value);
  };

  return (
    <div className="grid grid-cols-1">
      <Card>
        <CardHeader
          title="All Menu Items"
          action={
            <IconButton onClick={() => navigate("add-menu")}>
              <EditIcon />
            </IconButton>
          }
        />
        <AdminMenuTable />
      </Card>
    </div>
  );
};

export default AdminMenu;

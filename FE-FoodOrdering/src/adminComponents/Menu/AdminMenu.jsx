import { Card, CardHeader, IconButton } from "@mui/material";
import React, { useState } from "react";
import AdminMenuTable from "./AdminMenuTable";

import AddCircleIcon from "@mui/icons-material/AddCircle";

import { useNavigate } from "react-router-dom";

const AdminMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1">
      <Card>
        <CardHeader
          title="All Menu Items"
          action={
            <IconButton onClick={() => navigate("add-menu")}>
              <AddCircleIcon fontSize="large" />
            </IconButton>
          }
        />
        <AdminMenuTable />
      </Card>
    </div>
  );
};

export default AdminMenu;

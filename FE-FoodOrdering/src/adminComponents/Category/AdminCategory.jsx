import React from "react";
import AdminCategoryTable from "./AdminCategoryTable";
import { Card, CardHeader, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const AdminCategory = () => {
  return (
    <div className="grid grid-cols-1">
      <Card>
        <CardHeader
          title="Food Categories"
          action={
            <IconButton>
              <EditIcon />
            </IconButton>
          }
        />
        <AdminCategoryTable />
      </Card>
    </div>
  );
};

export default AdminCategory;

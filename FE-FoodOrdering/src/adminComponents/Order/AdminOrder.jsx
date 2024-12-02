import {
  Card,
  CardHeader,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import AdminOrderTable from "./AdminOrderTable";

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

const AdminOrder = () => {
  const [orderStatus, setOrderStatus] = useState("ALL");

  const handleChangeOrderStatus = (e) => {
    setOrderStatus(e.target.value);
  };

  return (
    <div>
      <Card>
        <CardHeader title="Order Status" />
        <FormControl sx={{ paddingLeft: "20px", paddingBottom: "10px" }}>
          <RadioGroup
            row
            value={orderStatus}
            onChange={handleChangeOrderStatus}
          >
            {orderStatusDatas.map((item) => {
              return (
                <FormControlLabel
                  key={item.name}
                  value={item.value}
                  label={item.name}
                  control={<Radio />}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </Card>
      <div className="mt-5 grid grid-cols-1">
        <AdminOrderTable />
      </div>
    </div>
  );
};

export default AdminOrder;

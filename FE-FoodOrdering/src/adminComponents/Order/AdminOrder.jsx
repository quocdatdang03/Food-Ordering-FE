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
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantOrdersAction } from "../../Redux/RestaurantOrder/Action";

const orderStatusDatas = [
  {
    name: "All",
    value: "",
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
  const [orderStatus, setOrderStatus] = useState("");
  const dispatch = useDispatch();
  const jwtToken = localStorage.getItem("jwtToken");
  const { restaurantReducer } = useSelector((store) => store);

  const handleChangeOrderStatus = (e) => {
    setOrderStatus(e.target.value);

    // show orders by order status:
    const requestData = {
      restaurantId: restaurantReducer.ownerRestaurant?.id,
      orderStatus: e.target.value,
    };

    dispatch(getRestaurantOrdersAction(jwtToken, requestData));
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

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantOrderDetailAction } from "../../Redux/RestaurantOrder/Action";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Menu,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const AdminOrderDetails = () => {
  const { restaurantReducer, restaurantOrderReducer } = useSelector(
    (store) => store
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("jwtToken");

  const { orderId } = useParams();

  useEffect(() => {
    const requestData = {
      orderId: orderId,
      restaurantId: restaurantReducer?.ownerRestaurant.id,
    };

    console.log(requestData);
    dispatch(getRestaurantOrderDetailAction(jwtToken, requestData));
  }, [orderId]);

  return (
    <div className="grid space-y-4">
      <div>
        <Button
          className="inline-block"
          variant="contained"
          onClick={() => navigate("/admin/restaurants/orders")}
        >
          <ArrowBackIosIcon /> <span>Back to Orders</span>
        </Button>
      </div>
      <Card>
        <CardHeader title="Order Details" />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Food Name</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Ingredients</TableCell>
                <TableCell align="center">Total Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrderReducer.orderDetail?.orderItems.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{item.food?.name}</TableCell>
                  <TableCell align="center">
                    <img
                      className="h-[3rem] w-[3rem] rounded-full object-cover object-center"
                      src={item.food.images?.[0]}
                      alt={item.food.images?.[0]}
                    />
                  </TableCell>
                  <TableCell align="center">{item?.quantity}</TableCell>
                  <TableCell align="center">
                    <div className="flex items-center justify-center gap-x-1">
                      {item?.ingredients.map((item) => {
                        return <Chip key={item.id} label={item} size="small" />;
                      })}
                    </div>
                  </TableCell>
                  <TableCell align="center">$ {item?.totalPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader title="Customer Info" />
          <CardContent>
            <p>
              Customer Name:
              <span className="pl-3 text-gray-400">
                {restaurantOrderReducer?.orderDetail?.customer.fullName}
              </span>
            </p>
            <p>
              Email:
              <span className="pl-3 text-gray-400">
                {restaurantOrderReducer?.orderDetail?.customer.email}
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Delivery Address" />
          <CardContent>
            <p>
              Street Address:
              <span className="pl-3 text-gray-400">
                {
                  restaurantOrderReducer?.orderDetail?.deliveryAddress
                    .streetAddress
                }
              </span>
            </p>
            <p>
              State:
              <span className="pl-3 text-gray-400">
                {restaurantOrderReducer?.orderDetail?.deliveryAddress.state}
              </span>
            </p>
            <p>
              City:
              <span className="pl-3 text-gray-400">
                {restaurantOrderReducer?.orderDetail?.deliveryAddress.city}
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOrderDetails;

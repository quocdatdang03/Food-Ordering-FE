import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  Chip,
  CircularProgress,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderStatusAction } from "../../Redux/RestaurantOrder/Action";
import { useNavigate } from "react-router-dom";

const orderStatusDatas = [
  { title: "Pending", value: "PENDING" },
  { title: "Delivered", value: "DELIVERED" },
  { title: "Completed", value: "COMPLETED" },
  { title: "Out of stock", value: "OUT_OF_STOCK" },
];

const AdminOrderTable = () => {
  const { restaurantOrderReducer } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("jwtToken");
  const [isDelayedLoading, setIsDelayedLoading] = useState(true);
  const isRestaurantOrderLoading = restaurantOrderReducer.isLoading;

  const [anchorEl, setAnchorEl] = useState(null);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setCurrentOrderId(orderId);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setCurrentOrderId(null);
  };

  const handleUpdateOrderStatus = (orderStatus) => {
    const requestData = { orderId: currentOrderId, orderStatus };
    dispatch(updateOrderStatusAction(jwtToken, requestData));
    handleClose();
  };

  const handleNavigateToRestaurantOrderDetail = (orderId) => {
    navigate("/admin/restaurants/orders/" + orderId);
  };

  useEffect(() => {
    if (restaurantOrderReducer.isLoading) {
      setIsDelayedLoading(true);
    } else {
      const timer = setTimeout(() => {
        setIsDelayedLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [restaurantOrderReducer.isLoading]);

  return (
    <Card>
      <CardHeader title="All Orders" />
      {isDelayedLoading ? (
        <div className="w-full min-h-[50vh] flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Customer Email</TableCell>
                <TableCell align="center">Quantity Of Products</TableCell>
                <TableCell align="center">Total Price</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrderReducer.orders.length > 0 ? (
                restaurantOrderReducer.orders.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{item.id}</TableCell>
                    <TableCell align="center">
                      <img
                        className="h-[3rem] w-[3rem] rounded-full object-cover object-center"
                        src={item?.orderItems[0].food.images?.[0]}
                        alt={item?.orderItems[0].food.images?.[0]}
                      />
                    </TableCell>
                    <TableCell align="center">{item?.customer.email}</TableCell>
                    <TableCell align="center">{item?.totalItem}</TableCell>
                    <TableCell align="center">${item?.totalPrice}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={item?.orderStatus}
                        sx={{ fontWeight: "bold", color: "white" }}
                        color={
                          item?.orderStatus === "PENDING"
                            ? "info"
                            : item?.orderStatus === "COMPLETED"
                            ? "secondary"
                            : item?.orderStatus === "OUT_OF_STOCK"
                            ? "error"
                            : "success"
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex flex-wrap items-center justify-center gap-3">
                        <Button
                          id="basic-button"
                          onClick={(event) => handleClick(event, item.id)}
                          variant="contained"
                          size="small"
                        >
                          UPDATE
                        </Button>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          {orderStatusDatas.map((orderStatusItem) => (
                            <MenuItem
                              key={orderStatusItem.title}
                              onClick={() =>
                                handleUpdateOrderStatus(orderStatusItem.value)
                              }
                            >
                              {orderStatusItem.title}
                            </MenuItem>
                          ))}
                        </Menu>
                        <Button
                          variant="contained"
                          size="small"
                          color="inherit"
                          onClick={() =>
                            handleNavigateToRestaurantOrderDetail(item.id)
                          }
                        >
                          SEE DETAILS
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell fullWidth colSpan={7}>
                    <h1 className="text-2xl text-gray-400 text-center min-h-[40vh]">
                      Restaurant order is empty!
                    </h1>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Card>
  );
};

export default AdminOrderTable;

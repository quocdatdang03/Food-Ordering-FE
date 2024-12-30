import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { Field, useFormik } from "formik";
import {
  Backdrop,
  Box,
  Button,
  Card,
  Divider,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { newAddressFormValidation } from "./newAddressFormValidation";
import { useDispatch, useSelector } from "react-redux";
import { getAllCartItemsAction, getCartAction } from "../../Redux/Cart/Action";
import { createOrderAction } from "../../Redux/order/Action";
import { getUserAction } from "../../Redux/Auth/Action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#191919",
  border: "2px solid #000",
  boxShadow: 24,
  trasition: "all linear 0.1s",
  p: 4,
};

const initialValues = {
  streetAddress: "",
  state: "",
  city: "",
};

const Cart = () => {
  const [open, setOpen] = useState(false);
  const handleOpenModalAddNewAddress = () => setOpen(true);

  const handleCloseModalAddNewAddress = () => setOpen(false);

  // get all cart items:
  const dispatch = useDispatch();
  const jwtToken = localStorage.getItem("jwtToken");
  const { cartReducer, authReducer } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getCartAction(jwtToken));
    dispatch(getAllCartItemsAction(jwtToken));
  }, []);

  useEffect(() => {
    dispatch(getCartAction(jwtToken));
  }, [cartReducer.cartItems]);

  // console.log(cartReducer.cartItems);

  // Handling Form Submit Order (create order) :
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: newAddressFormValidation,
    onSubmit: (addressData) => {
      const requestData = {
        restaurantId: cartReducer.cartItems[0]?.food.restaurantId,
        deliveryAddress: addressData,
      };

      dispatch(createOrderAction(jwtToken, requestData));
    },
  });

  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 lg:col-span-4 lg:min-h-[100vh] pt-10 space-y-9 p-5">
        {cartReducer.cartItems.map((item) => {
          return <CartItem key={item.id} item={item} />;
        })}

        <Divider />

        <div>
          <h2 className="mb-5">Bill Details</h2>
          <div className="space-y-5 text-gray-400">
            <div className="flex items-center justify-between">
              <p>Item Total</p>
              <p>
                $<span>{cartReducer.cart?.totalPrice}</span>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p>Deliver Fee</p>
              <p>
                $<span>21</span>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p>GST and Restaurant Chargers</p>
              <p>
                $<span>33</span>
              </p>
            </div>
            <Divider />
            <div className="flex items-center justify-between">
              <p>Total pay</p>
              <p>
                $<span>1200</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-8 py-10 px-14 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {authReducer.user?.addresses.map((item) => {
          return (
            <div key={item.id}>
              <Card>
                <div className="flex gap-3 p-5">
                  <HomeIcon />
                  <div>
                    <h2 className="text-lg font-semibold mb-3">{item.city}</h2>
                    <p>Address</p>
                    <p className="text-gray-400 text-justify text-sm">
                      {item.state}
                    </p>
                    <p className="text-gray-400 text-justify text-sm">
                      {item.streetAddress}
                    </p>
                    <Button sx={{ marginTop: 2 }} fullWidth variant="outlined">
                      Select
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}

        <div>
          <Card>
            <div className="flex gap-3 p-5">
              <AddLocationAltIcon />
              <div className="flex flex-col items-center w-full">
                <h2 className="font-semibold mb-3">Add New Address</h2>
                <Button
                  sx={{ marginTop: 2 }}
                  fullWidth
                  variant="contained"
                  onClick={handleOpenModalAddNewAddress}
                >
                  Add
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Modal Add New Address */}
      <Modal
        open={open}
        onClose={handleCloseModalAddNewAddress}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form className="w-full" onSubmit={formik.handleSubmit}>
              <TextField
                label="Street Address"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
                type="text"
                name="streetAddress"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.streetAddress}
                error={
                  formik.errors.streetAddress &&
                  Boolean(formik.errors.streetAddress)
                }
                helperText={
                  formik.errors.streetAddress && formik.errors.streetAddress
                }
              />
              <div className="grid grid-cols-2 gap-x-2">
                <TextField
                  label="State"
                  variant="outlined"
                  fullWidth
                  type="text"
                  name="state"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.state}
                  error={formik.errors.state && Boolean(formik.errors.state)}
                  helperText={formik.errors.state && formik.errors.state}
                />
                <TextField
                  label="City"
                  variant="outlined"
                  fullWidth
                  type="text"
                  name="city"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                  error={formik.errors.city && Boolean(formik.errors.city)}
                  helperText={formik.errors.city && formik.errors.city}
                />
              </div>
              <Button
                variant="contained"
                fullWidth
                sx={{ marginTop: 3 }}
                type="submit"
              >
                Delivery here
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Cart;

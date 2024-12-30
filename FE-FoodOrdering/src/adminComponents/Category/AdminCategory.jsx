import React, { useEffect, useRef, useState } from "react";
import AdminCategoryTable from "./AdminCategoryTable";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Fade,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useFormik } from "formik";
import { createCategoryFormValidation } from "../validation/createCategoryFormValidation";
import { useDispatch, useSelector } from "react-redux";
import { createRestaurantCategoryAction } from "../../Redux/Restaurant/Action";

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
  name: "",
};

const AdminCategory = () => {
  const dispatch = useDispatch();
  const jwtToken = localStorage.getItem("jwtToken");

  const { restaurantReducer } = useSelector((store) => store);
  const [isDelayedLoading, setIsDelayedLoading] = useState(true);
  const isRestaurantCategoryLoading = restaurantReducer.isLoading;

  const [open, setOpen] = useState(false);
  const handleOpenModalAddNewCategory = () => setOpen(true);

  const handleCloseModalAddNewCategory = () => setOpen(false);

  const inputNameRef = useRef(null);

  // Handling Form Submit Order (create order) :
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: createCategoryFormValidation,
    onSubmit: (values, { resetForm }) => {
      dispatch(createRestaurantCategoryAction(jwtToken, values));

      // after submit -> empty and focus input:
      resetForm();
      inputNameRef.current.focus();
    },
  });

  // hanlde loading :
  useEffect(() => {
    if (isRestaurantCategoryLoading) {
      setIsDelayedLoading(true);
    } else {
      const timer = setTimeout(() => {
        setIsDelayedLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isRestaurantCategoryLoading]);

  return (
    <div className="grid grid-cols-1">
      <Card>
        <CardHeader
          title="Food Categories"
          action={
            <IconButton onClick={handleOpenModalAddNewCategory}>
              <AddCircleIcon fontSize="large" />
            </IconButton>
          }
        />
        {isDelayedLoading ? (
          <div className="w-full min-h-[50vh] flex items-center justify-center">
            <CircularProgress />
          </div>
        ) : (
          <AdminCategoryTable />
        )}
      </Card>

      {/* Modal Add New Address */}
      <Modal
        open={open}
        onClose={handleCloseModalAddNewCategory}
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
            <Typography variant="h5" component="h1" sx={{ marginBottom: 2 }}>
              Add New Category
            </Typography>
            <form className="w-full" onSubmit={formik.handleSubmit}>
              <TextField
                label="Category Name"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
                type="text"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                error={formik.errors.name && Boolean(formik.errors.name)}
                helperText={formik.errors.name && formik.errors.name}
                inputRef={inputNameRef}
              />
              <Button
                variant="contained"
                fullWidth
                sx={{ marginTop: 3 }}
                type="submit"
              >
                Create
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AdminCategory;

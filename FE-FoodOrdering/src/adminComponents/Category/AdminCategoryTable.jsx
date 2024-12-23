import {
  Backdrop,
  Box,
  Button,
  Fade,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";

import DeleteIcon from "@mui/icons-material/Delete";
import AdminModalDeleteConfirmCategory from "./AdminModalDeleteConfirmCategory";
import { useFormik } from "formik";
import {
  getRestaurantCategorieByIdAction,
  updateRestaurantCategoryAction,
} from "../../Redux/Restaurant/Action";

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

const AdminCategoryTable = () => {
  const { restaurantReducer } = useSelector((store) => store);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const jwtToken = localStorage.getItem("jwtToken");
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpenModal = (category) => {
    setSelectedCategory(category);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedCategory(null);
  };

  const [openEditCategory, setOpenEditCategory] = useState(false);

  const handleOpenModalEditCategory = (categoryId) => {
    dispatch(getRestaurantCategorieByIdAction(jwtToken, categoryId));
    setOpenEditCategory(true);

    console.log(restaurantReducer?.category);
  };

  const handleCloseModalEditCategory = () => setOpenEditCategory(false);
  const inputNameRef = useRef(null);

  // Handling Form Submit Order (create order) :
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: restaurantReducer.category?.id || "",
      name: restaurantReducer.category?.name || "",
    },
    // validationSchema: createCategoryFormValidation,
    onSubmit: (values) => {
      // dispatch(createRestaurantCategoryAction(jwtToken, values));
      // // after submit -> empty and focus input:
      // resetForm();
      // inputNameRef.current.focus();

      const requestData = {
        id: values.id,
        name: values.name,
      };

      dispatch(updateRestaurantCategoryAction(jwtToken, requestData));

      handleCloseModalEditCategory();
    },
  });

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Id</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurantReducer.categories?.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell align="left">{item.name}</TableCell>
                <TableCell align="left">
                  <div className="flex items-center">
                    <IconButton
                      onClick={() => handleOpenModalEditCategory(item.id)}
                    >
                      <EditIcon color="info" />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() =>
                        handleOpenModal({ id: item.id, name: item.name })
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal Delete Confirm */}
      <AdminModalDeleteConfirmCategory
        open={open}
        onClose={handleCloseModal}
        selectedCategory={selectedCategory}
        jwtToken={jwtToken}
      />

      {/* Model Edit Category */}
      <Modal
        open={openEditCategory}
        onClose={handleCloseModalEditCategory}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openEditCategory}>
          <Box sx={style}>
            <Typography variant="h5" component="h1" sx={{ marginBottom: 2 }}>
              Edit Category
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
                Update
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default AdminCategoryTable;

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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import { createIngredientCategoryFormValidation } from "../validation/createIngredientCategoryFormValidation";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  createIngredientCategoryAction,
  getIngredientCategoryByIdAction,
  updateIngredientCategoryOfRestaurantAction,
} from "../../Redux/Ingredient/Action";
import AddCircleIcon from "@mui/icons-material/AddCircle";
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

const AdminIngredientCategoryTable = ({ jwtToken, dispatch }) => {
  const { ingredientReducer, restaurantReducer } = useSelector(
    (store) => store
  );

  const [isDelayedLoading, setIsDelayedLoading] = useState(true);
  const isIngredientCategoryLoading =
    ingredientReducer.isIngredientCategoryLoading;

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenModalAddNewIngredientCategory = () => setOpen(true);

  const handleCloseModalAddNewIngredientCategory = () => setOpen(false);

  const handleOpenModalEditIngredientCategory = (categoryId) => {
    dispatch(getIngredientCategoryByIdAction(jwtToken, categoryId));

    setOpenEdit(true);
  };
  const handleCloseModalEditIngredientCategory = () => setOpenEdit(false);

  const inputNameRef = useRef(null);

  // Handling Form Submit Order (create order) :
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: createIngredientCategoryFormValidation,
    onSubmit: (values, { resetForm }) => {
      const requestData = {
        name: values.name,
        restaurantId: restaurantReducer.ownerRestaurant?.id,
      };

      dispatch(createIngredientCategoryAction(jwtToken, requestData));

      resetForm();
      inputNameRef.current.focus();
    },
  });

  // Handling Form Submit Order (create order) :
  const formikEdit = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: ingredientReducer?.ingredientCategory?.name,
    },
    validationSchema: createIngredientCategoryFormValidation,
    onSubmit: (values, { resetForm }) => {
      const requestData = {
        categoryId: ingredientReducer?.ingredientCategory.id,
        name: values.name,
        restaurantId: restaurantReducer.ownerRestaurant?.id,
      };

      dispatch(
        updateIngredientCategoryOfRestaurantAction(jwtToken, requestData)
      );

      resetForm();
      setOpenEdit(false);
    },
  });

  // hanlde loading :
  useEffect(() => {
    if (isIngredientCategoryLoading) {
      setIsDelayedLoading(true);
    } else {
      const timer = setTimeout(() => {
        setIsDelayedLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isIngredientCategoryLoading]);

  return (
    <div className="lg:col-span-4">
      <Card>
        <CardHeader
          title="Ingredient Categories"
          action={
            <IconButton onClick={handleOpenModalAddNewIngredientCategory}>
              <AddCircleIcon fontSize="large" />
            </IconButton>
          }
        />

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
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ingredientReducer.ingredientCategories?.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{item.id}</TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() =>
                          handleOpenModalEditIngredientCategory(item.id)
                        }
                      >
                        <EditIcon color="info" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>

      {/* Modal Add New Ingredient Category */}
      <Modal
        open={open}
        onClose={handleCloseModalAddNewIngredientCategory}
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
              Add New Ingredient Category
            </Typography>
            <form className="w-full" onSubmit={formik.handleSubmit}>
              <TextField
                label="Ingredient Category Name"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
                type="text"
                name="name"
                onChange={formik.handleChange}
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

      {/* Modal Edit Ingredient Category */}
      <Modal
        open={openEdit}
        onClose={handleCloseModalEditIngredientCategory}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openEdit}>
          <Box sx={style}>
            <Typography variant="h5" component="h1" sx={{ marginBottom: 2 }}>
              Edit Ingredient Category
            </Typography>
            <form className="w-full" onSubmit={formikEdit.handleSubmit}>
              <TextField
                label="Ingredient Category Name"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
                type="text"
                name="name"
                onChange={formikEdit.handleChange}
                value={formikEdit.values.name}
                error={
                  formikEdit.errors.name && Boolean(formikEdit.errors.name)
                }
                helperText={formikEdit.errors.name && formikEdit.errors.name}
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
    </div>
  );
};

export default AdminIngredientCategoryTable;

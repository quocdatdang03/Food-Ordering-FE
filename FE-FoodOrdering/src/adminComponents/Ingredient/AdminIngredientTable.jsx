import {
  Backdrop,
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Fade,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
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
import { useFormik } from "formik";
import { createIngredientFormValidation } from "../validation/createIngredientFormValidation";
import { ingredientReducer } from "../../Redux/Ingredient/Reducer";
import { useSelector } from "react-redux";
import {
  createIngredientAction,
  getIngredientByIdAction,
  getIngredientsOfRestaurantAction,
  updateIngredientOfRestaurantAction,
  updateStockOfIngredientAction,
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
  categoryId: "",
};

const AdminIngredientTable = ({ jwtToken, dispatch }) => {
  const { ingredientReducer, restaurantReducer } = useSelector(
    (store) => store
  );

  const [isDelayedLoading, setIsDelayedLoading] = useState(true);
  const isIngredientLoading = ingredientReducer.isLoading;

  const [open, setOpen] = useState(false);
  const handleOpenModalAddNewIngredient = () => setOpen(true);

  const handleCloseModalAddNewIngredient = () => setOpen(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenModalEditIngredient = (ingredientId) => {
    dispatch(getIngredientByIdAction(jwtToken, ingredientId));

    setOpenEdit(true);
  };

  const handleCloseModalEditIngredient = () => setOpenEdit(false);

  const inputNameRef = useRef(null);

  // Handling Form Submit Ingredient (create ingredient) :
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: createIngredientFormValidation,
    onSubmit: (values, { resetForm }) => {
      const requestData = {
        ...values,
        restaurantId: restaurantReducer.ownerRestaurant?.id,
      };

      dispatch(createIngredientAction(jwtToken, requestData));

      resetForm();

      inputNameRef.current.focus();
    },
  });

  const handleUpdateStockStatus = (ingredientId) => {
    dispatch(updateStockOfIngredientAction(jwtToken, ingredientId));
  };

  useEffect(() => {
    dispatch(
      getIngredientsOfRestaurantAction(
        jwtToken,
        restaurantReducer.ownerRestaurant?.id
      )
    );
  }, [ingredientReducer?.ingredientCategories]);

  // Handling Form Submit Ingredient (Edit ingredient) :
  const formikEdit = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: ingredientReducer?.ingredient?.name || "",
      categoryId: ingredientReducer?.ingredient?.category.id || "",
    },
    // validationSchema: createIngredientFormValidation,
    onSubmit: (values, { resetForm }) => {
      const requestData = {
        ingredientId: ingredientReducer?.ingredient?.id,
        ...values,
      };

      dispatch(updateIngredientOfRestaurantAction(jwtToken, requestData));

      resetForm();
      setOpenEdit(false);
    },
  });

  // hanlde loading :
  useEffect(() => {
    if (isIngredientLoading) {
      setIsDelayedLoading(true);
    } else {
      const timer = setTimeout(() => {
        setIsDelayedLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isIngredientLoading]);

  return (
    <div className="lg:col-span-8">
      <Card>
        <CardHeader
          title="Ingredients"
          action={
            <IconButton onClick={handleOpenModalAddNewIngredient}>
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
                  <TableCell align="center">Category</TableCell>
                  <TableCell align="center">Availability</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ingredientReducer.ingredients?.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{item.id}</TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">{item.category.name}</TableCell>
                    <TableCell align="center">
                      {item.inStock ? (
                        <Button
                          variant="text"
                          sx={{ color: "#26c665" }}
                          onClick={() => handleUpdateStockStatus(item.id)}
                        >
                          In Stock
                        </Button>
                      ) : (
                        <Button
                          variant="text"
                          onClick={() => handleUpdateStockStatus(item.id)}
                        >
                          Out of Stock
                        </Button>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleOpenModalEditIngredient(item.id)}
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

      {/* Modal Add New Ingredient */}
      <Modal
        open={open}
        onClose={handleCloseModalAddNewIngredient}
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
              Add New Ingredient
            </Typography>
            <form className="w-full" onSubmit={formik.handleSubmit}>
              <TextField
                label="Ingredient Name"
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
              <FormControl
                fullWidth
                error={Boolean(
                  formik.errors.categoryId && formik.touched.categoryId
                )}
              >
                <InputLabel>Choose Category</InputLabel>
                <Select
                  value={formik.values.categoryId}
                  label="Choose Category"
                  name="categoryId"
                  onChange={formik.handleChange}
                >
                  {ingredientReducer.ingredientCategories?.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                {formik.errors.categoryId && (
                  <FormHelperText>{formik.errors.categoryId}</FormHelperText>
                )}
              </FormControl>
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

      {/* Modal Edit Ingredient */}
      <Modal
        open={openEdit}
        onClose={handleCloseModalEditIngredient}
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
              Edit Ingredient
            </Typography>
            <form className="w-full" onSubmit={formikEdit.handleSubmit}>
              <TextField
                label="Ingredient Name"
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
              <FormControl
                fullWidth
                error={Boolean(
                  formikEdit.errors.categoryId && formikEdit.touched.categoryId
                )}
              >
                <InputLabel>Choose Category</InputLabel>
                <Select
                  value={formikEdit.values.categoryId}
                  label="Choose Category"
                  name="categoryId"
                  onChange={formikEdit.handleChange}
                >
                  {ingredientReducer.ingredientCategories?.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                {formikEdit.errors.categoryId && (
                  <FormHelperText>
                    {formikEdit.errors.categoryId}
                  </FormHelperText>
                )}
              </FormControl>
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

export default AdminIngredientTable;

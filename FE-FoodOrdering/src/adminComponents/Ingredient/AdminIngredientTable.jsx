import {
  Backdrop,
  Box,
  Button,
  Card,
  CardHeader,
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
} from "@mui/material";
import React, { useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import { createIngredientFormValidation } from "../validation/createIngredientFormValidation";

const fakeDatas = [
  {
    id: 1,
    name: "Hamburger",
    price: 19923,
    ingredientCategory: "Bread",
    availability: false,
  },
  {
    id: 2,
    name: "Lettuce",
    price: 19923,
    ingredientCategory: "Vegetable",
    availability: true,
  },
  {
    id: 3,
    name: "Onion slices",
    price: 19923,
    ingredientCategory: "Vegetable",
    availability: false,
  },
  {
    id: 4,
    name: "Hamburger",
    price: 19923,
    ingredientCategory: "Bread",
    availability: true,
  },
  {
    id: 5,
    name: "Hamburger",
    price: 19923,
    ingredientCategory: "Bread",
    availability: true,
  },
];

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
  category: "",
};

const AdminIngredientTable = () => {
  const [open, setOpen] = useState(false);
  const handleOpenModalAddNewIngredient = () => setOpen(true);

  const handleCloseModalAddNewIngredient = () => setOpen(false);

  // Handling Form Submit Order (create order) :
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: createIngredientFormValidation,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="lg:col-span-8">
      <Card>
        <CardHeader
          title="Ingredients"
          action={
            <IconButton onClick={handleOpenModalAddNewIngredient}>
              <EditIcon />
            </IconButton>
          }
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Availability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fakeDatas.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{item.id}</TableCell>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">
                    {item.ingredientCategory}
                  </TableCell>
                  <TableCell align="center">
                    {item.availability ? (
                      <Button variant="text" sx={{ color: "#26c665" }}>
                        In Stock
                      </Button>
                    ) : (
                      <Button variant="text">Out of Stock</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
            <form className="w-full" onSubmit={formik.handleSubmit}>
              <TextField
                label="Ingredient Name"
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
              />
              <FormControl
                fullWidth
                error={Boolean(
                  formik.errors.category && formik.touched.category
                )}
              >
                <InputLabel>Choose Category</InputLabel>
                <Select
                  value={formik.values.category}
                  label="Choose Category"
                  name="category"
                  onChange={formik.handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                {formik.errors.category && (
                  <FormHelperText>{formik.errors.category}</FormHelperText>
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
    </div>
  );
};

export default AdminIngredientTable;

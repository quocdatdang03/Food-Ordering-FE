import {
  Backdrop,
  Box,
  Button,
  Card,
  CardHeader,
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
} from "@mui/material";
import React, { useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import { createIngredientCategoryFormValidation } from "../validation/createIngredientCategoryFormValidation";
import { useFormik } from "formik";

const fakeDatas = [
  {
    id: 1,
    name: "Sauce",
  },
  {
    id: 2,
    name: "Bread",
  },
  {
    id: 3,
    name: "Protein",
  },
  {
    id: 4,
    name: "Vegetable",
  },
  {
    id: 5,
    name: "Dairy",
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
};

const AdminIngredientCategoryTable = () => {
  const [open, setOpen] = useState(false);
  const handleOpenModalAddNewIngredientCategory = () => setOpen(true);

  const handleCloseModalAddNewIngredientCategory = () => setOpen(false);

  // Handling Form Submit Order (create order) :
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: createIngredientCategoryFormValidation,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className="lg:col-span-4">
      <Card>
        <CardHeader
          title="Ingredient Categories"
          action={
            <IconButton onClick={handleOpenModalAddNewIngredientCategory}>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
            <form className="w-full" onSubmit={formik.handleSubmit}>
              <TextField
                label="Ingredient Category Name"
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

export default AdminIngredientCategoryTable;

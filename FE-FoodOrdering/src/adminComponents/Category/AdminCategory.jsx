import React, { useState } from "react";
import AdminCategoryTable from "./AdminCategoryTable";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardHeader,
  Fade,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import { createCategoryFormValidation } from "../validation/createCategoryFormValidation";

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
  const [open, setOpen] = useState(false);
  const handleOpenModalAddNewCategory = () => setOpen(true);

  const handleCloseModalAddNewCategory = () => setOpen(false);

  // Handling Form Submit Order (create order) :
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: createCategoryFormValidation,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="grid grid-cols-1">
      <Card>
        <CardHeader
          title="Food Categories"
          action={
            <IconButton onClick={handleOpenModalAddNewCategory}>
              <EditIcon />
            </IconButton>
          }
        />
        <AdminCategoryTable />
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

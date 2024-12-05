import React, { useState } from "react";
import { uploadImageToCloudinary } from "../../util/UploadImageToCloudinary";
import { useFormik } from "formik";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { createMenuItemFormValidation } from "../validation/createMenuItemFormValidation";

const initialValues = {
  name: "",
  description: "",
  price: "",
  images: [],
  isVegetarian: false,
  isSeasonal: false,
  category: "",
  restaurant: "",
  ingredients: [],
};

export const AdminCreateMenuItemForm = () => {
  const [uploadImage, setUploadImage] = useState(false);

  const handleUploadImage = async (e) => {
    setUploadImage(true);

    const imageData = e.target.files[0];

    const imgUrlFromCloudinary = await uploadImageToCloudinary(imageData);

    formik.setFieldValue("images", [
      ...formik.values.images,
      imgUrlFromCloudinary,
    ]);

    setUploadImage(false);
  };
  const handleRemoveImage = (index) => {
    const images = [...formik.values.images];

    images.splice(index, 1);

    formik.setFieldValue("images", images);
  };

  // Handling Form :
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: createMenuItemFormValidation,
    onSubmit: (values) => {
      const requestData = {
        name: values.name,
        description: values.description,
        price: values.price,
        images: values.images,
        isVegetarian: values.isVegetarian,
        isSeasonal: values.isSeasonal,
        categoryId: values.category.id,
        restaurantId: values.restaurant.id,
        ingredients: values.ingredients,
      };

      console.log(requestData);
    },
  });

  return (
    <div className="w-full">
      <h1 className="text-center text-2xl font-bold mb-5">Add New Menu Item</h1>
      <div className="">
        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          <div className="flex items-center gap-5">
            <div>
              <input
                accept="image/*"
                type="file"
                id="imageUploadInput"
                className="hidden"
                onChange={handleUploadImage}
              />
              <label
                className="inline-block relative"
                htmlFor="imageUploadInput"
              >
                <span className="w-24 h-24 flex items-center justify-center border rounded cursor-pointer">
                  <AddPhotoAlternateIcon fontSize="medium" />
                </span>
                {uploadImage && (
                  <div className="absolute left-0 top-0 right-0 bottom-0 flex items-center justify-center">
                    <CircularProgress />
                  </div>
                )}
              </label>

              {formik.errors.images && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.images}
                </div>
              )}
            </div>

            <div className="flex items-center flex-wrap gap-3">
              {formik.values.images.map((image, index) => {
                return (
                  <div
                    className="relative w-24 h-24 rounded overflow-hidden"
                    key={index}
                  >
                    <div className="absolute top-0 right-0 cursor-pointer">
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <CloseIcon fontSize="small" sx={{ color: "#ef1e65" }} />
                      </IconButton>
                    </div>

                    <img
                      className="w-full h-full object-cover object-center"
                      src={image}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              type="text"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              error={formik.errors.name && Boolean(formik.errors.name)}
              helperText={formik.errors.name && formik.errors.name}
            />
          </div>
          <div>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              type="text"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              error={
                formik.errors.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.errors.description && formik.errors.description
              }
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              type="number"
              name="price"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              error={formik.errors.price && Boolean(formik.errors.price)}
              helperText={formik.errors.price && formik.errors.price}
            />
            <FormControl
              error={Boolean(formik.errors.category && formik.touched.category)}
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
          </div>
          <div>
            <FormControl
              error={Boolean(
                formik.errors.ingredients && formik.touched.ingredients
              )}
              className="w-full"
            >
              <InputLabel>Choose Ingredients</InputLabel>
              <Select
                multiple
                value={formik.values.ingredients}
                onChange={formik.handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                name="ingredients"
                label="Choose Ingredients"
              >
                {["breads", "black pepper", "hot sauce"].map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
              {formik.errors.ingredients && (
                <FormHelperText>{formik.errors.ingredients}</FormHelperText>
              )}
            </FormControl>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormControl>
              <InputLabel>Is Vegetarian</InputLabel>
              <Select
                value={formik.values.isVegetarian}
                label="Is Vegetarian"
                name="isVegetarian"
                onChange={formik.handleChange}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Is Seasonal</InputLabel>
              <Select
                value={formik.values.isSeasonal}
                label="Is Seasonal"
                name="isSeasonal"
                onChange={formik.handleChange}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="text-center">
            <Button type="submit" variant="contained">
              Create Menu Item
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

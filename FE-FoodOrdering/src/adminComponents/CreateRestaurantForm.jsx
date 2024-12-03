import React, { useState } from "react";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Button, CircularProgress, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { uploadImageToCloudinary } from "../util/UploadImageToCloudinary";
import { createRestaurantValidation } from "./validation/createRestaurantValidation";

const initialValues = {
  name: "",
  description: "",
  cuisineType: "",
  openingHours: "Mon-Sun: 10.00AM - 9.00PM",
  streetAddress: "",
  city: "",
  state: "",
  email: "",
  phoneNumber: "",
  facebook: "",
  instagram: "",
  images: [],
};

const CreateRestaurantForm = () => {
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
    validationSchema: createRestaurantValidation,
    onSubmit: (values) => {
      const requestData = {
        name: values.name,
        description: values.description,
        cuisineType: values.cuisineType,
        openingHours: values.openingHours,
        address: {
          streetAddress: values.streetAddress,
          city: values.city,
          state: values.state,
        },
        contactInformation: {
          email: values.email,
          phoneNumber: values.phoneNumber,
          facebook: values.facebook,
          instagram: values.instagram,
        },
        images: values.images,
      };

      console.log(requestData);
    },
  });

  return (
    <div className="mt-9 px-5 md:px-20 lg:px-56">
      <div className="w-full">
        <h1 className="text-center text-2xl font-bold mb-5">
          Add New Restaurant
        </h1>
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
                          <CloseIcon
                            fontSize="small"
                            sx={{ color: "#ef1e65" }}
                          />
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
                  formik.errors.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.errors.description && formik.errors.description
                }
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <TextField
                label="Cuisine Type"
                variant="outlined"
                fullWidth
                type="text"
                name="cuisineType"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cuisineType}
                error={
                  formik.errors.cuisineType &&
                  Boolean(formik.errors.cuisineType)
                }
                helperText={
                  formik.errors.cuisineType && formik.errors.cuisineType
                }
              />
              <TextField
                label="Opening Hours"
                variant="outlined"
                fullWidth
                type="text"
                name="openingHours"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.openingHours}
                error={
                  formik.errors.openingHours &&
                  Boolean(formik.errors.openingHours)
                }
                helperText={
                  formik.errors.openingHours && formik.errors.openingHours
                }
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
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
              <TextField
                label="State/Province"
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
                className="col-span-2 md:col-span-1"
                label="Street Address"
                variant="outlined"
                fullWidth
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
            </div>
            <div className="grid grid-cols-2 gap-5">
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="text"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.errors.email && Boolean(formik.errors.email)}
                helperText={formik.errors.email && formik.errors.email}
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                type="text"
                name="phoneNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
                error={
                  formik.errors.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.errors.phoneNumber && formik.errors.phoneNumber
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <TextField
                label="Facebook"
                variant="outlined"
                fullWidth
                type="text"
                name="facebook"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.facebook}
                error={
                  formik.errors.facebook && Boolean(formik.errors.facebook)
                }
                helperText={formik.errors.facebook && formik.errors.facebook}
              />
              <TextField
                label="Instagram"
                variant="outlined"
                fullWidth
                type="text"
                name="instagram"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.instagram}
                error={
                  formik.errors.instagram && Boolean(formik.errors.instagram)
                }
                helperText={formik.errors.instagram && formik.errors.instagram}
              />
            </div>
            <div className="text-center">
              <Button type="submit" variant="contained">
                Create Restaurant
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRestaurantForm;

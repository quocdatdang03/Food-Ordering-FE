import {
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Fade,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";

import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { uploadImageToCloudinary } from "../../util/UploadImageToCloudinary";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { date } from "yup";
import { createEventFormValidation } from "../validation/createEventFormValidation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#191919",
  border: "2px solid #000",
  boxShadow: 24,
  trasition: "all linear 0.1s",
  p: 4,
};

const initialValues = {
  images: [],
  location: "",
  name: "",
  startedDate: null,
  endsDate: null,
};

const AdminEvent = () => {
  const [open, setOpen] = useState(false);
  const handleOpenModalAddNewEvent = () => setOpen(true);

  const handleCloseModalAddNewEvent = () => setOpen(false);

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

  const formatDateTime = (value) => {
    const formatedDate = dayjs(value).format("MMMM DD, YYYY hh:mm A");
    return formatedDate;
  };

  // Handling Form Submit Order (create order) :
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: createEventFormValidation,
    onSubmit: (values) => {
      const formattedValues = {
        ...values,
        startedDate: formatDateTime(values.startedDate),
        endsDate: formatDateTime(values.endsDate),
      };

      console.log(formattedValues);
    },
  });

  return (
    <div>
      <div>
        <Button
          variant="contained"
          size="large"
          onClick={handleOpenModalAddNewEvent}
        >
          Create New Event
        </Button>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1, 1, 1, 1].map((item, index) => {
            return (
              <Card key={index}>
                <img
                  className="h-[250px] lg:h-[300px] w-full object-cover"
                  src="https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=600"
                />
                <div className="p-5">
                  <h1 className="text-2xl">Vietnamese Food</h1>
                  <p className="text-sm mb-5">50% off on your first order</p>
                  <div className="space-y-2 text-sm">
                    <p>Viet Name</p>
                    <p className="text-blue-500">November 20 2024 2.00PM</p>
                    <p className="text-red-500">November 20 2024 4.00PM</p>
                  </div>
                </div>
                <div className="text-right pr-3 pb-3">
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Modal Add New Event */}
      <Modal
        open={open}
        onClose={handleCloseModalAddNewEvent}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="w-[85vw] lg:w-[70vw]">
            <form className="w-full" onSubmit={formik.handleSubmit}>
              {/* START Handle Input Upload Image */}
              <div className="flex items-center gap-5 mb-7">
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
              {/* END Handle Input Upload Image */}
              <div className="grid md:grid-cols-2 gap-3">
                <TextField
                  label="Event Name"
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  type="text"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  error={formik.errors.name && Boolean(formik.errors.name)}
                  helperText={formik.errors.name && formik.errors.name}
                />

                <TextField
                  label="Location"
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  type="text"
                  name="location"
                  onChange={formik.handleChange}
                  value={formik.values.location}
                  error={
                    formik.errors.location && Boolean(formik.errors.location)
                  }
                  helperText={formik.errors.location && formik.errors.location}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        label="Start Date and Time"
                        value={formik.values.startedDate}
                        onChange={(newValue) =>
                          formik.setFieldValue("startedDate", newValue)
                        }
                        name="startedDate"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  {formik.touched.startedDate && formik.errors.startedDate && (
                    <p className="text-red-500 text-[12px] mt-[3px] mx-[14px]">
                      {formik.errors.startedDate}
                    </p>
                  )}
                </div>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        label="End Date and Time"
                        value={formik.values.endsDate}
                        onChange={(newValue) =>
                          formik.setFieldValue("endsDate", newValue)
                        }
                        name="endsDate"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  {formik.touched.endsDate && formik.errors.endsDate && (
                    <p className="text-red-500 text-[12px] mt-[3px] mx-[14px]">
                      {formik.errors.endsDate}
                    </p>
                  )}
                </div>
              </div>
              <Button
                variant="contained"
                fullWidth
                sx={{ marginTop: 5, paddingY: 1 }}
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
export default AdminEvent;

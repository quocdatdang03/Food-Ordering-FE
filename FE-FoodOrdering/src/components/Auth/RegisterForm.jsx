import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "ROLE_CUSTOMER",
};

const RegisterForm = () => {
  const navigate = useNavigate();

  // Handling Form :
  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: newAddressFormValidation,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="w-full rounded lg shadow md:mt-0 sm:max-w-lg xl:p-0">
      <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8 rounded shadow-md shadow-red-300">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
          Sign up
        </h1>
        <form className=" text-white" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-2 gap-x-3 ">
            <div>
              <label
                htmlFor="fullName"
                className="block mb-2 text-sm font-medium"
              >
                Full Name
              </label>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
                type="text"
                name="fullName"
                onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                value={formik.values.fullName}
                // error={
                //   formik.errors.streetAddress &&
                //   Boolean(formik.errors.streetAddress)
                // }
                // helperText={
                //   formik.errors.streetAddress && formik.errors.streetAddress
                // }
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email
              </label>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
                type="text"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium"
            >
              Password
            </label>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium"
            >
              Confirm Password
            </label>
            <TextField
              label="confirmPassword"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
              type="password"
              name="confirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
          </div>
          <div>
            <label htmlFor="role" className="block mb-2 text-sm font-medium">
              Select role
            </label>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="role"
                onChange={formik.handleChange}
                value={formik.values.role}
              >
                <MenuItem value="ROLE_CUSTOMER">Customer</MenuItem>
                <MenuItem value="ROLE_RESTAURANT_OWNER">
                  Restaurant Owner
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* <div className="flex items-center justify-between"></div> */}
          <div className="mt-10">
            <Button
              fullWidth
              variant="contained"
              sx={{ paddingY: 1 }}
              type="submit"
            >
              Sign Up
            </Button>
          </div>
        </form>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?
          <span
            onClick={() => navigate("/account/login")}
            className="font-medium text-primary-600 hover:underline text-white cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;

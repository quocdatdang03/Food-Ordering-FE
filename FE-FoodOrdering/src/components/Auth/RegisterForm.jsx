import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerFormValidation } from "./validation/registerFormValidation";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAuthError,
  clearAuthSuccess,
  registerUserAction,
} from "../../Redux/Auth/Action";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "ROLE_CUSTOMER",
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authReducer } = useSelector((store) => store);
  const [isDelayedLoading, setIsDelayedLoading] = useState(false);
  const isAuthLoading = authReducer.isLoading;

  // Handling Form :
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: registerFormValidation,
    onSubmit: (values) => {
      const requestData = {
        userData: values,
        navigate,
        isAuthLoading,
      };

      dispatch(registerUserAction(requestData));

      // reset form after register success :
    },
  });

  useEffect(() => {
    if (authReducer.success) formik.resetForm();

    return () => {
      if (authReducer.error) dispatch(clearAuthError());
      if (authReducer.success) dispatch(clearAuthSuccess());
    };
  }, [dispatch, authReducer.error, authReducer.success]);

  // handle loading :
  useEffect(() => {
    if (isAuthLoading) {
      setIsDelayedLoading(true);
    } else {
      const timer = setTimeout(() => {
        setIsDelayedLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isAuthLoading]);

  return (
    <div className="w-full rounded lg shadow md:mt-0 sm:max-w-lg xl:p-0">
      <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8 rounded shadow-md shadow-red-300">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
          Sign up
        </h1>
        {authReducer.error && (
          <Alert variant="filled" severity="error">
            {authReducer.error}
          </Alert>
        )}
        {authReducer.success && (
          <Alert variant="filled" severity="success">
            <span className="text-white">{authReducer.success}</span>
          </Alert>
        )}
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
                onBlur={formik.handleBlur}
                value={formik.values.fullName}
                error={
                  formik.errors.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.errors.fullName && formik.errors.fullName}
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
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.errors.email && Boolean(formik.errors.email)}
                helperText={formik.errors.email && formik.errors.email}
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
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.errors.password && Boolean(formik.errors.password)}
              helperText={formik.errors.password && formik.errors.password}
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
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              error={
                formik.errors.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.errors.confirmPassword && formik.errors.confirmPassword
              }
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
              {isDelayedLoading ? (
                <CircularProgress style={{ color: "white" }} />
              ) : (
                "Sign Up"
              )}
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

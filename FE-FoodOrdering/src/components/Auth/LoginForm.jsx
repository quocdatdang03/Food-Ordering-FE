import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuthError, loginUserAction } from "../../Redux/Auth/Action";
import { loginFormValidation } from "./validation/loginFormValidation";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authReducer } = useSelector((store) => store);

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  // Handling Form :
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginFormValidation,
    onSubmit: (values) => {
      const requestData = {
        userData: values,
        navigate,
      };
      dispatch(loginUserAction(requestData));
    },
  });

  useEffect(() => {
    return () => {
      if (authReducer.error) {
        dispatch(clearAuthError());
      }
    };
  }, [dispatch, authReducer.error]);

  return (
    <div className="w-full rounded lg shadow md:mt-0 sm:max-w-md xl:p-0">
      <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8 rounded shadow-md shadow-red-300">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
          Sign In
        </h1>
        {authReducer.error && (
          <Alert variant="filled" severity="error">
            {authReducer.error}
          </Alert>
        )}
        <form
          className="space-y-4 md:space-y-6 text-white"
          onSubmit={formik.handleSubmit}
        >
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Your email
            </label>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.errors.email && Boolean(formik.errors.email)}
              helperText={formik.errors.email && formik.errors.email}
            />
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
              type={showPassword ? "text" : "password"} // Toggle password visibility
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.errors.password}
              helperText={formik.errors.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <Button
            fullWidth
            variant="contained"
            sx={{ paddingY: 1 }}
            type="submit"
          >
            Sign in
          </Button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <span
              onClick={() => navigate("/account/register")}
              className="font-medium text-primary-600 hover:underline text-white cursor-pointer"
            >
              Sign up
            </span>
          </p>
          <p className="text-center">
            <span className="cursor-pointer hover:underline text-pink-500">
              Forgot password?
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  clearAuthError,
  loginUserAction,
  resendCodeAction,
} from "../../Redux/Auth/Action";
import { loginFormValidation } from "./validation/loginFormValidation";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authReducer } = useSelector((store) => store);
  const [isDelayedLoading, setIsDelayedLoading] = useState(true);
  const isAuthLoading = authReducer.isLoading;

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
        isAuthLoading,
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

  const handleSendVerificationCode = () => {
    dispatch(resendCodeAction({ email: formik.values.email }));
    navigate(`/account/verify-email?email=${formik.values.email}`);
  };

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
    <div className="w-full rounded lg shadow md:mt-0 sm:max-w-md xl:p-0">
      <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8 rounded shadow-md shadow-red-300">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
          Sign In
        </h1>
        {authReducer.success && !isDelayedLoading && (
          <Alert variant="filled" severity="success" style={{ color: "white" }}>
            {authReducer.success}
          </Alert>
        )}
        {authReducer.error && !isDelayedLoading && (
          <Alert
            variant="filled"
            severity="error"
            className="flex items-center"
          >
            {authReducer.error}
            {authReducer.error ===
              "Account not verified, Please verify your account" && (
              <>
                . Click{" "}
                <span
                  className="font-bold underline cursor-pointer"
                  onClick={handleSendVerificationCode}
                >
                  here
                </span>{" "}
                to verify your email
              </>
            )}
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
            {isDelayedLoading ? (
              <CircularProgress style={{ color: "white" }} />
            ) : (
              "Sign In"
            )}
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

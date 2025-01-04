import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resendCodeAction,
  sendResetPasswordEmailAction,
  verifyEmailAction,
} from "../../Redux/Auth/Action";
import { verificationFormValidation } from "./validation/VerificationFormValidation";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { forgotPasswordFormValidation } from "./validation/ForgotPasswordFormValidation";

const initialValues = {
  email: "",
};

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { authReducer } = useSelector((store) => store);
  const [isDelayedLoading, setIsDelayedLoading] = useState(true);
  const isAuthLoading = authReducer.isLoading;

  // extract params email from URL:
  const queryParams = new URLSearchParams(location.search);
  const emailParamFromURL = queryParams.get("email");

  // Handling Form :
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: forgotPasswordFormValidation,
    onSubmit: (values) => {
      const requestData = {
        email: values.email,
        navigate,
        isAuthLoading,
      };

      dispatch(sendResetPasswordEmailAction(requestData));
    },
  });

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
        <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl text-center">
          Forgot Your Password?
        </h1>

        {authReducer.error && !isDelayedLoading && (
          <Alert variant="filled" severity="error">
            {authReducer.error}
          </Alert>
        )}
        {authReducer.success && !isDelayedLoading && (
          <Alert variant="filled" severity="success">
            <span className="text-white">{authReducer.success}</span>
          </Alert>
        )}
        <div className="text-center space-y-3">
          <p className=" font-medium text-gray-300">
            Enter your email address and we will send you instructions to reset
            your password.
          </p>
        </div>
        <form className=" text-white" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 gap-x-3 ">
            <div>
              <TextField
                label="Enter your email address"
                s
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
            {/* <div className="flex items-center justify-between"></div> */}
            <div className="mt-3">
              <Button
                fullWidth
                variant="contained"
                sx={{ paddingY: 1 }}
                type="submit"
              >
                {isDelayedLoading ? (
                  <CircularProgress style={{ color: "white" }} />
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </div>
        </form>

        <div>
          <Button onClick={() => navigate("/account/login")}>
            <KeyboardBackspaceIcon />
            <span className="pl-1">Return to site</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;

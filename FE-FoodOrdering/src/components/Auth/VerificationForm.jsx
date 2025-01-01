import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resendCodeAction, verifyEmailAction } from "../../Redux/Auth/Action";
import { verificationFormValidation } from "./validation/VerificationFormValidation";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const initialValues = {
  verificationCode: "",
};

const VerificationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { authReducer } = useSelector((store) => store);
  const [isDelayedLoading, setIsDelayedLoading] = useState(true);
  const isAuthLoading = authReducer.isLoading;

  // extract params email from URL:
  const queryParams = new URLSearchParams(location.search);
  const emailParamFromURL = queryParams.get("email");

  console.log(emailParamFromURL);

  // Handling Form :
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: verificationFormValidation,
    onSubmit: (values) => {
      const requestData = {
        email: authReducer?.registerEmail || emailParamFromURL,
        verificationCode: values.verificationCode,
        navigate,
        isAuthLoading,
      };

      console.log(requestData);
      dispatch(verifyEmailAction(requestData));

      // reset form after verify success :
      if (authReducer.success) formik.resetForm();
    },
  });

  const handleResendCode = () => {
    const requestData = {
      email: authReducer?.registerEmail,
    };
    dispatch(resendCodeAction(requestData));
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
    <div className="w-full rounded lg shadow md:mt-0 sm:max-w-lg xl:p-0">
      <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8 rounded shadow-md shadow-red-300">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl text-center">
          Verify your email address
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
            A verification code has been sent to
            <br />
            <b>{authReducer?.registerEmail}</b>
          </p>
          <p className="text-gray-300">
            Please check your inbox and enter the verification code below to
            verify your email address.
          </p>
        </div>
        <form className=" text-white" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 gap-x-3 ">
            <div>
              <TextField
                label="Enter your verification code"
                s
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
                type="text"
                name="verificationCode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.verificationCode}
                error={
                  formik.errors.verificationCode &&
                  Boolean(formik.errors.verificationCode)
                }
                helperText={
                  formik.errors.verificationCode &&
                  formik.errors.verificationCode
                }
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
                  "Verify"
                )}
              </Button>
            </div>
          </div>
        </form>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Still can't find the email?
          <span
            onClick={handleResendCode}
            className="font-medium text-primary-600 hover:underline text-white cursor-pointer pl-1"
          >
            Resend code
          </span>
        </p>
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

export default VerificationForm;

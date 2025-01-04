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
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  clearAuthError,
  resetPasswordAction,
  verifyResetPasswordInfoAction,
} from "../../Redux/Auth/Action";
import { resetPasswordFormValidation } from "./validation/resetPasswordFormValidation";
import DangerousIcon from "@mui/icons-material/Dangerous";

const initialValues = {
  newPassword: "",
  confirmNewPassword: "",
};

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { authReducer } = useSelector((store) => store);
  const [isDelayedLoading, setIsDelayedLoading] = useState(true);
  const [
    isDelayedVerifyResetPasswordLoading,
    setIsDelayedVerifyResetPasswordLoading,
  ] = useState(true);
  const isAuthLoading = authReducer.isLoading;
  const isVerifyResetPasswordInfoLoading =
    authReducer.isVerifyResetPasswordInfoLoading;

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownConfirmPassword = (event) => event.preventDefault();

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const resetPasswordTicket = queryParams.get("ticket");

  useEffect(() => {
    const requestData = {
      email,
      resetPasswordTicket,
    };

    dispatch(verifyResetPasswordInfoAction(requestData));
  }, [email, resetPasswordTicket, dispatch]);

  // Handling Form :
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: resetPasswordFormValidation,
    onSubmit: (values) => {
      const requestData = {
        email: queryParams.get("email"),
        newPassword: values.newPassword,
      };

      dispatch(resetPasswordAction(requestData, navigate, isAuthLoading));
    },
  });

  useEffect(() => {
    return () => {
      if (authReducer.error) {
        dispatch(clearAuthError());
      }
    };
  }, [dispatch, authReducer.error]);

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

  useEffect(() => {
    if (isVerifyResetPasswordInfoLoading) {
      setIsDelayedVerifyResetPasswordLoading(true);
    } else {
      const timer = setTimeout(() => {
        setIsDelayedVerifyResetPasswordLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isVerifyResetPasswordInfoLoading]);

  return (
    <div className="w-full rounded lg shadow md:mt-0 sm:max-w-md xl:p-0">
      <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8 rounded shadow-lg bg-[#1e222d]">
        {isDelayedVerifyResetPasswordLoading ? (
          <div className="flex items-center justify-center py-40">
            <CircularProgress />
          </div>
        ) : authReducer.error === "ExpiredResetPasswordTicket" ||
          authReducer.error === "InvalidResetPasswordTicket" ||
          authReducer.error === "UserNotFound" ? (
          <div className="space-y-5 py-20">
            <div className="text-center">
              <DangerousIcon color="error" style={{ fontSize: "100px" }} />
            </div>
            <h1 className="text-center text-2xl">
              {authReducer.error === "ExpiredResetPasswordTicket"
                ? "Link Expired"
                : authReducer.error === "InvalidResetPasswordTicket"
                ? "Invalid reset password link"
                : "Some thing went wrong"}
            </h1>
            <p className="text-center text-sm">
              To reset your password, return to the login page and select
              "Forgot password?" to send a new email.
            </p>
          </div>
        ) : (
          <>
            {authReducer.success && !isDelayedLoading && (
              <Alert
                variant="filled"
                severity="success"
                style={{ color: "white" }}
              >
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
              </Alert>
            )}
            <h1 className="text-3xl text-center font-bold leading-tight tracking-tight text-white md:text-2xl">
              Change Your Password
            </h1>
            <p className="text-center text-gray-500 ">
              Enter a new password below to change your password.
            </p>
            <form
              className="space-y-2 text-white"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  New password
                </label>
                <TextField
                  label="Enter new password"
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  type={showConfirmPassword ? "text" : "password"} // Toggle password visibility
                  name="newPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.newPassword}
                  error={
                    formik.errors.newPassword &&
                    Boolean(formik.errors.newPassword)
                  }
                  helperText={
                    formik.errors.newPassword && formik.errors.newPassword
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium"
                >
                  Confirm new password
                </label>
                <TextField
                  label="Confirm new password"
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  type={showPassword ? "text" : "password"} // Toggle password visibility
                  name="confirmNewPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmNewPassword}
                  error={formik.errors.confirmNewPassword}
                  helperText={
                    formik.errors.confirmNewPassword &&
                    formik.errors.confirmNewPassword
                  }
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
                  "Reset password"
                )}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordForm;

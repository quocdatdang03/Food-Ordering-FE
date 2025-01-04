import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendResetPasswordEmailAction } from "../../Redux/Auth/Action";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

const SendEmailForgotPasswordSuccess = () => {
  const dispatch = useDispatch();
  const { authReducer } = useSelector((store) => store);
  const [isDelayedLoading, setIsDelayedLoading] = useState(true);
  const isAuthLoading = authReducer.isLoading;

  const handleResendEmail = () => {
    const requestData = {
      email: authReducer?.resetPasswordEmail,
      isResend: true,
    };
    dispatch(sendResetPasswordEmailAction(requestData));
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
      <div className="w-full p-6 space-y-7 md:space-y-6 sm:p-8 rounded shadow-md shadow-red-300">
        <div className="text-center">
          <MarkEmailReadIcon
            className="text-green-600"
            style={{ fontSize: 84 }}
          />
        </div>
        <h1 className="text-2xl font-bold leading-tight tracking-wide text-white md:text-2xl text-center">
          Check Your Email
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
            Please check your email address{" "}
            <b>{authReducer?.resetPasswordEmail}</b> for instructions to reset
            your password.
          </p>
        </div>
        <div className="mt-3">
          <Button
            fullWidth
            variant="outlined"
            sx={{ paddingY: 1 }}
            onClick={handleResendEmail}
          >
            {isDelayedLoading ? (
              <CircularProgress style={{ color: "white" }} />
            ) : (
              "Resend email"
            )}
          </Button>
        </div>

        {/* <div>
          <Button onClick={() => navigate("/account/login")}>
            <KeyboardBackspaceIcon />
            <span className="pl-1">Return to site</span>
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default SendEmailForgotPasswordSuccess;

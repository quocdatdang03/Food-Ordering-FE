import { Backdrop, Box, Button, Modal, TextField } from "@mui/material";
import React, { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transhtmlForm: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#191919",
  border: "2px solid #000",
  boxShadow: 24,
  trasition: "all linear 0.1s",
  p: 4,
};

const Auth = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-5">
      <a
        href="#"
        className="flex items-center mb-6 text-2xl font-semibold text-white"
      >
        <img
          className="w-8 h-8 mr-2"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
        />
        Food Order
      </a>
      {location.pathname === "/account/register" && <RegisterForm />}
      {location.pathname === "/account/login" && <LoginForm />}
    </div>
  );
};

export default Auth;

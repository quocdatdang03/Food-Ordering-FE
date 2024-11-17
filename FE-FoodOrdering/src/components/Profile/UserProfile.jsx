import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../Redux/Auth/Action";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { authReducer } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center w-full h-full p-5">
      <div className="flex flex-col items-center gap-y-3">
        <AccountCircleIcon sx={{ fontSize: 90 }} />
        <h1 className="text-xl font-bold">
          {authReducer.user && authReducer.user.fullName}
        </h1>
        <p className="text-sm text-gray-500">
          {authReducer.user && authReducer.user.email}
        </p>
        <Button onClick={handleLogout} variant="contained">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;

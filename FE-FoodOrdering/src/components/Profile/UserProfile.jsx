import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";

const UserProfile = () => {
  return (
    <div className="flex items-center justify-center w-full h-full p-5">
      <div className="flex flex-col items-center gap-y-3">
        <AccountCircleIcon sx={{ fontSize: 90 }} />
        <h1 className="text-xl font-bold">Dang Quoc Dat</h1>
        <p className="text-sm text-gray-500">dat03122003@gmail.com</p>
        <Button variant="contained">Logout</Button>
      </div>
    </div>
  );
};

export default UserProfile;

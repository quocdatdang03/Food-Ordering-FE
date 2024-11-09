import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Avatar, Badge, IconButton } from "@mui/material";

const Navbar = () => {
  return (
    <div className="px-5 z-50 py-3 bg-[#e91e63] lg:px-20 flex justify-between">
      {/* Logo */}
      <div className="flex items-center cursor-pointer">
        <div className="logo font-semibold font-sans text-2xl select-none">
          Food Order
        </div>
      </div>
      <div className="flex items-center space-x-5 lg:space-x-10">
        <div>
          <IconButton>
            <SearchIcon style={{ fontSize: "18px;" }} />
          </IconButton>
        </div>
        <div>
          <Avatar style={{ backgroundColor: "white", color: "pink" }}>M</Avatar>
        </div>
        <div>
          <IconButton>
            <Badge color="secondary" badgeContent={10}>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Chip, IconButton } from "@mui/material";
import { pink } from "@mui/material/colors";

const CartItem = () => {
  return (
    <div>
      <div className="flex gap-x-3 bg-slate-500">
        <img
          className="w-[5rem] h-[5rem] object-cover"
          src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600"
        />
        <div className="w-full flex items-center justify-between pr-8">
          <div>
            <p>Burger king</p>
            <div className="flex gap-2 items-center">
              <IconButton>
                <RemoveCircleOutlineIcon sx={{ color: pink[400] }} />
              </IconButton>
              <span>10</span>
              <IconButton>
                <AddCircleOutlineIcon sx={{ color: pink[400] }} />
              </IconButton>
            </div>
          </div>
          <div>
            <p>
              $<span>199</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        <Chip label="Garlic" />
        <Chip label="Black Pepper" />
      </div>
    </div>
  );
};

export default CartItem;

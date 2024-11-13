import React from "react";
import { Card, Chip, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const RestaurantCards = () => {
  return (
    <Card>
      <div className="relative">
        <img
          src="https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=600"
          className={`w-full h-[10rem] object-cover ${
            true ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          alt=""
        />
        <Chip
          className="absolute top-2 left-2"
          size="small"
          color={true ? "success" : "error"}
          label={true ? "Open" : "error"}
        />
      </div>
      <div className="px-4 py-5 flex justify-between">
        <div className="">
          <h1 className="mb-2 text-lg font-bold">Indian Fast Food</h1>
          <p className="text-sm text-gray-400">
            Best restaurant of Vietnamese, good choices for every peoples on the
            world!
          </p>
        </div>
        <IconButton className="inline-block">
          {true ? (
            <FavoriteIcon className="text-pink-600" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      </div>
    </Card>
  );
};

export default RestaurantCards;

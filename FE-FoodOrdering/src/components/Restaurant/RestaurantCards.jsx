import React, { useEffect } from "react";
import { Card, Chip, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { isPresentInFavorites } from "../../config/logic";
import { useDispatch, useSelector } from "react-redux";
import { addToFavoritesAction } from "../../Redux/Auth/Action";
import { useNavigate } from "react-router-dom";

const RestaurantCards = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authReducer } = useSelector((store) => store);
  const jwtToken = localStorage.getItem("jwtToken");

  const handleAddToFavorites = (item) => {
    dispatch(addToFavoritesAction(item.id));
  };

  const handleNavigateToRestaurantDetails = () => {
    if (item.open) {
      navigate(
        "/restaurant/" + item.address.city + "/" + item.name + "/" + item.id
      );
    }
  };

  return (
    <Card>
      <div className="relative">
        <img
          onClick={handleNavigateToRestaurantDetails}
          src={item.images[0]}
          className={`w-full h-[10rem] object-cover ${
            item.open ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          alt=""
        />
        <Chip
          className="absolute top-2 left-2"
          size="small"
          color={item.open ? "success" : "error"}
          label={item.open ? "Open" : "Closed"}
        />
      </div>
      <div className="px-4 py-5 flex justify-between">
        <div className="">
          <h1
            className={`mb-2 text-lg font-bold ${
              item.open ? "cursor-pointer" : "cursor-not-allowed"
            }`}
            onClick={handleNavigateToRestaurantDetails}
          >
            {item.name}
          </h1>
          <p className="text-sm text-gray-400">{item.description}</p>
        </div>
        <IconButton
          className="inline-block"
          onClick={() => handleAddToFavorites(item)}
        >
          {isPresentInFavorites(authReducer.favorites, item) ? (
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

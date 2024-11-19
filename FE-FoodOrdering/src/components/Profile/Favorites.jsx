import React from "react";
import RestaurantCards from "../Restaurant/RestaurantCards";
import { useDispatch, useSelector } from "react-redux";

const Favorites = () => {
  const { authReducer } = useSelector((store) => store);

  return (
    <div className="w-full h-full flex flex-col items-center mt-16">
      <h1 className="text-xl font-bold mb-5">My Favorite Restaurants</h1>
      <div className="grid grid-cols-3 gap-3 mx-20">
        {authReducer.favorites.map((item, index) => {
          return <RestaurantCards key={index} item={item} />;
        })}
      </div>
      {authReducer.favorites.length === 0 && (
        <div className="text-lg">Your favorite restaurants are empty!</div>
      )}
    </div>
  );
};

export default Favorites;

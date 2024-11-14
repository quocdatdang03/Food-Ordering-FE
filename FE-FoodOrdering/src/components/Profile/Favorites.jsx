import React from "react";
import RestaurantCards from "../Restaurant/RestaurantCards";

const Favorites = () => {
  return (
    <div className="w-full h-full flex flex-col items-center mt-16">
      <h1 className="text-xl font-bold mb-5">My Favorite Restaurants</h1>
      <div className="grid grid-cols-3 gap-3 mx-20">
        {[1, 1, 1, 1, 1].map((item, index) => {
          return <RestaurantCards />;
        })}
      </div>
    </div>
  );
};

export default Favorites;

import {
  Breadcrumbs,
  Card,
  Divider,
  FormControl,
  FormControlLabel,
  Link,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MenuCards from "./MenuCard/MenuCards";

const foodTypes = [
  { label: "All", value: "all" },
  { label: "Vegetarian only", value: "vegetarian" },
  { label: "Non-Vegetarian", value: "non_vegetarian" },
  { label: "Seasonal", value: "seasonal" },
];

const foodCategories = [
  "All",
  "Pizza",
  "Beef steak",
  "Burger",
  "Chicken",
  "Pork",
];

const menuCards = [1, 1, 1, 1, 1, 1];

const RestaurantDetail = () => {
  const [foodType, setFoodtype] = useState("all");
  const [foodCategory, setFoodCategory] = useState("All");

  const handleChangeFoodType = (e) => {
    console.log(e.target.value + " - " + e.target.name);
    setFoodtype(e.target.value);
  };

  const handleChangeFoodCategory = (e) => {
    setFoodCategory(e.target.value);
  };

  return (
    <div className="px-5 lg:px-20 mt-9">
      <Breadcrumbs>
        <Link underline="hover" color="white" href="/">
          Home
        </Link>
        <Link underline="hover" color="white" href="/">
          Indian
        </Link>
        <Typography className="text-gray-400">Food</Typography>
      </Breadcrumbs>

      {/* Restaurant images */}
      <div className="grid grid-cols-2 gap-3 my-5">
        <div className="w-full h-[40vh] col-span-2">
          <img
            className="w-full h-full object-cover object-center"
            src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1200"
          />
        </div>
        <div className="w-full h-[40vh]">
          <img
            className="w-full h-full object-cover object-center"
            src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1200"
          />
        </div>
        <div className="w-full h-[40vh]">
          <img
            className="w-full h-full object-cover object-center"
            src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1200"
          />
        </div>
      </div>

      {/* Restaurant Information */}
      <div className="border-b pb-5 border-gray-500">
        <h1 className="text-4xl font-bold">Indian Fast Food</h1>
        <p className="mt-2 text-sm text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. oluta nihil
          repellat aliquid quia rerum molestias inventore mollitia optio dicta
          sit pariatur unde nulla explicabo suscipit quae eveniet, illo nam?
          Exercitationem.
        </p>
        <p className="flex items-center text-gray-400 py-3">
          <LocationOnIcon />
          <span className="pl-3">Mumbai captial</span>
        </p>
        <p className="flex items-center">
          <CalendarTodayIcon className="text-gray-400" />
          <span className="pl-3 text-yellow-500">
            Mon-Sun: 9.00AM - 9.00PM (Today)
          </span>
        </p>
      </div>

      {/* Restaurant Foods Information */}
      <div className="mt-8 grid grid-cols-12 gap-x-8 relative">
        <div className="col-span-3 lg:sticky top-[28px]">
          <Card className="shadow-2xl shadow-white p-5 border-b border-gray-500">
            <h1 className="text-2xl mb-8">Food Type</h1>
            <FormControl>
              <RadioGroup
                name="food_type"
                value={foodType}
                onChange={handleChangeFoodType}
              >
                {foodTypes.map((item, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      value={item.value}
                      control={<Radio />}
                      label={item.label}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </Card>
          <Card className="shadow-2xl shadow-white p-5">
            <h1 className="text-2xl mb-8">Categories</h1>
            <FormControl>
              <RadioGroup
                name="food_category"
                value={foodCategory}
                onChange={handleChangeFoodCategory}
              >
                {foodCategories.map((item, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      value={item}
                      control={<Radio />}
                      label={item}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </Card>
        </div>
        <div className="col-span-9 flex flex-col gap-y-8">
          {menuCards.map((item) => {
            return <MenuCards />;
          })}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;

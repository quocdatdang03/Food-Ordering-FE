import {
  Breadcrumbs,
  Card,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  Link,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MenuCards from "./MenuCard/MenuCards";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantByIdAction,
  getRestaurantCategoriesAction,
} from "../../Redux/Restaurant/Action";
import { getMenuItemsByRestaurantIdAction } from "../../Redux/Menu/Action";
import Loading from "../Loading/Loading";

const foodTypes = [
  { label: "All", value: "" },
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

const RestaurantDetail = () => {
  const [foodType, setFoodtype] = useState("");
  const [foodCategory, setFoodCategory] = useState("all");
  const [isDelayedLoading, setIsDelayedLoading] = useState(true);

  const handleChangeFoodType = (e) => {
    console.log(e.target.value + " - " + e.target.name);
    setFoodtype(e.target.value);
  };

  const handleChangeFoodCategory = (e) => {
    console.log("CURR FOOD CATEGORY: " + e.target.value);
    setFoodCategory(e.target.value);
  };

  const { city, restaurantName, id } = useParams();
  const dispatch = useDispatch();
  const jwtToken = localStorage.getItem("jwtToken");
  const { restaurantReducer, menuItemReducer } = useSelector((store) => store);
  const restaurant = restaurantReducer.restaurant;

  useEffect(() => {
    // get restaurant details by id
    dispatch(getRestaurantByIdAction(id));

    // get categories of restaurant
    dispatch(getRestaurantCategoriesAction(id));

    // get all foods of restaurant (this is also using for filtering foods)
    const requestFoodData = {
      restaurantId: id,
      isVegetarian: false,
      isNonVegetarian: false,
      isSeasonal: false,
      foodCategoy: "",
    };
    dispatch(getMenuItemsByRestaurantIdAction(requestFoodData));
  }, []);

  // Filter foods by categories and Food Type
  useEffect(() => {
    console.log("FOOD CATEGORY: " + foodCategory);
    const requestFoodData = {
      restaurantId: id,
      isVegetarian: foodType === "vegetarian",
      isNonVegetarian: foodType === "non_vegetarian",
      isSeasonal: foodType === "seasonal",
      foodCategory: foodCategory,
    };

    console.log(requestFoodData);

    dispatch(getMenuItemsByRestaurantIdAction(requestFoodData));
  }, [foodCategory, foodType]);

  useEffect(() => {
    if (menuItemReducer.isLoading) {
      setIsDelayedLoading(true);
    } else {
      const timer = setTimeout(() => {
        setIsDelayedLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [menuItemReducer.isLoading]);

  const isRestaurantLoading = restaurantReducer.isLoading;
  const isMenuItemLoading = menuItemReducer.isLoading;
  if (isRestaurantLoading) {
    return <Loading />;
  }

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
            src={restaurant?.images?.[0]}
          />
        </div>
        <div className="w-full h-[40vh]">
          <img
            className="w-full h-full object-cover object-center"
            src={restaurant?.images?.[1]}
          />
        </div>
        <div className="w-full h-[40vh]">
          <img
            className="w-full h-full object-cover object-center"
            src={restaurant?.images?.[2]}
          />
        </div>
      </div>

      {/* Restaurant Information */}
      <div className="border-b pb-5 border-gray-500">
        <h1 className="text-4xl font-bold">{restaurant?.name}</h1>
        <p className="mt-2 text-sm text-gray-400">{restaurant?.description}</p>
        <p className="flex items-center text-gray-400 py-3">
          <LocationOnIcon />
          <span className="pl-3">Mumbai captial</span>
        </p>
        <p className="flex items-center">
          <CalendarTodayIcon className="text-gray-400" />
          <span className="pl-3 text-yellow-500">
            {restaurant?.openingHours}
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
                <FormControlLabel
                  value={"all"}
                  control={<Radio />}
                  label={"All"}
                />
                {restaurantReducer?.categories.map((item, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      value={item.name}
                      control={<Radio />}
                      label={item.name}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </Card>
        </div>
        <div className="col-span-9 flex flex-col gap-y-8">
          {isDelayedLoading || isMenuItemLoading ? (
            <div className="w-full h-full flex justify-center items-center">
              <CircularProgress />
            </div>
          ) : menuItemReducer?.menuItems.length > 0 ? (
            menuItemReducer?.menuItems.map((item) => {
              return <MenuCards key={item.id} item={item} />;
            })
          ) : (
            <h1 className="text-2xl text-gray-400 text-center">
              No food found
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;

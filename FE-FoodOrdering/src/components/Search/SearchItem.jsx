import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCartAction } from "../../Redux/Cart/Action";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useNavigate } from "react-router-dom";
import { getRestaurantByIdAction } from "../../Redux/Restaurant/Action";

const SearchItem = ({ item }) => {
  const navigate = useNavigate();
  const { restaurantReducer } = useSelector((store) => store);

  const categorizeIngredients = () => {
    return item.ingredients.reduce((acc, item) => {
      const { category } = item;

      if (!acc[category.name]) {
        acc[category.name] = [];
      }

      acc[category.name].push(item);

      return acc;
    }, {});
  };

  const dispatch = useDispatch();
  const jwtToken = localStorage.getItem("jwtToken");
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleAddTocart = () => {
    const requestData = {
      foodId: item.id,
      quantity: 1,
      ingredients: selectedIngredients,
    };

    dispatch(addItemToCartAction(jwtToken, requestData));
  };

  const handleSelectIngredient = (ingredientName) => {
    if (selectedIngredients.includes(ingredientName)) {
      setSelectedIngredients(
        selectedIngredients.filter((item) => item !== ingredientName)
      );
    } else {
      setSelectedIngredients([...selectedIngredients, ingredientName]);
    }
  };

  const [restaurant, setRestaurant] = useState(null);

  const handleNavigateToRestaurant = () => {
    navigate(
      `/restaurant/${restaurant.address?.city}/${restaurant?.name}/${restaurant?.id}`
    );
  };

  useEffect(() => {
    const getRestaurantById = async () => {
      try {
        const restaurantData = await dispatch(
          getRestaurantByIdAction(jwtToken, item.restaurantId)
        );
        setRestaurant(restaurantData); // Lưu vào state cục bộ
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      }
    };

    getRestaurantById();
  }, [item.restaurantId]);

  return (
    <div className="w-full">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
        >
          <div>
            <div className="flex gap-x-5">
              <img
                className="w-[7rem] h-[7rem] object-cover rounded-sm"
                src={item?.images?.[0]}
                alt={item?.images?.[0]}
              />
              <div className="space-y-5">
                <h1 className="text-xl font-bold">{item.name}</h1>
                <p>
                  $<span>{item.price}</span>
                </p>
                <p className="text-gray-500">{item.description}</p>
              </div>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <form>
            <div className="flex flex-wrap gap-5 mb-5">
              {Object.keys(categorizeIngredients()).map((key, index) => {
                return (
                  <div key={index}>
                    <h2>{key}</h2>
                    <FormGroup>
                      {categorizeIngredients()[key].map((item, index) => {
                        return (
                          <FormControlLabel
                            key={item.id}
                            control={<Checkbox />}
                            label={item.name}
                            onChange={() => handleSelectIngredient(item.name)}
                          />
                        );
                      })}
                    </FormGroup>
                  </div>
                );
              })}
            </div>
            <div className="space-x-3">
              <Button variant="contained" onClick={handleAddTocart}>
                Add to cart
              </Button>
              <Button variant="text" onClick={handleNavigateToRestaurant}>
                <span className="pr-1 underline normal-case text-lg">
                  <ArrowRightAltIcon />
                  Go To {restaurant?.name}
                </span>
              </Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default SearchItem;

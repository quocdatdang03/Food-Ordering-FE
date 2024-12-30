import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCartAction } from "../../../Redux/Cart/Action";

const MenuCards = ({ item }) => {
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
  const { authReducer } = useSelector((store) => store);
  const isRoleCustomer = authReducer.user?.role === "ROLE_CUSTOMER";

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

  console.log(item);

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
            {isRoleCustomer && (
              <>
                {item?.available ? (
                  <Button variant="contained" onClick={handleAddTocart}>
                    Add to cart
                  </Button>
                ) : (
                  <Button disabled color="error">
                    Out of Stock
                  </Button>
                )}
              </>
            )}
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MenuCards;

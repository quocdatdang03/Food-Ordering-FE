import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const fakeDatas = [
  {
    category: "Nut & Seeds",
    ingredients: ["Peanuts"],
  },
  {
    category: "Proteins",
    ingredients: ["Bacon strips", "Ground Beef"],
  },
  {
    category: "Bread",
    ingredients: ["Bacon strips", "Ground Beef"],
  },
  {
    category: "Bread",
    ingredients: ["Bacon strips", "Ground Beef"],
  },
];

const MenuCards = ({ item }) => {
  console.log(item);

  const categorizeIngredients = () => {
    return item.ingredients.reduce((acc, item) => {
      const { category } = item;
      console.log(category.name);

      if (!acc[category.name]) {
        acc[category.name] = [];
      }

      acc[category.name].push(item);

      return acc;
    }, {});
  };

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
                          />
                        );
                      })}
                    </FormGroup>
                  </div>
                );
              })}
            </div>
            <Button variant="contained">Add to cart</Button>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MenuCards;

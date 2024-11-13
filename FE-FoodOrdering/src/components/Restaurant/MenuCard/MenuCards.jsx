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

const MenuCards = () => {
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
                src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
              <div className="space-y-5">
                <h1 className="text-xl font-bold">Burger</h1>
                <p>
                  $<span>199</span>
                </p>
                <p className="text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Temporibus blanditiis esse deleniti assumenda fugit ratione
                  facilis non voluptatem recusandae et optio cumque quisquam
                  nihil eius nobis earum sed, veniam itaque.
                </p>
              </div>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <form>
            <div className="flex flex-wrap gap-5 mb-5">
              {fakeDatas.map((item, index) => {
                return (
                  <div key={index}>
                    <h2>{item.category}</h2>
                    <FormGroup>
                      {item.ingredients.map((ingredient, index) => {
                        return (
                          <FormControlLabel
                            key={index}
                            control={<Checkbox />}
                            label={ingredient}
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

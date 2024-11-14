import { Card } from "@mui/material";
import React from "react";

const Events = () => {
  return (
    <div className="mt-16 mx-5">
      <div className="grid grid-cols-3 gap-5">
        {[1, 1, 1, 1, 1].map((item, index) => {
          return (
            <Card key={index}>
              <img
                className=" h-[345px] object-cover"
                src="https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=600"
              />
              <div className="p-5">
                <h1 className="text-2xl">Vietnamese Food</h1>
                <p className="text-sm mb-5">50% off on your first order</p>
                <div className="space-y-2 text-sm">
                  <p>Viet Name</p>
                  <p className="text-blue-500">November 20 2024 2.00PM</p>
                  <p className="text-red-500">November 20 2024 4.00PM</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Events;

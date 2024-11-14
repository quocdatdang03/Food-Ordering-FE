import { Button, Card } from "@mui/material";
import React from "react";

const orderItems = [
  {
    image:
      "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Burger king",
    price: 129,
    orderStatus: "pending",
  },
  {
    image:
      "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Burger king",
    price: 129,
    orderStatus: "delivered",
  },
  {
    image:
      "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Burger king",
    price: 129,
    orderStatus: "completed",
  },
];

const Orders = () => {
  return (
    <div className="w-full h-full flex flex-col items-center mt-16">
      <h1 className="text-xl font-bold mb-5">My Orders</h1>
      <div className="w-full flex flex-col item-center gap-y-5">
        {orderItems.map((item, index) => {
          return (
            <div key={index} className="mx-20 lg:mx-60">
              <Card sx={{ paddingY: 1, paddingX: 3 }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-3">
                    <img
                      className="w-[5rem] h-[5rem] object-cover"
                      src={item.image}
                      alt={item.name}
                    />
                    <div>
                      <h2>{item.name}</h2>
                      <p className="text-gray-400 mt-1">
                        $<span>{item.price}</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <Button variant="contained">{item.orderStatus}</Button>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;

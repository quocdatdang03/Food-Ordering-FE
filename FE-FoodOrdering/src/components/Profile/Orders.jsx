import { Button, Card } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerOrdersAction } from "../../Redux/order/Action";

const Orders = () => {
  const dispatch = useDispatch();
  const { orderReducer } = useSelector((store) => store);
  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    // get all orders:
    dispatch(getCustomerOrdersAction(jwtToken));
  }, []);

  console.log(orderReducer.orders);

  return (
    <div className="w-full h-full flex flex-col items-center mt-16">
      <h1 className="text-xl font-bold mb-5">My Orders</h1>
      <div className="w-full flex flex-col item-center gap-y-5">
        {orderReducer.orders.map((order) =>
          order.orderItems.map((orderItem, index) => {
            return (
              <div key={index} className="mx-20 lg:mx-60">
                <Card sx={{ paddingY: 1, paddingX: 3 }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-3">
                      <img
                        className="w-[5rem] h-[5rem] object-cover"
                        src={orderItem.food?.images?.[0]}
                        alt={orderItem.food?.name}
                      />
                      <div>
                        <h2>{orderItem.food?.name}</h2>
                        <p className="text-gray-400 mt-1">
                          $<span>{orderItem?.totalPrice}</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <Button variant="contained">{order?.orderStatus}</Button>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Orders;

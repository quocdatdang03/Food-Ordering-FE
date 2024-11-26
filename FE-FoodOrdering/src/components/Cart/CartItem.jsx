import React, { useEffect } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Chip, IconButton } from "@mui/material";
import { pink } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import {
  removeItemFromCartAction,
  updateCartItemAction,
} from "../../Redux/Cart/Action";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    console.log(item);
  }, []);

  const handleUpdateQuantity = (value) => {
    // check if quantity <= 0 -> remove item from cart
    if (item.quantity <= 1 && value === -1) {
      dispatch(removeItemFromCartAction(jwtToken, item.id));
    }

    const requestData = {
      id: item.id,
      quantity: value,
    };

    dispatch(updateCartItemAction(jwtToken, requestData));
  };

  return (
    <div>
      <div className="flex gap-x-3 bg-slate-500">
        <img
          className="w-[5rem] h-[5rem] object-cover"
          src={item.food?.images?.[0]}
        />
        <div className="w-full flex items-center justify-between pr-8">
          <div>
            <p>{item.food?.name}</p>
            <div className="flex gap-2 items-center">
              <IconButton onClick={() => handleUpdateQuantity(-1)}>
                <RemoveCircleOutlineIcon sx={{ color: pink[400] }} />
              </IconButton>
              <span>{item?.quantity}</span>
              <IconButton onClick={() => handleUpdateQuantity(1)}>
                <AddCircleOutlineIcon sx={{ color: pink[400] }} />
              </IconButton>
            </div>
          </div>
          <div>
            <p>
              $<span>{item?.totalPrice}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {item.ingredients?.map((item, index) => {
          return <Chip key={index} label={item} />;
        })}
      </div>
    </div>
  );
};

export default CartItem;

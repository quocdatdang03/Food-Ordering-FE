export const isPresentInFavorites = (favorites, restaurant) => {
  for (let item of favorites) {
    if (item.id === restaurant.id) return true;
  }
  return false;
};

export const isCartItemPresentInCart = (cartItem, cartItems) => {
  for (let item of cartItems) {
    if (item.id === cartItem.id) return true;
  }

  return false;
};

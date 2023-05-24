import React from "react";

function BasketReducer(state, action) {
  console.log("State inside a reducer: ", state);
  if (state == undefined) return [];
  if (action.type === "SET_BASKET") {
    return [...state, action.payload];
  } else if (action.type === "ADD_REMOVE_PRODUCT") {
    const product = action.payload;
    const isInBasket = state.some((item) => item.id === product.id);

    if (isInBasket) {
      const removedBasket = state.filter((item) => item.id !== product.id);
      return removedBasket;
    } else {
      return [...state, product];
    }
  } else {
    return state;
  }
}

export default BasketReducer;

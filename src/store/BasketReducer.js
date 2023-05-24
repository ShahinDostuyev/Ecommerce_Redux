import React from "react";
const initialState = JSON.parse(localStorage.getItem("Basket"));
function BasketReducer(state = initialState ?? [], action) {
  console.log("State inside a reducer: ", state);
  if (state == undefined) return [];
  if (action.type === "ADD_REMOVE_PRODUCT") {
    const product = action.payload;
    const isInBasket = state.some((item) => item.id === product.id);

    if (isInBasket) {
      const removedBasket = state.filter((item) => item.id !== product.id);
      if(removedBasket.length>0){
        localStorage.setItem("Basket",JSON.stringify(removedBasket))
      }else{
        localStorage.removeItem("Basket")
      }
      return removedBasket;
    } else {
        localStorage.setItem("Basket",JSON.stringify([...state, product]))
      return [...state, product];
    }
  } else {
    return state;
  }
}

export default BasketReducer;

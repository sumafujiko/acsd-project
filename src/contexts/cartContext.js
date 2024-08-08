import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext();

//we have a cart context provider that takes children as a prop.  Children represents anything between
//the tags.  This allows us to keep our provider logic in its own component
export const CartContextProvider = ({ children }) => {
  const [tripCart, setTripCart] = useState({});
  //pass our state and use state down to make them available to the rest of the tree
  return (
    <CartContext.Provider value={{ tripCart, setTripCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);

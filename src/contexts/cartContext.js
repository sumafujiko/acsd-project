import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [tripCart, setTripCart] = useState({});
  return (
    <CartContext.Provider value={{ tripCart, setTripCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);

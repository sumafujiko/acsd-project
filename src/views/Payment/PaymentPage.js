import { useContext } from "react";
import { CartContext } from "../../contexts/cartContext";

const PaymentPage = () => {
  const { tripCart } = useContext(CartContext);

  return <div>{JSON.stringify(tripCart)}</div>;
};

export default PaymentPage;

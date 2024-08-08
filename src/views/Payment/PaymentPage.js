import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../contexts/cartContext";

import "../../sass/payment.scss";
import { handleYupValidation } from "../../utils";
import cardValidation from "./paymentValidation";

const PaymentPage = () => {
  const { tripCart } = useContext(CartContext);
  const [cardDetails, setCardDetails] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  //convert from strings to numbers
  const flightPrice = parseFloat(tripCart.flight?.price);
  const hotelPrice = parseFloat(tripCart.hotel?.price);
  const tranferPrice = parseFloat(tripCart.transfer?.price);
  const totalPrice = parseFloat(flightPrice + tranferPrice) + hotelPrice;

  const handleChange = (e) => {
    e.preventDefault();
    const { value, type, maxLength, name } = e.target;
    //this is a workaround for number inputs not being able to have a max digit length.
    //convert the value to a string and check the length against maxLength prop
    if (type === "number" && value.toString().length > maxLength) {
      return;
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //this will validate and set errors dynamically into the errors object
    const validateResult = await handleYupValidation(
      cardDetails,
      cardValidation,
      setErrors
    );
    if (!validateResult) return;
    //would have created some manner of toast alert if there was more time
    alert("Succcessfully Purchased");
    navigate("/confirmation");
  };

  return (
    <section className="payment">
      <div className="payment-details__container">
        {/* Items Details */}
        <div className="payment-details__itemiser-container">
          <h2>Items Breakdown</h2>
          <p>Flight: €{flightPrice.toFixed(2)}</p>
          <p>Hotel: €{hotelPrice.toFixed(2)}</p>
          <p>Transfer: €{tranferPrice.toFixed(2)}</p>
          <span className="payment-details__itemiser-container__total">
            Total: €{totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
      {/* Payment form */}
      <div className="payment-card__container">
        <form className="payment-card__form" onSubmit={handleSubmit}>
          <div className="payment-card__form-control">
            <label htmlFor="fullName">Full Name</label>
            <input
              placeholder="Card Holder's Full Name"
              id="fullName"
              name="fullName"
              type="text"
              maxLength={100}
              value={cardDetails.fullName ?? ""}
              onChange={handleChange}
            />
            <p className="payment__error">{errors.fullName ?? ""}</p>
          </div>
          <div className="payment-card__form-control">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              placeholder="12 Digit Number"
              id="cardNumber"
              name="cardNumber"
              type="number"
              maxLength={12}
              onChange={handleChange}
              value={cardDetails.cardNumber ?? ""}
            />
            <p className="payment__error">{errors.cardNumber ?? ""}</p>
          </div>
          <div className="payment-card__small-inputs">
            <div className="payment-card__form-control payment-card__small-inputs__div ">
              <label aria-label="expiry">Exp. Date</label>
              <div className="payment-card__expiry">
                <input
                  placeholder="MM"
                  aria-describedby="expiry"
                  name="expMonth"
                  id="expMonth"
                  type="number"
                  maxLength={2}
                  onChange={handleChange}
                  value={cardDetails.expMonth ?? ""}
                />
                <input
                  placeholder="YY"
                  aria-describedby="expiry"
                  name="expYear"
                  id="expYear"
                  type="number"
                  maxLength={2}
                  onChange={handleChange}
                  value={cardDetails.expYear ?? ""}
                />
              </div>
            </div>
            <div className="payment-card__form-control payment-card__small-inputs__div">
              <label htmlFor="cvc">CVC</label>
              <input
                id="cvc"
                name="cvc"
                type="number"
                onChange={handleChange}
                value={cardDetails.cvc ?? ""}
                maxLength={3}
              />
            </div>
          </div>
          <p className="payment__error">{errors.expMonth ?? ""}</p>
          <p className="payment__error">{errors.expYear ?? ""}</p>
          <p className="payment__error">{errors.cvc ?? ""}</p>

          <button type="submit">Pay Now</button>
        </form>
      </div>
    </section>
  );
};

export default PaymentPage;

import React from "react";
import PropTypes from "prop-types";
import "../../sass/PriceBreakdown.scss";

/**
 * PriceBreakdown Component
 *
 * This component displays a detailed breakdown of prices for flight, hotel, and transfer bookings.
 * It calculates the total price and shows individual prices for each service.
 *
 * @param {Object} props
 * @param {Object} props.flightData - Contains flight booking details including price
 * @param {Object} props.hotelData - Contains hotel booking details including price
 * @param {Object} props.transferData - Contains transfer booking details including price
 */
const PriceBreakdown = ({ flightData, hotelData, transferData }) => {
  // Extract prices, using default values to handle missing data
  const flightPrice = flightData?.price || 0;
  const hotelPrice = hotelData?.price || 0;
  const transferPrice = transferData?.price || 0;

  // Calculate total price
  const totalPrice =
    Number(flightPrice) + Number(hotelPrice) + Number(transferPrice);

  /**
   * Formats a number as a price string
   * @param {number} price - The price to format
   * @returns {string} Formatted price string
   */
  const formatPrice = (price) => {
    if (typeof price === "number") {
      return `$${price.toFixed(2)}`;
    } else if (typeof price === "string") {
      return `${parseFloat(price).toFixed(2)}`;
    } else {
      return "0";
    }
  };

  /**
   * Renders a price item if the data is available
   * @param {string} label - Label for the price item
   * @param {number} price - Price value
   * @param {boolean} [condition=true] - Condition to render the item
   * @returns {JSX.Element|null}
   */
  const renderPriceItem = (label, price, condition = true) => {
    return condition ? (
      <li className="price-breakdown__item">
        <span className="price-breakdown__label">{label}</span>
        <span className="price-breakdown__price">{formatPrice(price)}</span>
      </li>
    ) : null;
  };

  return (
    <div className="price-breakdown">
      <h2 className="price-breakdown__title">Price Breakdown</h2>
      <ul className="price-breakdown__list">
        {renderPriceItem("Flight", flightPrice)}
        {renderPriceItem("Hotel", hotelPrice, hotelData)}
        {renderPriceItem("Transfer", transferPrice, transferData)}
      </ul>
      <div className="price-breakdown__total">
        <span className="price-breakdown__total-label">Total</span>
        <span className="price-breakdown__total-price">
          {formatPrice(totalPrice)}
          {console.log(totalPrice)}
        </span>
      </div>
    </div>
  );
};

// PropTypes for type checking
PriceBreakdown.propTypes = {
  flightData: PropTypes.shape({
    price: PropTypes.number,
  }),
  hotelData: PropTypes.shape({
    price: PropTypes.number,
  }),
  transferData: PropTypes.shape({
    price: PropTypes.number,
  }),
};

export default PriceBreakdown;

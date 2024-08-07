import React from "react";
import PropTypes from "prop-types";

const HotelSummary = ({ hotel, stayDuration }) => {
  if (!hotel) return null;

  return (
    <div className="hotel-summary">
      <h2>Hotel</h2>
      <p>Name: {hotel.name}</p>
      <p>
        Price: {hotel.price} {hotel.currency}
      </p>
      <p>
        Stay Duration: {stayDuration} night{stayDuration !== 1 ? "s" : ""}
      </p>
    </div>
  );
};

HotelSummary.propTypes = {
  hotel: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
  }).isRequired,
  stayDuration: PropTypes.number.isRequired,
};

export default HotelSummary;

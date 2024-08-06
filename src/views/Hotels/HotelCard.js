import React from "react";
<<<<<<< HEAD
import { toTitleCase } from "../../utils/stringUtils";
=======
>>>>>>> origin/hotels

const HotelCard = ({ hotel, onSelect }) => {
  if (!hotel || !hotel.hotel) {
    return null;
  }

<<<<<<< HEAD
  const { name } = hotel.hotel;
  const { total, currency, perNight } = hotel.offers[0]?.price || {};

  return (
    <div className="hotel-card" onClick={() => onSelect(hotel)}>
      <h2 className="hotel-card__name">
        {name ? toTitleCase(name) : "Hotel Name Not Available"}
      </h2>
      <p className="hotel-card__price">
        Price per night:{" "}
        {perNight && currency
          ? `${perNight} ${currency}`
          : "Price not available"}
      </p>
=======
  const { name, address } = hotel.hotel;
  const { total, currency } = hotel.offers[0].price;
  // These are not getting the data from the api correctly, will get it working soon
  return (
    <div className="hotel-card" onClick={onSelect}>
      <h2 className="hotel-card__name">{name}</h2>
      <p className="hotel-card__price">
        Price:{" "}
        {total !== "N/A" ? `${total} ${currency}` : "Price not available"}
      </p>
      {address && (
        <p className="hotel-card__address">
          Address: {address.lines?.join(", ")}, {address.cityName}
        </p>
      )}
>>>>>>> origin/hotels
    </div>
  );
};

export default HotelCard;

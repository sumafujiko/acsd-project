import React from "react";

const HotelCard = ({ hotel, onSelect }) => {
  if (!hotel || !hotel.hotel) {
    return null;
  }

  const { name } = hotel.hotel;
  const { total, currency, perNight } = hotel.offers[0]?.price || {};

  return (
    <div className="hotel-card" onClick={() => onSelect(hotel)}>
      <h2 className="hotel-card__name">{name || "Hotel Name Not Available"}</h2>
      <p className="hotel-card__price">
        Price per night:{" "}
        {perNight && currency
          ? `${perNight} ${currency}`
          : "Price not available"}
      </p>
    </div>
  );
};

export default HotelCard;

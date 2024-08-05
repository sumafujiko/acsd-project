import React from "react";

const HotelCard = ({ hotel, onSelect }) => {
  if (!hotel || !hotel.hotel) {
    return null;
  }

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
    </div>
  );
};

export default HotelCard;

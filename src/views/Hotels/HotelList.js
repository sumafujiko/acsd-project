import React from "react";
import HotelCard from "./HotelCard";

const HotelList = ({ hotels, onSelect }) => {
  console.log("Hotels in HotelList:", hotels);

  if (!hotels || hotels.length === 0) {
    return (
      <div className="hotel-list__empty">
        No hotels found. Please try a different search.
      </div>
    );
  }

  return (
    <div className="hotel-list">
      {hotels.map((hotel) => (
        <HotelCard
          key={hotel.hotel.hotelId}
          hotel={hotel}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default HotelList;

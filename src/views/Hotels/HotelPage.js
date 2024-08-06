import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../contexts/cartContext";
import useHotelSearch from "./useHotelSearch";
import FlightSummary from "./FlightSummary";
import HotelList from "./HotelList";
import HotelDetails from "./HotelDetails";
import "../../sass/hotelpage.scss";

const HotelPage = () => {
  const { tripCart, setTripCart } = useCartContext();
  const navigate = useNavigate();
  // Custom hook to fetch hotel data
  const { hotels, loading, error } = useHotelSearch(tripCart.flight);
  const [selectedHotel, setSelectedHotel] = useState(null);

  // Handler for selecting a hotel
  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
  };

  // Handler for returning to the hotel list
  const handleBackToList = () => {
    setSelectedHotel(null);
  };

  // Handler for booking a hotel and proceeding to transport page
  const handleBookHotel = (hotel) => {
    setTripCart((prev) => ({ ...prev, hotel: hotel }));
    navigate("/transport");
  };

  return (
    <div className="hotel-page">
      <div className="hotel-page__container">
        <h1 className="hotel-page__title">Select a Hotel</h1>
        <FlightSummary flight={tripCart.flight} />
        {/* 
        <h2 className="hotel-page__subtitle">
          Here are the 6 best hotels we found
        </h2>
        */}
        {/*Update this to show the number of hotels found, hard coded but should be ok*/}
        {/*Dont like how it currently looks when you click in, may delete*/}
        {loading ? (
          <div className="hotel-page__loading">Loading hotels...</div>
        ) : error ? (
          <div className="hotel-page__error">{error}</div>
        ) : selectedHotel ? (
          <HotelDetails
            hotel={selectedHotel}
            onBack={handleBackToList}
            onBook={handleBookHotel}
          />
        ) : (
          <HotelList hotels={hotels} onSelect={handleHotelSelect} />
        )}
      </div>
    </div>
  );
};

export default HotelPage;

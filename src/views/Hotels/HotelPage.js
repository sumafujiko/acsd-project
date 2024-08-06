import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../contexts/cartContext";
import useHotelSearch from "./useHotelSearch";
import TripSummary from "../../contexts/TripSummary";
import HotelList from "./HotelList";
import HotelDetails from "./HotelDetails";
import "../../sass/hotelpage.scss";

const HotelPage = () => {
  const { tripCart, setTripCart } = useCartContext();
  const navigate = useNavigate();
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

        <TripSummary tripCart={tripCart} />

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

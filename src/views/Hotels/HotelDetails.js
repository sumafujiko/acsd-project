import React, { useEffect, useRef } from "react";
import useHotelSearch from "./useHotelSearch";
import { useCartContext } from "../../contexts/cartContext";
import { useNavigate } from "react-router-dom";

const HotelDetails = ({ hotel, onBack }) => {
  const mapRef = useRef(null);
  const { tripCart, setTripCart } = useCartContext();
  const { stayDuration } = useHotelSearch(tripCart.flight);
  const navigate = useNavigate();

  useEffect(() => {
    if (hotel && hotel.hotel.latitude && hotel.hotel.longitude) {
      const loadGoogleMapsApi = () => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = initMap;
        document.head.appendChild(script);
      };

      if (!window.google) {
        loadGoogleMapsApi();
      } else {
        initMap();
      }
    }
  }, [hotel]);

  const initMap = () => {
    if (mapRef.current && hotel.hotel.latitude && hotel.hotel.longitude) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: {
          lat: parseFloat(hotel.hotel.latitude),
          lng: parseFloat(hotel.hotel.longitude),
        },
        zoom: 15,
      });

      new window.google.maps.Marker({
        position: {
          lat: parseFloat(hotel.hotel.latitude),
          lng: parseFloat(hotel.hotel.longitude),
        },
        map: map,
        title: hotel.hotel.name,
      });
    }
  };

  const handleBookHotel = () => {
    const bookingDetails = {
      flight: tripCart.flight,
      hotel: {
        name: hotel.hotel.name,
        price: hotel.offers[0].price.total,
        currency: hotel.offers[0].price.currency,
        address: hotel.hotel.address,
      },
      stayDuration: stayDuration,
    };

    setTripCart((prevCart) => ({
      ...prevCart,
      hotel: bookingDetails.hotel,
      stayDuration: bookingDetails.stayDuration,
    }));

    navigate("/transport", { state: { bookingDetails } }); // For transport page
  };

  if (!hotel || !hotel.hotel) {
    return <div>No hotel selected</div>;
  }

  const { name, address } = hotel.hotel;
  const { total, currency } = hotel.offers[0]?.price || {};

  return (
    <div className="hotel-details">
      <h2 className="hotel-details__name">{name}</h2>
      <p className="hotel-details__price">
        Total Price:{" "}
        {total !== "N/A"
          ? `${total} ${currency} for staying ${stayDuration} ${
              stayDuration === 1 ? "day" : "days"
            }.`
          : "Price not available"}
      </p>
      {/*Had a thing for adress here but I couldnt extract it from the API effectively*/}
      <div className="hotel-details__map" ref={mapRef}></div>
      <div className="hotel-details__actions">
        <button onClick={onBack} className="hotel-details__btn">
          Back to List
        </button>
        <button onClick={handleBookHotel} className="hotel-details__btn">
          Book this hotel
        </button>
      </div>
    </div>
  );
};

export default HotelDetails;

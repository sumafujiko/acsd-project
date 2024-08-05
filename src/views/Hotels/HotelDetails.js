import React, { useEffect, useRef } from "react";

const HotelDetails = ({ hotel, onBack, onBook }) => {
  const mapRef = useRef(null);

  // Effect to load and initialize Google Maps
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

  // Function to initialize the map
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

  if (!hotel || !hotel.hotel) {
    return <div>No hotel selected</div>;
  }

  const { name, address } = hotel.hotel;
  const { total, currency } = hotel.offers[0].price;
  // These are not getting the data from the api correctly, will get it working soon
  return (
    <div className="hotel-details">
      <h2 className="hotel-details__name">{name}</h2>
      <p className="hotel-details__price">
        Price:{" "}
        {total !== "N/A" ? `${total} ${currency}` : "Price not available"}
      </p>
      {address && (
        <p className="hotel-details__address">
          Address: {address.lines?.join(", ")}, {address.cityName}
        </p>
      )}
      <div className="hotel-details__map" ref={mapRef}></div>
      <div className="hotel-details__actions">
        <button onClick={onBack} className="hotel-details__back-btn">
          Back to List
        </button>
        <button
          onClick={() => onBook(hotel)}
          className="hotel-details__book-btn"
        >
          Book this hotel
        </button>
      </div>
    </div>
  );
};

export default HotelDetails;

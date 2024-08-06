import React from "react";
import PropTypes from "prop-types";
import "../sass/tripsummary.scss";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const FlightDetails = ({ flight }) => {
  if (!flight || !flight.outboundFlight || flight.outboundFlight.length === 0) {
    return <p>No flight details available</p>;
  }

  const { outboundFlight, returnFlight } = flight;
  const firstOutbound = outboundFlight[0];
  const lastOutbound = outboundFlight[outboundFlight.length - 1];
  const firstReturn =
    returnFlight && returnFlight.length > 0 ? returnFlight[0] : null;
  const lastReturn =
    returnFlight && returnFlight.length > 0
      ? returnFlight[returnFlight.length - 1]
      : null;

  const renderFlightSegment = (departure, arrival, label) => (
    <div className="flight-segment">
      <h4>{label}</h4>
      <div className="flight-segment__details">
        <div className="flight-segment__airport">
          <p>
            <strong>{departure.departureAirport}</strong>
          </p>
          <p>{formatTime(departure.departureAt)}</p>
          <p>{formatDate(departure.departureAt)}</p>
        </div>
        <div className="flight-segment__arrow">➔</div>
        <div className="flight-segment__airport">
          <p>
            <strong>{arrival.arrivalAirport}</strong>
          </p>
          <p>{formatTime(arrival.arrivalAt)}</p>
          <p>{formatDate(arrival.arrivalAt)}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="details-summary">
      {renderFlightSegment(firstOutbound, lastOutbound, "Outbound")}
      {firstReturn && renderFlightSegment(firstReturn, lastReturn, "Return")}
      <p>
        <strong>Total Price:</strong> {flight.price} EUR
      </p>
    </div>
  );
};

const HotelDetails = ({ hotel, stayDuration }) => {
  if (!hotel) {
    return <p>No hotel details available</p>;
  }

  const pricePerNight = parseFloat(hotel.price) / stayDuration;

  return (
    <div className="details-summary">
      <p className="details-summary__item">
        <strong>Name:</strong> {hotel.name}
      </p>
      <p className="details-summary__item">
        <strong>Price per night:</strong> {pricePerNight.toFixed(2)}{" "}
        {hotel.currency}
      </p>
      <p className="details-summary__item">
        <strong>Stay Duration:</strong> {stayDuration} night
        {stayDuration !== 1 ? "s" : ""}
      </p>
      <p className="details-summary__item">
        <strong>Total Price:</strong> {hotel.price} {hotel.currency}
      </p>
      <p className="details-summary__item details-summary__calculation">
        ({pricePerNight.toFixed(2)} x {stayDuration} nights = {hotel.price}{" "}
        {hotel.currency})
      </p>
    </div>
  );
};

const TransportDetails = ({ transport }) => {
  if (!transport) {
    return <p>No transport details available</p>;
  }

  // Implement transport details when they are done
  return (
    <div className="details-summary">
      <p>Transport details will be displayed here</p>
    </div>
  );
};

const TripSummary = ({ tripCart }) => {
  if (!tripCart) {
    return (
      <div className="trip-summary">
        <h2 className="trip-summary__title">Trip Details</h2>
        <p>No trip details available</p>
      </div>
    );
  }

  return (
    <div className="trip-summary">
      <h2 className="trip-summary__title">Trip Details</h2>
      <div className="trip-summary__content">
        {tripCart.flight && (
          <div className="trip-summary__section">
            <h3>Flight Details</h3>
            <FlightDetails flight={tripCart.flight} />
          </div>
        )}
        {tripCart.hotel && (
          <div className="trip-summary__section">
            <h3>Hotel Details</h3>
            <HotelDetails
              hotel={tripCart.hotel}
              stayDuration={tripCart.stayDuration}
            />
          </div>
        )}
        {tripCart.transport && (
          <div className="trip-summary__section">
            <h3>Transport Details</h3>
            <TransportDetails transport={tripCart.transport} />
          </div>
        )}
      </div>
    </div>
  );
};

TripSummary.propTypes = {
  tripCart: PropTypes.shape({
    flight: PropTypes.object,
    hotel: PropTypes.object,
    stayDuration: PropTypes.number,
    transport: PropTypes.object,
  }),
};

export default TripSummary;

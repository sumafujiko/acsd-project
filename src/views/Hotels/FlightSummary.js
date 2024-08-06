import React from "react";
<<<<<<< HEAD
import PropTypes from "prop-types";

const FlightSummary = ({ flight }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!flight || !flight.outboundFlight || flight.outboundFlight.length === 0) {
    return <div className="flight-summary">No flight selected</div>;
  }

  const { outboundFlight, returnFlight } = flight;
  const firstSegment = outboundFlight[0];
  const lastSegment = outboundFlight[outboundFlight.length - 1];

  const departureDate = formatDate(firstSegment.departureAt);
  const returnDate =
    returnFlight && returnFlight.length > 0
      ? formatDate(returnFlight[0].departureAt)
      : null;

  return (
    <div className="flight-summary">
      <h2>Outbound Flight</h2>
      <p>
        {firstSegment.departureAirport} to {lastSegment.arrivalAirport}
      </p>
      <p>
        Date: {departureDate}
        {returnDate ? ` - ${returnDate}` : " onwards"}
      </p>
=======

const FlightSummary = ({ flight }) => {
  if (!flight || !flight.outboundFlight || flight.outboundFlight.length === 0) {
    return null;
  }

  const outbound = flight.outboundFlight[0];
  const inbound = flight.inboundFlight && flight.inboundFlight[0];

  return (
    <div className="flight-summary">
      <div className="flight-summary__segment">
        <h3>Outbound Flight</h3>
        <p>
          {outbound.departureAirport} to {outbound.arrivalAirport}
        </p>
        <p>Date: {new Date(outbound.departureDate).toLocaleDateString()}</p>
      </div>
      {inbound && (
        <div className="flight-summary__segment">
          <h3>Return Flight</h3>
          <p>
            {inbound.departureAirport} to {inbound.arrivalAirport}
          </p>
          <p>Date: {new Date(inbound.departureDate).toLocaleDateString()}</p>
        </div>
      )}
>>>>>>> origin/hotels
    </div>
  );
};

<<<<<<< HEAD
FlightSummary.propTypes = {
  flight: PropTypes.shape({
    outboundFlight: PropTypes.arrayOf(
      PropTypes.shape({
        departureAirport: PropTypes.string,
        arrivalAirport: PropTypes.string,
        departureAt: PropTypes.string,
      })
    ),
    returnFlight: PropTypes.arrayOf(
      PropTypes.shape({
        departureAt: PropTypes.string,
      })
    ),
  }),
};

=======
>>>>>>> origin/hotels
export default FlightSummary;

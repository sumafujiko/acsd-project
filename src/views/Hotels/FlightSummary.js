import React from "react";
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
    </div>
  );
};

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

export default FlightSummary;

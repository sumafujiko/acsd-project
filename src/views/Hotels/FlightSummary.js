import React from "react";
import PropTypes from "prop-types";

const FlightSummary = ({ flight }) => {
  if (!flight || !flight.outboundFlight || flight.outboundFlight.length === 0) {
    return null;
  }

  const { outboundFlight, returnFlight } = flight;
  const firstSegment = outboundFlight[0];
  const lastSegment = outboundFlight[outboundFlight.length - 1];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flight-summary">
      <h2>Flight</h2>
      <div className="flight-summary__segments">
        <div className="flight-summary__segment">
          <h3>Outbound</h3>
          <p className="flight-summary__item">
            <strong>{firstSegment.departureAirport}</strong> to{" "}
            <strong>{lastSegment.arrivalAirport}</strong>
          </p>
          <p className="flight-summary__item">
            <strong>{formatDate(firstSegment.departureAt)}</strong>
          </p>
        </div>
        {returnFlight && returnFlight.length > 0 && (
          <div className="flight-summary__segment">
            <h3>Return</h3>
            <p className="flight-summary__item">
              <strong>{returnFlight[0].departureAirport}</strong> to{" "}
              <strong>
                {returnFlight[returnFlight.length - 1].arrivalAirport}
              </strong>
            </p>
            <p className="flight-summary__item">
              <strong>{formatDate(returnFlight[0].departureAt)}</strong>
            </p>
          </div>
        )}
      </div>
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

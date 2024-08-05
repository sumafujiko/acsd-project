import React from "react";

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
    </div>
  );
};

export default FlightSummary;

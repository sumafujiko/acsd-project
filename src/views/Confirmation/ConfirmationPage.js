import React from "react";
import { useLocation } from "react-router-dom";
import TransferDetails from "./TransferDetails";
import PriceBreakdown from "./PriceBreakdown";
import FAQ from "./FAQ";
import TermsAndConditions from "./TermsAndConditions";
import ManageBooking from "./ManageBooking";
// import NearbyTransport from "./NearbyTransport";
import "../../sass/confirmation.scss";
import { useCartContext } from "../../contexts/cartContext";

/**
 * ConfirmationPage Component
 *
 * This component displays a summary of the user's booking, including flight details,
 * transfer details, price breakdown, and additional information.
 */
const ConfirmationPage = () => {
  // Retrieve state passed from the previous page
  const location = useLocation();
  const { searchCriteria } = location.state || {};
  const { tripCart } = useCartContext();
  const { flight, transfer, hotel } = tripCart;
  /**
   * Renders flight details
   * @param {Object} flight - Flight object containing departure and arrival information
   * @param {string} type - 'Outbound' or 'Return' flight
   * @returns {JSX.Element} - Rendered flight details
   */
  const renderFlightDetails = (flight, type) => (
    <>
      <h3>{type} Flight</h3>
      <p>From: {flight.departureAirport}</p>
      <p>To: {flight.arrivalAirport}</p>
      <p>Departure: {flight.departureAt}</p>
      <p>Arrival: {flight.arrivalAt}</p>
      <p>Airline: {flight.airline}</p>
    </>
  );

  return (
    <div className="confirmation-page">
      <h1>Booking Confirmation</h1>

      {/* Flight Summary Section */}
      {flight && (
        <section className="flight-summary">
          <h2>Flight Details</h2>
          {renderFlightDetails(flight.outboundFlight[0], "Outbound")}
          {flight.returnFlight &&
            renderFlightDetails(flight.returnFlight[0], "Return")}
        </section>
      )}

      {/* Transfer Summary Section */}
      {transfer && (
        <section className="transfer-summary">
          <h2>Transfer Details</h2>
          <TransferDetails transfer={transfer} />
        </section>
      )}

      {/* Price Breakdown Section */}
      <PriceBreakdown
        flightData={flight}
        transferData={transfer}
        hotelData={hotel}
      />

      {/* Nearby Transport Options */}
      {/* <NearbyTransport location={searchCriteria?.location} /> */}

      {/* Manage Booking Section */}
      <ManageBooking bookingId={transfer?.id} />

      {/* Frequently Asked Questions */}
      <FAQ />

      {/* Terms and Conditions */}
      <TermsAndConditions />
    </div>
  );
};

export default ConfirmationPage;

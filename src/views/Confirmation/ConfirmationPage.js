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
  const { flight, transfer, hotel } = tripCart || {};

  /**
   * Renders flight details
   * @param {Object} flight - Flight object containing departure and arrival information
   * @param {string} type - 'Outbound' or 'Return' flight
   * @returns {JSX.Element} - Rendered flight details
   */
  const renderFlightDetails = (flight, type) => (
    <div className="flight-details">
      <h3>{type} Flight</h3>
      <p>From: {flight.departureAirport}</p>
      <p>To: {flight.arrivalAirport}</p>
      <p>Departure: {flight.departureAt}</p>
      <p>Arrival: {flight.arrivalAt}</p>
      <p>Airline: {flight.airline}</p>
    </div>
  );

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <h1>Booking Confirmation</h1>

        {/* Flight Summary Section */}
        {flight && (
          <section className="confirmation-section flight-summary">
            <h2>Flight Details</h2>
            {renderFlightDetails(flight.outboundFlight[0], "Outbound")}
            {flight.returnFlight &&
              renderFlightDetails(flight.returnFlight[0], "Return")}
          </section>
        )}

        {/* Price Breakdown Section */}
        <section className="confirmation-section price-breakdown">
          <PriceBreakdown
            flightData={flight}
            transferData={transfer}
            hotelData={hotel}
          />
        </section>

        {/* Transfer Summary and Booking Section */}
        {transfer && (
          <section className="confirmation-section transfer-summary-booking">
            <div className="transfer-summary">
              <TransferDetails transfer={transfer} />
            </div>
            <div className="booking-management">
              <ManageBooking bookingId={transfer?.id} />
            </div>
          </section>
        )}

        {/* Nearby Transport Options */}
        {/* <NearbyTransport location={searchCriteria?.location} /> */}

        {/* Frequently Asked Questions */}
        <section className="confirmation-section faq">
          <FAQ />
        </section>

        {/* Terms and Conditions */}
        <section className="confirmation-section terms-and-conditions">
          <TermsAndConditions />
        </section>
      </div>
    </div>
  );
};

export default ConfirmationPage;
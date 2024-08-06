import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCartContext } from "../../contexts/cartContext";
import TripSummary from "../../contexts/TripSummary";
import TransferSearch from "./TransferSearch";
import TransferResults from "./TransferResults";
import SelectedTransferDetails from "./SelectedTransferDetails";
import TransportTips from "./TransportTips";
import {
  searchTransfers,
  bookTransfer,
  safeApiCall,
} from "../../api/amadeusApi";
import "../../sass/transport.scss";

/**
 * TransportPage component handles the transfer search and booking process
 */
const TransportPage = () => {
  const location = useLocation();
  const { tripCart } = useCartContext();
  const navigate = useNavigate();
  const { searchCriteria, selectedFlight } = location.state || {};

  const [searchResults, setSearchResults] = React.useState([]);
  const [selectedTransfer, setSelectedTransfer] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // Calculate stay duration
  const calculateStayDuration = () => {
    if (
      tripCart.flight &&
      tripCart.flight.outboundFlight &&
      tripCart.flight.returnFlight
    ) {
      const checkInDate = new Date(
        tripCart.flight.outboundFlight[0].departureAt
      );
      const checkOutDate = new Date(
        tripCart.flight.returnFlight[0].departureAt
      );
      return Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const stayDuration = calculateStayDuration();

  /**
   * Handles the search results from the TransferSearch component
   * @param {Object} searchParams - The search parameters for transfers
   */
  const handleSearchResults = async (searchParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await safeApiCall(searchTransfers, searchParams);
      setSearchResults(results);
    } catch (error) {
      setError("Failed to fetch transfer options. Please try again.");
      console.error("Search transfers error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles the selection of a transfer option
   * @param {Object} transfer - The selected transfer option
   */
  const handleSelectTransfer = (transfer) => {
    setSelectedTransfer(transfer);
  };

  /**
   * Handles the booking of the selected transfer
   */
  const handleBookTransfer = async () => {
    if (!selectedTransfer) return;
    setIsLoading(true);
    setError(null);
    try {
      const bookingData = {
        transferType: selectedTransfer.transferType,
        start: selectedTransfer.start,
        end: selectedTransfer.end,
        passengerCharacteristics: [
          { passengerTypeCode: "ADT", count: searchCriteria.adults },
          { passengerTypeCode: "CHD", count: searchCriteria.children },
          { passengerTypeCode: "INF", count: searchCriteria.infants },
        ],
      };
      const bookingConfirmation = await safeApiCall(bookTransfer, bookingData);

      // Navigate to the confirmation page with the booking details
      navigate("/confirmation", {
        state: {
          bookingConfirmation,
          searchCriteria,
          selectedFlight,
          selectedTransfer,
          locationData: {
            name: searchCriteria.location,
            latitude: selectedTransfer.start?.latitude,
            longitude: selectedTransfer.start?.longitude,
          },
        },
      });
    } catch (error) {
      setError("Failed to book the transfer. Please try again.");
      console.error("Book transfer error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  // Console log the state passed via navigation
  useEffect(() => {
    // Log the state passed via navigation
    console.log(
      "Booking details passed via state:",
      location.state?.bookingDetails
    );

    // Log the entire tripCart
    console.log("Current tripCart:", tripCart);

    // If you want to log specific details:
    console.log("Flight details:", tripCart.flight);
    console.log("Hotel details:", tripCart.hotel);
    console.log("Stay duration:", tripCart.stayDuration);
  }, [location, tripCart]);

  return (
    <div className="transport-page">
      <h1>Transport Options</h1>

      <TripSummary tripCart={tripCart} />

      <TransferSearch
        onSearchResults={handleSearchResults}
        initialData={{
          arrivalAirport: tripCart.flight?.outboundFlight[0]?.arrivalAirport,
          arrivalDate: tripCart.flight?.outboundFlight[0]?.arrivalAt,
          hotelLatitude: tripCart.hotel?.latitude,
          hotelLongitude: tripCart.hotel?.longitude,
          passengers: {
            adults: tripCart.adults || 1,
            children: tripCart.children || 0,
            infants: tripCart.infants || 0,
          },
        }}
      />

      {isLoading && <p>Loading...</p>}

      {error && <p className="error-message">{error}</p>}

      {!isLoading && !error && searchResults.length > 0 && (
        <TransferResults
          results={searchResults}
          onSelect={handleSelectTransfer}
        />
      )}

      {selectedTransfer && (
        <SelectedTransferDetails
          transfer={selectedTransfer}
          onBook={handleBookTransfer}
        />
      )}
      <div className="transport-tips">
        <TransportTips />
      </div>
    </div>
  );
};

export default TransportPage;

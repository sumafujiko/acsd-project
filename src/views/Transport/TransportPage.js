import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCartContext } from "../../contexts/cartContext";
import TripSummary from "../../contexts/TripSummary";
import TransferResults from "./TransferResults";
import SelectedTransferDetails from "./SelectedTransferDetails";
import TransportTips from "./TransportTips";
import { searchTransfers, safeApiCall } from "../../api/amadeusApi";
import "../../sass/transport.scss";

const TransportPage = () => {
  const { tripCart } = useCartContext();
  const [searchParams, setSearchParams] = useState({
    startLocationCode: "",
    endAddressLine: "",
    startDateTime: "",
    passengerQuantity: 1,
    endLatitude: "",
    endLongitude: "",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (tripCart.flight && tripCart.hotel) {
      setSearchParams({
        startLocationCode:
          tripCart.flight.outboundFlight[0]?.arrivalAirport || "",
        endAddressLine: tripCart.hotel.address || "",
        startDateTime: tripCart.flight.outboundFlight[0]?.arrivalAt || "",
        passengerQuantity:
          tripCart.adults + (tripCart.children || 0) + (tripCart.infants || 0),
        endLatitude: tripCart.hotel.latitude || "",
        endLongitude: tripCart.hotel.longitude || "",
      });
    }
  }, [tripCart]);

  const handleSearchResults = async (e) => {
    e.preventDefault();
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectTransfer = (transfer) => {
    setSelectedTransfer(transfer);
  };

  const handleBookTransfer = async () => {
    // Implement booking logic here
    console.log("Booking transfer:", selectedTransfer);
    // Navigate to confirmation page or next step
  };

  return (
    <div className="transport-page">
      <h1>Transport Options</h1>
      <TripSummary tripCart={tripCart} />
      <div className="transport-container">
        <div className="transfer-search-column">
          <form className="transfer-search-form" onSubmit={handleSearchResults}>
            <div className="form-group">
              <label htmlFor="startLocationCode">Airport Code</label>
              <input
                id="startLocationCode"
                name="startLocationCode"
                type="text"
                value={searchParams.startLocationCode}
                onChange={handleInputChange}
                placeholder="Start Location Code"
              />
            </div>
            <div className="form-group">
              <label htmlFor="endAddressLine">End Address</label>
              <input
                id="endAddressLine"
                name="endAddressLine"
                type="text"
                value={searchParams.endAddressLine}
                onChange={handleInputChange}
                placeholder="End Address"
              />
            </div>
            <div className="form-group">
              <label htmlFor="startDateTime">Start Date & Time</label>
              <input
                id="startDateTime"
                name="startDateTime"
                type="datetime-local"
                value={searchParams.startDateTime}
                onChange={handleInputChange}
              />
            </div>
            <button className="search-button" type="submit">Search Transfers</button>
          </form>
        </div>
        <div className="transfer-results-column">
          {isLoading && <p>Loading...</p>}
          {error && <p className="error-message">{error}</p>}
          {!isLoading && !error && searchResults.length > 0 && (
            <TransferResults
              results={searchResults}
              onSelect={setSelectedTransfer}
            />
          )}
          {selectedTransfer && (
            <SelectedTransferDetails
              transfer={selectedTransfer}
              onBook={handleBookTransfer}
            />
          )}
        </div>
      </div>
      <TransportTips />
    </div>
  );
};

export default TransportPage;
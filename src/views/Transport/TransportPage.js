import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCartContext } from "../../contexts/cartContext";
import TripSummary from "../../contexts/TripSummary";
import TransferSearch from "./TransferSearch";
import TransferResults from "./TransferResults";
import SelectedTransferDetails from "./SelectedTransferDetails";
import TransportTips from "./TransportTips";
import { searchTransfers, safeApiCall } from "../../api/amadeusApi";
import "../../sass/transport.scss";

const TransportPage = () => {
  const location = useLocation();
  const { tripCart } = useCartContext();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useState({
    startLocationCode: "",
    endLocationCode: "",
    startDateTime: "",
    passengers: 1,
    endLatitude: "",
    endLongitude: "",
    endName: "",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (tripCart.flight && tripCart.hotel) {
      setSearchParams({
        startLocationCode: tripCart.flight.outboundFlight[0].arrivalAirport,
        endLocationCode: tripCart.hotel.cityCode,
        startDateTime: tripCart.flight.outboundFlight[0].arrivalAt,
        passengers: tripCart.adults + tripCart.children + tripCart.infants,
        endLatitude: tripCart.hotel.latitude,
        endLongitude: tripCart.hotel.longitude,
        endName: tripCart.hotel.name,
      });
    }
  }, [tripCart]);

  const handleSearchResults = async () => {
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
          <form
            className="transfer-search-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearchResults();
            }}
          >
            <div className="form-group">
              <label htmlFor="startLocationCode">Start Location Code</label>
              <input
                id="startLocationCode"
                type="text"
                value={searchParams.startLocationCode}
                onChange={(e) =>
                  setSearchParams({
                    ...searchParams,
                    startLocationCode: e.target.value,
                  })
                }
                placeholder="Start Location Code"
              />
            </div>
            <div className="form-group">
              <label htmlFor="endName">End Location Name</label>
              <input
                id="endName"
                type="text"
                value={searchParams.endName}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, endName: e.target.value })
                }
                placeholder="End Location Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="startDateTime">Start Date & Time</label>
              <input
                id="startDateTime"
                type="datetime-local"
                value={searchParams.startDateTime}
                onChange={(e) =>
                  setSearchParams({
                    ...searchParams,
                    startDateTime: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="passengers">Number of Passengers</label>
              <input
                id="passengers"
                type="number"
                value={searchParams.passengers}
                onChange={(e) =>
                  setSearchParams({
                    ...searchParams,
                    passengers: parseInt(e.target.value),
                  })
                }
                min="1"
              />
            </div>
            <button className="search-button" type="submit">
              Search Transfers
            </button>
          </form>
        </div>

        <div className="transfer-results-column">
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
        </div>
      </div>

      <TransportTips />
    </div>
  );
};

export default TransportPage;

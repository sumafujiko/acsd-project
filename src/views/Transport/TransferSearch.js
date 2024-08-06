import React, { useState, useEffect } from 'react';
import { getCityCode, safeApiCall } from '../../api/amadeusApi';
import "../../sass/transport.scss";

/**
 * TransferSearch component handles the search form for transfers
 * @param {Object} props - Component props
 * @param {Function} props.onSearchResults - Callback function to handle search results
 * @param {Object} props.initialData - Initial data to populate the search form
 */
const TransferSearch = ({ onSearchResults, initialData }) => {
  // State to manage search parameters
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    date: '',
    passengers: 1
  });

  // Effect to populate form with initial data if available
  useEffect(() => {
    if (initialData) {
      setSearchParams({
        origin: initialData.origin || initialData.location,
        destination: initialData.location,
        date: initialData.departureDate,
        passengers: initialData.adults + initialData.children
      });
    }
  }, [initialData]);

  /**
   * Handles input changes in the search form
   * @param {Event} e - The input change event
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prevParams => ({
      ...prevParams,
      [name]: value
    }));
  };

  /**
   * Handles form submission
   * @param {Event} e - The form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get IATA codes for origin and destination
      const originCode = await safeApiCall(getCityCode, searchParams.origin);
      const destinationCode = await safeApiCall(getCityCode, searchParams.destination);

      if (!originCode || !destinationCode) {
        throw new Error('Invalid origin or destination');
      }

      // Prepare search parameters for API call
      const apiSearchParams = {
        startLocationCode: originCode,
        endLocationCode: destinationCode,
        startDateTime: `${searchParams.date}T00:00:00`, // Assuming start of day
        passengerCount: searchParams.passengers,
      };

      // Call the onSearchResults callback with prepared parameters
      onSearchResults(apiSearchParams);
    } catch (error) {
      console.error('Error preparing search:', error);
      // Must add error handling here
    }
  };

  return (
    <form onSubmit={handleSubmit} className="transfer-search-form">
      <div className="form-group">
        <label htmlFor="origin">Origin:</label>
        <input
          type="text"
          id="origin"
          name="origin"
          value={searchParams.origin}
          onChange={handleInputChange}
          placeholder="Enter origin city"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="destination">Destination:</label>
        <input
          type="text"
          id="destination"
          name="destination"
          value={searchParams.destination}
          onChange={handleInputChange}
          placeholder="Enter destination city"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={searchParams.date}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="passengers">Passengers:</label>
        <input
          type="number"
          id="passengers"
          name="passengers"
          value={searchParams.passengers}
          onChange={handleInputChange}
          min="1"
          required
        />
      </div>

      <button type="submit" className="search-button">Search Transfers</button>
    </form>
  );
};

export default TransferSearch;
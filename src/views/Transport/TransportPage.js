import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TransferSearch from './TransferSearch';
import TransferResults from './TransferResults';
import SelectedTransferDetails from './SelectedTransferDetails';
import TransportTips from './TransportTips';
import { searchTransfers, bookTransfer, safeApiCall } from '../../api/amadeusApi';
import '../../sass/transport.scss';

/**
 * TransportPage component handles the transfer search and booking process
 */
const TransportPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchCriteria, selectedFlight } = location.state || {};

  const [searchResults, setSearchResults] = React.useState([]);
  const [selectedTransfer, setSelectedTransfer] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

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
      setError('Failed to fetch transfer options. Please try again.');
      console.error('Search transfers error:', error);
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
          { passengerTypeCode: 'ADT', count: searchCriteria.adults },
          { passengerTypeCode: 'CHD', count: searchCriteria.children },
          { passengerTypeCode: 'INF', count: searchCriteria.infants },
        ],
      };
      const bookingConfirmation = await safeApiCall(bookTransfer, bookingData);
      
      // Navigate to the confirmation page with the booking details
      navigate('/confirmation', { 
        state: { 
          bookingConfirmation, 
          searchCriteria, 
          selectedFlight,
          selectedTransfer,
          locationData: {
            name: searchCriteria.location,
            latitude: selectedTransfer.start?.latitude,
            longitude: selectedTransfer.start?.longitude,
          }
        } 
      });
    } catch (error) {
      setError('Failed to book the transfer. Please try again.');
      console.error('Book transfer error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="transport-page">
      <h1>Transport Options</h1>
      <TransferSearch onSearchResults={handleSearchResults} initialData={searchCriteria} />
      
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
      
      <TransportTips />
    </div>
  );
};

export default TransportPage;
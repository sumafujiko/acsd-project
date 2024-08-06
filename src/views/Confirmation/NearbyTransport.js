
import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * NearbyTransport Component
 * 
 * This component fetches and displays nearby transport options based on a given location
 * using the Google Maps Places API.
 *
 * @param {Object} props
 * @param {Object} props.location - Contains location data (name, latitude, longitude)
 */
const NearbyTransport = ({ location }) => {
  // State for storing nearby transport options
  const [nearbyOptions, setNearbyOptions] = useState([]);
  // State for tracking loading status
  const [isLoading, setIsLoading] = useState(true);
  // State for storing any error messages
  const [error, setError] = useState(null);

  useEffect(() => {
    /**
     * Fetches nearby transport options from Google Maps Places API
     */
    const fetchNearbyTransport = async () => {
      // Check if location data is complete
      if (!location || !location.latitude || !location.longitude) {
        setError('Location data is missing or incomplete');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      // Google Maps API key from environment variables
      const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      // Google Maps Places API endpoint
      const API_ENDPOINT = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;

      try {
        // Make API request to Google Maps Places
        const response = await axios.get(API_ENDPOINT, {
          params: {
            key: API_KEY,
            location: `${location.latitude},${location.longitude}`,
            radius: 1000, // Search within 1km
            type: 'transit_station' // Look for public transport stations
          }
        });

        // Check if the API request was successful
        if (response.data.status === 'OK') {
          // Process and format the API response
          const options = response.data.results.map(place => ({
            type: place.types[0].replace('_', ' '), // Format the place type
            description: `${place.name} - ${place.vicinity}` // Combine name and vicinity for description
          }));

          setNearbyOptions(options);
        } else {
          throw new Error(response.data.status);
        }
      } catch (err) {
        setError('Failed to fetch nearby transport options. Please try again later.');
        console.error('Error fetching nearby transport:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNearbyTransport();
  }, [location]); // Re-run effect if location changes

  // Display loading message while fetching data
  if (isLoading) {
    return <div className="nearby-transport nearby-transport--loading">Loading nearby transport options...</div>;
  }

  // Display error message if an error occurred
  if (error) {
    return <div className="nearby-transport nearby-transport--error">Error: {error}</div>;
  }

  return (
    <div className="nearby-transport">
      <h2>Nearby Transport Options in {location.name}</h2>
      {nearbyOptions.length > 0 ? (
        <ul className="nearby-transport__list">
          {nearbyOptions.map((option, index) => (
            <li key={index} className="nearby-transport__item">
              <strong>{option.type}:</strong> {option.description}
            </li>
          ))}
        </ul>
      ) : (
        <p className="nearby-transport__no-options">No nearby transport options found.</p>
      )}
    </div>
  );
};

export default NearbyTransport;
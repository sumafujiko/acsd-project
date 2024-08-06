// api/amadeusApi.js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_AMADEUS_API_KEY;
const API_SECRET = process.env.REACT_APP_AMADEUS_API_SECRET;

const BASE_URL = 'https://test.api.amadeus.com/v1';

// Function to get the access token
const getAccessToken = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/security/oauth2/token`, 
      'grant_type=client_credentials&client_id=' + process.env.REACT_APP_AMADEUS_API_KEY + '&client_secret=' + process.env.REACT_APP_AMADEUS_API_SECRET,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
};

// Create an axios instance with authentication
const amadeusApi = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor to add the access token to each request
amadeusApi.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Error handling wrapper
const handleApiError = (error) => {
  if (error.response && error.response.data && error.response.data.errors) {
    return error.response.data.errors[0].detail;
  }
  return 'An unexpected error occurred';
};

// Safe API call wrapper
export const safeApiCall = async (apiFunction, ...args) => {
  try {
    return await apiFunction(...args);
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

export const searchTransfers = async (params) => {
  try {
    // First, get the access token
    const tokenResponse = await axios.post(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const token = tokenResponse.data.access_token;

    // Now use the token to make the transfer search request
    const response = await axios.get('https://test.api.amadeus.com/v2/shopping/transfer-offers', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        startLocationCode: params.origin,
        endLocationCode: params.destination,
        startDateTime: params.date,
        passengerQuantity: params.passengers
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching transfer offers:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const bookTransfer = async (bookingData) => {
  try {
    const response = await amadeusApi.post('/ordering/transfer-orders', bookingData);
    return response.data;
  } catch (error) {
    console.error('Error booking transfer:', error);
    throw error;
  }
};

export const getTransferOrder = async (orderId) => {
  try {
    const response = await amadeusApi.get(`/ordering/transfer-orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transfer order:', error);
    throw error;
  }
};

export const cancelTransferOrder = async (orderId) => {
  try {
    const response = await amadeusApi.delete(`/ordering/transfer-orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error cancelling transfer order:', error);
    throw error;
  }
};

export const getCityCode = async (cityName) => {
  try {
    const response = await amadeusApi.get('/reference-data/locations', {
      params: {
        keyword: cityName,
        subType: 'CITY'
      }
    });
    return response.data.data[0]?.iataCode;
  } catch (error) {
    console.error('Error fetching city code:', error);
    throw error;
  }
};
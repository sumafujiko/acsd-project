// api/amadeusApi.js
import axios from "axios";

const API_KEY = process.env.REACT_APP_AMADEUS_API_KEY;
const API_SECRET = process.env.REACT_APP_AMADEUS_API_SECRET;

const BASE_URL = "https://test.api.amadeus.com";

// Function to get the access token
export const getAccessToken = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/v1/security/oauth2/token`,
      "grant_type=client_credentials&client_id=" +
        API_KEY +
        "&client_secret=" +
        API_SECRET,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
};

// Create an axios instance with authentication
export const amadeusApi = axios.create({
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
  return "An unexpected error occurred";
};

// Safe API call wrapper
export const safeApiCall = async (apiFunction, ...args) => {
  try {
    return await apiFunction(...args);
  } catch (error) {
    console.log(error);
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

//we dont need to catch and throw the error again.  Thrown errors will be caught in the safe api call catch block
export const searchTransfers = async (searchCriteria) => {
  const response = await amadeusApi.post(
    "/v1/shopping/transfer-offers",
    searchCriteria
  );
  return response.data;
};

export const bookTransfer = async (bookingData) => {
  const response = await amadeusApi.post(
    "/v1/ordering/transfer-orders",
    bookingData
  );
  return response.data;
};

export const getTransferOrder = async (orderId) => {
  const response = await amadeusApi.get(
    `/v1/ordering/transfer-orders/${orderId}`
  );
  return response.data;
};

export const cancelTransferOrder = async (orderId) => {
  const response = await amadeusApi.delete(
    `/v1/ordering/transfer-orders/${orderId}`
  );
  return response.data;
};

export const getCityCode = async (cityName) => {
  const response = await amadeusApi.get("/v1/reference-data/locations", {
    params: {
      keyword: cityName,
      subType: "CITY",
    },
  });
  return response.data.data[0]?.iataCode;
};

export const getFlights = async (searchParams) => {
  const response = await amadeusApi.get("/v2/shopping/flight-offers", {
    params: searchParams,
  });
  return response;
};

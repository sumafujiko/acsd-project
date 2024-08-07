// I have had so many problems getting this working correctly, hotel name and geolocation are the only things I got working consistently
// Because of that I picked random price for the hotel, trying to get something from the API at least
// There are a lot of console.logs in the code some are relics from debugging, Ill trim em down later
// Also based on console logs when you click on a hotel card it seacrhes for hotels again so maybe unnecessary API calls
import axios from "axios";

const API_KEY = process.env.REACT_APP_AMADEUS_API_KEY;
const API_SECRET = process.env.REACT_APP_AMADEUS_API_SECRET;

const amadeus = axios.create({
  baseURL: "https://test.api.amadeus.com",
});

let accessToken = null;
let tokenExpiration = null;

// Function to get an access token from Amadeus API
const getAccessToken = async () => {
  if (accessToken && tokenExpiration > Date.now()) {
    return accessToken;
  }

  try {
    const response = await amadeus.post(
      "/v1/security/oauth2/token",
      `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    accessToken = response.data.access_token;
    tokenExpiration = Date.now() + response.data.expires_in * 1000;
    return accessToken;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw new Error("Failed to obtain access token");
  }
};

// Function to generate a random price between €50 and €300 (Cheap to higher end range)
const generateRandomPrice = () => {
  return (Math.random() * (300 - 50) + 50).toFixed(2);
};

// Function to search for hotels using Amadeus API
export const searchHotels = async (cityCode, checkInDate) => {
  try {
    const token = await getAccessToken();

    const hotelListResponse = await amadeus.get(
      "/v1/reference-data/locations/hotels/by-city",
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          cityCode: cityCode,
          radius: 10,
          radiusUnit: "KM",
          hotelSource: "ALL",
        },
      }
    );

    const hotels = hotelListResponse.data.data;

    // Process hotels without fetching offers
    const processedHotels = hotels.slice(0, 6).map((hotel) => ({
      hotel: {
        hotelId: hotel.hotelId,
        name: hotel.name,
        cityCode: hotel.cityCode,
        address: hotel.address,
        latitude: hotel.geoCode?.latitude,
        longitude: hotel.geoCode?.longitude,
      },
      offers: [
        {
          id: "placeholder_offer",
          checkInDate: checkInDate,
          price: {
            total: generateRandomPrice(), // Using random price, I have had so much problems with getting price its insane
            currency: "EUR",
          },
        },
      ],
    }));

    return processedHotels;
  } catch (error) {
    console.error("Error searching hotels:", error);
    if (error.response) {
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
      throw new Error(
        `Hotel search failed: ${
          error.response.data.errors?.[0]?.detail || error.message
        }`
      );
    }
    throw error;
  }
};

// Function to search for flights using Amadeus API
export const searchFlights = async (
  originLocationCode,
  destinationLocationCode,
  departureDate,
  adults,
  returnDate
) => {
  try {
    const token = await getAccessToken();

    console.log(
      `Searching flights from ${originLocationCode} to ${destinationLocationCode} on ${departureDate}`
    );

    const response = await amadeus.get("/v2/shopping/flight-offers", {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        originLocationCode,
        destinationLocationCode,
        departureDate,
        adults,
        returnDate,
        currencyCode: "EUR",
        max: 250,
      },
    });

    console.log(`Received ${response.data.data.length} flight offers`);

    return response.data.data.map((offer) => ({
      id: offer.id,
      price: offer.price.total,
      currency: offer.price.currency,
      outboundFlight: offer.itineraries[0].segments.map((segment) => ({
        departureAirport: segment.departure.iataCode,
        arrivalAirport: segment.arrival.iataCode,
        departureAt: segment.departure.at,
        arrivalAt: segment.arrival.at,
        airline: segment.carrierCode,
      })),
      returnFlight:
        offer.itineraries[1]?.segments.map((segment) => ({
          departureAirport: segment.departure.iataCode,
          arrivalAirport: segment.arrival.iataCode,
          departureAt: segment.departure.at,
          arrivalAt: segment.arrival.at,
          airline: segment.carrierCode,
        })) || [],
    }));
  } catch (error) {
    console.error("Error searching flights:", error);
    if (error.response) {
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
      throw new Error(
        `Flight search failed: ${
          error.response.data.errors?.[0]?.detail || error.message
        }`
      );
    }
    throw error;
  }
};

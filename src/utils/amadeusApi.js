import axios from "axios";
import { getCityCode } from "./cityCodes";

const API_KEY = process.env.REACT_APP_AMADEUS_API_KEY;
const API_SECRET = process.env.REACT_APP_AMADEUS_API_SECRET;

const MAX_STAY_DAYS = 30; // Error 431 kept coming up in the api reference, check out too far away, will have to still work on this

const getAccessToken = async () => {
  try {
    const response = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`,
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

const validateDates = (checkInDate, checkOutDate) => {
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const daysDifference = (checkOut - checkIn) / (1000 * 60 * 60 * 24);

  if (daysDifference > MAX_STAY_DAYS) {
    throw new Error(
      `Check-out date cannot be more than ${MAX_STAY_DAYS} days after check-in date.`
    );
  }
};

export const searchHotels = async (
  locationInput,
  checkInDate,
  checkOutDate,
  adults = 1
) => {
  try {
    const accessToken = await getAccessToken();
    validateDates(checkInDate, checkOutDate);

    const cityCode = getCityCode(locationInput);
    if (!cityCode) {
      throw new Error(`Invalid location: ${locationInput}`);
    }

    const hotelOffersResponse = await axios.get("/v2/shopping/hotel-offers", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      params: {
        cityCode: cityCode,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        adults: adults,
        radius: 5,
        radiusUnit: "KM",
        paymentPolicy: "NONE",
        includeClosed: false,
        bestRateOnly: true,
        view: "FULL",
        sort: "PRICE",
      },
    });

    // Process response
    const hotels = hotelOffersResponse.data.data;

    const processedHotels = hotels.slice(0, 3).map((hotel) => ({
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
          price: {
            total: hotel.price?.total || "N/A",
            currency: hotel.price?.currency || "N/A",
          },
        },
      ],
      distance: hotel.distance
        ? {
            value: hotel.distance.value,
            unit: hotel.distance.unit,
          }
        : undefined,
    }));

    console.log("Processed hotels:", processedHotels);

    return processedHotels;
  } catch (error) {
    console.error("Error searching hotels:", error);
    if (error.response) {
      console.error(
        "Error response:",
        JSON.stringify(error.response.data, null, 2)
      );
      console.error("Error status:", error.response.status);
    }
    throw error;
  }
};

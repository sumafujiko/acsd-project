import { useState, useEffect } from "react";
import { searchHotels } from "../../utils/amadeusApi";

const useHotelSearch = (flight) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        setError(null);

        let locationInput = "LON"; // Default to London if no flight data, closest to Dublin thats reliable
        let checkInDate = new Date().toISOString().split("T")[0]; // Todays date
        let checkOutDate = new Date(Date.now() + 86400000)
          .toISOString()
          .split("T")[0]; // Tomorrows date

        if (
          flight &&
          flight.outboundFlight &&
          flight.outboundFlight.length > 0
        ) {
          const lastFlight =
            flight.outboundFlight[flight.outboundFlight.length - 1];
          locationInput = lastFlight.arrivalAirport || lastFlight.arrivalCity;
          checkInDate = lastFlight.arrivalDate;
          checkOutDate = flight.inboundFlight
            ? flight.inboundFlight[0].departureDate
            : new Date(new Date(checkInDate).getTime() + 86400000)
                .toISOString()
                .split("T")[0];
        }

        console.log(
          "Searching hotels for:",
          locationInput,
          "from",
          checkInDate,
          "to",
          checkOutDate
        );
        const hotelData = await searchHotels(
          locationInput,
          checkInDate,
          checkOutDate
        );
        setHotels(hotelData);
      } catch (err) {
        console.error("Error in useHotelSearch:", err);
        setError(
          `Failed to fetch hotels: ${err.message}. Please try again later.`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [flight]);

  return { hotels, loading, error };
};

export default useHotelSearch;

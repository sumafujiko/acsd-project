import { useState, useEffect } from "react";
import { searchHotels } from "../../utils/amadeusApi";

const useHotelSearch = (flight) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stayDuration, setStayDuration] = useState(1);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        setError(null);

        let cityCode = "LON"; // Default to London
        let checkInDate = "2024-08-01"; // Default, works for now
        let calculatedStayDuration = 1;

        if (
          flight &&
          flight.outboundFlight &&
          flight.outboundFlight.length > 0
        ) {
          const lastFlight =
            flight.outboundFlight[flight.outboundFlight.length - 1];
          cityCode = lastFlight.arrivalAirport;
          checkInDate = lastFlight.departureAt.split("T")[0];

          if (flight.returnFlight && flight.returnFlight.length > 0) {
            const returnDate = flight.returnFlight[0].departureAt.split("T")[0];
            calculatedStayDuration =
              Math.ceil(
                (new Date(returnDate) - new Date(checkInDate)) /
                  (1000 * 60 * 60 * 24)
              ) + 1; // Add 1 to include the last day, feels really silly but it makes it line up with the flight dates;
          }
        }

        setStayDuration(calculatedStayDuration);

        const hotelData = await searchHotels(cityCode, checkInDate);

        const adjustedHotelData = hotelData.map((hotel) => ({
          ...hotel,
          offers: hotel.offers.map((offer) => ({
            ...offer,
            price: {
              ...offer.price,
              perNight: offer.price.total, // Store the original price per night (Using it in HotelCard.js)
              total: (
                parseFloat(offer.price.total) * calculatedStayDuration
              ).toFixed(2),
            },
          })),
        }));

        setHotels(adjustedHotelData);
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

  return { hotels, loading, error, stayDuration };
};

export default useHotelSearch;

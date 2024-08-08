//helper functions for sorting flights

export const sortByPrice = (userSelection, flightsToSort) => {
  const value = userSelection.priceSort;
  if (!value) return flightsToSort;
  if (value === "asc") {
    //simple sorting function based on price
    return flightsToSort.sort((a, b) => a.price - b.price);
  } else {
    //reverse sorting function for desc
    return flightsToSort.sort((a, b) => b.price - a.price);
  }
};

export const filterByAirport = (userSelection, flightsToFilter) => {
  const airport = userSelection.airportSelect;
  //filter any airport that does not match
  if (!airport) return flightsToFilter;
  const filteredFlights = flightsToFilter.filter(
    (trip) =>
      trip.outboundFlight.slice(-1)[0].arrivalAirport === airport &&
      (trip.returnFlight && trip.returnFlight[0].departureAirport) === airport
  );
  return filteredFlights;
};

export const filterByMaxLayover = (userSelection, flightsToFilter) => {
  const maxLayover = userSelection.maxLayover;
  if (!maxLayover) return flightsToFilter;

  //filter out any flights have more segments / layovers than mentioned
  const filteredFlights = flightsToFilter.filter((trip) => {
    const outboundLayovers = trip.outboundFlight.length;
    //return flight could be null so leave at 0
    const returnLayovers = trip.returnFlight?.length
      ? trip.returnFlight.length
      : 0;
    return (
      outboundLayovers <= maxLayover + 1 && returnLayovers <= maxLayover + 1
    );
  });
  return filteredFlights;
};

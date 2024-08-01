import { useState } from "react";

const FlightDetailsSorter = ({ originalData, setFlights }) => {
  const userSelection = useState({});
  //doesnt neet to be state as its derived from props
  const airports = new Set();
  originalData.forEach((flight) => {
    airports.set(flight.outboundFlight.arrivalAirport);
  });

  const filterByAirport = (userSelection, flightsToFilter) => {
    const airport = userSelection.airportSelector;
    if (!airport) return flightsToFilter;
    const filteredFlights = flightsToFilter.filter(
      (trip) =>
        trip.outboundFlight.slice(-1)[0].arrivalAirport === airport &&
        trip.returnFlight.slice(-1)[0].departureAirport === airport
    );
    return filteredFlights;
  };

  const filterByMaxLayover = (userSelection, flightsToFilter) => {
    const maxLayover = userSelection.maxLayover;
    if (!maxLayover) return flightsToFilter;
    const filteredFlights = flightsToFilter.filter(
      (trip) =>
        trip.outBoundFlight.length < maxLayover &&
        trip.returnFlight.length < maxLayover
    );
    return filteredFlights;
  };

  const sortByPrice = (userSelection, flightsToSort) => {
    const value = userSelection.priceSort;
    if (!value) return flightsToSort;
    if (value === "asc") {
      return flightsToSort.sort((a, b) => a.price - b.price);
    } else {
      return flightsToSort.sort((a, b) => b.price - a.price);
    }
  };

  const handleUserSelection = (e) => {
    const { name, value } = e.target;
    if (!name || !value) return;
    const newSelection = { ...userSelection, [name]: value };
    const filteredByAirport = filterByAirport(newSelection, originalData);
    const filtedByLayover = filterByMaxLayover(newSelection, filteredByAirport);
    const sortedByPrice = sortByPrice(newSelection, filtedByLayover);

    setFlights(sortedByPrice);
  };

  return (
    <div className="flight-sorter__container">
      <form>
        <div>
          <label htmlFor="airportSelector">Airport</label>
          <select
            name="airportSelect"
            id="airportSelector"
            onChange={handleUserSelection}
          >
            <option undefined>None Selected</option>
            {Array.from(airports).map((airport) => (
              <option value={airport}>{airport}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="maxLayover">Max Layovers</label>
          <select
            name="maxLayover"
            id="maxLayover"
            onChange={handleUserSelection}
          >
            <option value={undefined}>None Selected</option>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
        </div>
        <div>
          <label htmlFor="priceSort">Sort by Price</label>
          <select
            name="priceSort"
            id="priceSort"
            onChange={handleUserSelection}
          >
            <option value={undefined}>None Selected</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default FlightDetailsSorter;

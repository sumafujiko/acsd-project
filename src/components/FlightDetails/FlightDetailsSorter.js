import { useState } from "react";

import "../../sass/flightDetails.scss";

const FlightDetailsSorter = ({ originalData, setFlights }) => {
  const userSelection = useState({});

  //doesnt neet to be state as its derived from props
  const airportSet = new Set(
    ...originalData
      .map((flight) => flight?.outBoundFlight?.arrivalAirport)
      .filter((airport) => airport !== null && airport !== undefined)
  );

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
    console.log(flightsToFilter);
    const filteredFlights = flightsToFilter.filter((trip) => {
      const outboundLayovers = trip.outboundFlight.length;
      const returnLayovers = trip.returnFlight?.length
        ? trip.returnFlight.length
        : 0;
      return outboundLayovers <= maxLayover && returnLayovers <= maxLayover;
    });
    console.log(filteredFlights, "filtered after max layover");
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
    console.log(sortedByPrice, "sortedby price");
    setFlights(sortedByPrice);
  };

  return (
    <div className="flight-sorter__container">
      <form className="flight-sorter__form">
        <div className="flight-sorter__input-container">
          <select
            name="airportSelect"
            id="airportSelector"
            onChange={handleUserSelection}
          >
            <option undefined>None Selected</option>
            {Array.from(airportSet).map((airport) => (
              <option value={airport}>{airport}</option>
            ))}
          </select>
          <label htmlFor="airportSelector">Airport</label>
        </div>
        <div className="flight-sorter__input-container">
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
          <label htmlFor="maxLayover">Max Layovers</label>
        </div>
        <div className="flight-sorter__input-container">
          <select
            name="priceSort"
            id="priceSort"
            onChange={handleUserSelection}
          >
            <option value={undefined}>None Selected</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <label htmlFor="priceSort">Sort by Price</label>
        </div>
      </form>
    </div>
  );
};

export default FlightDetailsSorter;

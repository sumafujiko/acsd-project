import { useState } from "react";

import "../../sass/flightDetails.scss";

const FlightDetailsSorter = ({ originalData, setFlights }) => {
  const userSelection = useState({});
  //doesnt neet to be state as its derived from props
  //use a set to get only one of each
  const airportSet = new Set(
    //pass the iterable to the set
    originalData
      //map to only the airports - arrival airport as all leave from dub
      .map(
        (flight) =>
          flight?.outboundFlight[flight.outboundFlight.length - 1]
            ?.arrivalAirport
      )
      //as sum will return null, filter these out
      .filter((airport) => airport !== null && airport !== undefined)
  );

  const filterByAirport = (userSelection, flightsToFilter) => {
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

  const filterByMaxLayover = (userSelection, flightsToFilter) => {
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

  const sortByPrice = (userSelection, flightsToSort) => {
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

  //we take the original data and pass this to this as filtered data will cause information loss
  //we need to perform all three actions on the data set every time any one of them is changed otherwise we are
  //effectively resetting the other two filters
  const handleUserSelection = (e) => {
    const { name, value } = e.target;

    //pass the rest of one into the other
    const newSelection = { ...userSelection, [name]: value };
    const filteredByAirport = filterByAirport(newSelection, originalData);
    const filtedByLayover = filterByMaxLayover(newSelection, filteredByAirport);
    const sortedByPrice = sortByPrice(newSelection, filtedByLayover);

    //create a new reference by spreading to trigger an update
    setFlights([...sortedByPrice]);
  };

  return (
    <div className="flight-sorter__container">
      <form className="flight-sorter__form">
        <div className="flight-sorter__input-container">
          <select
            name="airportSelect"
            id="airportSelect"
            onChange={handleUserSelection}
          >
            <option value="">None Selected</option>
            {Array.from(airportSet).map((airport) => (
              <option value={airport}>{airport}</option>
            ))}
          </select>
          <label htmlFor="airportSelect">Airport</label>
        </div>
        <div className="flight-sorter__input-container">
          <select
            name="maxLayover"
            id="maxLayover"
            onChange={handleUserSelection}
          >
            <option value="">None Selected</option>
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
            <option value="">None Selected</option>
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

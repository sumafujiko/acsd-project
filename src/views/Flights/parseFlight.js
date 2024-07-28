import { getNestedKeyValue } from "../../utils";

const segmentParseKeys = {
  departureAirport: "departure.iataCode",
  arrivalAirport: "arrival.iataCode",
  departureAt: "departure.at",
  arrivalAt: "arrival.at",
  airline: "carrierCode",
};

const parseFlight = (flightDetails) => {
  if (!flightDetails) return;

  const mappedFlightObject = {
    id: flightDetails.responseId,
    price: flightDetails.price?.grandTotal,
  };

  //we get the outbound and return in the same instance - Amadeus automatically pairs the oubound and return flights
  const outboundItinerary = Array.isArray(flightDetails.itineraries)
    ? flightDetails.itineraries[0]
    : null;
  const returnItinerary = Array.isArray(flightDetails.itineraries)
    ? flightDetails.itineraries[1]
    : null;

  //each flight can have potentially multiple legs of the journey aka DUB -> NY = Dublin to London, London to New York
  if (Array.isArray(outboundItinerary?.segments)) {
    const outboundFlight = outboundItinerary.segments.map((segment) => {
      const segmentObj = {};
      Object.entries(segmentParseKeys).forEach(
        ([key, value]) => (segmentObj[key] = getNestedKeyValue(segment, value))
      );
      return segmentObj;
    });
    mappedFlightObject.outboundFlight = outboundFlight;
  }
  // TODO Extract the same functionality as these repeat
  if (Array.isArray(returnItinerary?.segments)) {
    const returnFlight = returnItinerary.segments.map((segment) => {
      const segmentObj = {};
      Object.entries(segmentParseKeys).forEach(
        ([key, value]) => (segmentObj[key] = getNestedKeyValue(segment, value))
      );
      return segmentObj;
    });
    mappedFlightObject.returnFlight = returnFlight;
  }

  return mappedFlightObject;
};

export default parseFlight;

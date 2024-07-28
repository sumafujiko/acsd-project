import "./FlightSegment";
import FlightSegment from "./FlightSegment";

const FlightDetails = ({ flightDetail }) => {
  console.log(flightDetail, "someflightdetails");
  return (
    <div className="flight-trip-container">
      <p className="price-par">Price: €{flightDetail.price}</p>
      <p className="inbound-outbound-par">Outbound</p>
      <div className="flight-details-container">
        {flightDetail.outboundFlight.map((segment) => (
          <FlightSegment flightSegment={segment} />
        ))}
      </div>
      {flightDetail.returnFlight && <p>Return</p>}
      {flightDetail.returnFlight && (
        <div className="flight-details-container">
          {console.log(flightDetail.returnFlight, "return flight")}
          {flightDetail.returnFlight.map((segment) => (
            <FlightSegment flightSegment={segment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightDetails;

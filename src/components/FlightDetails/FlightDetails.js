import "./FlightSegment";
import FlightSegment from "./FlightSegment";

const FlightDetails = ({ flightDetail }) => {
  return (
    <div className="flight-details">
      <p className="flight-details__price">Price: €{flightDetail.price}</p>
      <p className="flight-details__inbound-outbound">Outbound</p>
      <div className="flight-details__container-flight">
        {flightDetail.outboundFlight.map((segment, index) => (
          <FlightSegment flightSegment={segment} key={index} />
        ))}
      </div>
      {flightDetail.returnFlight && (
        <p className="flight-details__inbound-outbound">Return</p>
      )}
      {flightDetail.returnFlight && (
        <div className="flight-details__container-flight">
          {flightDetail.returnFlight.map((segment, index) => (
            <FlightSegment flightSegment={segment} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightDetails;

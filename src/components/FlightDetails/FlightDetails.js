import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import FlightSegment from "./FlightSegment";
import { CartContext } from "../../contexts/cartContext";

const FlightDetails = ({ flightDetail }) => {
  const { setTripCart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  //this is the information that is passed through useNavigate in the state
  const userSelection = location.state;

  //update our cart context.  We dont want to overwrite previous information so spread details
  const handleSelect = () => {
    setTripCart((prev) => ({
      ...prev,
      flight: flightDetail,
    }));
    // Changed to go to HotelPage.js
    navigate("/hotels", { state: userSelection });
  };
  return (
    <div className="flight-details" onClick={handleSelect}>
      <p className="flight-details__price">Price: €{flightDetail.price}</p>
      <p className="flight-details__inbound-outbound">Outbound</p>
      <div className="flight-details__container-flight">
        {/* Iterate over our outbound segements for outbound */}
        {flightDetail.outboundFlight.map((segment, index) => (
          <FlightSegment flightSegment={segment} key={index} />
        ))}
      </div>
      {flightDetail.returnFlight && (
        <p className="flight-details__inbound-outbound">Return</p>
      )}
      {/* And again for the return flight */}
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

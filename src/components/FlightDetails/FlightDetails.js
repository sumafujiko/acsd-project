import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import FlightSegment from "./FlightSegment";
import { CartContext } from "../../contexts/cartContext";

const FlightDetails = ({ flightDetail }) => {
  const { setTripCart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  const userSelection = location.state;

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

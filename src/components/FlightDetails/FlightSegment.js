const FlightSegment = ({ flightSegment }) => {
  const departureDateTime = new Date(flightSegment.departureAt);
  const arrivalDateTime = new Date(flightSegment.arrivalAt);

  return (
    <div className="flight-segment__container">
      <div className="flight-segment__departure">
        <p className="flight-segment__airport">
          {flightSegment.departureAirport}
        </p>
        <p className="flight-segment__date">
          {departureDateTime.getDate()}/{departureDateTime.getMonth() + 1}/
          {departureDateTime.getFullYear()}
        </p>
        <p className="flight-segment__time">
          {departureDateTime.getHours().toString().padStart(2, "0")}:
          {departureDateTime.getMinutes().toString().padStart(2, "0")}
        </p>
      </div>
      {"->"}
      <div className="flight-segment__arrival">
        <p className="flight-segment__airport">
          {flightSegment.arrivalAirport}
        </p>
        <p className="flight-segment__date">
          {arrivalDateTime.getDate()}/{arrivalDateTime.getMonth() + 1}/
          {arrivalDateTime.getFullYear()}
        </p>
        <p className="flight-segment__time">
          {arrivalDateTime.getHours().toString().padStart(2, "0")}:
          {arrivalDateTime.getMinutes().toString().padStart(2, "0")}
        </p>
      </div>
    </div>
  );
};

export default FlightSegment;

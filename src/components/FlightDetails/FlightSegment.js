const FlightSegment = ({ flightSegment }) => {
  const departureDateTime = new Date(flightSegment.departureAt);
  const arrivalDateTime = new Date(flightSegment.arrivalAt);

  console.log(flightSegment, "flight segment");

  return (
    <div className="flight-details-segment">
      <div>
        <p className="airport-par">{flightSegment.departureAirport}</p>
        <p>
          {departureDateTime.getDay()}/{departureDateTime.getMonth()}/
          {departureDateTime.getFullYear()}
        </p>
        <p className="time-par">
          {departureDateTime.getHours().toString().padStart(2, "0")}:
          {departureDateTime.getMinutes().toString().padStart(2, "0")}
        </p>
      </div>
      {"->"}
      <div>
        <p className="airport-par">{flightSegment.arrivalAirport}</p>
        <p>
          {arrivalDateTime.getDay()}/{arrivalDateTime.getMonth()}/
          {arrivalDateTime.getFullYear()}
        </p>
        <p className="time-par">
          {arrivalDateTime.getHours().toString().padStart(2, "0")}:{" "}
          {arrivalDateTime.getMinutes().toString().padStart(2, "0")}
        </p>
      </div>
    </div>
  );
};

export default FlightSegment;

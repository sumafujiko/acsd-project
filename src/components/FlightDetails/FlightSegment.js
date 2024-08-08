const FlightSegment = ({ flightSegment }) => {
  const departureDateTime = new Date(flightSegment.departureAt);
  const arrivalDateTime = new Date(flightSegment.arrivalAt);

  //time from start of first leg to end of last leg
  const totalTime = calcTimeInHours(arrivalDateTime, departureDateTime);

  return (
    <div className="flight-segment__container">
      <div className="flight-segment__departure">
        <p className="flight-segment__airport">
          {flightSegment.departureAirport}
        </p>
        {/* Keep time in date format until we are putting it into the html */}
        <p className="flight-segment__date">
          {departureDateTime.getDate()}/{departureDateTime.getMonth() + 1}/
          {departureDateTime.getFullYear()}
        </p>
        {/* Keep it as two digits whether its below 10 or not */}
        <p className="flight-segment__time">
          {departureDateTime.getHours().toString().padStart(2, "0")}:
          {departureDateTime.getMinutes().toString().padStart(2, "0")}
        </p>
      </div>
      <div className="flight-segment__joiner">
        <p>
          Duration: {totalTime.hours}h : {totalTime.mins}m
        </p>
        <p>{"->"}</p>
      </div>
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

const calcTimeInHours = (date1, date2) => {
  //always get a positive difference no matter which param gets passed first
  const difference = Math.abs(date1 - date2);

  //avoid magic numbers
  const HOUR_IN_MILLISECONDS = 1000 * 60 * 60;

  //get our hours
  const diffInHours = difference / HOUR_IN_MILLISECONDS;
  const hours = Math.floor(diffInHours);
  //get our mins - padstart avoids having minutes by themselves
  const minsNum = Math.round((diffInHours - hours) * 60);
  const mins = minsNum.toString().padStart(2, "0");

  return { hours, mins };
};

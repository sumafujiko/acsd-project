import FlightDetails from "../components/FlightDetails/FlightDetails";
import flightJson from "../views/Flights/dummyData.json";
import parseFlight from "./Flights/parseFlight";

const Test = () => {
  const mappedFlight = parseFlight(flightJson);
  console.log(mappedFlight);
  return (
    <div>
      <FlightDetails flightDetail={mappedFlight} />
    </div>
  );
};

export default Test;

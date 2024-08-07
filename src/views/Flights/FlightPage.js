import { useCallback, useEffect, useMemo, useState } from "react";
import parseFlight from "./parseFlight";
import FlightDetails from "../../components/FlightDetails/FlightDetails";

import "../../sass/flightDetails.scss";
import { useLocation } from "react-router-dom";
import iataCodes from "./iataCodes";
import FlightDetailsSorter from "../../components/FlightDetails/FlightDetailsSorter";
import { getFlights, safeApiCall } from "../../api/amadeusApi";

// const API_KEY = process.env.REACT_APP_AMADEUS_API_KEY;
// const API_SECRET = process.env.REACT_APP_AMADEUS_API_SECRET;

const FlightPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const location = useLocation();
  const abortController = useMemo(() => new AbortController(), []);

  const searchCriteria = location.state?.searchCriteria;

  //memoise this within a useCallback so that we can pass it to the useEffect but also reuse for reloading
  const handleFetchFlights = useCallback(async () => {
    if (!searchCriteria) {
      return;
    }

    const {
      location,
      departureDate,
      returnDate,
      adults,
      children,
      infants,
      priceRange = [],
    } = searchCriteria;

    const params = {
      originLocationCode: "DUB",
      destinationLocationCode: iataCodes[location],
      departureDate,
      returnDate,
      adults,
      children,
      infants,
      maxPrice: (priceRange[1] = "500"),
    };

    setLoading(true);
    setError("");
    try {
      const response = await safeApiCall(getFlights, params);

      const data = response.data?.data;
      if (!Array.isArray(data)) {
        throw new Error("Parsing Error");
      }
      const formattedData = data.map((trip) => parseFlight(trip));
      setOriginalData(formattedData);
      setData(formattedData);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [abortController, searchCriteria]);

  useEffect(() => {
    handleFetchFlights();
    //useEffect cleanup function happens in its return.  We stop the fetch request if the page unmounts
    // return () => abortController.abort();
  }, [handleFetchFlights, abortController]);

  const determineHeaderStatement = () => {
    if (!searchCriteria) return "There does not seem to be any search criteria";
    if (error) return "There was an error";
    if (!data && !loading) return "Nothing matches your search results";

    return "Flight Results";
  };

  if (loading) {
    return <div className="flight-page flight-page--loading">...Loading</div>;
  }

  return (
    <div className="flight-page">
      <br />
      {/*Header margins were pushing this down so now its pushing against something in the same container.  Feels hacky */}
      <p className="flight-page__error">{error}</p>
      <h1 className="flight-page__header">{determineHeaderStatement()}</h1>
      <div className="flight-page__container-trips">
        <FlightDetailsSorter originalData={originalData} setFlights={setData} />
        {data?.map((trip, index) => (
          <FlightDetails flightDetail={trip} key={index} />
        ))}
      </div>
    </div>
  );
};

export default FlightPage;

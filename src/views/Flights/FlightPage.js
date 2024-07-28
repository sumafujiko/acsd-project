import { useEffect, useState } from "react";
import axios from "axios";
import parseFlight from "./parseFlight";
import FlightDetails from "../../components/FlightDetails/FlightDetails";

import "../../sass/flightDetails.scss";

const API_KEY = process.env.REACT_APP_AMADEUS_API_KEY;
const API_SECRET = process.env.REACT_APP_AMADEUS_API_SECRET;

const FlightPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  console.log(API_KEY);

  useEffect(() => {
    const abortController = new AbortController();

    // this is done as an IIFE
    (async () => {
      setLoading(true);
      try {
        //we first have to authenticate ourselves with Amadeus.
        // I had thought about storing this token however storing this in the client
        // might leave us open to xss attacks
        const tokenResponse = await axios.post(
          "https://avoid.test.api.amadeus.com/v1/security/oauth2/token",
          {
            grant_type: "client_credentials",
            client_id: API_KEY,
            client_secret: API_SECRET,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            signal: abortController.signal,
          }
        );

        if (!tokenResponse.data?.access_token) {
          throw new Error("No Access Token");
        }

        const response = await axios.get(
          "https://test.api.amadeus.com/v2/shopping/flight-offers",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.data.access_token}`,
            },
            signal: abortController.signal,
            params: {
              originLocationCode: "DUB",
              destinationLocationCode: "JFK",
              departureDate: "2024-08-01",
              adults: 1,
            },
          }
        );
        console.log(response);
        const data = response.data?.data;
        if (!Array.isArray(data)) {
          throw new Error("Parsing Error");
        }
        const formattedData = data.map((trip) => parseFlight(trip));
        console.log(formattedData);
        setData(formattedData);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
    //useEffect cleanup function happens in its return.  We stop the fetch request if the page unmounts
    return () => abortController.abort();
  }, []);

  if (loading) {
    return <div>...Loading</div>;
  }

  return (
    <div>
      <p></p>
      <div className="container">
        {data?.map((trip, index) => (
          <FlightDetails flightDetail={trip} key={index} />
        ))}
      </div>
    </div>
  );
};

export default FlightPage;

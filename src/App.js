import { useEffect, useState } from "react";
import axios from "axios";
import CurrentConditions from "./CurrentConditions";
import Graph from "./Graph";

const baseUrl = process.env.REACT_APP_BASE_URL;

function App() {
  const [latestWeatherDataRecord, setLatestWeatherDataRecord] = useState([]);
  const [weatherDataRecord, setWeatherDataRecord] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl + "/data/latest")
      .then((response) => {
        setLatestWeatherDataRecord(response.data);
      })
      .catch(function (error) {
        if (error.response) {
          console.log("error.response.status", error.response.status);
          console.log("error.response.headers", error.response.headers);
        } else if (error.request) {
          console.log("error.request", error.request);
        } else {
          console.log("Error", error.message);
        }
      });

    axios
      .get(baseUrl + "/data")
      .then((response) => {
        setWeatherDataRecord(response.data);
      })
      .catch(function (error) {
        if (error.response) {
          console.log("error.response.status", error.response.status);
          console.log("error.response.headers", error.response.headers);
        } else if (error.request) {
          console.log("error.request", error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  }, []);

  return (
    <>
      <div className="mx-auto md:max-w-md">
        {latestWeatherDataRecord.length > 0 && (
          <CurrentConditions data={latestWeatherDataRecord[0]} />
        )}
      </div>
      <div className="mt-12 mx-auto md:max-w-5xl">
        {weatherDataRecord.length > 0 && (
          <Graph id="graph" data={weatherDataRecord} />
        )}
      </div>
    </>
  );
}

export default App;

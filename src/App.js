import { useEffect, useState } from "react";
import axios from "axios";
import CurrentConditions from "./CurrentConditions";

const baseUrl = process.env.REACT_APP_BASE_URL;

function App() {
  const [latestWeatherDataRecord, setLatestWeatherDataRecord] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => {
        setLatestWeatherDataRecord(response.data);
      })
      .catch(function (error) {
        if (error.response) {
          console.log('error.response.status', error.response.status);
          console.log('error.response.headers', error.response.headers);
        } else if (error.request) {
          console.log('error.request', error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  }, []);

  return (
    <div className="mx-auto md:max-w-md">
      {latestWeatherDataRecord.length > 0 && (
        <CurrentConditions data={latestWeatherDataRecord[0]} />
      )}
      {/* {latestWeatherDataRecord.map((item, index) => {
        const date = new Date(item.created_at).toLocaleDateString("de-DE");
        const time = new Date(item.created_at).toLocaleTimeString("de-DE");
        return (
          <div key={index}>
            <h2>
              {date}, {time}
            </h2>
            <h3>Temperature: {item.temp}</h3>
            <h3>Humidity: {item.hum}</h3>
          </div>
        );
      })} */}
    </div>
  );
}

export default App;

import { WiThermometer, WiHumidity } from "react-icons/wi";

function CurrentConditions(props) {
  return (
    <div className="m-5">
      <div className="rounded-xl shadow-2xl text-lg font-bold text-blue-500 font-mono">
        <h2 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 rounded-tr-xl rounded-tl-xl text-white p-4 py-3 uppercase font-bold">
          Current Conditions
        </h2>
        <h3 className="p-2 pr-4 border-b-2 border-opacity-50 flex flex-row items-center">
          <WiThermometer className="w-10 h-10 inline mr-2" />
          {props.data.temp}°C
          <span className="uppercase text-gray-100 ml-auto">Temperature</span>
        </h3>
        <h3 className="p-2 pr-4 border-b-2 border-opacity-0 rounded-br-xl rounded-bl-xl flex flex-row items-center">
          <WiHumidity className="w-10 h-10 inline mr-2" />
          {props.data.hum}%
          <span className="uppercase text-gray-100 ml-auto">Humidity</span>
        </h3>
      </div>
      <h3 className="text-xs mt-3 text-right text-gray-400">
        fetched: {new Date(props.data.created_at).toLocaleDateString("de-DE")},{" "}
        {new Date(props.data.created_at).toLocaleTimeString("de-DE")}
      </h3>
    </div>
  );
}

export default CurrentConditions;

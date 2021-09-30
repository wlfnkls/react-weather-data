import { Line } from "react-chartjs-2";
import moment from "moment";
import "chartjs-adapter-moment";

const options = {
  plugins: {
    legend: {
      display: true,
    },
    tooltip: {
      mode: "index",
      position: "nearest",
      intersect: false,
      callbacks: {
        label: function (context) {
          var label = context.dataset.label || "";

          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            if (context.datasetIndex === 1) {
              label += context.parsed.y + "%";
            } else {
              label += context.parsed.y + "°C";
            }
          }
          return label;
        },
      },
    },
  },
  //   responsive: true,
  //   maintainAspectRatio: false,
  scales: {
    x: {
      //   display: false,
      type: "time",
      min: moment().subtract(1, "days"),
      //   max: moment(),
      time: {
        tooltipFormat: "DD.MM.YYYY, HH:mm",
        unit: "minute",
        stepSize: 60,
        displayFormats: {
          minute: "HH:mm",
        },
      },
      ticks: {
        callback: function (val, index) {
          // Hide the label of every 2nd dataset
          return index % 2 === 0 ? val : "";
        },
      },
    },
    y: {
      type: "linear",
      //   min: 0,
      display: true,
      position: "left",
      title: {
        display: true,
        text: "Temperature [°C]",
      },
    },
    y1: {
      type: "linear",
      //   min: 0,
      display: true,
      position: "right",
      title: {
        display: true,
        text: "Humidity [%]",
      },
      // grid line settings
      grid: {
        drawOnChartArea: false, // only want the grid lines for one axis to show up
      },
    },
  },
};

function Graph(props) {
  const data = (canvas) => {
    var ctx = canvas.getContext("2d");
    var gradientT = ctx.createLinearGradient(0, 0, 0, 400);
    gradientT.addColorStop(1, "rgba(110, 231, 183, 0.15)");
    gradientT.addColorStop(0, "rgba(110, 231, 183, 0.3)");
    var gradientH = ctx.createLinearGradient(0, 0, 0, 400);
    gradientH.addColorStop(1, "rgba(124, 58, 237, 0.15)");
    gradientH.addColorStop(0, "rgba(124, 58, 237, 0.3)");
    return {
      labels: props.data.map((d) => moment(d.created_at)),
      datasets: [
        {
          label: "Temperature",
          data: props.data.map((d) => d.temp),
          fill: true,
          // backgroundColor: "rgba(110, 231, 183, 0.2)",
          backgroundColor: gradientT,
          pointRadius: 2,
          pointBackgroundColor: "rgb(110, 231, 183)",
          borderColor: "rgb(110, 231, 183)",
          tension: 0.5,
          yAxisID: "y",
        },
        {
          label: "Humidity",
          data: props.data.map((d) => d.hum),
          fill: true,
          backgroundColor: gradientH,
          pointRadius: 2,
          pointBackgroundColor: "rgb(124, 58, 237)",
          borderColor: "rgba(124, 58, 237)",
          tension: 0.5,
          yAxisID: "y1",
        },
      ],
    };
  };
  return <Line data={data} options={options} />;
}

export default Graph;

import React from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import "./ChartTemperature.css";
import chartTemperatureImg from "../../images/temperature.png";
export default class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [53],
      options: {
        chart: {
          height: 360,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            track: {
              background: "#e7e7e7",
              strokeWidth: "97%",
              margin: 5, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                color: "#999",
                opacity: 1,
                blur: 2,
              },
            },
            hollow: {
              margin: 15,
              size: "50%",
              image: "../../images/temperature.png",
              imageWidth: 30,
              imageHeight: 30,
              imageClipped: false,
            },
            dataLabels: {
              name: {
                show: false,
                color: "blue",
              },
              value: {
                show: true,
                color: "#008ffb",
                offsetY: 50,
                fontSize: "22px",
                fontWeight: "bold",
                formatter: function (val) {
                  return val + "°C";
                },
              },
            },
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.7,
            gradientToColors: ["#f6b44e"],
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
        stroke: {
          lineCap: "round",
        },
        labels: ["Volatility"],
      },
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      axios.get("/auth/google").then((result) => {
        this.setState({
          series: [result.data.doam[0]],
        });
      });
    }, 1000);
  }
  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  render() {
    return (
      <div className="chart-temperature">
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="radialBar"
            height={280}
          />
        </div>
        <img src={chartTemperatureImg} alt="" />
      </div>
    );
  }
}

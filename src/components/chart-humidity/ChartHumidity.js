import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import "./ChartHumidity.css";
export default class ChartHumidity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      s: [],
      series: [
        {
          data: [],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
        },
        stroke: {
          width: 7,
          curve: "smooth",
        },
        xaxis: {
          categories: [],
        },
        title: {
          text: "BIỂU ĐỒ ĐỘ ẨM",
          align: "left",
          style: {
            fontSize: "16px",
            color: "#666",
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            gradientToColors: ["#FDD835"],
            shadeIntensity: 1,
            type: "horizontal",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100],
          },
        },
        markers: {
          size: 4,
          colors: ["#FFA41B"],
          strokeColors: "#fff",
          strokeWidth: 2,
          hover: {
            size: 7,
          },
        },
        yaxis: {
          min: 0,
          max: 100,
          title: {
            text: "Air humidity (%)",
          },
        },
      },
    };
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      var d = new Date();
      var date = "";
      if (d.getSeconds() < 10) {
        date = `${d.getHours()}:${d.getMinutes()}:0${d.getSeconds()}`;
      } else {
        date = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
      }
      console.log(this.state.series[0]);
      axios.get("/doan").then((result) => {
        this.setState({
          s: [date, ...this.state.s.slice(0, 10)],
          series: [
            {
              ...this.state.series[0],
              data: [
                result.data.doam[0],
                ...this.state.series[0].data.slice(0, 10),
              ],
            },
          ],
          options: {
            ...this.state.options,
            xaxis: {
              categories: [...this.state.s],
            },
          },
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
      <div className="chart-humidity">
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={280}
            width={610}
          />
        </div>
      </div>
    );
  }
}

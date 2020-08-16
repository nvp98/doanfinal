import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
export default class ChartAirHumidity extends Component {
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
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [5, 7, 5],
          curve: "straight",
          dashArray: [0, 8, 5],
        },
        title: {
          text: "Biểu Đồ Độ Ẩm Đất",
          align: "left",
        },
        legend: {
          tooltipHoverFormatter: function (val, opts) {
            return (
              val +
              " - " +
              opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
              ""
            );
          },
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6,
          },
        },
        yaxis: {
          min: 0,
          max: 100,
          title: {
            text: "Soil Moisture (%)",
          },
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val) {
                  return val + " (mins)";
                },
              },
            },
            {
              title: {
                formatter: function (val) {
                  return val + " per session";
                },
              },
            },
            {
              title: {
                formatter: function (val) {
                  return val;
                },
              },
            },
          ],
        },
        grid: {
          borderColor: "#f1f1f1",
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
                result.data.damkk[0],
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
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={300}
          width={510}
        />
      </div>
    );
  }
}

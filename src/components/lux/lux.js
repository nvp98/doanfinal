import React from "react";

import axios from "axios";
import sunmax from "../../images/iconsun3-removebg-preview.png";
import night from "../../images/night-removebg-preview.png";
import "./lux.css";

export default class PersonList extends React.Component {
  state = {
    anhsang: [],
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      axios.get("/doan").then((res) => {
        const anhsang = res.data.as[0];
        this.setState({ anhsang });
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
      <div className="lux">
        {" "}
        {parseFloat(this.state.anhsang) < 10 ? (
          <img src={night} alt="img" />
        ) : (
          <img src={sunmax} alt="img" />
        )}
        <h2>{this.state.anhsang} LUX</h2>
      </div>
    );
  }
}

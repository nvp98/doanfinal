import React from "react";
import "./TaskBar.css";
import tbLogo from "../../images/tb-logo.png";
import tbChart from "../../images/tb-chart.svg";
import tbControl from "../../images/tb-control.svg";
import tbSetting from "../../images/tb-settings.svg";
import tbAbout from "../../images/tb-about.svg";
export default function TaskBar(props) {
  const options = (data) => {
    props.option(data);
  };
  return (
    <div className="task-bar">
      <div className="task-bar__header">
        <div className="task-bar__header__logo">
          <img src={tbLogo} alt="img" />
        </div>
        <div className="task-bar__header__title">
          <h2>Smart Farming System</h2>
        </div>
      </div>
      <div className="task-bar__select">
        <ul>
          <li onClick={() => options("dashboard")}>
            <img src={tbChart} alt={"img"} />
            <span>Dashboard</span>
          </li>
          <li onClick={() => options("control")}>
            <img src={tbControl} alt={"img"} />
            <span>Information</span>
          </li>
          <li>
            <img src={tbSetting} alt={"img"} />
            <span>Setting</span>
          </li>
          <li>
            <img src={tbAbout} alt={"img"} />
            <span>About</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import "./ControlChart.css";
import MainControlChart from "./main-interface/MainControlChart";
import Menu from "./menu/Menu";
import imgLeft from "../../images/undo.svg";
import imgMenu from "../../images/menu.svg";
import imgTab from "../../images/tab.svg";
import imgHome from "../../images/houses.svg";
export default function ControlChart() {
  let [isClickMenu, setIsClickMenu] = useState(false);
  let [data, setData] = useState("");
  let [chooseOption, setChooseOption] = useState("");
  const chooseMenu = (data) => {
    //
    console.log("thoigian", data);
    setData(data);
  };
  const home = () => {
    setIsClickMenu(!isClickMenu);
    setChooseOption("back");
  };
  const back = (data) => {
    setChooseOption(data);
    console.log("option", data);
  };
  return (
    <div className="contro-chart-main">
      {isClickMenu ? (
        <Menu chooseMenu={chooseMenu} back={back} chooseOption={chooseOption} />
      ) : (
        <MainControlChart data={data} />
      )}
      <div className="btn-group">
        <button className="btn-back btn-control">
          <img src={imgLeft} onClick={() => back("back")} />
        </button>
        <button className="btn-home btn-control" onClick={home}>
          <img src={isClickMenu ? imgHome : imgMenu} />
        </button>

        <button className="btn-tab btn-control">
          <img src={imgTab} />
        </button>
      </div>
    </div>
  );
}

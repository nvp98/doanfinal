import React, { useState, useEffect } from "react";
import "./ControlChart.css";
import axios from "axios";
import ctcQuatChay from "../../images/ctc-quay-chay.png";
import ctcBomVanh from "../../images/ctc-bom-chay-vanh.png";
import ctcBomtam from "../../images/ctc-bom-chay-tam.png";
import ctcPhuntam from "../../images/ctc-phun-tam.png";
import ctcPhunvanh from "../../images/ctc-phun-vanh.png";
const instance = axios.create();
export default function ControlChart() {
  const [data, setData] = useState({
    quat: false,
    maybom: false,
    phunsuong: false,
  });
  const [sendDatas, setSendDatas] = useState({
    quat: "off",
    maybom: "off",
    phunsuong: "off",
    chedo: "normal",
    id: "2",
  });
  const [infor, setInfor] = useState({});
  const sendData = (e) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      setSendDatas({ ...sendDatas, [e.target.name]: "on" });
    } else {
      setSendDatas({ ...sendDatas, [e.target.name]: "off" });
    }
    setData({ ...data, [e.target.name]: e.target.checked });

    console.log(infor);
  };
  useEffect(() => {
    instance
      .post("/control", sendDatas)
      .then((res) => {
        console.log(res);
        console.log(res.sendData);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [sendDatas]);
  useEffect(() => {
    const time = setInterval(() => {
      axios.get("/doan").then((result) => {
        setInfor(result.data);
      });
    }, 1000);
  }, []);
  return (
    <div className="control">
      <div className="control-chart">
        <h2>CONTROL</h2>

        <div className="control-content">
          <div className="control-content__service">
            {" "}
            <div className="control-chart__pan">
              <label className="switch">
                <input
                  type="checkbox"
                  name="quat"
                  checked={data.quat}
                  onChange={sendData}
                />
                <span className="slider"></span>
              </label>
              <div className="icon-quat">
                <img
                  src={ctcQuatChay}
                  className={!data.quat && "non-animation"}
                  alt="img"
                />
              </div>
            </div>
            <div className="control-chart__quater">
              <label className="switch">
                <input
                  type="checkbox"
                  name="maybom"
                  checked={data.maybom}
                  onChange={sendData}
                />
                <span className="slider"></span>
              </label>
              <div className="icon-quater">
                <img className="icon-quater__vanh" src={ctcBomVanh} alt="img" />
                <img
                  className={`icon-quater__tam ${
                    !data.maybom && "non-animation"
                  }`}
                  src={ctcBomtam}
                  alt="img"
                />
              </div>
            </div>
            <div className="control-chart__sprinkler">
              <label className="switch">
                <input
                  type="checkbox"
                  name="phunsuong"
                  checked={data.phunsuong}
                  onChange={sendData}
                />
                <span className="slider"></span>
              </label>
              <div className="icon-sprinkler">
                <img
                  className="icon-sprinkler__vanh"
                  src={ctcPhunvanh}
                  alt="img"
                />
                <img
                  className={`icon-sprinkler__tam ${
                    !data.phunsuong && "non-animation"
                  }`}
                  src={ctcPhuntam}
                  alt="img"
                />
              </div>
            </div>
          </div>
          <div className="control-content__infor">
            <table>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
              <tr>
                <td>temperature</td>
                <td>{`${infor.nhietdo}°C`}</td>
              </tr>
              <tr>
                <td>Soil moisture</td>
                <td>{`${infor.damkk}%`}</td>
              </tr>
              <tr>
                <td>Air humidity</td>
                <td>{`${infor.doam}%`}</td>
              </tr>
              <tr>
                <td>Sun</td>
                <td>{`${infor.as}%`}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

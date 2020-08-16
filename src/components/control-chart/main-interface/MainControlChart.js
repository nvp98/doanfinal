import React, { useState, useEffect } from "react";
import "./MainControlChart.css";
import axios from "axios";
import ctcQuatChay from "../../../images/ctc-quay-chay.png";
import ctcBomVanh from "../../../images/ctc-bom-chay-vanh.png";
import ctcBomtam from "../../../images/ctc-bom-chay-tam.png";
import ctcPhuntam from "../../../images/ctc-phun-tam.png";
import ctcPhunvanh from "../../../images/ctc-phun-vanh.png";

export default function ControlChart(props) {
  const [data, setdata] = useState({
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
    var datas = { chedo: "normal", id: "2" };
    if (data.quat) {
      datas = { ...datas, quat: "on" };
    } else {
      datas = { ...datas, quat: "off" };
    }
    if (data.maybom) {
      datas = { ...datas, maybom: "on" };
    } else {
      datas = { ...datas, maybom: "off" };
    }
    if (data.phunsuong) {
      datas = { ...datas, phunsuong: "on" };
    } else {
      datas = { ...datas, phunsuong: "off" };
    }
    console.log("sendatas   ", sendDatas);
    console.log("nhandata", data);

    console.log(e.target.name, "=", e.target.checked);
    if (e.target.checked) {
      setSendDatas({ ...datas, [e.target.name]: "on" });
      //setdata({ ...data, [e.target.name]: true });
    } else {
      setSendDatas({ ...datas, [e.target.name]: "off" });
      //setdata({ ...data, [e.target.name]: false });
    }

    //setdata({ ...data, [e.target.name]: e.target.checked });

    //console.log(infor);
  };
  //console.log("sendData ",sendData);
  useEffect(() => {
    const instance = axios.create({
      baseURL: "http://45.119.83.67:3000/",
      timeout: 500,
      headers: { "X-Custom-Header": "foobar" },
    });
    //instance.defaults.timeout = 500;
    instance.post("/control", sendDatas).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  }, [sendDatas]);

  useEffect(() => {
    var date = "";
    //let quat =false;
    var quat1, maybom1, phunsuong1;
    const time = setInterval(() => {
      var d = new Date();
      if (d.getMinutes() < 10) {
        date = `${d.getHours()}:0${d.getMinutes()}:${d.getSeconds()}`;
      } else {
        date = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
      }

      if (date === `${props.data}:0`) {
        setdata({ ...data, maybom: true });
      } else if (date === `${props.data}:10`) {
        setdata({ ...data, maybom: false });
      }

      axios.get("/doan").then((result) => {
        setInfor(result.data);
        // console.log(result.data);
      });

      axios.get("/control").then((result) => {
        if (result.data.quat == "on") {
          quat1 = true;
          //setdata({ ...data, {quat: true, maybom:result.data.maybom,}});
        } else if (result.data.quat == "off") {
          quat1 = false;
          // setdata({ ...data, quat: false });
          //console.log("quat false ", setdata.quat);
        }
        if (result.data.maybom == "on") {
          maybom1 = true;
          //setdata({ ...data, maybom: true });
        } else if (result.data.maybom == "off") {
          maybom1 = false;
          // setdata({ ...data, maybom: false });
        }
        if (result.data.phunsuong == "on") {
          phunsuong1 = true;
          // setdata({ ...data, phunsuong: true });
        } else if (result.data.phunsuong == "off") {
          phunsuong1 = false;
          // setdata({ ...data, phunsuong: false });
        }
      });
      setdata({ quat: quat1, maybom: maybom1, phunsuong: phunsuong1 });
    }, 1000);
    return () => clearInterval(time);
  }, []);

  // useEffect(() => {
  //   const time = setInterval(() => {
  //     axios.get("/control").then((result) => {
  //       console.log("control ", result.data);
  //       if (result.data.maybom == "on") {
  //         setdata({ ...data, maybom: true });
  //       } else if (result.data.maybom == "off") {
  //         setdata({ ...data, maybom: false });
  //       }
  //     });
  //   }, 2000);
  // }, []);
  // useEffect(() => {
  //   const time = setInterval(() => {
  //     axios.get("/control").then((result) => {
  //       console.log("control ", result.data);
  //       if (result.data.phunsuong == "on") {
  //         setdata({ ...data, phunsuong: true });
  //       } else if (result.data.phunsuong == "off") {
  //         setdata({ ...data, phunsuong: false });
  //       }
  //     });
  //   }, 3000);
  // }, []);

  //setdata({ ...data, quat: result.data.ctrl_quat });
  //if(result.data.ctrl_quat=="on"){
  //quat = true;
  //setdata({ ...data, quat: true });
  //setSendDatas({ ...sendDatas, quat: "on" });
  //}else if((result.data.ctrl_quat=="off")){
  //quat=false;
  //setdata({ ...data, quat: false });
  //setSendDatas({ ...sendDatas, quat: "off" });
  //}
  //console.log("quat",setdata.quat)
  /* setdata({
		quat: quat,
		maybom: result.data.ctrl_maybom,
		phunsuong: result.data.ctrl_phunsuong,
  }) */

  return (
    <div className="control">
      <div className="control-chart">
        <h2>CONTROL</h2>
        <div className="control-content">
          <div className="control-content__service">
            {/* {console.log("data ", sendDatas)} */}
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

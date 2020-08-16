import React from "react";
import imgClock from "../../../../images/clock.svg";
import imgControl from "../../../../images/control.svg";
import imgInfor from "../../../../images/board.svg";
import imgSetting from "../../../../images/setting.svg";
import Slider from "react-slick";
import "./MenuItem.css";
function SampleArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none" }}
      onClick={onClick}
    />
  );
}
export default function MenuItem(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <SampleArrow />,
    prevArrow: <SampleArrow />,
  };
  const chooseOpiotns = (name) => {
    props.choosedataOpiotn(name);
  };
  return (
    <React.Fragment>
      <div className="menu" style={{ width: "100%" }}>
        <div className="menu__items" style={{ width: "90%" }}>
          <h2>MENU</h2>
          <Slider {...settings}>
            <div className="sliders">
              <div className="menu-items-icon">
                <img
                  src={imgClock}
                  onDoubleClick={() => chooseOpiotns("time")}
                />
                <span>Timer</span>
              </div>
            </div>
            <div className="sliders">
              <div className="menu-items-icon">
                <img
                  src={imgSetting}
                  onDoubleClick={() => chooseOpiotns("setting")}
                />
                <span>Setting</span>
              </div>
            </div>
            <div className="sliders">
              <div className="menu-items-icon">
                <img
                  src={imgInfor}
                  onDoubleClick={() => chooseOpiotns("infor")}
                />
                <span>Bulletin</span>
              </div>
            </div>
            <div className="sliders">
              <div className="menu-items-icon">
                <img
                  src={imgControl}
                  onClick={() => chooseOpiotns("control")}
                />
                <span>Control</span>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </React.Fragment>
  );
}

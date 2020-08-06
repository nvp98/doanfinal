import React, { Component } from "react";
import Slider from "react-slick";
import "./Infor.css";
import ifCai from "../../images/if-cai.png";
import ifHung from "../../images/if-hung.png";
import ifOt from "../../images/if-ot.png";
import ifCaChua from "../../images/if-ca-chua.png";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "black",
        margin: "0 30px 0 0",
        zIndex: "9",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "black",
        margin: "0 0 0 30px",
        zIndex: "9",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}
export default class CustomArrows extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 2,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    return (
      <div className="infor">
        <div className="infor__type-tree">
          <Slider {...settings}>
            <div className="type-tree">
              <div className="type-tree__img">
                {" "}
                <img src={ifCai} alt="img" />
                <p>Râu Cải</p>
              </div>
            </div>
            <div className="type-tree">
              <div className="type-tree__img">
                {" "}
                <img src={ifHung} alt="img" />
                <p>Râu Húng</p>
              </div>
            </div>
            <div className="type-tree">
              <div className="type-tree__img">
                {" "}
                <img src={ifOt} alt="img" />
                <p>Ớt</p>
              </div>
            </div>

            <div className="type-tree">
              <div className="type-tree__img">
                {" "}
                <img src={ifCaChua} alt="img" />
                <p>Cà Chua</p>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}

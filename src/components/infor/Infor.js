import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import Slider from "react-slick";
import "./Infor.css";
import ifCai from "../../images/if-cai.png";
import ifHung from "../../images/if-hung.png";
import ifOt from "../../images/if-ot.png";
import ifCaChua from "../../images/if-ca-chua.png";
import imgPlus from "../../images/plus.svg";
import imgAddUser from "../../images/add.svg";
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
export default function CustomArrows() {
  const [upload, setUplaod] = useState();
  const [inforTree, setInforTree] = useState({});
  const [data, setData] = useState([
    {
      ten: "Cải",
      thoiGianTrong: "06/08/2020",
      thoiGianThuHoach: "06/11/2020",
      nhietDo: "30°C",
      doAmDat: "30%",
      doAmKk: "50%",
      img: ifCai,
    },
    {
      ten: "Ớt",
      thoiGianTrong: "06/08/2020",
      thoiGianThuHoach: "06/11/2020",
      nhietDo: "30°C",
      doAmDat: "30%",
      doAmKk: "50%",
      img: ifOt,
    },
    {
      ten: "Rau Húng",
      thoiGianTrong: "06/08/2020",
      thoiGianThuHoach: "06/12/2020",
      nhietDo: "30°C",
      doAmDat: "30%",
      doAmKk: "50%",
      img: ifHung,
    },
    {
      ten: "Ca chua",
      thoiGianTrong: "06/08/2020",
      thoiGianThuHoach: "06/11/2020",
      nhietDo: "30°C",
      doAmDat: "30%",
      doAmKk: "50%",
      img: ifCaChua,
    },
  ]);
  const [show, setShow] = useState(false);
  const [infor, setInfor] = useState({
    ten: "Ca chua",
    thoiGianTrong: "06/08/2020",
    thoiGianThuHoach: "06/11/2020",
    nhietDo: "30°C",
    doAmDat: "30%",
    doAmKk: "50%",
    img: ifCaChua,
  });
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const chooseTree = (tree) => {
    for (let obj of data) {
      if (obj.ten === tree) {
        setInfor(obj);
      }
    }
  };
  const showForm = () => {
    setShow(!show);
  };

  const onChange = (list) => {
    setInforTree({ ...inforTree, img: list[0].dataURL });
  };
  const fetchInfor = (e) => {
    setInforTree({ ...inforTree, [e.target.name]: e.target.value });
  };
  const addData = () => {
    setData([...data, inforTree]);
  };
  return (
    <div className="infor">
      <label for="shows" className="btn-add">
        <img src={imgPlus} onClick={showForm} />
      </label>
      <input hidden className="isShow" type="checkbox" id="shows" />

      <label htmlFor="shows" className="form-add-tree">
        <div className="form-infor-tree">
          <div className="form-infor-tree__item">
            <ImageUploading onChange={onChange} maxNumber={0}>
              {({ imageList, onImageUpload }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                  <button onClick={onImageUpload}>
                    <img
                      src={imageList[0] ? imageList[0].dataURL : imgAddUser}
                    />
                  </button>
                </div>
              )}
            </ImageUploading>
          </div>
          <div className="form-infor-tree__item">
            <label>* Tên Cây Trồng</label>
            <input name="ten" onChange={fetchInfor} type="text" />
          </div>
          <div className="form-infor-tree__item">
            <label>*Thời gian bắt đầu trồng</label>
            <input name="thoiGianTrong" onChange={fetchInfor} type="date" />
          </div>
          <div className="form-infor-tree__item">
            <label>* Thời gian thu hoạch</label>
            <input name="thoiGianThuHoach" onChange={fetchInfor} type="date" />
          </div>
          <div className="form-infor-tree__item">
            <label>*Nhiệt độ</label>
            <input name="nhietDo" onChange={fetchInfor} type="number" />
          </div>
          <div className="form-infor-tree__item">
            <label>*Độ ẩm đất</label>
            <input name="doAmDat" onChange={fetchInfor} type="number" />
          </div>
          <div className="form-infor-tree__item">
            <label>*Độ ẩm không khí</label>
            <input name="doAmKk" onChange={fetchInfor} type="number" />
          </div>
          <div className="btn-add-tree">
            <label htmlFor="shows" onClick={addData}>
              Thêm
            </label>
          </div>
        </div>
      </label>

      <div className="infor__type-tree">
        <Slider {...settings}>
          {data.map((item, index) => {
            return (
              <div className="type-tree" key={index}>
                <div
                  className="type-tree__img"
                  onDoubleClick={() => chooseTree(item.ten)}
                >
                  {" "}
                  <img src={item.img} alt="img" />
                  <p>{item.ten}</p>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
      <div>
        <h1>{infor.ten}</h1>
        {console.log(infor)}
        <div>
          <div>thời gian trồng {infor.thoiGianTrong}</div>
          <div>thời gian dự định thu hoạch {infor.thoiGianThuHoach}</div>
          <table id="customers">
            <tr>
              <th>Thông số</th>
              <th>Giá trị</th>
            </tr>
            <tr>
              <td>Nhiệt độ</td>
              <td>{infor.nhietDo}</td>
            </tr>
            <tr>
              <td>Độ ẩm đất</td>
              <td>{infor.doAmDat}</td>
            </tr>
            <tr>
              <td>Độ ẩm kk</td>
              <td>{infor.doAmKk}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

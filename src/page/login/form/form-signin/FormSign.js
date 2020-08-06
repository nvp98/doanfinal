import React from "react";
import "./FormSign.css";
import loginIconUser from "../../../../images/login-iconUser.svg";
import Password from "../../../../images/password.svg";
export default function FormSign(props) {
  const handleChange = (e) => {
    props.fetchData(e);
  };
  return (
    <React.Fragment>
      <div className="form-sign__input">
        <label htmlFor="user-name">
          <img src={loginIconUser} alt="img" /> <span>User Name</span>
        </label>
        <input type="text" id="user-name" name="user" onChange={handleChange} />
      </div>
      <div className="form-sign__input">
        <label htmlFor="pass">
          <img src={Password} alt="img" /> <span>Password</span>
        </label>
        <input
          type="password"
          id="pass"
          value={props.valuePass}
          placeholder={props.confirmPass && "Xác nhận mật khẩu không hơp lệ"}
          name="pass"
          onChange={handleChange}
        />
      </div>
      <div className="form-sign__input">
        <label htmlFor="pass">
          <img src={Password} alt="img" /> <span>Retype Password</span>
        </label>
        <input
          type="password"
          id="pass"
          name="repass"
          value={props.valueRePass}
          onChange={handleChange}
          placeholder={props.confirmPass && "Xác nhận mật khẩu không hơp lệ"}
        />
      </div>
    </React.Fragment>
  );
}

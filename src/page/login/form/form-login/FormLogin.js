import React from "react";
import "./FormLogin.css";
import loginIconUser from "../../../../images/login-iconUser.svg";
import Password from "../../../../images/password.svg";
export default function FormLogin(props) {
  const handleChange = (e) => {
    props.loginForm(e);
  };
  return (
    <React.Fragment>
      <div className="form-login__input">
        <label htmlFor="user-name">
          <img src={loginIconUser} alt="img" /> <span>User Name</span>
        </label>
        <input type="text" name="user" onChange={handleChange} id="user-name" />
      </div>
      <div className="form-login__input">
        <label htmlFor="pass">
          <img src={Password} alt="img" /> <span>Password</span>
        </label>
        <input type="password" name="pass" onChange={handleChange} id="pass" />
      </div>
    </React.Fragment>
  );
}

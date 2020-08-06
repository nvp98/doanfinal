import React, { useState, useEffect } from "react";
import loginMamnon from "../../../images/login-mamnon.png";
import FormLogin from "./form-login/FormLogin";
import FormSign from "./form-signin/FormSign";
import { useHistory } from "react-router-dom";
import "./Form.css";

export default function Form(props) {
  let history = useHistory();
  let storageKey = "list user";
  const [choose, setForm] = useState(false);
  const [users, setUser] = useState([]);
  const [loginUser, setLoginUser] = useState({});
  const [stateLogin, setStateLogin] = useState(false);
  const [repass, setRepass] = useState("");
  const [listUsers, setListUser] = useState([]);
  const [confirmPass, setConfirmPass] = useState(false);
  const [storage, setStorage] = useState(
    JSON.parse(localStorage.getItem(storageKey))
  );

  useEffect(() => {
    console.log("useEffect", listUsers);
    localStorage.setItem(storageKey, JSON.stringify(listUsers.concat(storage)));
    console.log(JSON.parse(localStorage.getItem(storageKey)));
  }, [listUsers]);
  const chooseForm = (e) => {
    if (e.target.value === "Sign in") setForm(false);
    else setForm(true);
    setUser({ ...users, pass: "" });
    setRepass("");
    setConfirmPass(false);
  };
  const loginForm = (data) => {
    setLoginUser({ ...loginUser, [data.target.name]: data.target.value });
  };
  const fetchData = (data) => {
    if (data.target.name === "repass") {
      setRepass(data.target.value);
    } else {
      setUser({ ...users, [data.target.name]: data.target.value });
    }
  };
  const showData = () => {
    console.log("user", users);
    console.log("repass", repass);

    if (users.pass === repass) {
      setListUser([...listUsers, users]);
      setForm(false);
    } else {
      setUser({ ...users, pass: "" });
      setRepass("");
      setConfirmPass(true);
    }

    // localStorage.setItem(storageKey, JSON.stringify(users));
  };
  const Login = () => {
    let active = false;
    for (let index of JSON.parse(localStorage.getItem(storageKey))) {
      if (index.user === loginUser.user && index.pass === loginUser.pass) {
        console.log("dang nhap thanh coong");
        active = true;
        break;
      } else {
        console.log("chua dang nhap thanh cong");
      }
    }
    if (active) {
      // props.confirmLogin(true);
      history.push("/control");
      setStateLogin(false);
    } else {
      setStateLogin(true);
    }
  };
  return (
    <form className="form-login">
      <div className="bg-button"></div>
      <div className="button-group">
        <input
          type="button"
          className={`button-group-item ${choose && "non-input"}`}
          key="1"
          onClick={chooseForm}
          value="Sign in"
        />
        <input
          type="button"
          className={`button-group-item ${!choose && "non-input"}`}
          key="2"
          onClick={chooseForm}
          value="Sign up"
        />
      </div>

      {choose ? (
        <React.Fragment>
          <h2>
            <span>SIGN UP FARM</span> <img src={loginMamnon} alt="img" />
          </h2>
          <FormSign
            valuePass={users.pass}
            valueRePass={repass}
            confirmPass={confirmPass}
            fetchData={fetchData}
          />{" "}
          <input
            className="submit"
            type="button"
            onClick={showData}
            value="Sign up"
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h2>
            <span>SIGN IN FARM</span> <img src={loginMamnon} alt="img" />
          </h2>
          {console.log(stateLogin)}
          <FormLogin loginForm={loginForm} />
          <p>{stateLogin && "Tài khoản và mật khẩu không chính xác"}</p>
          <input
            className="submit"
            type="button"
            onClick={Login}
            value="Login"
          />
        </React.Fragment>
      )}
    </form>
  );
}

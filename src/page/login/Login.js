import React from "react";
import Form from "./form/Form";
import "./Login.css";
export default function Login(props) {
  const confirmLogin = (data) => {
    props.clickLogin(data);
  };

  return (
    <div className="logo">
      <Form confirmLogin={confirmLogin} />
    </div>
  );
}

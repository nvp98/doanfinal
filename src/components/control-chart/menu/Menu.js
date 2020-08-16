import React, { useState } from "react";
import "./Menu.css";
import Timer from "./timer/Timer";
import MenuItem from "./menu-items/MenuItem";

export default function Menu(props) {
  const choosedataOption = (name) => {
    props.back(name);
  };
  const fetchTime = (data) => {
    console.log(data.target.value);
  };
  const showOption = () => {
    if (props.chooseOption === "time") {
      return (
        <Timer
          fetchTime={fetchTime}
          chooseMenu={props.chooseMenu}
          choosedataOpiotn={choosedataOption}
        />
      );
    } else {
      return <MenuItem choosedataOpiotn={choosedataOption} />;
    }
  };
  return <React.Fragment>{showOption()}</React.Fragment>;
}

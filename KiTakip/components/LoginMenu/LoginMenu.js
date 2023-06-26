import React from "react";
import Login from "./Page";
import Slider from "./Slider";

const LoginMenu = (props) => {
  const { item, index } = props;
  return <>{index === 0 ? <Login /> : <Slider item={item} index={index} />}</>;
};

export default LoginMenu;

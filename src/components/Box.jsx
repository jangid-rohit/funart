import React from "react";
import "./Box.css";

export const Box = (props) => {
  return (
    <div className="box">
      <h4>{props.title}</h4>
      {props.children}
    </div>
  );
};

import React from "react";

export const InputNumberRange = (props) => {
  return (
    <div>
      <input
        type="number"
        value={props.value}
        onChange={props.onChange}
        name={props.name}
        min={props.range[0]}
        max={props.range[1]}
        step={props.range[2]}
      />
      <input
        type="range"
        name={props.name}
        min={props.range[0]}
        max={props.range[1]}
        step={props.range[2]}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

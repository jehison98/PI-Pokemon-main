import React from "react";
import "./checkbox.css";

export function CheckBox({ type, typeToggle, checked }) {
  return (
    <label className="type-checkbox">
      <input
        type="checkbox"
        onChange={() => typeToggle(type.name)}
        checked={checked.indexOf(type.name) === -1 ? false : true}
      />
      {type.name}
    </label>
  );
}

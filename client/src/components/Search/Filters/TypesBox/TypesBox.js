import React, { useState } from "react";
import { CheckBox } from "./CheckBox/CheckBox";
import "./typesbox.css";

export function TypesBox(props) {
  const {
    setCheckBox,
    filter,
    setFilter,
    types,
    pokemonsCount,
    setPagination,
  } = props;
  const [dbChecked, setDbChecked] = useState(false);
  const [checked, setChecked] = useState([]);

  function pokemonsDB() {
    let tempDbChecked = dbChecked;
    tempDbChecked = !tempDbChecked;
    setChecked([]);
    setCheckBox([]);
    setDbChecked(tempDbChecked);
    if (tempDbChecked) setFilter({ ...filter, name: "pokemonDB" });
    else setFilter({ ...filter, name: "default" });
  }

  function typeToggle(value) {
    setDbChecked(false);
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      if (newChecked.length > 1) newChecked.shift();
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    setCheckBox(newChecked);
    if (newChecked.length > 0) {
      setFilter({ name: "type", args: newChecked });
      const pages = Math.ceil(pokemonsCount / 20);
      setPagination({ page: 0, pages, filterState: 1 });
    }
  }

  return (
    <div id="box-types">
      <label className="type-checkbox">
        <input type="checkbox" onChange={pokemonsDB} checked={dbChecked} />
        created
      </label>

      <div className="types-checkboxes">
        {types &&
          types.map((type) => (
            <CheckBox
              key={type.id}
              type={type}
              typeToggle={typeToggle}
              checked={checked}
            />
          ))}
      </div>
    </div>
  );
}

import React from "react";

export function CreateSelect({ type, setType, types }) {
  function selectType(event, pos) {
    const typeId = parseInt(event.target.value);
    let newArr = type;
    newArr[pos] = typeId;
    setType(newArr);
  }
  return (
    <div className="type-options">
      <h3>First Type</h3>
      <select
        className="select-options"
        name="select"
        onChange={(event) => selectType(event, 0)}
      >
        {types &&
          types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
      </select>
      <h3>Second Type (optional)</h3>
      <select
        className="select-options"
        name="select"
        onChange={(event) => selectType(event, 1)}
      >
        <option>No second type</option>
        {types &&
          types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
      </select>
    </div>
  );
}

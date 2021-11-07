import React from "react";

export function CreateInputs({ setData, data }) {
  function onChange(event, field) {
    setData({ ...data, [field]: event.target.value });
  }
  return (
    <div id="create-form">
      <label>
        <p>Name</p>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={data.name}
          onChange={(event) => onChange(event, "name")}
          required
        />
      </label>
      <label>
        <p>Life</p>
        <input
          type="number"
          name="life"
          placeholder="Life"
          value={data.life}
          onChange={(event) => onChange(event, "life")}
          required
        />
      </label>
      <label>
        <p>Strength</p>
        <input
          type="number"
          name="strength"
          placeholder="Strength"
          value={data.strength}
          onChange={(event) => onChange(event, "strength")}
          required
        />
      </label>
      <label>
        <p>Defense</p>
        <input
          type="number"
          name="defense"
          placeholder="Defense"
          value={data.defense}
          onChange={(event) => onChange(event, "defense")}
          required
        />
      </label>
      <label>
        <p>Velocity</p>
        <input
          type="number"
          name="velocity"
          placeholder="Velocity"
          value={data.velocity}
          onChange={(event) => onChange(event, "velocity")}
          required
        />
      </label>
      <label>
        <p>Height</p>
        <input
          type="number"
          name="height"
          placeholder="Height"
          value={data.height}
          onChange={(event) => onChange(event, "height")}
          required
        />
      </label>
      <label>
        <p>Weight</p>
        <input
          type="number"
          name="weight"
          placeholder="Weight"
          value={data.weight}
          onChange={(event) => onChange(event, "weight")}
          required
        />
      </label>
    </div>
  );
}

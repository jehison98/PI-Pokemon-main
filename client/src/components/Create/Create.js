import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { postPokemon, getTypes } from "../../actions/index";
import { CreateInputs } from "./CreateInputs/CreateInputs";
import { CreateSelect } from "./CreateSelect/CreateSelect";
import "./create.css";

function Create(props) {
  const { postPokemon, getTypes, types } = props;

  const [data, setData] = useState({
    name: "",
    life: "",
    strength: "",
    defense: "",
    velocity: "",
    height: "",
    weight: "",
  });
  const [type, setType] = useState([1]);

  useEffect(() => {
    getTypes();
  }, [getTypes]);

  function handleSubmit(event) {
    event.preventDefault();
    if (type.length > 1 && type[0] === type[1]) {
      let copyType = type;
      copyType[1] = NaN;
      setType(copyType);
    }
    postPokemon(data, type);
    setData({
      name: "",
      life: "",
      strength: "",
      defense: "",
      velocity: "",
      height: "",
      weight: "",
    });
  }

  return (
    <div id="create-pokemon">
      <h1>Create your own Pokemon</h1>
      <div className="form-bg">
        <form onSubmit={handleSubmit}>
          <CreateInputs data={data} setData={setData} />
          <CreateSelect types={types} type={type} setType={setType} />
          <div className="submit-btn">
            <button className="btn" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    types: state.types,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postPokemon: (body, typeId) => dispatch(postPokemon(body, typeId)),
    getTypes: () => dispatch(getTypes()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);

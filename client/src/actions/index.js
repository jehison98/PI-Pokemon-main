export function getPokemons(offset) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/api/pokemons?offset=${offset}`)
      .then((response) => response.json())
      .then((res) => {
        dispatch({ type: "GET_POKEMONS", payload: res });
      })
      .catch((err) => {
        dispatch({ type: "404_POKEMON", payload: err });
      });
  };
}

export function getPokemon(id) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/api/pokemons/id/${id}`)
      .then((response) => response.json())
      .then((res) => {
        dispatch({ type: "GET_POKEMON_", payload: res });
      })
      .catch((err) => {
        dispatch({ type: "404_POKEMON", payload: err });
      });
  };
}

export function getPokemonId(name) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/api/pokemons?name=${name}`)
      .then((response) => response.json())
      .then((res) => {
        dispatch({ type: "GET_POKEMON_ID", payload: res });
      })
      .catch((err) => {
        return alert("That pokemon does not exist");
      });
  };
}

export function getTypes() {
  return function (dispatch) {
    return fetch(`http://localhost:3001/api/pokemons/types`)
      .then((response) => response.json())
      .then((res) => {
        dispatch({ type: "GET_TYPES", payload: res });
      })
      .catch((err) => {
        dispatch({ type: "404_POKEMON", payload: err });
      });
  };
}

export function getPokemonTypes(types, offset, order) {
  let url = `http://localhost:3001/api/pokemons/pokemonTypes?nameOne=${types[0]}&offset=${offset}&order=${order}`;
  if (types.length === 2) {
    url = url + `&nameTwo=${types[1]}`;
  }
  return function (dispatch) {
    return fetch(url)
      .then((response) => response.json())
      .then((res) => {
        dispatch({ type: "GET_POKEMONS_TYPES", payload: res });
      })
      .catch((err) => {
        dispatch({ type: "404_POKEMON", payload: err });
      });
  };
}

export function getDbPokemons(order) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/api/pokemons/pokemonsDB?order=${order}`)
      .then((response) => response.json())
      .then((res) => {
        dispatch({ type: "GET_POKEMONS_DB", payload: res });
      })
      .catch((err) => {
        dispatch({ type: "404_POKEMON", payload: err });
      });
  };
}

export function postPokemon(body, typeId) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/api/pokemons`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.created === false) {
          return alert("That pokemon already exists");
        } else {
          fetch(
            `http://localhost:3001/api/pokemons/${res.id}/type/${typeId[0]}`,
            {
              method: "POST",
              body: JSON.stringify(body),
              headers: { "Content-Type": "application/json" },
            }
          );
          if (
            typeId.length > 1 &&
            typeof typeId[1] === "number" &&
            isNaN(typeId[1]) === false
          ) {
            fetch(
              `http://localhost:3001/api/pokemons/${res.id}/type/${typeId[1]}`,
              {
                method: "POST",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" },
              }
            );
          }
        }
      })
      .catch((err) => {
        dispatch({ type: "ERROR" });
      });
  };
}

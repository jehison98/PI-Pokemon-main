const initialState = {
  pokemons: [],
  types: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "GET_POKEMON_":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "GET_POKEMON_ID":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "GET_POKEMONS_DB":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "GET_POKEMONS_TYPES":
      return {
        ...state,
        pokemons: action.payload,
      };
    default:
      return { ...state };
  }
};

export default reducer;

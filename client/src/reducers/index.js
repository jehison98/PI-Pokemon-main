const initialState = {
  pokemons: [],
  pokemon: {},
  error: false,
  count: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "GET_COUNT":
      return {
        ...state,
        count: action.payload,
      };
    case "GET_BY_NAME":
      return {
        ...state,
        pokemon: action.payload,
        error: false,
      };
    case "404_POKEMON":
      return {
        ...state,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default reducer;

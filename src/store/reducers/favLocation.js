const initialState = { favLocationsCity: [] }

function favLocations(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SAVE_LOCATION':
      nextState = {
        ...state,
        favLocationsCity: [...state.favLocationsCity, action.value]
      };
      return nextState || state
    case 'UNSAVE_LOCATION':
      nextState = {
        ...state,
        favLocationsCity: state.favLocationsCity.filter(id => id !== action.value)
      };
      return nextState || state
    default:
      return state
  };
}

export default favLocations;
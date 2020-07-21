import * as types from "./types";

const defaultState = {
  isLoading: true,
  profile: null,
};

function reducer(state = defaultState, action) {
  console.log("REDUX REDUCER CALLED", action);
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case types.SET_PROFILE:
      return {
        ...state,
        profile: action.payload.profile,
      };
    default:
      return state;
  }
}

export default reducer;

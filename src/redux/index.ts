import * as types from "./types";

const defaultState = {
  isLoading: true,
  profile: null,
  classes: [],
};

function reducer(state = defaultState, action) {
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
    case types.SET_CLASSES:
      return {
        ...state,
        classes: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;

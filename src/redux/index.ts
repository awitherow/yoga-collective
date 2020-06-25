import * as types from "./types";

const defaultState = {
  isLoading: true,
  isSignedIn: false,
  user: null,
};

function reducer(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.SET_RETRIEVED_USER:
      return {
        ...state,
        isLoading: false,
        isSignedIn: true,
        user: payload.user,
      };
    case types.SET_NEW_USER:
      return {
        ...state,
        isLoading: false,
        isSignedIn: false,
      };
    default:
      return state;
  }
}

export default reducer;

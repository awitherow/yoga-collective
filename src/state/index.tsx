import React, { useReducer, createContext } from "react";
import * as types from "./types";

export const StateContext = createContext();
const { Provider } = StateContext;

const initialState = {
  user: null,
  bioComplete: false,
  loading: true,
};

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    const { type, payload } = action;

    switch (type) {
      case types.SET_USER:
        return {
          user: payload,
        };
      case types.SET_BIO_COMPLETE:
        return {
          bioComplete: true,
        };
      case types.SET_LOADING:
        return {
          loading: payload,
        };
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={[state, dispatch]}>{children}</Provider>;
};

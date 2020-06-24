import React, { useReducer, createContext } from "react";
import * as types from "./types";

export const StateContext = createContext();
const { Provider } = StateContext;

const initialState = {
  user: null,
};

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    const { type, payload } = action;

    switch (type) {
      case types.SET_USER:
        return {
          user: payload,
        };
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={[state, dispatch]}>{children}</Provider>;
};

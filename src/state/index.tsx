import React, { useReducer, createContext } from "react";
import * as types from "./types";

export const StateContext = createContext();
const { Provider } = StateContext;

const initialState = {
  hasAccount: false,
  isTeacher: false,
  isStudent: false,
};

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case types.SET_HAS_ACCOUNT:
        return {
          hasAccount: true,
        };
      case types.SET_IS_TEACHER:
        return {
          isTeacher: true,
          isStudent: false,
        };
      case types.SET_IS_STUDENT:
        return {
          isStudent: true,
          isTeacher: true,
        };
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={[state, dispatch]}>{children}</Provider>;
};

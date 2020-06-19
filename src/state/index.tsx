import React, { useReducer, createContext } from "react";

export const StateContext = createContext();
const { Provider } = StateContext;

const initialState = {
  hasAccount: false,
  isTeacher: false,
  isStudent: true,
};

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "SET_HAS_ACCOUNT":
        return {
          hasAccount: true,
        };
      case "SET_IS_TEACHER":
        return {
          isTeacher: true,
        };
      case "SET_IS_STUDENT":
        return {
          isStudent: true,
        };
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={[state, dispatch]}>{children}</Provider>;
};

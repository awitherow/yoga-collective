import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import Main from "./src";
import reducer from "./src/redux";

const store = createStore(reducer);

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

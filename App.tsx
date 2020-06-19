import React from "react";
import Main from "./src";

import { StateProvider } from "./src/state/";

export default function App() {
  return (
    <StateProvider>
      <Main />
    </StateProvider>
  );
}

import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Onboarding from "./views/Onboarding";
import Home from "./views/Home";

import { StateContext } from "./state";

const Stack = createStackNavigator();

function Main() {
  const [{ hasAccount }] = useContext(StateContext);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {hasAccount ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <Stack.Screen name="Onboarding" component={Onboarding} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;

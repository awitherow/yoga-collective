import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "react-native-vector-icons";

import Onboarding from "./views/Onboarding";
import Classes from "./views/Classes";
import Login from "./views/Login";

import { StateContext } from "./state";
import { Platform } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AuthorizedTabStack() {
  return (
    <Tab.Navigator
      tabBarOptions={{}}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iOS;
          let Android;

          switch (route.name) {
            case "Classes":
              iOS = "ios-school";
              Android = "md-school";
              iconName = Platform.OS === "ios" ? iOS : Android;
              break;
            case "About":
              iOS = "ios-information-circle-outline";
              Android = "md-information-circle-outline";
              iconName = Platform.OS === "ios" ? iOS : Android;
              break;
            case "Profile":
              iOS = "ios-person";
              Android = "md-person";
              iconName = Platform.OS === "ios" ? iOS : Android;
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Stack.Screen name="Classes" component={Classes} />
    </Tab.Navigator>
  );
}

function Main() {
  const [{ hasAccount }] = useContext(StateContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {hasAccount ? (
          <Stack.Screen
            name="Home"
            component={AuthorizedTabStack}
            options={{ title: "Find Classes" }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{
                title: "Getting Started",
              }}
            />
            <Stack.Screen name="Login" component={Login} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;

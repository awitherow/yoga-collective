import React, { useContext, useEffect } from "react";
import { Platform, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "react-native-vector-icons";
import firebase from "firebase";

import Onboarding from "./views/Onboarding";
import Classes from "./views/Classes";
import AccessAccountForm from "./views/AccessAccountForm";

import { StateContext } from "./state";
import * as types from "./state/types";

import { getProfile } from "./firebase/profile";
import firebaseConfig from "./firebase/config";

firebase.initializeApp(firebaseConfig);

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
  const [{ user }, dispatch] = useContext(StateContext);

  firebase.auth().onAuthStateChanged((authUser) => {
    if (authUser) {
      dispatch({ type: types.SET_USER, payload: user });
    }
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        {user ? (
          <>
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{
                title: "Getting Started",
              }}
            />
            <Stack.Screen
              name="Home"
              component={AuthorizedTabStack}
              options={{ title: "Find Classes" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="AccessAccountForm"
              component={AccessAccountForm}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;

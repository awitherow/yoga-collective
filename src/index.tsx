import React, { Component } from "react";
import { Platform, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "react-native-vector-icons";
import firebase from "firebase";

import Onboarding from "./views/Onboarding";
import Classes from "./views/Classes";
import AccessAccountForm from "./views/AccessAccountForm";

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

class Main extends Component {
  state = {
    isLoading: true,
    isSignedIn: false,
    user: null,
  };

  componentDidMount() {
    this.removeAuthListener = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        this.setState({
          isLoading: false,
          isSignedIn: true,
          user: authUser,
        });
      } else {
        this.setState({
          isLoading: false,
          isSignedIn: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }

  render() {
    const { isLoading, isSignedIn, user } = this.state;

    if (isLoading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Onboarding">
            {isSignedIn ? (
              <>
                <Stack.Screen
                  name="Onboarding"
                  component={Onboarding}
                  options={{
                    title: "Getting Started",
                  }}
                  initialParams={{ uid: user?.uid }}
                />
                <Stack.Screen
                  name="Home"
                  component={AuthorizedTabStack}
                  options={{ title: "Find Classes" }}
                  initialParams={{ uid: user?.uid }}
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
  }
}

export default Main;

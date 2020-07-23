import React, { Component } from "react";
import { Platform, View, Text } from "react-native";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "react-native-vector-icons";
import { connect } from "react-redux";

import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

import * as types from "./redux/types";

import Onboarding from "./views/Onboarding";
import Classes from "./views/Classes";
import Profile from "./views/Profile";
import AccessAccountForm from "./views/AccessAccountForm";

import firebaseConfig from "./firebase/config";
import { getProfile } from "./firebase/profile";

firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const routeTitles = {
  Classes: "Find Classes",
  Profile: "Profile",
};

function getHeaderTitle(route, defaultRouteName = "Find Classes") {
  let name = getFocusedRouteNameFromRoute(route) || defaultRouteName;
  if (name === "Home") {
    name = "Classes";
  }
  return routeTitles[name];
}

function AuthorizedTabStack() {
  return (
    <Tab.Navigator
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
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
}

class Main extends Component {
  componentDidMount() {
    const { setLoading, isLoading } = this.props;
    this.removeAuthListener = firebase.auth().onAuthStateChanged((authUser) => {
      if (Boolean(authUser)) {
        this.getData(authUser.uid);
      } else {
        setLoading(false);
      }
    });
  }

  getData = (uid) => {
    const { setProfile, setLoading, isLoading } = this.props;
    this.removeGetProfile = getProfile(uid).then((profile) => {
      if (profile?.uid) {
        setProfile(profile);
      }

      if (isLoading) {
        setLoading(false);
      }
    });
  };

  componentWillUnmount() {
    this.removeAuthListener();
    this.removeGetProfile();
  }

  render() {
    const { isLoading, profile } = this.props;
    const defaultRoute = profile?.setupComplete ? "Home" : "Onboarding";

    if (isLoading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName={defaultRoute}>
            {profile ? (
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
                  options={({ route }) => ({
                    title: getHeaderTitle(route, "Find Classes"),
                  })}
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

function mapStateToProps(state) {
  return {
    isLoading: state.isLoading,
    profile: state.profile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setProfile: (profile) =>
      dispatch({ type: types.SET_PROFILE, payload: { profile } }),
    setLoading: (loading) =>
      dispatch({ type: types.SET_LOADING, payload: loading }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

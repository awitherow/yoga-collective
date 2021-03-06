import React, { Component } from "react";
import { Platform, View, Text, SafeAreaView } from "react-native";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather } from "react-native-vector-icons";
import { connect } from "react-redux";

import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import firebaseConfig from "./firebase/config";
import { getProfile } from "./firebase/profile";

import * as types from "./redux/types";

import Onboarding from "./views/Onboarding";
import Schedule from "./views/Schedule";
import Profile from "./views/Profile";
import MyStudio from "./views/MyStudio";
import About from "./views/About";
import AccessAccountForm from "./views/AccessAccountForm";

firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const routeTitles = {
  Schedule: "Schedule",
  Profile: "Profile",
  "My Studio": "My Studio",
  About: "The Collective",
};

function getHeaderTitle(route, defaultRouteName = "Schedule") {
  let name = getFocusedRouteNameFromRoute(route) || defaultRouteName;
  if (name === "Home") {
    name = "Schedule";
  }
  return routeTitles[name];
}

function AuthorizedTabStack({ profile }) {
  const isTeacher = profile.profileType === "teacher";

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iOS;
          let Android;

          switch (route.name) {
            case "Schedule":
              iOS = "ios-calendar";
              Android = "md-calendar";
              iconName = Platform.OS === "ios" ? iOS : Android;
              break;
            case "About":
              return <Feather name="circle" size={size} color={color} />;
            case "My Studio":
              iOS = "ios-home";
              Android = "md-home";
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
      <Stack.Screen name="Schedule" component={Schedule} />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: "My Profile" }}
      />
      {isTeacher && <Stack.Screen name="My Studio" component={MyStudio} />}
      <Stack.Screen
        name="About"
        component={About}
        options={{ title: "The Collective" }}
      />
    </Tab.Navigator>
  );
}

class Main extends Component {
  componentDidMount() {
    this.removeAuthListener = firebase.auth().onAuthStateChanged((authUser) => {
      const {
        setProfile,
        setLoading,
        isLoading,
        profile,
        resetApp,
      } = this.props;

      if (Boolean(authUser)) {
        this.getData(authUser.uid);
      } else if (!Boolean(authUser) && profile) {
        resetApp();
        setTimeout(() => setLoading(false), 1000);
      } else {
        if (isLoading) {
          setLoading(false);
        }
      }
    });
  }

  getData = (uid) => {
    const { setProfile, setLoading, isLoading } = this.props;

    getProfile(uid).then((profile) => {
      if (profile?.uid) {
        setProfile(profile);
      }

      if (isLoading) {
        setLoading(false);
      }
    });
  };

  componentDidUpdate(prevProps) {
    // handle signIn loading switch
    if (
      prevProps.isLoading &&
      !prevProps.profile &&
      this.props.isLoading &&
      this.props.profile.setupComplete
    ) {
      this.props.setLoading(false);
    }
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
                  component={connect(function mapStateToProps(state) {
                    return {
                      profile: state.profile,
                    };
                  })(AuthorizedTabStack)}
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
    resetApp: () => dispatch({ type: types.RESET_APP }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

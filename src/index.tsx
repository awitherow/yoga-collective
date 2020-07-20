import React, { Component } from "react";
import { Platform, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "react-native-vector-icons";
import * as firebase from "firebase";
import { connect } from "react-redux";

import * as types from "./redux/types";

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
  componentDidMount() {
    this.removeAuthListener = firebase.auth().onAuthStateChanged((authUser) => {
      if (Boolean(authUser)) {
        this.getData(authUser.uid);
        this.props.setRetrievedUser({
          email: authUser.email,
          uid: authUser.uid,
        });
      } else {
        this.props.setNewUser();
      }
    });
  }

  getData = (uid) => {
    this.removeGetProfile = getProfile(uid).then((profile) =>
      this.props.setProfile({ profile })
    );
  };

  componentWillUnmount() {
    this.removeAuthListener();
    this.removeGetProfile();
  }

  render() {
    const { isLoading, isSignedIn, setupComplete } = this.props;

    if (isLoading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={setupComplete ? "Home" : "Onboarding"}
          >
            {isSignedIn ? (
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
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.isLoading,
    isSignedIn: state.isSignedIn,
    setupComplete: state.user?.setupComplete || false,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setRetrievedUser: (user) =>
      dispatch({ type: types.SET_RETRIEVED_USER, payload: { user } }),
    setNewUser: () => dispatch({ type: types.SET_NEW_USER }),
    setProfile: (profile) =>
      dispatch({ type: types.SET_PROFILE, payload: { profile } }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

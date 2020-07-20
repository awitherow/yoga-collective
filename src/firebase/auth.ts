import * as firebase from "firebase";
import { Alert, Linking } from "react-native";
import { createProfile } from "./profile";

export const signUp = async ({ email, password }) => {
  try {
    const userCredentials = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const profile = await createProfile(userCredentials.user);
    console.log(profile);
  } catch (error) {
    var errorCode = error.code;
    var errorMessage = error.message;

    Alert.alert(
      "Signup Failure",
      `Error code: ${errorCode}, message: ${errorMessage}.`,
      [
        {
          text: "Report",
          onPress: () =>
            Linking.openURL(
              `mailto:au.witherow@gmail.com?subject=Signup Error ${errorCode}&body=${errorMessage}`
            ),
        },
        {
          text: "Try Again",
          style: "cancel",
        },
      ]
    );
  }
};

export const signIn = async ({ email, password }) =>
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      Alert.alert(
        "Signin Failure",
        `Error code: ${errorCode}, message: ${errorMessage}.`,
        [
          {
            text: "Report",
            onPress: () =>
              Linking.openURL(
                `mailto:au.witherow@gmail.com?subject=Signup Error ${errorCode}&body=${errorMessage}`
              ),
          },
          {
            text: "Try Again",
            style: "cancel",
          },
        ]
      );
    });

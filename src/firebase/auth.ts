import firebase from "firebase";
import { Alert, Linking } from "react-native";

export const signUp = async ({ email, password }) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
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

export const signIn = async ({ email, password }) => {
  try {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
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
  }
};

import * as firebase from "firebase";
import { Alert, Linking } from "react-native";
import { createProfile } from "./profile";

export const signUp = async ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const userCredentials = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const profile = await createProfile(userCredentials.user);
      return resolve(profile);
    } catch (error) {
      reject(error);
    }
  });

export const signIn = async ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const success = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      return resolve(success);
    } catch (error) {
      reject(error);
    }
  });

export const signOut = () =>
  new Promise((resolve, reject) => {
    firebase
      .auth()
      .signOut()
      .then(() => resolve(true))
      .catch((error) => reject(error));
  });

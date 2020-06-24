import firebase from "firebase";

export const getProfile = async (uid) => {
  const firestore = firebase.firestore();
  try {
    return await firestore.collection("users").doc(uid).get();
  } catch (error) {
    return null;
  }
};

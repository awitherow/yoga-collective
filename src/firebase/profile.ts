import firebase from "firebase";

export const getProfile = async (uid) => {
  const firestore = firebase.firestore();
  try {
    const profile = await firestore
      .collection("users")
      .doc(uid)
      .onSnapshot((doc) => doc.data());
  } catch (error) {
    return null;
  }
};

export const updateProfile = async (uid, data) => {
  const firestore = firebase.firestore();
  firestore.collection("users").doc(uid).set(data, { merge: true });
};

import * as firebase from "firebase";

export const createProfile = async (user) => {
  const firestore = firebase.firestore();
  try {
    await firestore.collection("users").add({
      id: user.uid,
      email: user.email,
    });
  } catch (e) {
    console.log(`Error creating profile`, e);
  }
};

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

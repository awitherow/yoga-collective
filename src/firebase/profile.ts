import * as firebase from "firebase";

export const createProfile = async (user) => {
  const firestore = firebase.firestore();
  try {
    await firestore.collection("users").doc(user.uid).set({
      id: user.uid,
      email: user.email,
      setupComplete: false,
    });
  } catch (e) {
    console.error(`Error creating profile`, e);
  }
};

export const getProfile = (uid) =>
  new Promise((resolve, reject) => {
    const firestore = firebase.firestore();
    try {
      firestore
        .collection("users")
        .doc(uid)
        .onSnapshot((doc) => {
          return resolve(doc.data());
        });
    } catch (error) {
      reject(error);
    }
  });

export const updateProfile = async (uid, data) => {
  const firestore = firebase.firestore();
  firestore.collection("users").doc(uid).set(data, { merge: true });
};

export const uploadProfilePhoto = async (image, uid) =>
  fetch("https://us-central1-yoga-collective.cloudfunctions.net/updatePhoto", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uid,
      image,
    }),
  });

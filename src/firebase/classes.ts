import * as firebase from "firebase";

export const createClass = async (teacherId, teacherName, data) => {
  const firestore = firebase.firestore();
  const classesRef = firestore.collection("classes");
  try {
    await classesRef.add({
      teacherName,
      teacherId,
      ...data,
    });
  } catch (e) {
    console.error(`Error creating class`, e);
  }
};

export const updateClass = async (classId, data) => {
  const firestore = firebase.firestore();
  const classesRef = firestore.collection("classes");
  try {
    await classesRef.doc(classId).update(data);
  } catch (e) {
    console.error(`Error creating class`, e);
  }
};

export const deleteClass = async (classId) => {
  const firestore = firebase.firestore();
  const classesRef = firestore.collection("classes");
  try {
    await classesRef.doc(classId).delete();
  } catch (e) {
    console.error(`Error creating class`, e);
  }
};

export const getClasses = (timeframe = new Date()) =>
  new Promise(async (resolve, reject) => {
    const firestore = firebase.firestore();
    const classesRef = firestore.collection("classes");
    const endOfDay;
    try {
      const classes = [];
      const res = await classesRef.where("endTime", ">=", timeframe).get();
      res.forEach((doc) => classes.push(doc.data()));
      resolve(classes);
    } catch (error) {
      reject(error);
    }
  });

const functions = require("firebase-functions");
const firebase = require("firebase-admin");
const fs = require("fs");
const os = require("os");

firebase.initializeApp();

exports.updatePhoto = functions.https.onRequest((req, res) => {
  const bucket = firebase.storage().bucket();

  try {
    const { image, uid } = req.body;

    const type = image.split(";")[0].split("/")[1];
    const base64Image = image.split(";base64,").pop();

    const tmpImg = `${os.tmpdir()}/${uid}-tmp.${type}`;

    fs.writeFile(tmpImg, base64Image, { encoding: "base64" }, function (
      writeError
    ) {
      if (writeError) {
        throw writeError;
      }

      bucket.upload(
        tmpImg,
        {
          destination: `users/${uid}/avatar.${type}`,
          public: true,
        },
        function (uploadError, file) {
          if (uploadError) {
            throw uploadError;
          }

          file.getMetadata().then((results) =>
            firebase
              .firestore()
              .doc(`users/${uid}`)
              .update({ photo: results[0].mediaLink })
              .then(function (success) {
                res.status(200).send(success);
              })
              .catch((firestoreError) => {
                throw firestoreError;
              })
          );
        }
      );
    });
  } catch (error) {
    console.error("Profile avatar generation error: ", error);

    res.status(500).send(error);
  }
});

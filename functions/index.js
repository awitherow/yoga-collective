const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fs = require("fs");
const os = require("os");

admin.initializeApp();

exports.updatePhoto = functions.https.onRequest((req, res) => {
  console.log("updatePhoto started...");
  const bucket = firebase.storage().bucket();
  console.log("bucket activated");

  try {
    const { image, uid } = req.body;
    console.log("image, uid recieved", image, uid);

    const type = image.split(";")[0].split("/")[1];
    const base64Image = image.split(";base64,").pop();

    console.log("type and base64 success", type, base64Image);

    const tmpImg = `${os.tmpdir()}/${uid}-tmp.${type}`;

    console.log("tmpImg path", tmpImg);

    fs.writeFile(tmpImg, base64Image, { encoding: "base64" }, function (
      writeError
    ) {
      if (writeError) {
        throw writeError;
      }

      console.log("file written...");

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

          console.log("bucket upload success");

          file.getMetadata().then((results) =>
            firebase
              .firestore()
              .doc(`users/${uid}`)
              .set({ photo: results[0].mediaLink })
              .then(function (success) {
                console.log("file stored to profile");
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

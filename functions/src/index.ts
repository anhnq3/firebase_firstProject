import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

// auth trigger (new user sign up)
exports.newUserSignUp = functions
  .region('asia-southeast1')
  .auth.user()
  .onCreate(async (user) => {
    // for background trigger you must return a value/promise
    // if uid not exists then it going to create it
    const { uid, emailVerified, email, photoURL, displayName } = user;
    return admin.firestore().collection('users').doc(user.uid).set({
      id: uid,
      displayName: displayName,
      email: email,
      verified: emailVerified,
      photoURL: photoURL,
      createAt: Date.now(),
    });
  });

// auth trigger (delete user)
exports.deleteUser = functions
  .region('asia-southeast1')
  .auth.user()
  .onDelete((user) => {
    // for background trigger you must return a value/promise
    const doc = admin.firestore().collection('users').doc(user.uid);
    return doc.delete();
  });

// http callable function (adding a request)
// exports.login = functions
//   .region('asia-southeast1')
//   .https.onCall((data, context) => {
//     data;
//   });

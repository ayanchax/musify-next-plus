import firebase from "firebase";
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: "musify-7ba7c.appspot.com",
    messagingSenderId: "895040400948",
    appId: "1:895040400948:web:db218a2444416776b9a461",
    measurementId: "G-PJVC92LQKE",
};
// initialize firebase app with the configuration
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// set up authentication for firebase
const auth = firebase.auth();
// set up authentication provider as google, the app will let user sign in via google via the auth of firebase.
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleAuthProvider };
import firebase from "firebase/app";
import "firebase/auth"
import "firebase/firestore"

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials)
}

export default firebase

// NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCNXWxvXbpiUTKGQ6dZUX1g2wNbcpsR_aQ
// NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=allstar-thanks-giving.firebaseapp.com
// NEXT_PUBLIC_FIREBASE_PROJECT_ID=allstar-thanks-giving
// NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=allstar-thanks-giving.appspot.com
// NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=329396579285
// NEXT_PUBLIC_FIREBASE_APP_ID=1:329396579285:web:7364cbd10c9d678dd02b5c

// GITHUB_APPLICATION_CLIENT_ID=8e114c4d85249c0e1c3f
// GITHUB_APPLICATION_CLIENT_SECRET=3a40193cc1b10739e941f32dc0a3de9fd460b13a

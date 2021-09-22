/* eslint-disable max-len */
// firebaseのcloud functionsにエクスポートする関数をすべてここに記述する
/* eslint-disable-next-line max-len */
/* eslint @typescript-eslint/no-var-requires: "off" */

import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
// import { Request, Response } from "express";

admin.initializeApp(); // サーバーサイドでfirebaseを扱えるようにする
const db = admin.firestore();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

// export const getUsers = functions.https.onRequest(async (request: Request, response: Response): Promise<response>=> {
//   const users = await admin.firestore().collection('users').get();
//   // eslint-disable-next-line prefer-const
//   let userList: FirebaseFirestore.DocumentData[] = [];
//   users.forEach((doc) => {
//     userList.push(doc.data());
//   });
//   return response.json(userList);
// });

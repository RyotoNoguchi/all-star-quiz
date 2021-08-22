/* eslint @typescript-eslint/no-var-requires: "off" */
// firebaseのcloud functionsにエクスポートする関数をすべてここに記述する
import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
admin.initializeApp(); // サーバーサイドでfirebaseを扱えるようにする
const db = admin.firestore();
// Userが作られたときに毎回発火するイベントハンドラ
export const createUserDocument = functions.auth.user().onCreate((user) => {
  db.collection('users') // fibaseの'users'コレクションに
    .doc(user.uid) // user.uidを使って
    .set(JSON.parse(JSON.stringify(user))); // 挿入する
});

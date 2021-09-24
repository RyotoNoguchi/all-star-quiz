/* eslint-disable max-len */
// firebaseのcloud functionsにエクスポートする関数をすべてここに記述する
/* eslint-disable-next-line max-len */
/* eslint @typescript-eslint/no-var-requires: "off" */

import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
admin.initializeApp(); // サーバーサイドでfirebaseを扱えるようにする
const db = admin.firestore();

export const createUserDocument = functions.auth.user().onCreate((user) => {
  db.collection('users') // 「users」コレクション（テーブル）に
    .doc(user.uid) // 「user.id」を使用して取得されるユニークな「user」を
    .set(JSON.parse(JSON.stringify(user))); // ドキュメント（レコード）として追加する
});
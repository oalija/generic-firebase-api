import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Api } from "./api";


admin.initializeApp(functions.config().firebase);

let api = new Api();
export const entity = api.init();

/**
export const addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  return 'AA';
});
 */